# Generated by Django 4.1 on 2023-05-25 11:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bank', '0027_rename_firstname_customuser_first_name_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='donor',
            name='prediction',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
