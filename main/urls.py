from django.urls import path

from .views import (
    home,
    register,
    login_view,
    dashboard,
    logout_view,
    food,
    clothes,
    books,
    volunteers,
    about,
    food_details,
    clothes_details,
    book_details,
    food_donate,
    food_request,
    clothes_request,
    book_request,
    clothes_donate,
    book_donate,
    book_borrow,
    book_exchange,
    notifications,
    admin_dashboard,
    accept_request, 
    reject_request,
)


urlpatterns = [

    path('', home, name='home'),

    path('register/', register, name='register'),

    path('login/', login_view, name='login'),

    path('dashboard/', dashboard, name='dashboard'),

    path('logout/', logout_view, name='logout'),

    path('food/', food, name='food'),

    path('clothes/', clothes, name='clothes'),

    path('books/', books, name='books'),

    path('volunteers/', volunteers, name='volunteers'),

    path('about/', about, name='about'),

    path('food/details/<int:id>/', food_details, name='food_details'),
    
    path('clothes/details/', clothes_details, name='clothes_details'),

    path('books/details/', book_details, name='book_details'),

    path('food/donate/', food_donate, name='food_donate'),

    path('clothes/donate/', clothes_donate, name='clothes_donate'),

    path('books/donate/', book_donate, name='book_donate'),

    path('books/borrow/', book_borrow, name='book_borrow'),

    path('books/exchange/', book_exchange, name='book_exchange'),

    path('notifications/', notifications, name='notifications'),

    path('admin-dashboard/', admin_dashboard, name='admin_dashboard'),
    
    path("food/request/<int:id>/", food_request, name="food_request"),

    path("clothes/request/<int:id>/", clothes_request, name="clothes_request"),

    path("books/request/<int:id>/", book_request, name="book_request"),

    path("requests/<int:id>/accept/", accept_request, name="accept_request"),

    path("requests/<int:id>/reject/", reject_request, name="reject_request"),
]