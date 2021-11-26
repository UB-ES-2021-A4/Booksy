import os
from uuid import uuid4

from django.db import models
from django.utils.translation import gettext_lazy as _
from accounts.models import UserAccount


# Create your models here.

class Category(models.Model):
    class CategoryValues(models.TextChoices):
        HUMANIDADES = 'HM', _('Humanidades')
        TECNICO_FORMACION = 'TF', _('Técnico y formación')
        METODOS_IDIOMAS = 'MI', _('Métodos de idiomas')
        LITERATURA = 'LI', _('Literatura')
        COMIC_MANGA = 'CM', _('Cómic y manga')
        JUVENIL = 'JU', _('Juvenil')
        ARTES = 'AR', _('Artes')
        FILOLOGIA = 'FI', _(' Filología')
        OCIO = 'OC', _('Ocio')
        COCINA = 'CO', _('Cocina')
        FANTASIA = 'FA', _('Fantasía')
        MISTERIO_THRILLER = 'MT', _('Misterio y thriller')

    category_name = models.CharField(max_length=2, choices=CategoryValues.choices, default=CategoryValues.COCINA)

    # Max_length = 2 porque es lo que ocupará cada categoría

    def __str__(self):
        return self.get_category_name_display()


class ProductModel(models.Model):
    title = models.CharField(max_length=255, null=False, blank=False)  # Blank does not allow empty in validation,
    # while null does
    author = models.CharField(max_length=50, null=False, blank=False)
    description = models.CharField(max_length=1000, null=False, blank=False)
    price = models.FloatField(default=0., blank=False)  # Minimum value has to be validated in form level
    seller = models.ForeignKey(UserAccount, on_delete=models.CASCADE, null=False)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    hidden = models.BooleanField(default=False)

    def __str__(self):
        return self.title


def path_and_rename(instance, filename):
    upload_to = 'product/images/'
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
