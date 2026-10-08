# 🌉 Shetu — সেতু

### অপ্রয়োজনীয় তুলে দিন অন্য হাতে, অপচয় রুখি একসাথে।

**Shetu** is a Bangladesh-focused donation and resource-sharing platform built with **Django**. It connects people who have usable excess food, clothes, and books with people who need them.

The platform is designed around the idea of reducing waste and creating a simple digital bridge between **donors and recipients**.

🔗 **Live Website:** https://shetu-one.vercel.app/

---

## 📌 Project Overview

Many usable food items, clothes, and books are wasted even though other people may need them.

Shetu aims to solve this problem by providing a single platform where users can:

* Donate excess food
* Donate clothes
* Donate books
* Request available donations
* Accept or reject donation requests
* Track their own donations and requests
* Find nearby donations using location information
* View distance and map information after a request is accepted
* Receive notification counts from the system
* Manage their activities through a personal dashboard

---

## ✨ Main Features

### 🔐 User Authentication

Shetu includes a complete user authentication system:

* User Registration
* User Login
* User Logout
* User Dashboard
* Real database-based user information

Users can securely access their own dashboard after logging in.

---

### 🍱 আহার সেতু — Food Donation

Users can donate available food through the platform.

Features include:

* Food donation
* Food listing
* Food details
* Food request
* Request management
* Donor and requester information
* Database-based food records

---

### 👕 বস্ত্র সেতু — Clothes Donation

Users can also donate usable clothes.

Features include:

* Clothes donation
* Clothes listing
* Clothes details
* Clothes request
* Database-based records

The original interface was designed to support different clothing categories and sizes.

---

### 📚 গ্রন্থ সেতু — Book Sharing

The book section supports different ways of sharing books.

Users can:

* Donate books
* Request books
* Borrow books
* Exchange books

Book information such as author, sharing method, loan duration, and exchange preference is stored with the donation data.

---

## 🤝 Donation Request System

A user can request an available donation.

The donor can then:

* Accept the request
* Reject the request

Accepted and rejected requests are stored in the database.

The donor can see requests related to their donations from the dashboard.

### Dashboard includes:

* My Donations
* My Requests
* Requests received for my donations
* Donation count
* Request count
* Recent activity
* Progress information

---

## 📍 GPS, Distance & Map

Shetu includes location-based functionality for connecting nearby users.

The system supports:

* User location
* Donation location
* Distance information
* Map display after an accepted request

This makes it easier for donors and recipients to understand where a donation is located.

---

## 🔔 Notifications

The dashboard and home interface include notification counts based on the system's database information.

Notifications are intended to help users quickly identify new activity related to their donations and requests.

---

## 🛡️ Django Admin

Shetu includes Django's administrative system for managing platform data.

Administrators can manage important database records such as:

* Users
* Donations
* Requests
* Food
* Clothes
* Books

The admin system provides a backend interface for monitoring and managing the platform.

---

## 🗄️ Database

The project uses a relational database for storing application data.

### Development

SQLite was used during the initial development stage.

### Production

The deployed application uses:

**Neon PostgreSQL**

This allows the live application to store real user, donation, and request data in a production database.

---

## ☁️ Deployment

The project is deployed online using **Vercel**.

### Live Website

**https://shetu-one.vercel.app/**

The deployed version includes:

* Django backend
* Neon PostgreSQL database
* Static files
* Uploaded donation images
* Authentication
* Donation system
* Request system
* Dashboard
* Admin functionality

---

## 🛠️ Technology Stack

### Backend

* Python
* Django
* Django Authentication
* Django ORM

### Frontend

* HTML
* CSS
* JavaScript

### Database

* SQLite — development
* PostgreSQL — production
* Neon PostgreSQL — cloud database

### Deployment

* Vercel

### Other Technologies

* GPS / location functionality
* Map integration
* Static file handling

---

## 📂 Main Modules

The project is organized around the following major modules:

```text
Shetu
│
├── Authentication
│   ├── Register
│   ├── Login
│   └── Logout
│
├── Dashboard
│   ├── My Donations
│   ├── My Requests
│   ├── Received Requests
│   └── Recent Activity
│
├── আহার সেতু
│   ├── Donate Food
│   ├── Food Listing
│   ├── Food Details
│   └── Food Request
│
├── বস্ত্র সেতু
│   ├── Donate Clothes
│   ├── Clothes Listing
│   ├── Clothes Details
│   └── Clothes Request
│
├── গ্রন্থ সেতু
│   ├── Donate Books
│   ├── Book Listing
│   ├── Book Details
│   ├── Borrow
│   └── Exchange
│
├── Location & Map
│
├── Notifications
│
└── Django Admin
```

---

# 🎯 Original Project Vision

The initial concept of Shetu was designed as a larger community-based resource-sharing platform.

The long-term vision includes:

* Food sharing
* Clothing sharing
* Book sharing
* Volunteer delivery
* Paid delivery
* Online payment
* Real-time notifications
* GPS-based nearby donation discovery
* Map-based navigation
* Verified donors
* Volunteer points and rewards
* Advanced administrator dashboard
* Reports and moderation
* More advanced delivery tracking

Some of these features are currently represented in the frontend/UI as part of the original project concept and are planned for future development.

---

# 🚀 Future Scope

Shetu can be expanded further with:

### 💳 Online Payment

Integration with local payment gateways such as:

* bKash
* Nagad
* Card payment

This can be used for paid delivery services.

### 🚚 Volunteer Delivery

A dedicated volunteer system can allow volunteers to accept nearby delivery tasks.

Future features may include:

* Volunteer dashboard
* Delivery requests
* Delivery status
* Volunteer points
* Reward system

### 🔔 Real-Time Notifications

Future versions can implement real-time notifications for:

* New donation requests
* Request acceptance/rejection
* Delivery updates
* Nearby donations
* Completed deliveries

### 🗺️ Advanced Maps

Future versions can provide:

* Interactive maps
* Route directions
* Live delivery tracking
* More accurate distance calculation

### 🛡️ Advanced Admin Dashboard

The administrator system can later include:

* Platform statistics
* User verification
* Donor verification
* Reports
* Donation monitoring
* Delivery monitoring
* Volunteer management

---

# 🎓 Academic Project

**Project Name:** Shetu (সেতু)

**Project Type:** Full-Stack Web Application

**Purpose:** Donation and resource-sharing platform

**Target Users:** Donors, recipients, volunteers, and administrators

**Primary Goal:** Reduce waste and connect available resources with people who need them.

---

## ❤️ Why Shetu?

The word **“সেতু”** means **bridge**.

The platform represents a bridge between:

```text
People who have
       ↓
   🌉 SHETU
       ↓
People who need
```

Instead of allowing usable resources to become waste, Shetu tries to connect those resources with people who can benefit from them.

---

## 📜 Project Status

### Current Status: ✅ Working Prototype / Deployed Application

The currently deployed version includes the core functional Django features:

* ✅ Registration
* ✅ Login
* ✅ Logout
* ✅ Real database dashboard
* ✅ Food donation
* ✅ Food listing
* ✅ Food details
* ✅ Food request
* ✅ Clothes donation
* ✅ Clothes listing
* ✅ Clothes details
* ✅ Clothes request
* ✅ Book donation
* ✅ Book listing
* ✅ Book details
* ✅ Book request
* ✅ Request accept/reject
* ✅ Received donation requests
* ✅ GPS/location functionality
* ✅ Distance information
* ✅ Map display after acceptance
* ✅ Notification counts
* ✅ Login/logout controls
* ✅ Django Admin
* ✅ Neon PostgreSQL
* ✅ Vercel deployment
* ✅ Static files
* ✅ Donation images

---

## 🌐 Live Demo

Visit the deployed Shetu platform:

**https://shetu-one.vercel.app/**

---

## 👩‍💻 Developer

**Saimanty Chakraborty Shruti**

Computer Science & Engineering Student

---

## 📄 License

This project was developed as an academic and portfolio project.

© 2026 Saimanty Chakraborty Shruti. All rights reserved.
