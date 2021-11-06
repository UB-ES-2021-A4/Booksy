import os

from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.models import UserProfile
from booksy import settings
from product.models import ProductModel, Category, Image
from product.serializers import ProductSerializer, CategorySerializer, ImageSerializer


# Create your views here.

class ProductView(APIView):
    serializer_class = ProductSerializer
    # TODO user token
    permission_classes = ""
    authentication_classes = ""

    def get(self, request):
        """
        Returns list of all products
        """
        try:
            # Get the category
            product_id = request.GET.get('id')
            category = request.GET.get('category')

            if product_id:
                product_list = list(ProductModel.objects.filter(id=product_id))

            elif category:
                category = Category.objects.get(category_name=category)
                product_list = list(ProductModel.objects.filter(category=category))
            else:
                product_list = list(ProductModel.objects.all())

            serialized_products = [ProductSerializer(prod).data for prod in product_list]
            return Response(serialized_products,
                            status=status.HTTP_200_OK if serialized_products else status.HTTP_204_NO_CONTENT)
        except:
            return Response(status=status.HTTP_418_IM_A_TEAPOT)

    def post(self, request):
        # TODO get seller with auth
        seller = UserProfile.objects.get(id=request.POST.get('seller'))
        category = Category.objects.get(category_name=request.POST.get('category'))
        a = ProductModel.objects.create(title=request.POST.get('title'), author=request.POST.get('author'),
                                        description=request.POST.get('description'), price=request.POST.get('price'),
                                        seller=seller, category=category)
        try:
            product = ProductModel.objects.get(id=a.id)
            return Response(a.id, status=status.HTTP_200_OK if product else status.HTTP_400_BAD_REQUEST)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request):
        product_id = request.GET.get('id')
        seller = request.user
        try:
            prod = ProductModel.objects.filter(id=product_id)
            if getattr(prod, "seller") == seller:  # If same user can be deleted
                ProductModel.objects.filter(id=product_id).delete()
            return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def patch(self, request):
        product_id = request.data.get('id')
        seller = request.user

        try:
            product = ProductModel.objects.get(id=product_id)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

        try:
            if seller == getattr(product, 'seller'):
                product_serialized = ProductSerializer(product, data=request.data)
                if product_serialized.is_valid():
                    product_serialized.save()
                    return Response(status=status.HTTP_200_OK)
                return Response(status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response(status=status.HTTP_401_UNAUTHORIZED)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CategoriesView(APIView):
    # TODO TOKEEEEENENENENENNENNENNN
    permission_classes = ""
    authentication_classes = ""

    def get(self, request):
        categories = list(Category.objects.all())
        serialized_categories = [CategorySerializer(cat).data for cat in categories]
        return Response(serialized_categories,
                        status=status.HTTP_200_OK if serialized_categories else status.HTTP_204_NO_CONTENT)

    # IF YOU WANT TO POST USE THE ADMIN TAB


class ImageView(APIView):
    # TODO user token
    permission_classes = ""
    authentication_classes = ""

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
            user = request.user
            if product.seller != user:
                return Response(status=status.HTTP_401_UNAUTHORIZED)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

        try:
            if Image.objects.filter(product=request.POST.get('id')):
                return Response(status=status.HTTP_409_CONFLICT)  # There's already an image
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

            img = Image.objects.get(product=product_id)
            orig_path = img.image.file.name
            serial_img = ImageSerializer(img, data=request.data)
            if serial_img.is_valid():
                serial_img.save()
                os.remove(orig_path)
                return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request):
        try:
            image_id = request.GET.get('id')
            Image.objects.filter(product=image_id).delete()
            return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
