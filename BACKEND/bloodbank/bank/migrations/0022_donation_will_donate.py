# Generated by Django 4.1 on 2023-05-21 18:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bank', '0021_remove_hospital_hospital_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='donation',
            name='will_donate',
            field=models.BooleanField(default=True),
        ),
    ]