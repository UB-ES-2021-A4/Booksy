import os

from django.db.models import Q
from django.shortcuts import render
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings
from booksy import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from accounts import models

from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly

from accounts.serializers import UserAccountSerializer, UserProfileSerializer


def index(request):
    return render(request, 'index.html')


class UserAccountSignUp(APIView):
    serializer_class = UserAccountSerializer
    permission_classes = (AllowAny,)

    def post(self, request):
        try:
            account_serialized = UserAccountSerializer(data=request.data)
            if account_serialized.is_valid():
                account = account_serialized.save()
                account = models.UserAccount.objects.get(id=account.id)

                # Create userProfile from account
                data = {'account_id': account.id}
                profile = UserProfileSerializer(data=data)
                profile.is_valid()
                profi = profile.save()

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
        username = request.data['username']
        try:
            user = models.UserAccount.objects.get(
                Q(username__iexact=username) | Q(email__iexact=username)
            )
        except:
            return Response('Username or mail was not found', status=status.HTTP_404_NOT_FOUND)
        if user.check_password(request.data['password']):
            token, created = Token.objects.get_or_create(user=user)

            return Response({
                'token': token.key,
                'user_id': user.pk,
                'name': user.get_full_name(),
                'email': user.email
            })
        return Response("Password is incorrect", status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        try:
            user_id = request.GET.get('id')
            if not user_id:  # If no user ID is given cannot give data about user
                return Response("id is required to make a query", status=status.HTTP_400_BAD_REQUEST)

            user_account_object = models.UserAccount.objects.get(id=user_id)
            try:
                user_profile_object = models.UserProfile.objects.get(account_id=user_id)
            except:
                return Response("User has no profile", status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            ser_user_account_object = UserAccountSerializer(user_account_object).data
            ser_user_profile_object = UserProfileSerializer(user_profile_object).data

            return Response({'user_id': ser_user_account_object['id'],
                             'first_name': ser_user_account_object['first_name'],
                             'last_name': ser_user_account_object['last_name'],
                             'username': ser_user_account_object['username'],
                             'email': ser_user_account_object['email'],
                             'image': ser_user_profile_object['image']}, status=status.HTTP_200_OK
            if user_account_object and user_profile_object else status.HTTP_404_NOT_FOUND)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UserProfileView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    authentication_classes = (TokenAuthentication,)

    def get(self, request):
        """
        Should return only one user profile at a time
        """
        try:
            account_id = request.GET.get('id')

            if account_id:
                try:
                    account = models.UserAccount.objects.get(id=account_id)
                except:
                    return Response("Account not found", status=status.HTTP_404_NOT_FOUND)
                try:
                    profile = models.UserProfile.objects.get(id=account_id)
                except:
                    return Response("Profile not found", status=status.HTTP_404_NOT_FOUND)

                try:
                    account_ser = UserAccountSerializer(account).data
                    profile_ser = UserProfileSerializer(profile).data
                    data = account_ser.update(profile_ser)
                except:
                    return Response(f"Error serializing user ${account_id} data",
                                    status=status.HTTP_500_INTERNAL_SERVER_ERROR)

                return Response(data, status=status.HTTP_200_OK)


            else:
                return Response("No id has been provided", status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def patch(self, request):
        account_id = request.GET.get('id')
        if not account_id:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        try:
            user = request.user
            profi = models.UserProfile.objects.get(id=account_id)
            if not profi:
                return Response(status=status.HTTP_404_NOT_FOUND)
            if profi != user:
                return Response(status=status.HTTP_401_UNAUTHORIZED)
            orig_img_path = profi.image.file.name
            serial_profi = UserProfileSerializer(profi, data=request.data)
            if serial_profi.is_valid():
                serial_profi.save()
                # Check if the image path is NOT the one of the original path
                if os.path.normpath("media/default.jpg") not in orig_img_path:
                    os.remove(orig_img_path)
                return Response(serial_profi.data, status=status.HTTP_200_OK)
            else:
                return Response(serial_profi.errors, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
