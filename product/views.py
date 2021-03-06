import operator
import os
from functools import reduce

from django.db.models import Q
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.views import APIView

from product.models import ProductModel, Category, Image
from product.serializers import ProductSerializer, CategorySerializer, ImageSerializer
from booksy.lock import lock

# Create your views here.

class ProductView(APIView):
    serializer_class = ProductSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)
    authentication_classes = (TokenAuthentication,)

    def get(self, request):
        """
        Returns list of all products
        """
        try:
            # Get the category

            product_id = request.GET.get('id')
            category = request.GET.get('category')
            search = request.GET.get('search')
            seller = request.GET.get('seller_id')
            qs = [Q(hidden=False)]
            if category is not None and category != "":
                qs.append(Q(category__category_name=category))
            if search is not None and search != "":
                qs.append(Q(title__icontains=search))
            if product_id is not None and product_id != "":
                qs.append(Q(id=product_id))
            if seller is not None and seller != "":
                qs.append(Q(seller__id=seller))
            if len(qs) == 0:
                product_list = list(ProductModel.objects.all())
            else:
                product_list = ProductModel.objects.filter(reduce(operator.and_, qs))
            if len(product_list) == 0:
                return Response(status=status.HTTP_204_NO_CONTENT)
            serialized_products = [ProductSerializer(prod).data for prod in product_list]
            return Response(serialized_products,
                            status=status.HTTP_200_OK if serialized_products else status.HTTP_204_NO_CONTENT)
        except:
            return Response(status=status.HTTP_418_IM_A_TEAPOT)

    def post(self, request):
        seller = request.user
        category = Category.objects.get(category_name=request.POST.get('category'))
        product_serialized = ProductSerializer(data=request.data)

        try:
            dic = request.data.dict()
            dic.update({'category': {'category_name': category.category_name, 'category_description': category.get_category_name_display()}, 'seller': seller.id})
            product_serialized = ProductSerializer(data=dic)
            if not product_serialized.is_valid():
                return Response(product_serialized.errors, status=status.HTTP_400_BAD_REQUEST)

            with lock.lock:
                prod = ProductModel.objects.create(title=request.POST.get('title'), author=request.POST.get('author'),
                                                   description=request.POST.get('description'),
                                                   price=request.POST.get('price'),
                                                   seller=seller, category=category)

            product = ProductModel.objects.get(id=prod.id)
            return Response(prod.id, status=status.HTTP_200_OK if product else status.HTTP_400_BAD_REQUEST)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request):
        product_id = request.GET.get('id')
        seller = str(request.user.id)
        try:
            prod = ProductModel.objects.filter(id=product_id)
            owner = str(prod.values('seller').first()['seller'])
            if owner == seller:  # If same user can be deleted
                with lock.lock:
                    ProductModel.objects.filter(id=product_id).delete()
            return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def patch(self, request):
        product_id = request.GET.get('id')
        seller = request.user
        try:
            product = ProductModel.objects.get(id=product_id)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

        try:
            owner = getattr(product, 'seller')
            if seller == owner:
                dic = request.data.dict()
                category = Category.objects.get(category_name=request.POST.get('category'))
                dic.update({'category': {'category_name': category.category_name, 'category_description': category.get_category_name_display()}, 'seller': seller.id})
                with lock.lock:
                    product_serialized = ProductSerializer(product, data=dic)
                    if product_serialized.is_valid():
                        product_serialized.save()
                        return Response(status=status.HTTP_200_OK)
                    return Response(product_serialized.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response(status=status.HTTP_401_UNAUTHORIZED)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CategoriesView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        category = request.GET.get('category')
        if category:
            try:
                cat = CategorySerializer(Category.objects.get(category_name=category)).data
            except:
                return Response(status=status.HTTP_404_NOT_FOUND)
            return Response(cat, status=status.HTTP_200_OK if cat else status.HTTP_204_NO_CONTENT)

        categories = list(Category.objects.all())
        serialized_categories = [CategorySerializer(cat).data for cat in categories]
        return Response(serialized_categories,
                        status=status.HTTP_200_OK if serialized_categories else status.HTTP_204_NO_CONTENT)

    # IF YOU WANT TO POST USE THE ADMIN TAB


class ImageView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    authentication_classes = (TokenAuthentication,)

    def get(self, request):
        try:
            product_id = request.GET.get('id')
            if product_id:
                product = ProductModel.objects.get(id=product_id)
                image = Image.objects.get(product=product)
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)

            serialized_images = ImageSerializer(image).data
            return Response(serialized_images,
                            status=status.HTTP_200_OK if serialized_images else status.HTTP_204_NO_CONTENT)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        try:
            product = ProductModel.objects.get(id=request.POST.get('id'))  # Front end should have the product id
            if product.seller != request.user:
                return Response(status=status.HTTP_401_UNAUTHORIZED)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

        try:
            if Image.objects.filter(product=request.POST.get('id')):
                return Response(status=status.HTTP_409_CONFLICT)  # There's already an image
            with lock.lock:
                img = Image.objects.create(image=request.FILES['image'],
                                           product=product)
            if Image.objects.get(id=img.id):
                return Response(status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def patch(self, request):
        product_id = request.data.get('id')
        try:
            user = request.user
            if ProductModel.objects.get(id=product_id).seller != user:
                return Response(status=status.HTTP_401_UNAUTHORIZED)

            with lock.lock:
                img = Image.objects.get(product=product_id)
                orig_path = img.image.file.name
                serial_img = ImageSerializer(img, data=request.data)
                if serial_img.is_valid():
                    serial_img.save()
                    os.remove(orig_path)
                    return Response(status=status.HTTP_200_OK)
                else:
                    return Response(serial_img.errors, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request):
            try:
                image_id = request.GET.get('id')
                with lock.lock:
                    Image.objects.filter(product=image_id).delete()
                return Response(status=status.HTTP_200_OK)
            except:
                return Response(status=status.HTTP_404_NOT_FOUND)
