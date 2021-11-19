from rest_framework import serializers
from product.models import ProductModel, Image, Category


class CategorySerializer(serializers.Serializer):
    category_description = serializers.CharField(source='get_category_name_display')
    category_name = serializers.CharField()

    class Meta:
        model = Category
        fields = ['category_name', 'category_description']


class ProductSerializer(serializers.ModelSerializer):
    title = serializers.CharField(max_length=255, allow_blank=True)
    author = serializers.CharField(max_length=50, allow_blank=True)
    description = serializers.CharField(max_length=1000, allow_blank=True)
    price = serializers.FloatField(default=0., min_value=0.)
    category = CategorySerializer()

    class Meta:
        model = ProductModel
        fields = ['id', 'title', 'author', 'description', 'price', 'seller', 'category']

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.author = validated_data.get('author', instance.author)
        instance.description = validated_data.get('description', instance.description)
        instance.price = validated_data.get('price', instance.price)
        instance.seller = validated_data.get('seller', instance.seller)
        instance.category = Category.objects.get(category_name=validated_data.get('category')['category_name'])
        instance.save()
        return instance

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['id', 'product', 'image']

    def update(self, instance, validated_data):
        instance.image = validated_data.get('image', instance.image)
        instance.product = validated_data.get('product', instance.product)
        instance.save()
        return instance
