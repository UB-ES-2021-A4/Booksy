from django.contrib import admin
from product import models
# Register your models here.
admin.site.register(models.ProductModel)
admin.site.register(models.Image)
admin.site.register(models.Category)  # TODO Evaluate if we need Category on admin view
