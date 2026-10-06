from django.http import request
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required
from .forms import RegistrationForm
from .models import Donation, Request
import json
import re


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
        "my_donations": my_donations.order_by("-created_at")[:5],
        "received_requests": Request.objects.filter(donation__donor=request.user).order_by("-created_at")[:10],
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
    donations = Donation.objects.filter(category="books").order_by("-created_at")

    books_data = []
    for donation in donations:
        books_data.append({
            "id": donation.id,
            "title": donation.title,
            "description": donation.description,
            "location": donation.location,
            "donor": donation.donor_name,
        })

    return render(request, "pages/books.html", {"books_data": books_data})

def volunteers(request):
    return render(request, "pages/volunteers.html")

def about(request):
    return render(request, "pages/about.html")

def food_details(request, id):
    donation = Donation.objects.get(id=id)
    lat = None
    lng = None
    m = re.search(r"\s*\[GPS: ([-\d.]+),([-\d.]+)\]", donation.description or "")
    if m:
        lat, lng = m.group(1), m.group(2)
        donation.description = donation.description.replace(m.group(0), "")

    show_map = False
    if request.user.is_authenticated:
        if donation.donor == request.user:
            show_map = True
        elif Request.objects.filter(
            donation=donation,
            requester=request.user,
            status="accepted"
        ).exists():
            show_map = True

    return render(request, "pages/food-details.html", {
        "donation": donation,
        "lat": lat,
        "lng": lng,
        "show_map": show_map,
    })

def clothes_details(request):
    clothes_item = None
    lat = None
    lng = None
    show_map = False
    donation_id = request.GET.get("id")

    if donation_id and donation_id.isdigit():
        donation = Donation.objects.filter(
            id=donation_id,
            category="clothes"
        ).first()

        if donation:
            desc = donation.description or ""
            m = re.search(r"\s*\[GPS: ([-\d.]+),([-\d.]+)\]", desc)
            if m:
                lat, lng = m.group(1), m.group(2)
                desc = desc.replace(m.group(0), "")

            if request.user.is_authenticated:
                if donation.donor == request.user:
                    show_map = True
                elif Request.objects.filter(
                    donation=donation,
                    requester=request.user,
                    status="accepted"
                ).exists():
                    show_map = True

            clothes_item = {
                "id": donation.id,
                "title": donation.title,
                "category": donation.category,
                "description": desc,
                "quantity": donation.quantity,
                "location": donation.location,
                "donor": donation.donor_name,
                "createdAt": donation.created_at.strftime("%Y-%m-%d"),
            }

    return render(
        request,
        "pages/clothes-details.html",
        {
            "clothes_item": clothes_item,
            "lat": lat,
            "lng": lng,
            "show_map": show_map,
        }
    )


def book_details(request):
    books_item = None
    lat = None
    lng = None
    show_map = False
    donation_id = request.GET.get("id")

    if donation_id and donation_id.isdigit():
        donation = Donation.objects.filter(
            id=donation_id,
            category="books"
        ).first()

        if donation:
            desc = donation.description or ""
            m = re.search(r"\s*\[GPS: ([-\d.]+),([-\d.]+)\]", desc)
            if m:
                lat, lng = m.group(1), m.group(2)
                desc = desc.replace(m.group(0), "")

            if request.user.is_authenticated:
                if donation.donor == request.user:
                    show_map = True
                elif Request.objects.filter(
                    donation=donation,
                    requester=request.user,
                    status="accepted"
                ).exists():
                    show_map = True

            books_item = {
                "id": donation.id,
                "title": donation.title,
                "category": donation.category,
                "description": desc,
                "quantity": donation.quantity,
                "location": donation.location,
                "donor": donation.donor_name,
                "createdAt": donation.created_at.strftime("%Y-%m-%d"),
            }

    return render(
        request,
        "pages/book-details.html",
        {
            "books_item": books_item,
            "lat": lat,
            "lng": lng,
            "show_map": show_map,
        }
    )


@login_required
def food_donate(request):
    if request.method == "POST":
        desc = request.POST.get("description") or ""
        try:
            lat = float(request.POST.get("lat", ""))
            lng = float(request.POST.get("lng", ""))
            desc = desc + " [GPS: %s,%s]" % (lat, lng)
        except ValueError:
            pass

        Donation.objects.create(
            donor=request.user,
            donor_name=request.user.get_full_name() or request.user.username,
            title=request.POST.get("title"),
            category="food",
            description=desc,
            quantity=request.POST.get("quantity"),
            location=request.POST.get("location"),
        )

        return redirect("food")

    return render(request, "pages/food-donate.html")

@login_required
def clothes_donate(request):
    if request.method == "POST":
        desc = request.POST.get("description") or ""

        try:
            lat = float(request.POST.get("lat", ""))
            lng = float(request.POST.get("lng", ""))
            desc = desc + " [GPS: %s,%s]" % (lat, lng)
        except ValueError:
            pass

        Donation.objects.create(
            donor=request.user,
            donor_name=request.user.get_full_name() or request.user.username,
            title=request.POST.get("title"),
            category="clothes",
            description=desc,
            quantity=request.POST.get("quantity"),
            location=request.POST.get("location"),
        )

        return redirect("clothes")

    return render(request, "pages/clothes-donate.html")

@login_required
def book_donate(request):
    if request.method == "POST":
        title = request.POST.get("title") or "বই"
        author = request.POST.get("author") or ""
        mode = request.POST.get("mode") or "donate"
        description = request.POST.get("description") or ""
        exchange_wish = request.POST.get("exchange_wish") or ""
        borrow_days = request.POST.get("borrow_days") or ""
        extra = ""
        if mode == "borrow":
            extra = f" ধারের মেয়াদ: {borrow_days} দিন."
        elif mode == "exchange":
            extra = f" চান: {exchange_wish}."
            try:
                lat = float(request.POST.get("lat", ""))
                lng = float(request.POST.get("lng", ""))
                description = description + " [GPS: %s,%s]" % (lat, lng)
            except ValueError:
                pass

        

        Donation.objects.create(
            donor=request.user,
            donor_name=request.user.get_full_name() or request.user.username,
            title=title,
            category="books",
            description=f"লেখক: {author}. পদ্ধতি: {mode}.{extra} {description}",
            quantity=1,
            location=request.POST.get("location") or "",
        )
        return redirect("books")

    return render(request, "pages/book-donate.html")


def book_borrow(request):
    return render(request, "pages/book-borrow.html")


def book_exchange(request):
    return render(request, "pages/book-exchange.html")


@login_required
def notifications(request):
    items = []

    received = Request.objects.filter(
        donation__donor=request.user, status="pending"
    ).order_by("-created_at")[:20]
    for r in received:
        items.append({
            "id": r.id,
            "type": r.donation.category,
            "category": "নতুন অনুরোধ",
            "title": "📥 নতুন অনুরোধ এসেছে",
            "message": "%s আপনার '%s' দানটি চেয়েছেন (%s টি)।" % (r.requester_name, r.donation.title, r.quantity),
            "distance": "",
            "timeRemaining": "",
            "timestamp": r.created_at.strftime("%d/%m/%Y"),
            "isUnread": True,
            "link": "/dashboard/",
            "actionText": "অনুরোধ দেখুন",
        })

    mine = Request.objects.filter(
        requester=request.user, status__in=["accepted", "rejected"]
    ).order_by("-created_at")[:20]
    for r in mine:
        ok = r.status == "accepted"
        items.append({
            "id": r.id + 100000,
            "type": r.donation.category,
            "category": "অনুরোধের অবস্থা",
            "title": "✅ আপনার অনুরোধ গৃহীত হয়েছে" if ok else "❌ আপনার অনুরোধ বাতিল হয়েছে",
            "message": "'%s' দানের জন্য আপনার অনুরোধটি %s।" % (r.donation.title, "গ্রহণ করা হয়েছে" if ok else "বাতিল করা হয়েছে"),
            "distance": "",
            "timeRemaining": "",
            "timestamp": r.created_at.strftime("%d/%m/%Y"),
            "isUnread": False,
            "link": "/dashboard/",
            "actionText": "বিস্তারিত দেখুন",
        })

    return render(request, "pages/notifications.html", {"notifications": items})

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

@login_required
def book_request(request, id):
    donation = Donation.objects.get(id=id, category="books")

    if request.method == "POST":
        Request.objects.create(
            requester=request.user,
            requester_name=request.user.get_full_name() or request.user.username,
            donation=donation,
            quantity=1,
            mobile=request.POST.get("mobile") or "",
            delivery_method="pickup",
            notes=request.POST.get("notes") or "",
        )

    return redirect("dashboard")

@login_required
def accept_request(request, id):
    r = Request.objects.filter(id=id, donation__donor=request.user).first()
    if r is not None and request.method == "POST":
        r.status = "accepted"
        r.save()
    return redirect("dashboard")


@login_required
def reject_request(request, id):
    r = Request.objects.filter(id=id, donation__donor=request.user).first()
    if r is not None and request.method == "POST":
        r.status = "rejected"
        r.save()
    return redirect("dashboard")