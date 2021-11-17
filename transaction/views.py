from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.views import APIView

from product.models import ProductModel
from product.serializers import ProductSerializer


class BuyView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    authentication_classes = (TokenAuthentication,)

    def post(self, request):
        try:
            product = ProductModel.objects.get(id=request.POST.get('id'))  # Front end should have the product id
            if product.seller == request.user:
                return Response(status=status.HTTP_401_UNAUTHORIZED)  # You can't buy your own product
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

        try:
            product.hidden = True
            product.save()
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
