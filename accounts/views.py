from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets, filters
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings

from accounts import serializers, models, permissions


class UserProfileViewSet(viewsets.ModelViewSet):  # Viewset has DEFAULT_RENDERER_CLASSES by default, no need to add it
    serializer_class = serializers.UserProfileSerializer
    queryset = models.UserProfile.objects.all()
    authentication_classes = (TokenAuthentication,)
    permissions_classes = (permissions.UpdateOwnProfile,)
    # filter_backends = (filters.SearchFilter,)  # How to do searches of data
    # search_fields = ('name', 'email',)  # Searching by name or email
    http_method_names = ['post']  # Here you can put the names of the requests that this viewSet is able to process


class UserLoginApiView(ObtainAuthToken):
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES


def index(request):
    return render(request, 'index.html')
