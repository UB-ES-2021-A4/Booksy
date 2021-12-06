from django.urls import path
from accounts import views

urlpatterns = [
    path('signup/', views.UserAccountSignUp.as_view(), name="signup_view"),
    path('login/', views.UserAccountLogin.as_view(), name="login_view"),
    path('profile/', views.UserProfileView.as_view(), name='profile_view'),
    path(r'^activate/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
         views.activate_user().as_view(), name='activate_view')
]
