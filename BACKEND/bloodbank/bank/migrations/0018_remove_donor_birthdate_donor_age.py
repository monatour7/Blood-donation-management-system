# Generated by Django 4.1 on 2023-03-15 07:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bank', '0017_remove_donor_age_donor_birthdate'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='donor',
            name='birthdate',
        ),
        migrations.AddField(
            model_name='donor',
            name='age',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
    ]
