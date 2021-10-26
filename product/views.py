from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from product.models import ProductModel, Category, Image
from product.serializers import ProductSerializer, CategorySerializer, ImageSerializer


# Create your views here.


@api_view(['GET', ])
def api_product_view(request, prod_id):
    try:
        product = ProductModel.objects.get(id=prod_id)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "PUT":
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