from django.db import models


# Create your models here.
class Book(models.Model):
    ## TEST
    BookName = models.CharField(max_length=100)
    BookDesc = models.CharField(max_length=1000)
    ISBN = models.BigIntegerField()