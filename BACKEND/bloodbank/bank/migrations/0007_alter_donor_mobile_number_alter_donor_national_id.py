# Generated by Django 4.1 on 2023-02-14 18:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bank', '0006_remove_donor_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='donor',
            name='mobile_number',
            field=models.IntegerField(max_length=15),
        ),
        migrations.AlterField(
            model_name='donor',
            name='national_id',
            field=models.IntegerField(max_length=20),
        ),
    ]
