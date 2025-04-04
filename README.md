# Astana Kebab - Self-Automated Food Ordering System

## Overview

Astana Kebab is a full-stack online food ordering system designed to simplify the ordering process for both customers and restaurant owners. The system is built for usability, scalability, and secure transactions. It uses Java Spring Boot for backend operations and Angular for a responsive frontend.

---

## Features

- **User Authentication:** Secure login with role-based access control powered by Okta.
- **Dynamic Menu Rendering:** Real-time updates of menu items.
- **Shopping Cart & Checkout:** Add, remove, and update quantities of items in the cart, then complete the purchase.
- **Order Tracking:** Monitor the status of placed orders.
- **Database Integration:** Efficient data management with MySQL.
- **Secure Transactions:** Uses modern authentication and payment validation methods.
- **Admin Dashboard:** Allows restaurant owners to manage products, orders, and user roles.

---

## Tech Stack

- **Backend:** Java, Spring Boot, Hibernate, REST API
- **Frontend:** Angular, TypeScript, Bootstrap
- **Database:** MySQL
- **Security:** Okta Authentication
- **Version Control:** Git, GitHub

---

## Project Setup

### Prerequisites

- **Java 17+**
- **Node.js & npm**
- **Angular CLI**
- **MySQL Server**
- **IDE:** IntelliJ IDEA / VS Code

---

### Backend Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-repo/astana-kebab.git
   cd astana-kebab/backend
Configure the MySQL database:

sql
Copy
Edit
CREATE DATABASE astana_kebab;
Update application.properties with your database credentials:

properties
Copy
Edit
spring.datasource.url=jdbc:mysql://localhost:3306/astana_kebab
spring.datasource.username=root
spring.datasource.password=yourpassword
Run the Spring Boot application:

bash
Copy
Edit
mvn spring-boot:run
Frontend Setup
Navigate to the frontend directory:

bash
Copy
Edit
cd ../frontend
Install dependencies:

bash
Copy
Edit
npm install
Start the Angular development server:

bash
Copy
Edit
ng serve
API Endpoints
User Authentication
POST /api/auth/register - Register a new user

POST /api/auth/login - User login

Products
GET /api/products - Retrieve all products

GET /api/products/{id} - Get product details

POST /api/products - Add a new product (Admin)

Orders
POST /api/orders - Place an order

GET /api/orders/{userId} - Get user order history

Deployment
Build the Angular project:

bash
Copy
Edit
ng build --prod
Deploy the backend on a cloud platform (e.g., Heroku, AWS, etc.).

Serve the frontend using a static hosting service (e.g., Netlify, Vercel, NGINX, etc.).

Future Enhancements
Mobile App Development - A mobile version of the application for iOS and Android.

Multilingual Support - Support for multiple languages to cater to a global audience.

Advanced Data Analytics - Insights into user behavior and restaurant performance.

Contributing
We welcome contributions to the project! Here's how you can contribute:

Fork the repository.

Create a new branch:

bash
Copy
Edit
git checkout -b feature-branch
Commit your changes:

bash
Copy
Edit
git commit -m "Added a new feature"
Push to the branch:

bash
Copy
Edit
git push origin feature-branch
Submit a Pull Request.