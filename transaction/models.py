from django.db import models
from accounts.models import UserAccount
from product.models import ProductModel


# Create your models here.

class Transaction(models.Model):
    buyer = models.ForeignKey(UserAccount, on_delete=models.CASCADE, null=False, related_name='buyer_id')

    def __str__(self):
        return str(self.id)


class ShippingInfo(models.Model):
    transaction = models.ForeignKey(Transaction, on_delete=models.CASCADE, default=None)

    name = models.CharField(max_length=255, null=False, blank=False)
    surnames = models.CharField(max_length=255, null=False, blank=False)
    direction = models.CharField(max_length=255, null=False, blank=False)
    city = models.CharField(max_length=255, null=False, blank=False)
    country = models.CharField(max_length=255, null=False, blank=False)
    zip_code = models.IntegerField(null=False, blank=False)

    def __str__(self):
        return self.direction  # Maybe we want to change this


class Payment(models.Model):
    transaction = models.ForeignKey(Transaction, on_delete=models.CASCADE, default=None)

    card_name = models.CharField(max_length=255, null=False)
    card_num = models.IntegerField(null=False)
    expiration_card = models.CharField(max_length=5, null=False)
    cvv = models.IntegerField(null=False)

    def __str__(self):
        return str(self.card_num)  # Maybe we want to change this


class BooksBought(models.Model):
    transaction = models.ForeignKey(Transaction, on_delete=models.CASCADE, default=None)
    product = models.ForeignKey(ProductModel, on_delete=models.CASCADE, null=False)
    seller = models.ForeignKey(UserAccount, on_delete=models.CASCADE, null=False, related_name='seller_id')  # On_Delete what to do

