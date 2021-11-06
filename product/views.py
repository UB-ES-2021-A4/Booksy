from django.shortcuts import render
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.models import UserProfile
from product.models import ProductModel, Category, Image
from product.serializers import ProductSerializer, CategorySerializer, ImageSerializer


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
        seller = request.user
        category = Category.objects.get(category_name=request.POST.get('category'))
        a = ProductModel.objects.create(title=request.POST.get('title'), author=request.POST.get('author'),
                                        description=request.POST.get('description'), price=request.POST.get('price'),
                                        seller=seller, category=category)
        # TODO check if object has been created
        try:
            product = ProductModel.objects.get(id=a.id)
            return Response(status=status.HTTP_200_OK if product else status.HTTP_400_BAD_REQUEST)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request, product_id):
        try:
            ProductModel.objects.filter(id=product_id).delete()
            return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)


class CategoriesView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
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
                product = list(ProductModel.objects.filter(id=product_id))
                images = list(Image.objects.filter(product=product))
            else:
                images = list(Image.objects.all())

            serialized_images = [ImageSerializer(img).data for img in images]
            return Response(serialized_images,
                            status=status.HTTP_200_OK if serialized_images else status.HTTP_204_NO_CONTENT)
        except:
            return Response(status=status.HTTP_418_IM_A_TEAPOT)

    def post(self, request):
        try:
            product = ProductModel.objects.get(id=request.POST.get('id'))  # Front end should have the product id
            if product.seller != request.user:
                return Response(status=status.HTTP_401_UNAUTHORIZED)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

        Image.objects.create(image=request.FILES,
                             product=product)
        return Response(status=status.HTTP_501_NOT_IMPLEMENTED)

    def delete(self, request, image_id):
        try:
            Image.objects.filter(id=image_id).delete()
            return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
