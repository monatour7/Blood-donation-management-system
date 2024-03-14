from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from bloodbank.bank import views
from bloodbank.bank.views import DonorViewSet, HospitalViewSet, DonationViewSet, CustomUserViewSet, DonorLoginViewSet, \
    DonorSignUpViewSet, HospitalLoginViewSet, HospitalSignUpViewSet

router = DefaultRouter()
router.register(r'donors', DonorViewSet)
router.register(r'hospitals', HospitalViewSet)
router.register(r'donations', DonationViewSet)
router.register(r'user', CustomUserViewSet)

router.register(r'donor/login', DonorLoginViewSet, basename='donor-login')
router.register(r'donor/signup', DonorSignUpViewSet, basename='donor-signup')

router.register(r'hospital/login', HospitalLoginViewSet, basename='hospital-login')
router.register(r'hospital/signup', HospitalSignUpViewSet, basename='hospital-signup')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),

    path('donors/find/', views.find_donors, name='find_donors'),
]
