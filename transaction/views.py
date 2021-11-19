from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db import transaction

from product.models import ProductModel
from product.serializers import ProductSerializer


class BuyView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    authentication_classes = (TokenAuthentication,)

    def post(self, request):
        try:
            with transaction.atomic():
                for id in request.POST.get('id'):
                    try:
                        product = ProductModel.objects.get(id=id)  # Front end should have the product id
                    except:
                        raise ResponseError(message=status.HTTP_404_NOT_FOUND)

                    if product.seller == request.user:
                        raise ResponseError(message=status.HTTP_403_FORBIDDEN) # You can't buy your own product
                    product.hidden = True
                    product.save()

        except ResponseError as e:
            return Response(status=e.message)
        except:
            return Response(status.HTTP_500_INTERNAL_SERVER_ERROR)


class ResponseError(Exception):

    def __init__(self, message):
        self.message = message
