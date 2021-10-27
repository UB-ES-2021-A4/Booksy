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
            category = request.GET.get('category')
            if category:
                category = Category.objects.get(category_name=category)
                print(category)
                products = list(ProductModel.objects.filter(category=category))
                serialized_products = [ProductSerializer(prod).data for prod in products]
                return Response(serialized_products,
                                status=status.HTTP_200_OK if serialized_products else status.HTTP_204_NO_CONTENT)

            seller_id = request.GET.get('id')
            if seller_id:
                products = list(ProductModel.objects.filter(id=seller_id))
                serialized_products = [ProductSerializer(prod).data for prod in products]
                return Response(serialized_products,
                                status=status.HTTP_200_OK if serialized_products else status.HTTP_404_NOT_FOUND)

            product_list = list(ProductModel.objects.all())
            serialized_products = [ProductSerializer(prod).data for prod in product_list]
            return Response(serialized_products,
                            status=status.HTTP_200_OK if serialized_products else status.HTTP_204_NO_CONTENT)
        except:
            return Response(status=status.HTTP_418_IM_A_TEAPOT)

    def post(self, request):

        seller = UserProfile.objects.get(id=request.POST.get('seller'))
        category = Category.objects.get(category_name=request.POST.get('category'))
        ProductModel.objects.create(title=request.POST.get('title'), author=request.POST.get('author'),
                                    description=request.POST.get('description'), price=request.POST.get('price'),
                                    seller=seller, category=category)

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

"""
@api_view(['GET', ])
def api_product_view(request, prod_id):
    try:
        product = ProductModel.objects.get(id=prod_id)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = ProductSerializer(product)
        return Response(serializer.data)
    return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['PUT', ])
def api_product_update(request, prod_id):
    try:
        product = ProductModel.objects.get(id=prod_id)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "PUT":
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_202_ACCEPTED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST', ])
def api_product_post(request):
    # TODO use authenticated token
    account = UserProfile.objects.get(name="admin")
    product = ProductModel(seller=account)

    if request.method == "POST":
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        """
