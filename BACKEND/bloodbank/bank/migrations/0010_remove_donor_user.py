# Generated by Django 4.1 on 2023-02-20 16:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bank', '0009_donor_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='donor',
            name='user',
        ),
    ]
