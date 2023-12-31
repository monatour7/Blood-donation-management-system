# Generated by Django 4.1 on 2023-05-05 11:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bank', '0019_donor_birthdate'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='donor',
            name='last_donation_months',
        ),
        migrations.AddField(
            model_name='donor',
            name='first_donation_months',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='donor',
            name='last_donation_months',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='donor',
            name='no_donations',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='donor',
            name='total_volume_donated',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
