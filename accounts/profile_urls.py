from django.urls import path
from accounts import views


urlpatterns = [
    path('', views.UserProfileView.as_view(), name="user_profile_view"),
]
