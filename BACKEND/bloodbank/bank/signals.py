# signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from datetime import date
from .models import Donor


@receiver(post_save, sender=Donor)
def update_donor_age(sender, instance, **kwargs):
    today = date.today()
    if (instance.date_of_birth.month, instance.date_of_birth.day) == (today.month, today.day):
        instance.age = instance.calculate_age()
        instance.save()
