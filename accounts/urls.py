from django.urls import path, include

from rest_framework.routers import DefaultRouter

from accounts import views

router = DefaultRouter()
router.register('account', views.UserProfileViewSet)

urlpatterns = [
    path('', include(router.urls))
]