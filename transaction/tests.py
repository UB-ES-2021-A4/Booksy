from django.test import TestCase
from accounts.models import UserAccount
from rest_framework.test import APIClient
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