# Generated by Django 4.1 on 2023-02-14 16:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bank', '0002_alter_donor_email_alter_donor_mobile_number_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='waitingroom',
            name='donor',
        ),
        migrations.RemoveField(
            model_name='waitingroom',
            name='hospital',
        ),
        migrations.DeleteModel(
            name='Donor',
        ),
        migrations.DeleteModel(
            name='Hospital',
        ),
        migrations.DeleteModel(
            name='WaitingRoom',
        ),
    ]