from django.contrib import admin
from transaction import models

# Register your models here.
admin.site.register(models.Transaction)
admin.site.register(models.Payment)
admin.site.register(models.BooksBought)
admin.site.register(models.ShippingInfo)