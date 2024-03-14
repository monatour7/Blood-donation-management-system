import datetime as dt
import heapq


def calculate_distance(city1, city2, graph):
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
        birthdate_str = birthdate.strftime('%Y-%m-%d')
        today = dt.date.today()
        birth_date = dt.datetime.strptime(birthdate_str, '%Y-%m-%d').date()
        age = today.year - birth_date.year

        if today.month < birth_date.month or (today.month == birth_date.month and today.day < birth_date.day):
            age -= 1

        return age
    except ValueError:
        return None
