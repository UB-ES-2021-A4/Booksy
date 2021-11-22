from django.test import TestCase
from accounts.models import UserAccount
from rest_framework.test import APIClient

from product.models import Category, ProductModel
from transaction.models import Transaction, ShippingInfo, Payment, BooksBought
from datetime import datetime

class TransactionModelTest(TestCase):
    # TODO
    # De la manera que está hecha ahora la tabla si se quiere borrar una transaction de un user se borran todas.
    def setUp(self):
        self.user = UserAccount.objects.create(
            email='testerAdmin@test.es',
            username='TestAdminAddProduct',
            password='123fsfsfaha4213',
            first_name='Admin',
            last_name='User')
        self.user.save()

    def test_createTransaction(self):
        trans = Transaction.objects.create(buyer=self.user, datetime=datetime.now())
        trans.save()

    def test_createInvalidTransaction(self):
        try:
            trans = Transaction.objects.create(buyer='2',datetime=datetime.now())
            trans.save()
            self.assertEqual(True,False)
        except:
            pass

    def test_getTransaction(self):
        trans = Transaction.objects.create(buyer=self.user, datetime=datetime.now())
        trans.save()
        query = Transaction.objects.filter(buyer=self.user)
        self.assertEqual(len(query),1)

    def test_getMultipleTransaction(self):
        trans = Transaction.objects.create(buyer=self.user, datetime=datetime.now())
        trans.save()
        trans2 = Transaction.objects.create(buyer=self.user, datetime=datetime.now())
        trans2.save()
        query = Transaction.objects.filter(buyer=self.user)
        self.assertEqual(len(query), 2)

    def test_deleteTransaction(self):
        trans = Transaction.objects.create(buyer=self.user, datetime=datetime.now())
        trans.save()
        Transaction.objects.filter(buyer=self.user, datetime=datetime.now()).delete()
        try:
            Transaction.objects.filter(buyer=self.user)
            self.assertEqual(True, False)
        except:
            pass

    def test_deleteMultipleTransactions(self):
        trans = Transaction.objects.create(buyer=self.user, datetime=datetime.now())
        trans.save()
        trans2 = Transaction.objects.create(buyer=self.user, datetime=datetime.now())
        trans2.save()
        Transaction.objects.filter(buyer=self.user).delete()
        try:
            Transaction.objects.filter(buyer=self.user)
            self.assertEqual(True, False)
        except:
            pass

class ShippingModelTest(TestCase):
    # TODO
    # Habria que acotar el size de zip_code porque se puede forzar a que pete.
    def setUp(self):
        self.user = UserAccount.objects.create(
            email='testerAdmin@test.es',
            username='TestAdminAddProduct',
            password='123fsfsfaha4213',
            first_name='Admin',
            last_name='User')
        self.user.save()

    def test_createShipping(self):
        trans = Transaction.objects.create(buyer=self.user, datetime=datetime.now())
        trans.save()
        ship = ShippingInfo.objects.create(
            transaction=trans,
            name='Manolo',
            surnames='Lama y Garcia',
            direction='Calle de los Cabezos',
            city='Alguazas',
            country='Murcia del Sur',
            zip_code='08032'
        )
        ship.save()

    def test_createShipping_invalidZipCode(self):
        trans = Transaction.objects.create(buyer=self.user, datetime=datetime.now())
        trans.save()
        try:
            ship = ShippingInfo.objects.create(
                transaction=trans,
                name='Manolo',
                surnames='Lama y Garcia',
                direction='Calle de los Cabezos',
                city='Alguazas',
                country='Murcia del Sur',
                zip_code='10000000000000000000000000000000000000000000000000000000000'
            )
            ship.save()
            self.assertEquals(True, False)
        except:
            pass

    def test_createShipping_invalidTransaction(self):
        # Hay que tener cuidado con que se haga el save primero de la transaction.
        trans = Transaction.objects.create(buyer=self.user, datetime=datetime.now())
        try:
            ship = ShippingInfo.objects.create(
                transaction=trans,
                name='Manolo',
                surnames='Lama y Garcia',
                direction='Calle de los Cabezos',
                city='Alguazas',
                country='Murcia del Sur',
                zip_code='1'
            )
            ship.save()
            self.assertEquals(True, False)
        except:
            pass

    def test_deleteShipping_usingTransaction(self):
        trans = Transaction.objects.create(buyer=self.user, datetime=datetime.now())
        trans.save()
        try:
            ship = ShippingInfo.objects.create(
                transaction=trans,
                name='Manolo',
                surnames='Lama y Garcia',
                direction='Calle de los Cabezos',
                city='Alguazas',
                country='Murcia del Sur',
                zip_code='1'
            )
            ship.save()
            trans.delete()
            ShippingInfo.objects.filter(transaction=trans) #Deberia estar borrada.
            self.assertEquals(True, False)
        except:
            pass

    def test_deleteShipping_usingShipping(self):
        trans = Transaction.objects.create(buyer=self.user, datetime=datetime.now())
        trans.save()

        ship = ShippingInfo.objects.create(
            transaction=trans,
            name='Manolo',
            surnames='Lama y Garcia',
            direction='Calle de los Cabezos',
            city='Alguazas',
            country='Murcia del Sur',
            zip_code='1'
        )
        ship.save()
        ship.delete()
        trans = Transaction.objects.filter(buyer=self.user) #Deberia estar borrada?
        # raise Exception('No se deberia borrar la transac')

    def test_getShipping(self):
        trans = Transaction.objects.create(buyer=self.user, datetime=datetime.now())
        trans.save()

        ship = ShippingInfo.objects.create(
            transaction=trans,
            name='Manolo',
            surnames='Lama y Garcia',
            direction='Calle de los Cabezos',
            city='Alguazas',
            country='Murcia del Sur',
            zip_code='1'
        )
        ship.save()
        ShippingInfo.objects.get(transaction=trans)

    def test_getShipping(self):
        trans = Transaction.objects.create(buyer=self.user, datetime=datetime.now())
        trans.save()

        ship = ShippingInfo.objects.create(
            transaction=trans,
            name='Manolo',
            surnames='Lama y Garcia',
            direction='Calle de los Cabezos',
            city='Alguazas',
            country='Murcia del Sur',
            zip_code='1'
        )
        ship.save()
        self.assertEquals(ShippingInfo.objects.get(transaction=trans).__str__(),'Calle de los Cabezos')

class PaymentModelTest(TestCase):
    def setUp(self):
        self.user = UserAccount.objects.create(
            email='testerAdmin@test.es',
            username='TestAdminAddProduct',
            password='123fsfsfaha4213',
            first_name='Admin',
            last_name='User')
        self.user.save()
        self.trans = Transaction.objects.create(buyer=self.user, datetime=datetime.now())
        self.trans.save()

    def test_createPayment(self):
        pay = Payment.objects.create(
            transaction=self.trans,
            card_name='Mario Kard',
            card_num='1',
            expiration_card='Test',
            cvv='123'
        )
        pay.save()

    def test_createPayment_blankName(self):
        pay = Payment.objects.create(
            transaction=self.trans,
            card_name='',
            card_num='1',
            expiration_card='Test',
            cvv='123'
        )
        try:
            pay.save()
            check = False
        except:
            check = True
        self.assertTrue(check)

    def test_createPayment_blankNum(self):
        num = int()
        pay = Payment.objects.create(
            transaction=self.trans,
            card_name='Mario Kard',
            card_num=num,
            expiration_card='Test',
            cvv='123'
        )
        try:
            pay.save()
            check = False
        except:
            check = True
        self.assertTrue(check)

    def test_createPayment_blankExp(self):
        pay = Payment.objects.create(
            transaction=self.trans,
            card_name='Mario Kard',
            card_num='0',
            expiration_card='',
            cvv='123'
        )
        try:
            pay.save()
            check = False
        except:
            check = True
        self.assertTrue(check)

    def test_createPayment_blankNum(self):
        num = int()
        pay = Payment.objects.create(
            transaction=self.trans,
            card_name='Mario Kard',
            card_num='123',
            expiration_card='Test',
            cvv=num
        )
        try:
            pay.save()
            check = False
        except:
            check = True
        self.assertTrue(check)

    def test_getPayment(self):
        pay = Payment.objects.create(
            transaction=self.trans,
            card_name='Mario Kard',
            card_num='123',
            expiration_card='Test',
            cvv='123'
        )
        pay.save()
        Payment.objects.get(transaction=self.trans)

    def test_getPaymentNum(self):
        pay = Payment.objects.create(
            transaction=self.trans,
            card_name='Mario Kard',
            card_num='123',
            expiration_card='Test',
            cvv='123'
        )
        pay.save()
        self.assertEquals(Payment.objects.get(transaction=self.trans).__str__(),'123')

class TestEndpoint(TestCase):
    def setUp(self):
        self.user = UserAccount.objects.create(
            email='testerAdmin@test.es',
            username='TestAdminAddProduct',
            password='123fsfsfaha4213',
            first_name='Admin',
            last_name='User')
        self.user.save()
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        self.url = self.url = '/api/buy/'
        self.seller = UserAccount.objects.create(
            email='sellerAdmin@test.es',
            username='SellerAdminAddProduct',
            password='123fsfsfaha4213',
            first_name='AdminSeller',
            last_name='User')
        self.seller.save()

        self.category = Category.objects.create(category_name='JU')
        self.category.save()

        self.book = ProductModel.objects.create(title='Donde los árboles cantan',
                                                author='Laura Gallego',
                                                price=14.9,
                                                description='Viana, la única hija del duque de Rocagrís, está prometida al ',
                                                seller=self.seller,
                                                category_id=self.category.id)
        self.book.save()

        self.book2 = ProductModel.objects.create(title='Donde los árboles cantan 2',
                                                author='Laura Gallego Uwu',
                                                price=2,
                                                description='Viana, la única hija del duque de Rocagrís, está prometida al ',
                                                seller=self.seller,
                                                category_id=self.category.id)
        self.book2.save()

    def test_post_200(self):
        ids = [[1,2]] # Haciendolo así te devuelve [1,2]
        ids2 = [1,2] # Así te devuelve solo el 2
        ids3 = {1:1,2:2} #Te dice que asi no se puede enviar, porque es json

        ids4 = list() # Asi te devuelve el 2
        ids4.append(1)
        ids4.append(2)

        response = self.client.post(self.url,
                         data={
                            'id': ids4,
                            'datetime': datetime.now(), # Esto ya como veais donde gestionarlo
                            'name': self.user.first_name,
                            'surnames': self.user.last_name,
                             'direction': 'La casa',
                             'city': 'Alcantarilla',
                             'country': 'Murcia del Norte',
                             'zip_code': '08035',
                             'card_name': 'Jose Contreras',
                             'card_num': '08345',
                             'expiration_card': 'tarde',
                             'cvv': '342',
                         })

        self.assertEqual(response.status_code,200)