from rest_framework import serializers
from transaction.models import Transaction, ShippingInfo, Payment, BooksBought


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['buyer']


class ShippingInfoSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=255, allow_null=False, allow_blank=False)
    surnames = serializers.CharField(max_length=255, allow_null=False, allow_blank=False)
    direction = serializers.CharField(max_length=255, allow_null=False, allow_blank=False)
    city = serializers.CharField(max_length=255, allow_null=False, allow_blank=False)
    country = serializers.CharField(max_length=255, allow_null=False, allow_blank=False)
    zip_code = serializers.IntegerField(allow_null=False)

    class Meta:
        model = ShippingInfo
        fields = ['transaction', 'name', 'surnames', 'direction', 'city', 'country', 'zip_code']


class PaymentSerializer(serializers.ModelSerializer):
    card_name = serializers.CharField(max_length=255, allow_null=False, allow_blank=False)
    card_num = serializers.IntegerField(allow_null=False)
    expiration_card = serializers.CharField(max_length=5, allow_null=False, allow_blank=False)
    cvv = serializers.IntegerField(allow_null=False)

    class Meta:
        model = Payment
        fields = ['transaction', 'card_name', 'card_num', 'expiration_card', 'cvv']


class BooksBoughtSerializer(serializers.ModelSerializer):
    class Meta:
        model = BooksBought
        fields = ['transaction', 'product', 'seller']
