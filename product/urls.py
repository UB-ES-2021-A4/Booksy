from django.urls import path

from product.views import ProductView, CategoriesView, ImageView


urlpatterns = [
    path('', ProductView.as_view(), name='product_view'),
    path('category/', CategoriesView.as_view(), name='category_view'),
    path('image/', ImageView.as_view(), name='image_view')
]
