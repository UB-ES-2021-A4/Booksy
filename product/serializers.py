from rest_framework import serializers
from product.models import ProductModel, Image, Category


class ProductSerializer(serializers.ModelSerializer):
    seller = serializers.SerializerMethodField('get_seller_from_username')

    class Meta:
        model = ProductModel
        fields = ['title', 'author', 'description', 'price', 'seller', ]

    def get_seller_from_username(self, product_model):
        # Coge el name de la tabla UserProfile a través del seller de ProductModel
        seller = product_model.seller.name
        return seller


class CategorySerializer(serializers.ModelSerializer):
    product = serializers.SerializerMethodField('get_product_from_title')

    class Meta:
        model = Category
        fields = ['category']

    def get_product_from_title(self, categoryModel):
        product = categoryModel.product.id
        return product


class ImageSerializer(serializers.ModelSerializer):
    product = serializers.SerializerMethodField('get_product_from_title')

    class Meta:
        model = Image
        fields = ['image']

    # Not sure if this code duplication is needed, but just in case...
    def get_product_from_title(self, categoryModel):
        product = categoryModel.product.id
        return product
