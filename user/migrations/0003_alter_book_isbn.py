# Generated by Django 3.2.5 on 2021-10-12 08:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0002_rename_bookid_book_isbn'),
    ]

    operations = [
        migrations.AlterField(
            model_name='book',
            name='ISBN',
            field=models.BigIntegerField(),
        ),
    ]
