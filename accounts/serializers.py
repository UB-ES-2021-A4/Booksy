from rest_framework import serializers
from accounts import models


class UserAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserAccount
        fields = ['id', 'email', 'username', 'password', 'first_name', 'last_name']
        extra_kwargs = {
            'password': {
                'write_only': True,
                'style': {'input_type': 'password'}
            }
        }

    def create(self, validated_data):
        user = models.UserAccount.objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        return user

    def update(self, instance, validated_data):
        if 'password' in validated_data:
            password = validated_data.pop('password')
            instance.set_password(password)

        return super().update(instance, validated_data)


class UserProfileSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = models.UserProfile
        fields = ['account_id', 'image']

    def update(self, instance, validated_data):
        instance.image = validated_data.get('image', instance.image)
        instance.save()
        return instance
