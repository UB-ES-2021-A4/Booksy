from django.urls import path, include

from rest_framework.routers import DefaultRouter
from product.views import ProductView, CategoriesView

"""
router = DefaultRouter()
router.register('product', ProductView, basename='product')
"""

urlpatterns = [
    path('product/', ProductView.as_view(), name='product_view'),
    # path('product/update/', api_product_update, name='update'),
    # path('product/create/', , name='post')
    path('category/', CategoriesView.as_view(), name='category_view')
]
