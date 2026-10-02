from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required
from .forms import RegistrationForm
from .models import Donation


def home(request):
    donations = Donation.objects.filter(category="food").order_by("-created_at")[:3]
    return render(request, "index.html", {"donations": donations})

@login_required
def dashboard(request):
    return render(request, "pages/dashboard.html")

def food(request):
    return render(request, "pages/food.html")

def clothes(request):
    return render(request, "pages/clothes.html")

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

def clothes(request):
    return render(request, "pages/clothes.html")

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
    return render(request, "pages/clothes-details.html")


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


def clothes_donate(request):
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