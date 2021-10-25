from django.db import models
from accounts.models import UserProfile


# Create your models here.


class ProductModel(models.Model):
    title = models.CharField(max_length=255, null=False, blank=False)  # Blank does not allow empty in validation,
    # while null does
    author = models.CharField(max_length=50, null=False, blank=False)
    description = models.CharField(max_length=1000, null=False, blank=False)
    price = models.FloatField(default=0., blank=False)  # Minimum value has to be validated in form level
    seller = models.ForeignKey(UserProfile, on_delete=models.CASCADE, null=False)


# As it has a foreign key of product, we're stating that there can be more than one image
class Image(models.Model):
    image = models.ImageField(upload_to='images/')  # The minimum image has to be controlled in the form or in Frontend
    product = models.ForeignKey(ProductModel, on_delete=models.CASCADE)


def get_category_by_name(name):
    for category in Category.CATEGORY_CHOICES:
        if category[1] == name:
            return category[0]


class Category(models.Model):
    HUMANIDADES = 'HM'
    TECNICO_FORMACION = 'TF'
    METODOS_IDIOMAS = 'MI'
    LITERATURA = 'LI'
    COMIC_MANGA = 'CM'
    JUVENIL = 'JU'
    ARTES = 'AR'
    FILOLOGIA = 'FI'
    OCIO = 'OC'
    COCINA = 'CO'
    CATEGORY_CHOICES = [
        (HUMANIDADES, 'Humanidades'),
        (TECNICO_FORMACION, 'Técnico y formación'),
        (METODOS_IDIOMAS, 'Métodos de idiomas'),
        (LITERATURA, 'Literatura'),
        (COMIC_MANGA, 'Cómic y manga'),
        (JUVENIL, 'Juvenil'),
        (ARTES, 'Artes'),
        (FILOLOGIA, ' Filología'),
        (OCIO, 'Ocio'),
        (COCINA, 'Cocina')
    ]
    category = models.CharField(max_length=2, choices=CATEGORY_CHOICES, default=COCINA)  # Max_length = 2 porque es
    # lo que ocupará cada categoría
    product = models.ForeignKey(ProductModel, on_delete=models.CASCADE)
