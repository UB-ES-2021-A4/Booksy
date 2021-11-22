from django.shortcuts import render
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework.authtoken.models import Token
from accounts import serializers, models
from django.views.generic.base import TemplateView

from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly

from accounts.serializers import UserAccountSerializer

"""
class UserAccountViewSet(viewsets.ModelViewSet,
                         TemplateView):  # Viewset has DEFAULT_RENDERER_CLASSES by default, no need to add it
    serializer_class = serializers.UserAccountSerializer
    queryset = models.UserAccount.objects.all()
    permission_classes = (AllowAny,)
    http_method_names = ['post']  # Here you can put the names of the requests that this viewSet is able to process
    template_name = 'index.html'
"""


class UserAccountSignUp(APIView):
    serializer_class = UserAccountSerializer
    permission_classes = (AllowAny,)

    def post(self, request):
        try:
            account_serialized = UserAccountSerializer(data=request.data)
            if account_serialized.is_valid():
                account = account_serialized.save()
                account = models.UserAccount.objects.get(id=account.id)
                token, created = Token.objects.get_or_create(user=account)
                return Response({'token': token.key}, status=status.HTTP_201_CREATED)
            else:
                return Response(account_serialized.errors, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UserAccountLogin(ObtainAuthToken):
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES
    permission_classes = (AllowAny,)

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
