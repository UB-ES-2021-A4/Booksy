# Generated by Django 3.2.5 on 2021-10-12 08:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='book',
            old_name='BookID',
            new_name='ISBN',
        ),
    ]
