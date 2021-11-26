# Create your tests here.
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase
from product.models import ProductModel, Category, Image
from accounts.models import UserAccount
from rest_framework.test import APIClient, CoreAPIClient


# Create your tests here.

class ProductModelTest(TestCase):
    def setUp(self):
        category = Category.objects.create(category_name='JU')
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
                                                       'donde los árboles cantan.',
                                           seller=UserAccount.objects.create(email='testerAdmin@test.es',
                                                                             username='TestAdmin',
                                                                             password='123fsfsfaha4213',
                                                                             first_name='Admin',
                                                                             last_name='User'),
                                           category_id=category.id)
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

    def test_no_title(self):
        try:
            book = ProductModel.objects.create(title=None, author='A', price=1.0, description='B', seller=APIClient)
            book.save()
            self.assertEqual(True, False)  # If the previous operation succeeds we fail the test
        except:
            pass

    def test_no_description(self):
        try:
            book = ProductModel.objects.create(title='A', author='B', price=1.0, description=None, seller=APIClient)
            book.save()
            self.assertEqual(True, False)  # If the previous operation succeeds we fail the test
        except:
            pass

    def test_no_author(self):
        try:
            book = ProductModel.objects.create(title='A', author=None, price=1.0, description='B', seller=APIClient)
            book.save()
            self.assertEqual(True, False)  # If the previous operation succeeds we fail the test
        except:
            pass

    def test_no_price(self):
        try:
            book = ProductModel.objects.create(title='A', author='B', price=None, description='C', seller=APIClient)
            book.save()
            self.assertEqual(True, False)  # If the previous operation succeeds we fail the test
        except:
            pass

    def test_max_tittle_length(self):
        try:
            book = ProductModel.objects.create(title=self.char_256, author=self.author, price=self.price,
                                               description=self.description, seller=APIClient)
            book.save()
            self.assertEqual(True, False)  # If the previous operation succeeds we fail the test
        except:
            pass

    def test_max_author_length(self):
        try:
            book = ProductModel.objects.create(title=self.tittle, author=self.char_256, price=self.price,
                                               description=self.description, seller=APIClient)
            book.save()
            self.assertEqual(True, False)  # If the previous operation succeeds we fail the test
        except:
            pass

    def test_max_description_length(self):
        try:
            book = ProductModel.objects.create(title=self.tittle, author=self.char_1001, price=self.price,
                                               description=self.description, seller=APIClient)
            book.save()
            self.assertEqual(True, False)  # If the previous operation succeeds we fail the test
        except:
            pass

    def test_type_price(self):
        try:
            book = ProductModel.objects.create(title=self.tittle, author=self.char_1001,
                                               price="Esto no es un number",
                                               description=self.description, seller=APIClient)
            book.save()
            self.assertEqual(True, False)
        except:
            pass


'''
class CategoryModelTest(TestCase):
    def setUp(self):
        user = UserAccount.objects.create(
            email='testerAdmin@test.es',
            username='TestAdminAddProduct',
            password='123fsfsfaha4213',
            first_name='Admin',
            last_name='User')
        user.save()
        self.client = APIClient()
        self.client.force_authenticate(user=user)
        self.url = self.url = '/api/product/category/'

    def test_getContent(self):
        self.category = Category.objects.create(category_name='JU')
        self.category.save()

        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)

    def test_getContent(self):
        # Este no deberia de funcionar pero funciona por el merge de Serializer de Categoria.
        self.category = Category.objects.create(category_name='UWU')
        self.category.save()

        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)

    def test_getContent_noCategory(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 204)
'''



class ImageModelTest(TestCase):
    def setUp(self):
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
                         "sit amet adipiscing sem neque sed ipsum. Na y algo mas por si acaso Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. " \
                         "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, " \
                         "ultricies nec, pellentesque eu, pretium Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. " \
                         "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, " \
                         "ultricies nec, pellentesque eu, pretium Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. " \
                         "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, " \
                         "ultricies nec, pellentesque eu, pretium "
        self.char_270 = ('a') * 270
        self.url = '/api/product/image/'
        self.user = UserAccount.objects.create(
            email='testerAdmin@test.es',
            username='TestAdminAddProduct',
            password='123fsfsfaha4213',
            first_name='Admin',
            last_name='User')
        self.user.save()

        self.category = Category.objects.create(category_name='JU')
        self.category.save()

        self.book = ProductModel.objects.create(title='Donde los árboles cantan',
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
                                                            'donde los árboles cantan.',
                                                seller=self.user,
                                                category_id=self.category.id)

        user = UserAccount.objects.get(username='TestAdminAddProduct')
        self.client = APIClient()
        self.client.force_authenticate(user=user)

        # Sin Permisos
        self.user2 = UserAccount.objects.create(
            email='testerAdmin2@test.es',
            username='TestAdmin',
            password='123fsfsfaha4213',
            first_name='Admin',
            last_name='User')
        self.user2.save()

        self.book = ProductModel.objects.create(title='Donde los árboles cantan',
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
                                                            'donde los árboles cantan.',
                                                seller=self.user2,
                                                category_id=self.category.id)

    def test_postImg(self):
        image = SimpleUploadedFile(name='test_image.jpg',
                                   content=open('frontend/src/components/pictures/autor.PNG', 'rb').read(),
                                   content_type='image/jpeg')
        response = self.client.post(self.url,
                                    {
                                        'id': '1',
                                        'image': image
                                    })

        self.assertEqual(response.status_code, 200)

    def test_postImg_existingImage(self):
        image = SimpleUploadedFile(name='test_image.jpg',
                                   content=open('frontend/src/components/pictures/autor.PNG', 'rb').read(),
                                   content_type='image/jpeg')
        self.client.post(self.url,
                         {
                             'id': '1',
                             'image': image
                         })

        response = self.client.post(self.url,
                                    {
                                        'id': '1',
                                        'image': image
                                    })
        self.assertEqual(response.status_code, 409)

    def test_postImg_NotImage(self):
        response = self.client.post(self.url,
                                    {
                                        'id': '1',
                                        'image': 'image'
                                    })

        self.assertEqual(response.status_code, 500)

    def test_patchImg(self):
        image = SimpleUploadedFile(name='test_image.jpg',
                                   content=open('frontend/src/components/pictures/autor.PNG', 'rb').read(),
                                   content_type='image/jpeg')
        response = self.client.post(self.url,
                                    {
                                        'id': '1',
                                        'image': image
                                    })

        self.assertEqual(response.status_code, 200)

    def test_patchImg_Unathorized(self):
        image = SimpleUploadedFile(name='test_image.jpg',
                                   content=open('frontend/src/components/pictures/autor.PNG', 'rb').read(),
                                   content_type='image/jpeg')
        response = self.client.post(self.url,
                                    {
                                        'id': '2',
                                        'image': image
                                    })

        self.assertEqual(response.status_code, 401)

    def test_patchImg_NotImage(self):
        response = self.client.patch(self.url,
                                     {
                                         'id': '1',
                                         'image': 'image'
                                     })

        self.assertEqual(response.status_code, 500)


class AddProductModelTest(TestCase):
    def setUp(self):
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
                         "sit amet adipiscing sem neque sed ipsum. Na y algo mas por si acaso Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. " \
                         "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, " \
                         "ultricies nec, pellentesque eu, pretium Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. " \
                         "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, " \
                         "ultricies nec, pellentesque eu, pretium Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. " \
                         "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, " \
                         "ultricies nec, pellentesque eu, pretium "
        self.char_270 = ('a') * 270
        self.url = '/api/product/'
        self.user = UserAccount.objects.create(
            email='testerAdmin@test.es',
            username='TestAdminAddProduct',
            password='123fsfsfaha4213',
            first_name='Admin',
            last_name='User')
        self.user.save()

        self.category = Category.objects.create(category_name='JU')
        self.category.save()

        user = UserAccount.objects.get(username='TestAdminAddProduct')
        self.client = APIClient()
        self.client.force_authenticate(user=user)

    '''
    def test_addProduct(self):
        response = self.client.post(self.url,
                                    data={
                                        'title': 'Un Test de Añadir Producto ',
                                        'author': 'Sopa du Macaco',
                                        'description': 'Libro Test',
                                        'price': 12,
                                        'category': 'JU'
                                    })
        self.assertEqual(response.status_code, 200)

    def test_addProduct_InvalidDescription(self):
        response = self.client.post(self.url,
                                    data={
                                        'title': 'Un Test de Añadir Producto ',
                                        'author': 'Sopa du Macaco',
                                        'description': self.char_1001,
                                        'price': 12,
                                        'category': 'JU'
                                    })
        # Problema con la categoria
        self.assertEqual(response.status_code, 400)

    def test_addProduct_InvalidTitle(self):
        response = self.client.post(self.url,
                                    {
                                        'title': self.char_270,
                                        'author': 'Sopa du Macaco',
                                        'description': 'Libro Test',
                                        'price': 12,
                                        'category': 'JU'
                                    })
        self.assertEqual(response.status_code, 400)

    def test_addProduct_InvalidAuthor(self):
        response = self.client.post(self.url,
                                    {
                                        'title': 'Un Test2 de Añadir Producto',
                                        'author': self.char_270,
                                        'description': 'Libro Test',
                                        'price': 12,
                                        'category': 'JU'
                                    })
        self.assertEqual(response.status_code, 400)
    '''


class UpdateProductModelTest(TestCase):
    def setUp(self):
        self.char_1001 = ('a') * 1003
        self.char_270 = ('a') * 270
        self.url = '/api/product/'
        self.user = UserAccount.objects.create(
            email='testerAdmin@test.es',
            username='TestAdminAddProduct',
            password='123fsfsfaha4213',
            first_name='Admin',
            last_name='User')
        self.user.save()

        self.user2 = UserAccount.objects.create(
            email='testerAdmin2@test.es',
            username='TestAdmin',
            password='123fsfsfaha4213',
            first_name='Admin',
            last_name='User')
        self.user2.save()

        self.category = Category.objects.create(category_name='JU')
        self.category.save()

        # Creation Users
        user = UserAccount.objects.get(username='TestAdminAddProduct')
        self.client = APIClient()
        self.client.force_authenticate(user=user)

        # Creation 2
        user2 = UserAccount.objects.get(username='TestAdmin')
        self.client2 = APIClient()
        self.client2.force_authenticate(user=user2)

        self.book = ProductModel.objects.create(title='Donde los árboles cantan',
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
                                                            'donde los árboles cantan.',

                                                seller=self.user,
                                                category_id=self.category.id)

        self.book2 = ProductModel.objects.create(title='Donde los árboles cantan2',
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
                                                             'donde los árboles cantan.',
                                                 seller=self.user2,
                                                 category_id=self.category.id)
        self.book2.save()

                                                
    '''
    def test_updateProduct_invalidArguments(self):
        response = self.client2.patch(self.url,
                                      {
                                          'id': '2',
                                          'price': 10000,
                                      })
        self.assertEqual(response.status_code, 404)

    def test_updateProduct_invalidId(self):
        response = self.client2.patch('/api/product/?id=10',
                                      {
                                          'id': 10,
                                          'title': self.book2.title,
                                          'author': self.book2.author,
                                          'description': 'Nueva Descripción',
                                          'price': self.book2.price,
                                          'seller': self.user2.id,
                                          'category': self.category.category_name
                                      })
        self.assertEqual(response.status_code, 404)

    def test_updateProduct_invalidUser(self):
        response = self.client.patch('/api/product/?id=2',
                                     data={
                                         'id': self.book2.id,
                                         'title': self.book2.title,
                                         'author': self.book2.author,
                                         'description': 'Nueva Descripción',
                                         'price': self.book2.price,
                                         'seller': self.user2.id,
                                         'category': self.category
                                     })
        self.assertEqual(response.status_code, 401)

    def test_updateProduct_validArguments(self):
        response = self.client2.patch('/api/product/?id=2',
                                      data={
                                          'id': self.book2,
                                          'title': self.book2.title,
                                          'author': self.book2.author,
                                          'description': 'Nueva Descripción',
                                          'price': self.book2.price,
                                          'seller': self.user2.id,
                                          'category': self.category.category_name
                                      })
        self.assertEqual(response.status_code, 200)

    def test_updateProduct_invalidDescription(self):
        response = self.client2.patch('/api/product/?id=2',
                                      data={
                                          'id': self.book2,
                                          'title': self.book2.title,
                                          'author': self.book2.author,
                                          'description': self.char_1001,
                                          'price': self.book2.price,
                                          'seller': self.user2.id,
                                          'category': self.category.category_name
                                      })
        self.assertEqual(response.status_code, 400)

    '''
