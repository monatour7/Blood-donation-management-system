from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models


class CustomUserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not email or not username:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, password=password, **extra_fields)
        user.save()
        return user

    def create_superuser(self, username, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(username, email, password, **extra_fields)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=20, unique=True, default='')
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    has_full_access = models.BooleanField(default=False)

    is_active = models.BooleanField(default=True, null=True)
    is_staff = models.BooleanField(default=False, null=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'

    groups = models.ManyToManyField(
        'auth.Group',
        verbose_name='groups',
        blank=True,
        related_name='customuser_set',
        related_query_name='user',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        verbose_name='user permissions',
        blank=True,
        related_name='customuser_set',
        related_query_name='user',
    )

    def __str__(self):
        return self.email


class Donor(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='donor')
    mobile_number = models.CharField(max_length=20, null=True, blank=True)
    national_id = models.CharField(max_length=20, null=True, blank=True)
    birthdate = models.DateField(null=True, blank=True)
    weight = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    gender_choices = [
        ('M', 'Male'),
        ('F', 'Female'),
    ]
    gender = models.CharField(max_length=1, choices=gender_choices, null=True, blank=True)
    is_smoker = models.BooleanField(default=False, null=True, blank=True)
    last_donation_months = models.IntegerField(null=True, blank=True)
    first_donation_months = models.IntegerField(null=True, blank=True)
    no_donations = models.IntegerField(null=True, blank=True)
    total_volume_donated = models.IntegerField(null=True, blank=True)
    city = models.CharField(max_length=100, null=True, blank=True)
    prediction = models.IntegerField(null=True, blank=True)
    blood_group_choices = [
        ('A+', 'A+'),
        ('A-', 'A-'),
        ('B+', 'B+'),
        ('B-', 'B-'),
        ('AB+', 'AB+'),
        ('AB-', 'AB-'),
        ('O+', 'O+'),
        ('O-', 'O-'),
    ]
    blood_group = models.CharField(max_length=3, choices=blood_group_choices)
    is_pending = models.BooleanField(default=True)
    is_getting_donated = models.BooleanField(default=False)
    rating = models.IntegerField(default=50)
    objects = models.Manager()

    def __str__(self):
        return f"{self.user.first_name}" + f"{self.user.last_name}"


class Hospital(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='hospital')
    address = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=20)
    email = models.EmailField(max_length=255)
    objects = models.Manager()

    def __str__(self):
        return f"{self.user.first_name}" + f"{self.user.last_name}"


class Donation(models.Model):
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE)
    donor = models.ForeignKey(Donor, on_delete=models.CASCADE)
    donation_date = models.DateField()
    will_donate = models.BooleanField(null=True, blank=True)

    objects = models.Manager()
