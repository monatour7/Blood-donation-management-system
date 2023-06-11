from django.contrib import admin


from bloodbank.bank.models import Donor, CustomUser


admin.site.register(Donor)
admin.site.register(CustomUser)

