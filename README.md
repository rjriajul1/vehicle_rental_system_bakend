Vehicle Rental Booking Management System

Live link: 

Project Overview

This is a role-based Car Rental Booking Management System built with Node.js, Express, and PostgreSQL.
The system allows customers to book and cancel vehicles, and admins to manage all bookings, including marking vehicles as returned.



Features:

Role-based Access

Customer: Create, view, and cancel own bookings.

Admin: View all bookings, mark bookings as returned.

Booking Management

Update booking status (cancelled or returned).

Vehicle availability updated automatically when returned.

Authentication & Security

JWT-based authentication.

Role-based authorization for protected routes.

Responsive API Endpoints

CRUD operations for bookings.

Secure endpoints with middleware.


Technology Stack:

Backend: Node.js, Express.js

Database: PostgreSQL

Authentication: JWT (JSON Web Tokens)

Environment Management: dotenv

Others: bcrypt for password hashing, pg for database connection

Setup & Usage Instructions:
1. Clone the repository
git clone https://github.com/rjriajul1/vehicle_rental_system_bakend.git

cd your-project-folder

2. Install dependencies
npm install

3. Setup environment variables

Create a .env file in the root directory:

PORT=5000
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_super_secret_key

4. Run the server
npm run dev


Server should start on http://localhost:5000.


Note: All protected endpoints require Authorization: Bearer <token> header.

GitHub & Live Deployment

GitHub Repo: https://github.com/rjriajul1/vehicle_rental_system_bakend

Live Deployment: YOUR_LIVE_URL_HERE