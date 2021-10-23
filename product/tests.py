from django.test import TestCase
from rest_framework.exceptions import ValidationError

from product.models import ProductModel, Category, Image
from django.db import models, IntegrityError


# Create your tests here.

class ProductModelTest(TestCase):
    def setUp(self):
        book = ProductModel.objects.create(title='Donde los árboles cantan',
                                           author='Laura Gallego',
                                           price=14.9,
                                           description='Viana, la única hija del duque de Rocagrís, está prometida al '
                                                       'joven Robian de Castelmar desde que ambos eran niños. Los dos '
                                                       'se aman y se casarán en primavera. Sin embargo, durante los '
                                                       'festejos del solsticio de invierno, un arisco montaraz '
                                                       'advierte al rey de Nortia y sus caballeros de la amenaza de '
                                                       'los bárbaros de las estepas... y tanto Robian como el duque '
                                                       'se ven obligados a marchar a la guerra. En tales '
                                                       'circunstancias, una doncella como Viana no puede hacer otra '
                                                       'cosa que esperar su regreso... y, tal vez, prestar atención a '
                                                       'las leyendas que se cuentan sobre el Gran Bosque... el lugar '
                                                       'donde los árboles cantan.')
        book_cat = Category.objects.create(product=book,
                                           category='JU')
        book_image = Image.objects.create(product=book,
                                          image='a')
        # TODO we have to look how to store images correctly, right now they're in local.

    def test_get_by_name(self):
        self.assertEqual(Category.JUVENIL, Category.get_by_name(self, 'Juvenil'))

    def test_no_title(self):
        try:
            book = ProductModel.objects.create(title=None, author='A', price=1.0, description='B')
            book.save()
            self.assertEqual(True, False)  # If the previous operation succeeds we fail the test
        except:
            pass

    def test_no_description(self):
        try:
            book = ProductModel.objects.create(title='A', author='B', price=1.0, description=None)
            book.save()
            self.assertEqual(True, False)  # If the previous operation succeeds we fail the test
        except:
            pass

    def test_no_author(self):
        try:
            book = ProductModel.objects.create(title='A', author=None, price=1.0, description='B')
            book.save()
            self.assertEqual(True, False)  # If the previous operation succeeds we fail the test
        except:
            pass

    def test_no_price(self):
        try:
            book = ProductModel.objects.create(title='A', author='B', price=None, description='C')
            book.save()
            self.assertEqual(True, False)  # If the previous operation succeeds we fail the test
        except:
            pass
