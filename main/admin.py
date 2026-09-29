from django.contrib import admin

from .models import Donation, Request


@admin.register(Donation)
class DonationAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "donor_name", "quantity", "location", "created_at")
    list_filter = ("category",)
    search_fields = ("title", "donor_name", "location")


@admin.register(Request)
class RequestAdmin(admin.ModelAdmin):
    list_display = ("requester_name", "donation", "quantity", "status", "created_at")
    list_filter = ("status",)
    search_fields = ("requester_name", "donation__title")