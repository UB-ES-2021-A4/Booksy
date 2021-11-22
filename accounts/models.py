import os
from uuid import uuid4

from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.models import BaseUserManager


# Create your models here.

class AccountManager(BaseUserManager):

    def create_user(self, email, username, password=None, first_name="John", last_name="Doe"):
        if not email:
            raise ValueError("User has not email")

        email = self.normalize_email(email)
        user = self.model(email=email, username=username, first_name=first_name, last_name=last_name)

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, username, password, first_name="John", last_name="Doe"):
        user = self.create_user(email, username, password, first_name, last_name)

        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    username = models.CharField(max_length=15, unique=True)

    first_name = models.CharField(max_length=50, default="John")
    last_name = models.CharField(max_length=50, default="Doe")

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=True)

    objects = AccountManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'first_name', "last_name"]

    def get_full_name(self):
        return self.first_name + " " + self.last_name

    def get_short_name(self):
        return self.username

    def __str__(self):
        return self.first_name + " " + self.last_name

# Code is duplicated, but it's easier to manage this way right now
def path_and_rename(instance, filename):
    upload_to = 'account/images/'
    ext = filename.split('.')[-1]
    # get filename
    if instance.pk:
        filename = '{}.{}'.format(instance.pk, ext)
    else:
        # set filename as random string
        filename = '{}.{}'.format(uuid4().hex, ext)
    # return the whole path to the file
    return os.path.join(upload_to, filename)


class UserProfile(models.Model):
    account_id = models.OneToOneField(UserAccount, primary_key=True, on_delete=models.CASCADE)
    image = models.ImageField(upload_to=path_and_rename, blank=True, null=True, default="default.jpg")
