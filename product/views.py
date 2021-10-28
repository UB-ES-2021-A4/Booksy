from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.models import UserProfile
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
                products = list(ProductModel.objects.filter(id=product_id))

            elif category:
                category = Category.objects.get(category_name=category)
                products = list(ProductModel.objects.filter(category=category))

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
        ProductModel.objects.create(title=request.POST.get('title'), author=request.POST.get('author'),
                                    description=request.POST.get('description'), price=request.POST.get('price'),
                                    seller=seller, category=category)
        # TODO check if object has been created

        return Response(status=status.HTTP_501_NOT_IMPLEMENTED)


class CategoriesView(APIView):
    # TODO TOKEEEEENENENENENNENNENNN
    permission_classes = ""
    authentication_classes = ""

    def get(self):
        categories = list(Category.objects.all())
        serialized_categories = [ProductSerializer(prod).data for prod in categories]
        return Response(serialized_categories,
                        status=status.HTTP_200_OK if serialized_categories else status.HTTP_204_NO_CONTENT)
