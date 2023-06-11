# myproject/myapp/management/commands/update_age.py
from django.core.management.base import BaseCommand
from bloodbank.bank.models import Donor


class Command(BaseCommand):
    help = 'Updates the age of all donors'

    def handle(self, *args, **options):
        donors = Donor.objects.all()
        for donor in donors:
            donor.age = donor.calculate_age()
            donor.save()
        self.stdout.write(self.style.SUCCESS('Successfully updated the age of all donors.'))
