from django.contrib import admin
from django.urls import path

from bloodbank.bank import views

urlpatterns = [
    path('admin/', admin.site.urls),

    # Donor urls
    path('donor/', views.donor_get, name='donor_get'),
    path('donor/<int:donor_id>/', views.donor_get, name='donor_get_by_id'),
    path('donor/<int:donor_id>/delete/', views.donor_delete, name='donor_delete'),
    path('donor/<int:donor_id>/put/', views.donor_put, name='donor_put'),
    path('donor/<int:donor_id>/patch/', views.patch_donor, name='patch_donor'),
    path('donor/signup/', views.donor_signup, name='donor_signup'),
    path('donor/login/', views.donor_login, name='donor_login'),
    path('donor/calculate_age/', views.calculate_donor_age, name='donor_age'),
    path('donor/prediction/', views.predict_donation, name='prediction'),
    path('donor/rating/<int:donor_id>/<int:plus_minus>/', views.edit_rating, name='rating'),
    
    # Hospital urls
    path('hospital/login/', views.hospital_login, name='hospital_login'),
    path('hospital/signup/', views.hospital_signup, name='hospital_signup'),
    path('hospital/', views.hospital_details, name='hospital_signup'),
    path('hospital/<int:hospital_id>/', views.hospital_signup, name='hospital_signup'),

    # Donation urls
    path('donations/', views.donation_list, name='donation_list'),
    path('donations/<int:donation_id>/', views.donation_detail, name='donation_detail'),
    path('donations/create/', views.create_donation, name='create_donation'),
    path('donations/<int:donation_id>/patch/', views.update_donation, name='update_donation'),
    path('donations/<int:donation_id>/delete/', views.delete_donation, name='delete_donation'),

    
    path('donors/find/', views.find_donors, name='find_donors'),
]
