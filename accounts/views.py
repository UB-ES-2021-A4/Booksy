from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets, filters, generics
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings
from accounts import serializers, models, permissions
from django.views.generic.base import TemplateView

from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny

# TODO refactor name, this view is for signup.
# TODO Check if TemplateView does anything (Should check in heroku not in local)
class UserProfileViewSet(viewsets.ModelViewSet, TemplateView):  # Viewset has DEFAULT_RENDERER_CLASSES by default, no need to add it
    serializer_class = serializers.UserProfileSerializer
    queryset = models.UserProfile.objects.all()
    permission_classes = (AllowAny,)
    http_method_names = ['post']  # Here you can put the names of the requests that this viewSet is able to process
    template_name = 'index.html'


# Class view that returns a token if the user exists and the login credentials are correct.
class UserLoginApiView(ObtainAuthToken):
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES

    def post(self, request, *args, **kwargs):
        print(request.data)
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)

        #TODO do we really need all this data? token may be enough.
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'name': user.get_full_name(),
            'email': user.email
        })

'''
# Class view that returns the user attached to the given token
class UserApi(viewsets.ModelViewSet):
    permission_classes(IsAuthenticated)
    serializer_class = serializers.UserProfileSerializer
    queryset = models.UserProfile.objects.all()

    def get_object(self):
        return self.request.user


# Class view that removes the user's token, logging it out.
class UserApiLogout(viewsets.ModelViewSet):
    permission_classes(IsAuthenticated)
    queryset = models.UserProfile.objects.all()
    serializer_class = serializers.UserProfileSerializer

    def get(self, request, format=None):
        # simply delete the token to force a login
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)

'''
def index(request):
    return render(request, 'index.html')