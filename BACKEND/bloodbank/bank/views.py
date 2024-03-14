from django.contrib.auth import authenticate, login
from django.contrib.auth.tokens import default_token_generator
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.utils import json
from datetime import datetime

from bloodbank.bank.constants import CITIES, DISTANCES
from bloodbank.bank.models import Donor, CustomUser, Hospital, Donation
import pickle
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
from datetime import date

from bloodbank.bank.serializers import DonorSerializer, HospitalSerializer, DonationSerializer, CustomUserSerializer
from bloodbank.bank.utils import find_nearest_cities


class DonorViewSet(viewsets.ModelViewSet):
    queryset = Donor.objects.all()
    serializer_class = DonorSerializer

    def retrieve(self, request, *args, **kwargs):
        donor = self.get_object()
        features = [donor.last_donation_months, donor.no_donations,
                    donor.total_volume_donated, donor.first_donation_months, 0]
        with open('bloodbank/bank/ml_models/model.pkl', 'rb') as f:
            model = pickle.load(f)

        donor.prediction = (model.predict([features])[0]) / 10
        donor.save()

    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    def partial_update(self, request, *args, **kwargs):
        return super().partial_update(request, *args, **kwargs)


class HospitalViewSet(viewsets.ModelViewSet):
    queryset = Hospital.objects.all()
    serializer_class = HospitalSerializer


class DonationViewSet(viewsets.ModelViewSet):
    queryset = Donation.objects.all()
    serializer_class = DonationSerializer


class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer


class DonorSignUpViewSet(viewsets.ModelViewSet):
    queryset = Donor.objects.all()
    authentication_classes = []
    permission_classes = [AllowAny]

    @action(detail=False, methods=['post'])
    def signup(self, request):
        user_data = json.loads(request.body.decode('utf-8'))
        required_fields = ['username', 'email', 'password', 'first_name', 'last_name', 'mobile_number', 'national_id',
                           'birthdate', 'weight', 'gender', 'is_smoker', 'last_donation_months',
                           'first_donation_months',
                           'no_donations', 'total_volume_donated', 'city', 'blood_group']
        missing_fields = [field for field in required_fields if field not in user_data]
        if missing_fields:
            return Response({'error': f'Missing fields: {", ".join(missing_fields)}'},
                            status=status.HTTP_400_BAD_REQUEST)

        user = CustomUser.objects.create_user(
            username=user_data.get('username'),
            email=user_data.get('email'),
            password=user_data.get('password'),
            first_name=user_data.get('first_name'),
            last_name=user_data.get('last_name'),
            has_full_access=False
        )

        Donor.objects.create(
            user=user,
            mobile_number=user_data.get('mobile_number'),
            national_id=user_data.get('national_id'),
            birthdate=user_data.get('birthdate'),
            weight=user_data.get('weight'),
            gender=user_data.get('gender'),
            is_smoker=user_data.get('is_smoker'),
            last_donation_months=user_data.get('last_donation_months'),
            first_donation_months=user_data.get('first_donation_months'),
            no_donations=user_data.get('no_donations'),
            total_volume_donated=user_data.get('total_volume_donated'),
            city=user_data.get('city'),
            blood_group=user_data.get('blood_group'),
            is_getting_donated=False,
            is_pending=True,
            rating=50,
        )

        token = default_token_generator.make_token(user)

        return Response({'token': token.key}, status=status.HTTP_201_CREATED)


class DonorLoginViewSet(viewsets.ModelViewSet):
    queryset = Donor.objects.all()
    authentication_classes = []
    permission_classes = [AllowAny]

    @action(detail=False, methods=['post'])
    def login(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not (username and password):
            return Response({'error': 'Both username and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return Response({'detail': 'Authentication successful'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid username or password.'}, status=status.HTTP_401_UNAUTHORIZED)


class HospitalSignUpViewSet(viewsets.ModelViewSet):
    queryset = Hospital.objects.all()
    authentication_classes = []
    permission_classes = [AllowAny]

    @action(detail=False, methods=['post'])
    def signup(self, request):
        user_data = json.loads(request.body.decode('utf-8'))
        required_fields = ['username', 'email', 'password', 'first_name', 'last_name', 'mobile_number', 'national_id',
                           'birthdate', 'weight', 'gender', 'is_smoker', 'last_donation_months',
                           'first_donation_months',
                           'no_donations', 'total_volume_donated', 'city', 'blood_group']
        missing_fields = [field for field in required_fields if field not in user_data]
        if missing_fields:
            return Response({'error': f'Missing fields: {", ".join(missing_fields)}'},
                            status=status.HTTP_400_BAD_REQUEST)

        user = CustomUser.objects.create_user(
            username=user_data.get('username'),
            email=user_data.get('email'),
            password=user_data.get('password'),
            first_name=user_data.get('first_name'),
            last_name=user_data.get('last_name'),
            has_full_access=True
        )
        Hospital.objects.create(
            user=user,
            address=user_data.get('address'),
            phone_number=user_data.get('phone_number'),
            email=user_data.get('email'),
        )

        token = default_token_generator.make_token(user)

        return Response({'token': token.key}, status=status.HTTP_201_CREATED)


class HospitalLoginViewSet(viewsets.ModelViewSet):
    queryset = Hospital.objects.all()
    authentication_classes = []
    permission_classes = [AllowAny]

    @action(detail=False, methods=['post'])
    def login(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        has_access = Hospital.objects.get(username=username).values_list('has_full_access', flat=True)

        if not has_access:
            return Response({'error': 'Invalid login method.'}, status=status.HTTP_400_BAD_REQUEST)

        if not (username and password):
            return Response({'error': 'Both username and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return Response({'detail': 'Authentication successful'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid username or password.'}, status=status.HTTP_401_UNAUTHORIZED)


def get_donor_age(birthdate):
    if birthdate is None:
        return None

    try:
        birthdate_str = birthdate.strftime('%Y-%m-%d')  # Convert birthdate to string
        today = date.today()
        birth_date = datetime.strptime(birthdate_str, '%Y-%m-%d').date()
        age = today.year - birth_date.year

        if today.month < birth_date.month or (today.month == birth_date.month and today.day < birth_date.day):
            age -= 1

        return age
    except ValueError:
        return None


@csrf_exempt
def find_donors(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        blood_type = data.get('blood_type')
        no_donors = int(data.get('no_donors') * 1.5)
        city = data.get('city')

        donors = Donor.objects.filter(blood_group=blood_type, city=city)[:no_donors]
        count = len(donors)
        if count < no_donors:
            compatibility_table = {
                'O+': ['O-'],
                'A-': ['O-'],
                'A+': ['A-', 'O-'],
                'B-': ['O-'],
                'B+': ['B-', 'O-', 'O+'],
                'AB-': ['A-', 'B-', 'O-'],
                'AB+': ['A-', 'B-', 'AB-', 'O-'],
            }

            remaining_donors = no_donors - count
            other_blood_types = compatibility_table.get(blood_type, [])
            other_donors = Donor.objects.filter(blood_group__in=other_blood_types, city=city)[:remaining_donors]
            donors = list(donors) + list(other_donors)
            if count < no_donors:
                nearest_cities = find_nearest_cities(city, CITIES, DISTANCES, remaining_donors)
                for nearest_city in nearest_cities:
                    city_donors = Donor.objects.filter(blood_group__in=other_blood_types, city=nearest_city)[
                                  :remaining_donors]
                    donors.extend(city_donors)
                    count += len(city_donors)
                    if count >= no_donors:
                        break
        response_data = {
            'count': count,
            'donors': [{'id': donor.id,
                        'user__first_name': donor.user.first_name,
                        'user__last_name': donor.user.last_name,
                        'user__email': donor.user.email,
                        'mobile_number': donor.mobile_number,
                        'city': donor.city,
                        'blood_group': donor.blood_group,
                        'prediction': donor.prediction,
                        'is_smoker': donor.is_smoker,
                        'weight': donor.weight,
                        'gender': donor.gender,
                        'rating': donor.rating,
                        'age': get_donor_age(donor.birthdate)
                        }
                       for donor in donors
                       if donor.last_donation_months >= 2
                       if not donor.is_pending],
        }
        if count < no_donors:
            response_data['message'] = 'There are not enough donors with this specific information.'

        return JsonResponse(response_data)

    return JsonResponse({'error': 'Invalid request method'}, status=405)
