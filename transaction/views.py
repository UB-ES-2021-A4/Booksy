from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db import transaction as tsn
from django.template.loader import get_template
from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from rest_framework.parsers import MultiPartParser, FormParser
from datetime import datetime

from product.models import ProductModel
from transaction.models import Transaction, ShippingInfo, Payment, BooksBought
from transaction.serializers import TransactionSerializer, ShippingInfoSerializer, PaymentSerializer, \
    BooksBoughtSerializer


class BuyView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    authentication_classes = (TokenAuthentication,)
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        try:
            with tsn.atomic():

                print(request.data)

                for id in request.data.getlist('id'):
                    id = int(id)

                    try:
                        print('Try Before')
                        product = ProductModel.objects.get(id=id)  # Front end should have the product id
                        print('Try Before')
                        if product.hidden:
                            raise  # Product is already bought

                    except:
                        raise ResponseError(message=status.HTTP_404_NOT_FOUND)

                    if product.seller == request.user:
                        raise ResponseError(message=status.HTTP_403_FORBIDDEN)  # You can't buy your own product

                    print(' Product not Hiden')

                    transaction_info = {'buyer': request.user.id, 'datetime': datetime.now()}
                    transaction = self.__check_model_validation(transaction_info, TransactionSerializer)
                    transaction = transaction.save()

                    print('Transaction saved')

                    books_info = {'transaction': transaction.id, 'product': product.id, 'seller': product.seller.id}
                    booksBought = self.__check_model_validation(books_info, BooksBoughtSerializer)

                    serializers = self.__info_and_validate((ShippingInfo, ShippingInfoSerializer),
                                                           (Payment, PaymentSerializer),
                                                           request=request, transaction_id=transaction.id)

                    product.hidden = True  # Product is bought

                    print('Hiden True')

                    # Saving to db
                    for s in serializers:
                        s.save()
                    booksBought.save()
                    product.save()

                    print('Product saved')

                    self.send_email_seller(product.seller.email,
                                           product.seller.get_full_name(),
                                           request.user.get_full_name(),
                                           product.title,
                                           serializers[0].data['direction'],
                                           serializers[0].data['city'],
                                           serializers[0].data['country'],
                                           serializers[0].data['zip_code']
                                           )
                    print('Email seller')
                    self.send_email_buyer(request.user.email,
                                          request.user.get_full_name(),
                                          product.title
                                          )
                    print('Email buyer')

        except ResponseError as e:
            return Response(status=e.message)

        except ValueError:
            return Response(status=status.HTTP_400_BAD_REQUEST) # Id is not an integer

        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(status=status.HTTP_200_OK)

    def __get_model_info(self, request, model):
        '''
        Select the attributes from the request that model needs.
        '''
        model_attributes = [field.name for field in model._meta.get_fields()]
        model_info = dict()
        for attr in model_attributes:
            model_info[attr] = request.data.get(attr)
        return model_info

    def __check_model_validation(self, data, serializer_class):
        '''
        Check if the serializer is valid for the data given
        '''
        serializer = serializer_class(data=data)
        if not serializer.is_valid():
            raise ResponseError(message=status.HTTP_400_BAD_REQUEST)
        return serializer

    def __info_and_validate(self, *args, request, transaction_id):
        '''
        This method select the attributes from the request that model needs, checks and fills the transaction
        and checks the data with the corresponding serializer
        '''
        serializers = []
        for model, serializer in args:

            model_info = self.__get_model_info(request, model)
            if model_info.get('transaction') is None:
                model_info['transaction'] = transaction_id

            s = self.__check_model_validation(data=model_info, serializer_class=serializer)
            serializers.append(s)

        return serializers

    def send_email_seller(self, mail, seller, buyer, prod_title, address, city, country, zip_code):
        context = {'user': seller, 'buyer': buyer, 'product_title': prod_title,
                   'address': address, 'city':city, 'country':country, 'zip_code':zip_code}
        template = get_template('seller_mail.html')
        content = template.render(context)

        email = EmailMultiAlternatives(
            'Product Sold!',
            'Booksy',
            settings.EMAIL_HOST_USER,
            [mail]
        )
        email.attach_alternative(content, 'text/html')
        # email.send()

    def send_email_buyer(self, mail, buyer, prod_title):
        context = {'user':buyer, 'product_title': prod_title}
        template = get_template('buyer_mail.html')
        content = template.render(context)

        email = EmailMultiAlternatives(
            'Product Bought!',
            'Booksy',
            settings.EMAIL_HOST_USER,
            [mail]
        )
        email.attach_alternative(content, 'text/html')
        # email.send()


class ResponseError(Exception):

    def __init__(self, message):
        self.message = message