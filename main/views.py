from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required
from .forms import RegistrationForm
from .models import Donation, Request
import json


def home(request):
    donations = Donation.objects.filter(category="food").order_by("-created_at")[:3]
    return render(request, "index.html", {"donations": donations})

@login_required
def dashboard(request):
    my_donations = Donation.objects.filter(donor=request.user)
    my_requests = Request.objects.filter(requester=request.user).order_by("-created_at")

    return render(request, "pages/dashboard.html", {
        "food_count": my_donations.filter(category="food").count(),
        "clothes_count": my_donations.filter(category="clothes").count(),
        "books_count": my_donations.filter(category="books").count(),
        "request_count": my_requests.count(),
        "my_requests": my_requests[:5],
        "food_percent": min(my_donations.filter(category="food").count() * 100 // 50, 100),
        "clothes_percent": min(my_donations.filter(category="clothes").count() * 100 // 20, 100),
        "books_percent": min(my_donations.filter(category="books").count() * 100 // 10, 100),
    })

def food(request):
    return render(request, "pages/food.html")

def clothes(request):
    donations = Donation.objects.filter(
        category="clothes"
    ).order_by("-created_at")

    clothes_data = []

    for donation in donations:
        clothes_data.append({
            "id": donation.id,
            "title": donation.title,
            "category": donation.category,
            "description": donation.description,
            "quantity": donation.quantity,
            "location": donation.location,
            "donor": donation.donor_name,
            "createdAt": donation.created_at.strftime("%Y-%m-%d"),
        })

    return render(
        request,
        "pages/clothes.html",
        {
            "donations": donations,
            "clothes_data": clothes_data,
        }
    )

def books(request):
    return render(request, "pages/books.html")

def volunteers(request):
    return render(request, "pages/volunteers.html")

def about(request):
    return render(request, "pages/about.html")

def logout_view(request):
    logout(request)
    return redirect("login")

def register(request):
    if request.method == "POST":
        form = RegistrationForm(request.POST)

        if form.is_valid():
            user = form.save(commit=False)
            user.set_password(form.cleaned_data["password"])
            user.save()
            return redirect("login")

    else:
        form = RegistrationForm()

    return render(request, "pages/register.html", {"form": form})


def login_view(request):
    if request.method == "POST":
        email = request.POST.get("username")
        password = request.POST.get("password")

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            user = None

        if user is not None:
            user = authenticate(
                request,
                username=user.username,
                password=password
            )

            if user is not None:
                login(request, user)
                return redirect("home")

    return render(request, "pages/login.html")

def food(request):
    donations = Donation.objects.filter(category="food").order_by("-created_at")
    return render(request, "pages/food.html", {"donations": donations})


def books(request):
    return render(request, "pages/books.html")

def volunteers(request):
    return render(request, "pages/volunteers.html")

def about(request):
    return render(request, "pages/about.html")

def food_details(request, id):
    donation = Donation.objects.get(id=id)
    return render(request, "pages/food-details.html", {"donation": donation})

def clothes_details(request):
    clothes_item = None
    donation_id = request.GET.get("id")

    if donation_id and donation_id.isdigit():
        donation = Donation.objects.filter(
            id=donation_id,
            category="clothes"
        ).first()

        if donation:
            clothes_item = {
                "id": donation.id,
                "title": donation.title,
                "category": donation.category,
                "description": donation.description,
                "quantity": donation.quantity,
                "location": donation.location,
                "donor": donation.donor_name,
                "createdAt": donation.created_at.strftime("%Y-%m-%d"),
            }

    return render(
        request,
        "pages/clothes-details.html",
        {"clothes_item": clothes_item}
    )


def book_details(request):
    return render(request, "pages/book-details.html")


@login_required
def food_donate(request):
    if request.method == "POST":
        Donation.objects.create(
            donor=request.user,
            donor_name=request.user.get_full_name() or request.user.username,
            title=request.POST.get("title"),
            category="food",
            description=request.POST.get("description"),
            quantity=request.POST.get("quantity"),
            location=request.POST.get("location"),
        )

        return redirect("food")

    return render(request, "pages/food-donate.html")


@login_required
def clothes_donate(request):
    if request.method == "POST":
        Donation.objects.create(
            donor=request.user,
            donor_name=request.user.get_full_name() or request.user.username,
            title=request.POST.get("title"),
            category="clothes",
            description=request.POST.get("description"),
            quantity=request.POST.get("quantity"),
            location=request.POST.get("location"),
        )

        return redirect("clothes")

    return render(request, "pages/clothes-donate.html")


def book_donate(request):
    return render(request, "pages/book-donate.html")


def book_borrow(request):
    return render(request, "pages/book-borrow.html")


def book_exchange(request):
    return render(request, "pages/book-exchange.html")


def notifications(request):
    return render(request, "pages/notifications.html")


def admin_dashboard(request):
    return render(request, "pages/admin.html")

@login_required
def food_request(request, id):
    donation = Donation.objects.get(id=id)

    if request.method == "POST":
        Request.objects.create(
            requester=request.user,
            requester_name=request.user.get_full_name() or request.user.username,
            donation=donation,
            quantity=request.POST.get("quantity"),
            mobile=request.POST.get("mobile"),
            delivery_method=request.POST.get("delivery_method"),
            notes=request.POST.get("notes"),
        )
        return redirect("dashboard")

    return render(request, "pages/food-request.html", {"donation": donation})

@login_required
def clothes_request(request, id):
    donation = Donation.objects.get(id=id, category="clothes")

    if request.method == "POST":
        Request.objects.create(
            requester=request.user,
            requester_name=request.POST.get("requester_name") or request.user.get_full_name() or request.user.username,
            donation=donation,
            quantity=request.POST.get("quantity") or 1,
            mobile=request.POST.get("mobile") or "",
            delivery_method=request.POST.get("delivery_method") or "pickup",
            notes=request.POST.get("notes") or "",
        )

    return redirect("dashboard")