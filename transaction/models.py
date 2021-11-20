from django.db import models
from accounts.models import UserProfile
from product.models import ProductModel


# Create your models here.

class Transactions(models.Model):
    seller_id = models.ForeignKey(UserProfile, null=False)  # On_Delete what to do
    buyer_id = models.ForeignKey(UserProfile, null=False)
    product_id = models.ForeignKey(ProductModel, null=False)

    def __str__(self):
        return 'The product with ID: ', self.product_id, ', was sold by ', self.seller_id, \
               ', and bought by: ', self.buyer_id


