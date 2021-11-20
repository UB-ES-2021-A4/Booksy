from django.urls import path
from accounts import views


urlpatterns = [
    path('signup/', views.UserAccountSignUp.as_view(), name="signup_view"),
    path('login/', views.UserAccountLogin.as_view(), name="login_view")
]
