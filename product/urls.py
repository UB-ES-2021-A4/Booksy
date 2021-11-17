from django.urls import path, include

from rest_framework.routers import DefaultRouter
from product.views import ProductView, CategoriesView, ImageView

"""
router = DefaultRouter()
router.register('product', ProductView, basename='product')
"""

urlpatterns = [
    path('product/', ProductView.as_view(), name='product_view'),
    path('category/', CategoriesView.as_view(), name='category_view'),
    path('image/', ImageView.as_view(), name='image_view')
]
