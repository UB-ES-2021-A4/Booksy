from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets, filters
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings
from accounts import serializers, models, permissions
from django.views.generic.base import TemplateView

from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

class UserProfileViewSet(viewsets.ModelViewSet, TemplateView):  # Viewset has DEFAULT_RENDERER_CLASSES by default, no need to add it
    serializer_class = serializers.UserProfileSerializer
    queryset = models.UserProfile.objects.all()
    authentication_classes = (TokenAuthentication,)
    permissions_classes = (permissions.UpdateOwnProfile, IsAuthenticated)
    # filter_backends = (filters.SearchFilter,)  # How to do searches of data
    # search_fields = ('name', 'email',)  # Searching by name or email
    http_method_names = ['post']  # Here you can put the names of the requests that this viewSet is able to process
    template_name = 'index.html'

class UserLoginApiView(ObtainAuthToken):
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES

    def post(self, request, *args, **kwargs):
        print(request.data)
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)

        return Response({
            'token': token.key,
            'user_id': user.pk,
            'name': user.get_full_name(),
            'email': user.email
        })

def index(request):
    return render(request, 'index.html')