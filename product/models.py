import os
from uuid import uuid4

from django.db import models
from accounts.models import UserProfile


# Create your models here.

class Category(models.Model):
    class CategoryValues(models.TextChoices):
        HUMANIDADES = 'Humanidades'
        TECNICO_FORMACION = 'Técnico y formación'
        METODOS_IDIOMAS = 'Métodos de idiomas'
        LITERATURA = 'Literatura'
        COMIC_MANGA = 'Cómic y manga'
        JUVENIL = 'Juvenil'
        ARTES = 'Artes'
        FILOLOGIA = 'Filología'
        OCIO = 'Ocio'
        COCINA = 'Cocina'
        FANTASIA = 'Fantasía'
        MISTERIO_THRILLER = 'Misterio y thriller'

    category_name = models.CharField(max_length=20, choices=CategoryValues.choices, default=CategoryValues.COCINA)


class ProductModel(models.Model):
    title = models.CharField(max_length=255, null=False, blank=False)  # Blank does not allow empty in validation,
    # while null does
    author = models.CharField(max_length=50, null=False, blank=False)
    description = models.CharField(max_length=1000, null=False, blank=False)
    price = models.FloatField(default=0., blank=False)  # Minimum value has to be validated in form level
    seller = models.ForeignKey(UserProfile, on_delete=models.CASCADE, null=False)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.title


def path_and_rename(instance, filename):
    upload_to = 'images/'
    ext = filename.split('.')[-1]
    # get filename
    if instance.pk:
        filename = '{}.{}'.format(instance.pk, ext)
    else:
        # set filename as random string
        filename = '{}.{}'.format(uuid4().hex, ext)
    # return the whole path to the file
    return os.path.join(upload_to, filename)


# As it has a foreign key of product, we're stating that there can be more than one image
class Image(models.Model):
    image = models.ImageField(upload_to=path_and_rename, blank=True)
    # The minimum image has to be controlled in the form or in Frontend
    product = models.ForeignKey(ProductModel, default=None, on_delete=models.CASCADE)
