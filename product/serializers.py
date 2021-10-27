from rest_framework import serializers
from product.models import ProductModel, Image, Category


class ProductSerializer(serializers.ModelSerializer):
    title = serializers.CharField(max_length=255, allow_blank=True)
    author = serializers.CharField(max_length=50, allow_blank=True)
    description = serializers.CharField(max_length=1000, allow_blank=True)
    price = serializers.FloatField(default=0.)
    category = serializers.CharField(source="category.category_name")

    class Meta:
        model = ProductModel
        fields = ['id', 'title', 'author', 'description', 'price', 'seller', 'category']

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.author = validated_data.get('author', instance.author)
        instance.description = validated_data.get('description', instance.description)
        instance.price = validated_data.get('price', instance.price)
        instance.seller = validated_data.get('seller', instance.seller)
        instance.category = validated_data.get('category', instance.category)
        instance.save()
        return instance


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['category_name']


class ImageSerializer(serializers.ModelSerializer):
    product = serializers.SerializerMethodField('get_product_from_title')

    class Meta:
        model = Image
        fields = ['image']

    def get_product_from_id(self, categoryModel):
        product = categoryModel.product.id
        return product
