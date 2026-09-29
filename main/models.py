# Create your models here.
from django.db import models
from django.contrib.auth.models import User


class Donation(models.Model):
    CATEGORY_CHOICES = [
        ("food", "Food"),
        ("clothes", "Clothes"),
        ("books", "Books"),
    ]

    donor = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="donations",
    )

    donor_name = models.CharField(max_length=100)
    title = models.CharField(max_length=200)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    description = models.TextField(blank=True)
    quantity = models.PositiveIntegerField(default=1)
    location = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Request(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("accepted", "Accepted"),
        ("rejected", "Rejected"),
        ("completed", "Completed"),
        ("cancelled", "Cancelled"),
    ]

    requester = models.ForeignKey(
    User,
    on_delete=models.SET_NULL,
    null=True,
    blank=True,
    related_name="requests",
)

    requester_name = models.CharField(max_length=100)
    donation = models.ForeignKey(
        Donation,
        on_delete=models.CASCADE,
        related_name="requests",
    )
    quantity = models.PositiveIntegerField(default=1)
    notes = models.TextField(blank=True)
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="pending",
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.requester_name} - {self.donation.title}"