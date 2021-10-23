from django.test import TestCase
from rest_framework.exceptions import ValidationError

from product.models import ProductModelTest, Category, Image
from django.db import models, IntegrityError


# Create your tests here.

class ProductModelTest(TestCase):
    def setUp(self):
        book = ProductModelTest.objects.create(title='Donde los árboles cantan',
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
        self.description = 'Description is a Char Field'
        self.author = 'Billie Jean'
        self.tittle = 'Te pasas Nico, te pasas'
        self.price = 3
        self.char_256 = "Lorem ipsum dolor sit amet, nonummy ligula volutpat hac integer nonummy. Suspendisse ultricies, " \
                         "congue etiam tellus, erat libero, nulla eleifend, mauris pellentesque. Suspendisse integer praesent vel, " \
                         "integer gravida mauris, fringilla vehicula lacinia non y unos mas por si acaso"
        self.char_1001 = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. " \
                         "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, " \
                         "ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa " \
                         "quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis " \
                         "vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean " \
                         "vulputate eleifend tellus. " \
                         "Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, " \
                         "tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. " \
                         "Curabitur ullamcorper ultricies nisi. " \
                         "Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, " \
                         "sit amet adipiscing sem neque sed ipsum. Na y algo mas por si acaso"
        # TODO we have to look how to store images correctly, right now they're in local.

    def test_get_by_name(self):
        self.assertEqual(Category.JUVENIL, Category.get_by_name(self, 'Juvenil'))

    def test_no_title(self):
        try:
            book = ProductModelTest.objects.create(title=None, author='A', price=1.0, description='B')
            book.save()
            self.assertEqual(True, False)  # If the previous operation succeeds we fail the test
        except:
            pass

    def test_no_description(self):
        try:
            book = ProductModelTest.objects.create(title='A', author='B', price=1.0, description=None)
            book.save()
            self.assertEqual(True, False)  # If the previous operation succeeds we fail the test
        except:
            pass

    def test_no_author(self):
        try:
            book = ProductModelTest.objects.create(title='A', author=None, price=1.0, description='B')
            book.save()
            self.assertEqual(True, False)  # If the previous operation succeeds we fail the test
        except:
            pass

    def test_no_price(self):
        try:
            book = ProductModelTest.objects.create(title='A', author='B', price=None, description='C')
            book.save()
            self.assertEqual(True, False)  # If the previous operation succeeds we fail the test
        except:
            pass

    def test_max_tittle_length(self):
        try:
            book = ProductModelTest.objects.create(title=self.char_256, author=self.author, price=self.price, description=self.description)
            book.save()
            self.assertEqual(True, False) # If the previous operation succeeds we fail the test
        except:
            pass

    def test_max_author_length(self):
        try:
            book = ProductModelTest.objects.create(title=self.tittle, author=self.char_256, price=self.price,
                                                   description=self.description)
            book.save()
            self.assertEqual(True, False)  # If the previous operation succeeds we fail the test
        except:
            pass

    def test_max_description_length(self):
        try:
            book = ProductModelTest.objects.create(title=self.tittle, author=self.char_1001, price=self.price,
                                                   description=self.description)
            book.save()
            self.assertEqual(True, False)  # If the previous operation succeeds we fail the test
        except:
            pass

    def test_type_price(self):
        try:
            book = ProductModelTest.objects.create(title=self.tittle, author=self.char_1001, price="Esto no es un number",
                                                   description=self.description)
            book.save()
            self.assertEqual(True, False)
        except:
            pass
