from django.urls import path
from accounts import views


urlpatterns = [
    path('signup/', views.UserAccountSignUp.as_view()),
    path('login/', views.UserAccountLogin.as_view())
]
