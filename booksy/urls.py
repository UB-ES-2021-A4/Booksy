"""booksy URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
import accounts.views

urlpatterns = [
    path('', accounts.views.index, name='index'),
    path('signup/', accounts.views.index, name='index'),
    path('login/', accounts.views.index, name='index'),
    path('homePage/', accounts.views.index, name='index'),
    path('additem/', accounts.views.index, name='index'),
    re_path(r'^profile/(?P<id>\d+)/$', accounts.views.profile, name='profile'),
    re_path(r'^OpenItem/(?P<id>\d+)/$', accounts.views.profile, name='profile'),

    path('admin/', admin.site.urls),
    path('api/account/', include('accounts.urls')),
    path('api/product/', include('product.urls')),
    path('api/profile/', include('accounts.profile_urls')),

    path('api/', include('transaction.urls')),

] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) \
  + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
