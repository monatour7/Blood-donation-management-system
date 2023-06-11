from django.db import transaction
from django.shortcuts import get_object_or_404
from rest_framework.utils import json
from bloodbank.bank.models import Donor, CustomUser, Hospital, Donation
import pickle
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
import heapq
from datetime import datetime, date
from rest_framework_simplejwt.tokens import RefreshToken

@csrf_exempt
def donor_get(request, donor_id=None):
    if request.method != 'GET':
        print('get')
        return JsonResponse({'status': 'error', 'message': 'Wrong URL for the request you used'}, status=405)
    data = Donor.objects.all()
    i = 0
    for donor in data:
        features = [donor.last_donation_months, donor.no_donations,
                    donor.total_volume_donated, donor.first_donation_months, 0]
        with open('bloodbank/bank/ml_models/model.pkl', 'rb') as f:
            model = pickle.load(f)

        pre = (model.predict([features])[0]) / 10
        donor.prediction = pre
        donor.save()
        i += 1

    if donor_id:
        donor = Donor.objects.filter(id=donor_id).values('id', 'user__username', 'user__first_name', 'user__last_name',
                                                         'user__has_full_access', 'user__email', 'user__password',
                                                         'mobile_number', 'national_id', 'weight', 'gender',
                                                         'is_smoker', 'last_donation_months', 'first_donation_months',
                                                         'no_donations', 'total_volume_donated', 'city', 'prediction',
                                                         'blood_group', 'is_pending', 'is_getting_donated', 'rating')
        print(list(donor))
        if donor:
            response = JsonResponse(list(donor), safe=False)
        else:
            response = JsonResponse({'error': 'Donor does not exist'}, status=404)
    else:
        donors = Donor.objects.all().values('id', 'user__username', 'user__first_name', 'user__last_name',
                                            'user__has_full_access', 'user__email', 'user__password',
                                            'mobile_number', 'national_id', 'weight', 'gender',
                                            'is_smoker', 'last_donation_months', 'first_donation_months',
                                            'no_donations', 'total_volume_donated', 'city', 'prediction',
                                            'blood_group', 'is_pending', 'is_getting_donated', 'rating')
        response = JsonResponse(list(donors), safe=False)

    # Set CORS headers
    response['Access-Control-Allow-Origin'] = 'http://localhost:3000'  # Replace with your frontend URL
    response['Access-Control-Allow-Methods'] = 'GET'
    response['Access-Control-Allow-Headers'] = 'Content-Type'
    return response


@csrf_exempt
def calculate_donor_age(request):
    if request.method == 'POST':
        user_data = json.loads(request.body.decode('utf-8'))

        birth_date_str = user_data.get('birth_date')
        if not birth_date_str:
            return JsonResponse({'success': False, 'message': 'Invalid birth date'})

        birth_date = datetime.strptime(birth_date_str, '%Y-%m-%d').date()

        today = date.today()
        age = today.year - birth_date.year
        if today.month < birth_date.month or (today.month == birth_date.month and today.day < birth_date.day):
            age -= 1

        return JsonResponse({'age': age, 'success': True, 'message': 'Age calculated successfully'})

    return JsonResponse({'success': False, 'message': 'Invalid request method'})


@csrf_exempt
def donor_signup(request):
    print(request.body)
    if request.method == 'POST':
        user_data = json.loads(request.body.decode('utf-8'))
        with transaction.atomic():
            user = CustomUser.objects.create_user(
                username=user_data.get('username'),
                email=user_data.get('email'),
                password=user_data.get('password'),
                first_name=user_data.get('first_name'),
                last_name=user_data.get('last_name'),
                has_full_access=False
            )
            donor = Donor.objects.create(
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
                is_pending = True,
                rating = 50,
            )
        response = JsonResponse({'message': 'ok'}, status=200)
    else:
        response = JsonResponse({'message': 'Invalid request method'}, status=400)
    return response

@csrf_exempt
def edit_rating(request, plus_minus, donor_id):
    if request.method == 'GET':
        if not plus_minus or not donor_id:
            return JsonResponse({'error': 'Invalid URL, please provide integer values.'}, status=400)

        donor = Donor.objects.get(id=donor_id)

        if not donor:
            return JsonResponse({'error': 'Donor not found'}, status=404)

        if donor.rating == 100 and plus_minus == 2:
            return JsonResponse({'message': 'Donor has a rating of 100'}, status=301)
            return JsonResponse({'message': 'Donor has a rating of 100'}, status=301)
        elif donor.rating == 0 and plus_minus == 1:
            return JsonResponse({'message': 'Donor has a rating of 0'}, status=301)

        if plus_minus == 2:
            donor.rating += 1
        elif plus_minus == 1:
            donor.rating -= 1

        donor.save()

        return JsonResponse({'message': 'Rating updated successfully'}, status=200)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)




@csrf_exempt
def donor_login(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'incorrect url for this request, note that you are using the log in url'},
                            status=400)

    data = json.loads(request.body.decode('utf-8'))
    identifier = data.get('identifier')
    password = data.get('password')
    print(data)
    if identifier is None or password is None:
        return JsonResponse({'error': 'Please provide both username and password.'}, status=401)

    user = None
    response = None
    # check if username is an email
    if '@' in identifier:
        user = CustomUser.objects.get(email=identifier)
        if password == user.password:
            response = JsonResponse(
                {'status': 'success', 'message': 'Logged in successfully', 'donor_id': str(user.donor.id)}, status=200)
        else:
            response = JsonResponse({'message : Wrong password.'}, status=402)

    # check if username is a national id
    elif len(identifier) == 9 and identifier.isnumeric():
        user = Donor.objects.get(national_id=identifier)
        if password == user.user.password:
            response = JsonResponse({'status': 'success', 'message': 'Logged in successfully', 'donor_id': user.id},
                                    status=200)
        else:
            response = JsonResponse({'message : Wrong password.'}, status=402)
    else:
        user = CustomUser.objects.get(username=identifier)
        if not user:
            response = JsonResponse({'message': 'Wrong username'})
        else:
            if password == user.password:
                response = JsonResponse(
                    {'status': 'success', 'message': 'Logged in successfully', 'donor_id': user.donor.id}, status=200)
            else:
                response = JsonResponse({'message : Wrong password.'}, status=402)

        if user is not None and response is not None:
        # Generate token
            refresh = RefreshToken.for_user(user)

        # Include the token in the response
            response.set_cookie(
                'refresh_token',
                str(refresh),
                httponly=True,
                samesite='Strict'  # Adjust as per your requirements
            )
        response['Access-Control-Allow-Origin'] = 'http://localhost:3000'  # Replace with your frontend URL
        return response

    return JsonResponse({'status': 'error', 'message': 'Invalid credentials'}, status=401)

@csrf_exempt
def donor_delete(request, donor_id):
    if request.method != 'DELETE':
        return JsonResponse({'status': 'error', 'message': 'Wrong url for the request you used'}, status=405)
    donor = Donor.objects.filter(id=donor_id).first()
    if donor:
        donor.delete()
        return JsonResponse({'message': 'Donor deleted successfully'}, status=204)
    else:
        return JsonResponse({'error': 'Donor does not exist'}, status=404)


@csrf_exempt
def donor_put(request, donor_id):
    if request.method != 'PUT':
        return JsonResponse({'status': 'error', 'message': 'Wrong url for the request you used'}, status=405)
    data = json.loads(request.body.decode('utf-8'))
    donor = Donor.objects.filter(id=donor_id).first()
    if donor:
        donor.user.username = data.get('username', donor.user.username)
        donor.user.email = data.get('email', donor.user.email)
        donor.user.first_name = data.get('first_name', donor.user.first_name)
        donor.user.last_name = data.get('last_name', donor.user.last_name)
        donor.weight = data.get('weight', donor.weight)
        donor.gender = data.get('gender', donor.gender)
        donor.is_smoker = data.get('is_smoker', donor.is_smoker)
        donor.last_donation_months = data.get('last_donation_months', donor.last_donation_months)
        donor.first_donation_months = data.get('first_donation_months', donor.first_donation_months)
        donor.no_donations = data.get('no_donations', donor.no_donations)
        donor.total_volume_donated = data.get('total_volume_donated', donor.total_volume_donated)
        donor.is_getting_donated = data.get('is_getting_donated', donor.is_getting_donated)
        donor.rating = data.get('rating', donor.rating)
        donor.city = data.get('city', donor.city)
        donor.save()
        return JsonResponse({'message': 'Donor updated successfully'}, status=200)
    else:
        return JsonResponse({'error': 'Donor does not exist'}, status=404)


@csrf_exempt
def patch_donor(request, donor_id):
    if request.method != 'PATCH':
        return JsonResponse({'status': 'error', 'message': 'Wrong url for the request you used'}, status=405)

    try:
        donor = Donor.objects.get(id=donor_id)
        print(donor)
    except Donor.DoesNotExist:
        return JsonResponse({"error": f"Donor with id {donor_id} does not exist"}, status=404)

    # parse the request body as JSON
    data = json.loads(request.body.decode('utf-8'))
    # update the donor fields if they are included in the request body
    if "first_name" in data:
        donor.user.first_name = data["first_name"]
    if "last_name" in data:
        donor.user.last_name = data["last_name"]
    if "mobile_number" in data:
        donor.mobile_number = data["mobile_number"]
    if "no_donations" in data:
        donor.no_donations = data["no_donations"]
    if "total_volume_donated" in data:
        donor.total_volume_donated = data["total_volume_donated"]
    if "weight" in data:
        donor.weight = data["weight"]
    if "is_smoker" in data:
        donor.is_smoker = data["is_smoker"]
    if "last_donation_months" in data:
        donor.last_donation_months = data["last_donation_months"]
    if "city" in data:
        donor.city = data["city"]
    if "first_donation_date" in data:
        donor.first_donation_date = data["first_donation_date"]
    if "is_pending" in data:
        donor.is_pending = data["is_pending"]
    if "is_getting_donated" in data:
        donor.is_getting_donated = data["is_getting_donated"]
    if "rating" in data:
        donor.rating = data["rating"]

    donor.save()

    return JsonResponse({"message": f"Donor with id {donor_id} has been updated"}, status=200)


@csrf_exempt
def predict_donation(request):
    if request.method != 'POST':
        return JsonResponse({'message': 'Invalid request method'}, status=400)

    data = json.loads(request.body.decode('utf-8'))
    print(data)
    features = [data['months_since_last_donation'], data['number_of_donations'],
                data['total_volume_donated'], data['months_since_first_donation'], 0]

    with open('bloodbank/bank/ml_models/model.pkl', 'rb') as f:
        model = pickle.load(f)

    prediction_probability = (model.predict([features])[0]) / 10

    # Make a prediction using the trained model
    prediction_probability = (model.predict([features])[0]) / 10
    print(prediction_probability)
    if prediction_probability > 50:
        prediction = "Donor probably will donate"
    else:
        prediction = "Donor probably won't donate"

    # Return the prediction as a JSON response
    return JsonResponse({'prediction': str(prediction), 'probability': str(prediction_probability) + '%'})


@csrf_exempt
def hospital_signup(request):
    if request.method == 'POST':
        user_data = json.loads(request.body.decode('utf-8'))
        with transaction.atomic():
            user = CustomUser.objects.create_user(
                username=user_data.get('username'),
                email=user_data.get('email'),
                password=user_data.get('password'),
                first_name=user_data.get('first_name'),
                last_name=user_data.get('last_name'),
                has_full_access=True  # Set has_full_access to True
            )
            hospital = Hospital.objects.create(
                user=user,
                address=user_data.get('address'),
                phone_number=user_data.get('phone_number'),
                email=user_data.get('email'),
            )
        response = JsonResponse({'message': 'ok'}, status=200)
    else:
        response = JsonResponse({'message': 'Invalid request method'}, status=400)
    return response


@csrf_exempt
def hospital_login(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'incorrect url for this request, note that you are using the log in url'},
                            status=400)

    data = json.loads(request.body.decode('utf-8'))
    identifier = data.get('identifier')
    password = data.get('password')

    if identifier is None or password is None:
        return JsonResponse({'error': 'Please provide both username and password.'}, status=401)

    user = None
    response = None

    # check if username is an email
    if '@' in identifier:
        user = CustomUser.objects.get(email=identifier)
        if password == user.password and user.hospital is not None:
            response = JsonResponse({'status': 'success', 'message': 'Logged in successfully', 'id': user.hospital.id},
                                    status=200)
    else:
        user = CustomUser.objects.get(username=identifier)
        if password == user.password and user.hospital is not None:
            response = JsonResponse({'status': 'success', 'message': 'Logged in successfully', 'id': user.hospital.id},
                                    status=200)

    if user is not None and response is not None:
        return response

    return JsonResponse({'status': 'error', 'message': 'Invalid credentials'}, status=401)


@csrf_exempt
def hospital_details(request, hospital_id=None):
    if request.method == 'GET':
        if not hospital_id:
            hospital = Hospital.objects.all()
            data = list(hospital.values())
            return JsonResponse(data, safe=False)
        hospital = Hospital.objects.get(id=hospital_id)
        if not hospital:
            return JsonResponse({'error': 'Hospital not found'})

        data = {
            'hospital_id': hospital.id,
            'hospital_name': hospital.hospital_name,
            'email': hospital.email,
            'phone_number': hospital.phone_number,
            'address': hospital.address
        }
        return JsonResponse({'data': data})
    else:
        return JsonResponse({'error': 'Invalid request method'})


def donation_list(request):
    donations = Donation.objects.all().values('id', 'hospital__id', 'donor__id', 'will_donate', 'donation_date')
    data = list(donations)  # Convert the queryset to a list of dictionaries

    return JsonResponse(data, safe=False)


def donation_detail(request, donation_id):
    donation = get_object_or_404(Donation, id=donation_id)
    data = {
        'id': donation.id,
        'hospital': donation.hospital.user.first_name,
        'donor': donation.donor.user.username,
        'donation_date': donation.donation_date.isoformat(),
        'will_donate': donation.will_donate,
    }
    response = JsonResponse(data)

    response['Access-Controll-Allow_Origin'] = 'https://localhost:3000/'

    return response


@csrf_exempt
def create_donation(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        print(data)
        # Extract the necessary data from the request
        hospital_id = data.get('hospital_id')
        donor_id = data.get('donor_id')
        will_donate = data.get('will_donate')
        donation_date_str = data.get('donation_date')

        # Retrieve the hospital and donor instances
        hospital = Hospital.objects.get(id=hospital_id)
        if not hospital:
            return JsonResponse({'error': 'Invalid hospital ID'}, status=401)

        donor = Donor.objects.get(id=donor_id)
        if not donor:
            return JsonResponse({'error': 'Invalid donor ID'}, status=400)
        donor.is_getting_donated = True
        donor.save()
        # Create the donation instance
        donation = Donation.objects.create(
            hospital=hospital,
            donor=donor,
            will_donate=data.get('will_donate'),
            donation_date=data.get('donation_date'),
        )
        # Return the created donation as a JSON response
        data = {
            'id': donation.id,
            'hospital_id': donation.hospital.id,
            'hospital_name': str(donation.hospital),
            'donor': donation.donor.id,
            'donation_date': donation.donation_date,
            'will_donate': donation.will_donate,
        }
        return JsonResponse(data)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)


from datetime import datetime

from datetime import datetime

@csrf_exempt
def update_donation(request, donation_id):
    donation = get_object_or_404(Donation, id=donation_id)

    if request.method == 'PATCH':
        data = json.loads(request.body.decode('utf-8'))
        print(data)
        if 'donation_date' in data:
            donation_date = datetime.strptime(data.get('donation_date'), '%Y-%m-%d').date()
            donation.donation_date = donation_date
        if 'will_donate' in data:
            donation.will_donate = data['will_donate']

        donation.save()

        # Return the updated donation as a JSON response
        data = {
            'id': donation.id,
            'hospital': donation.hospital.id,
            'donor': donation.donor.id,
            'donation_date': donation.donation_date.isoformat(),
            'will_donate': donation.will_donate,
        }
        return JsonResponse(data)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)


@csrf_exempt
def delete_donation(request, donation_id):
    donation = get_object_or_404(Donation, id=donation_id)

    if request.method == 'DELETE':
        # Delete the donation instance
        donation.delete()

        # Return a success message as a JSON response
        return JsonResponse({'message': 'Donation deleted successfully'})
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)


def calculate_distance(city1, city2, graph):
    # Calculate the distance between two cities using the graph
    distance = graph[city1][city2]
    return distance


def find_nearest_cities(target_city, cities, graph, k):
    global city
    city_distances = []

    for city in cities:
        distance = calculate_distance(target_city, city, graph)
        heapq.heappush(city_distances, (distance, city))

    nearest_cities = [heapq.heappop(city_distances)[1] for _ in range(k) if city != target_city]
    return nearest_cities


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

        # Define the West Bank cities graph
        westbank_cities = [
            'Nablus', 'Jenin', 'Tulkarm', 'Qalqilya', 'Jericho', 'Ramallah', 'Bethlehem',
            'Hebron', 'Jerusalem'
        ]
        westbank_graph = {
            'Nablus': {
                'Nablus': 0,
                'Jenin': 30,
                'Tulkarm': 40,
                'Qalqilya': 40,
                'Jericho': 50,
                'Ramallah': 25,
                'Bethlehem': 35,
                'Hebron': 45,
                'Jerusalem': 45,
            },
            'Jenin': {
                'Nablus': 30,
                'Jenin': 0,
                'Tulkarm': 35,
                'Qalqilya': 45,
                'Jericho': 55,
                'Ramallah': 40,
                'Bethlehem': 50,
                'Hebron': 55,
                'Jerusalem': 60,
            },
            'Tulkarm': {
                'Nablus': 40,
                'Jenin': 35,
                'Tulkarm': 0,
                'Qalqilya': 10,
                'Jericho': 55,
                'Ramallah': 20,
                'Bethlehem': 40,
                'Hebron': 50,
                'Jerusalem': 45,
            },
            'Qalqilya': {
                'Nablus': 40,
                'Jenin': 45,
                'Tulkarm': 10,
                'Qalqilya': 0,
                'Jericho': 60,
                'Ramallah': 35,
                'Bethlehem': 55,
                'Hebron': 65,
                'Jerusalem': 60,
            },
            'Jericho': {
                'Nablus': 50,
                'Jenin': 55,
                'Tulkarm': 55,
                'Qalqilya': 60,
                'Jericho': 0,
                'Ramallah': 60,
                'Bethlehem': 50,
                'Hebron': 65,
                'Jerusalem': 55,
            },
            'Ramallah': {
                'Nablus': 25,
                'Jenin': 40,
                'Tulkarm': 20,
                'Qalqilya': 35,
                'Jericho': 60,
                'Ramallah': 0,
                'Bethlehem': 15,
                'Hebron': 40,
                'Jerusalem': 15,
            },
            'Bethlehem': {
                'Nablus': 35,
                'Jenin': 50,
                'Tulkarm': 40,
                'Qalqilya': 55,
                'Jericho': 50,
                'Ramallah': 15,
                'Bethlehem': 0,
                'Hebron': 25,
                'Jerusalem': 10,
            },
            'Hebron': {
                'Nablus': 45,
                'Jenin': 55,
                'Tulkarm': 50,
                'Qalqilya': 65,
                'Jericho': 65,
                'Ramallah': 40,
                'Bethlehem': 25,
                'Hebron': 0,
                'Jerusalem': 20,
            },
            'Jerusalem': {
                'Nablus': 45,
                'Jenin': 60,
                'Tulkarm': 45,
                'Qalqilya': 60,
                'Jericho': 55,
                'Ramallah': 15,
                'Bethlehem': 10,
                'Hebron': 20,
                'Jerusalem': 0,
            },
        }

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
                nearest_cities = find_nearest_cities(city, westbank_cities, westbank_graph, remaining_donors)
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
        print(response_data['donors'])
        if count < no_donors:
            response_data['message'] = 'There are not enough donors with this specific information.'

        return JsonResponse(response_data)

    return JsonResponse({'error': 'Invalid request method'}, status=405)
