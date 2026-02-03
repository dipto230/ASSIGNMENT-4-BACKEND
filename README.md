# MediStore Backend 💊

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue.svg)

**"Your Trusted Online Medicine Shop – Backend"**

---

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview

MediStore Backend is a **Node.js & Express.js** server powering a full-stack e-commerce application for **over-the-counter (OTC) medicines**.  

It handles:

- User authentication & roles (**Customer, Seller, Admin**)
- Medicine inventory management
- Order processing & tracking
- Reviews & ratings
- Admin controls for users, orders, and categories

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js & Express.js | Server & routing |
| MongoDB + Mongoose | Database & ORM |
| BETTER AUTH | Authentication & Authorization |
| bcrypt | Password hashing |
| Imagebb | Image storage (medicine photos) |
| Cors | Cross-origin requests |

---

## Features

- User registration & login with role selection
- Role-based access control (Customer, Seller, Admin)
- CRUD operations for medicines (Seller/Admin)
- Place and track orders (Customer)
- Update order status (Seller)
- Admin management for users, orders, and categories
- Customer reviews & ratings

---

## Database Schema

### Users

| Field     | Type     | Description                  |
|-----------|---------|------------------------------|
| _id       | ObjectId | Unique ID                   |
| name      | String   | User full name              |
| email     | String   | Unique email                |
| password  | String   | Hashed password             |
| role      | String   | customer / seller / admin   |
| status    | String   | active / banned             |
| createdAt | Date     | Account creation date       |

### Categories

| Field | Type     | Description         |
|-------|---------|-------------------|
| _id   | ObjectId | Unique ID          |
| name  | String   | Category name      |
| description | String | Optional description |

### Medicines

| Field      | Type     | Description              |
|------------|---------|--------------------------|
| _id        | ObjectId | Unique ID               |
| name       | String   | Medicine name           |
| description| String   | Medicine description    |
| price      | Number   | Medicine price          |
| stock      | Number   | Available quantity      |
| categoryId | ObjectId | Linked category         |
| sellerId   | ObjectId | Linked seller           |
| imageUrl   | String   | Medicine image URL      |

### Orders

| Field           | Type     | Description                            |
|-----------------|---------|----------------------------------------|
| _id             | ObjectId | Unique ID                              |
| userId          | ObjectId | Customer placing order                 |
| items           | Array    | Array of { medicineId, qty, price }   |
| totalPrice      | Number   | Total order price                      |
| status          | String   | PLACED / PROCESSING / SHIPPED / DELIVERED / CANCELLED |
| shippingAddress | String   | Customer address                       |
| createdAt       | Date     | Order creation date                     |

### Reviews

| Field      | Type     | Description              |
|------------|---------|--------------------------|
| _id        | ObjectId | Unique ID               |
| userId     | ObjectId | Customer ID             |
| medicineId | ObjectId | Linked medicine         |
| rating     | Number   | 1–5 stars               |
| comment    | String   | Optional comment        |
| createdAt  | Date     | Review date             |

---

## API Endpoints

### Authentication

| Method | Endpoint           | Description         |
|--------|------------------|-------------------|
| POST   | /api/auth/register | Register a new user |
| POST   | /api/auth/login    | Login user         |
| GET    | /api/auth/me       | Get current logged-in user |

### Medicines (Public)

| Method | Endpoint                | Description          |
|--------|------------------------|--------------------|
| GET    | /api/medicines          | Get all medicines (filters) |
| GET    | /api/medicines/:id      | Get medicine details |
| GET    | /api/categories          | Get all categories  |

### Orders

| Method | Endpoint                | Description           |
|--------|------------------------|---------------------|
| POST   | /api/orders             | Create a new order   |
| GET    | /api/orders             | Get current user's orders |
| GET    | /api/orders/:id         | Get order details    |

### Seller Management

| Method | Endpoint                        | Description          |
|--------|---------------------------------|--------------------|
| POST   | /api/seller/medicines           | Add new medicine    |
| PUT    | /api/seller/medicines/:id       | Update medicine details |
| DELETE | /api/seller/medicines/:id       | Delete medicine     |
| GET    | /api/seller/orders              | Get seller's orders |
| PATCH  | /api/seller/orders/:id          | Update order status |

### Admin Management

| Method | Endpoint                        | Description          |
|--------|---------------------------------|--------------------|
| GET    | /api/admin/users                | Get all users       |
| PATCH  | /api/admin/users/:id            | Update user status  |
| GET    | /api/admin/orders               | View all orders     |
| GET    | /api/admin/categories           | Get all categories  |
| POST   | /api/admin/categories           | Add a new category  |
| PATCH  | /api/admin/categories/:id       | Update category     |
| DELETE | /api/admin/categories/:id       | Delete category     |

---

## Installation & Setup

```bash
# Clone the repo
git clone <repo-url>
cd backend

# Install dependencies
npm install

# Set environment variables
cp .env.example .env

# Start server
npm run dev
Server will run on http://localhost:5000
 by default.
Environment Variables
Example .env file:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
IMAGEBB_API_KEY=your_imagebb_api_key
Usage

Use Postman or frontend to interact with APIs.

Admin users can be seeded directly in the database.

Role-based access ensures users only perform allowed actions.

Contributing

Fork the repository

Create a branch feature/your-feature

Commit changes git commit -m "Add feature"

Push git push origin feature/your-feature

Create a Pull Request

License

MIT License © 2026

---

If you want, I can also make a **visually enhanced version with badges for API status, code quality, and coverage**, so it looks super professional on GitHub.  

Do you want me to do that next?
