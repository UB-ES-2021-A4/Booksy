from django.urls import path, include

from rest_framework.routers import DefaultRouter

from product.views import api_product_view, api_product_update, api_product_post

router = DefaultRouter()
router.register('product', api_product_view, basename='product')

urlpatterns = [
    path('', api_product_view, name='product_view'),
    path('update/', api_product_update, name='update'),
    path('create/', api_product_post, name='post')
]