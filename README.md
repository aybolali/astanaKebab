# Astana Kebab - Self-Automated Food Ordering System

## Overview
The **Astana Kebab** project is a full-stack online food ordering system designed to streamline the ordering process for both customers and restaurant owners. The system ensures usability, scalability, and secure transactions, integrating **Java Spring Boot** for backend operations and **Angular** for a responsive frontend.

## Features
- **User Authentication**: Secure login and role-based access control using Okta.
- **Dynamic Menu Rendering**: Real-time updates on menu items.
- **Shopping Cart & Checkout**: Add items, update quantities, and complete purchases.
- **Order Tracking**: Monitor the status of placed orders.
- **Database Integration**: Efficient data management with MySQL.
- **Secure Transactions**: Uses modern authentication and payment validation methods.
- **Admin Dashboard**: Manage products, orders, and user roles.

## Tech Stack
- **Backend**: Java, Spring Boot, Hibernate, REST API
- **Frontend**: Angular, TypeScript, Bootstrap
- **Database**: MySQL
- **Security**: Okta Authentication
- **Version Control**: Git, GitHub

## Project Setup
### Prerequisites
- **Java 17+**
- **Node.js & npm**
- **Angular CLI**
- **MySQL Server**
- **IntelliJ IDEA / VS Code**

### Backend Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/astana-kebab.git
   cd astana-kebab/backend
   ```
2. Configure MySQL database:
   ```sh
   CREATE DATABASE astana_kebab;
   ```
3. Update `application.properties` with your database credentials:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/astana_kebab
   spring.datasource.username=root
   spring.datasource.password=yourpassword
   ```
4. Run the Spring Boot application:
   ```sh
   mvn spring-boot:run
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```sh
   cd ../frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the Angular development server:
   ```sh
   ng serve
   ```

## API Endpoints
### User Authentication
- **POST** `/api/auth/register` - Register a new user
- **POST** `/api/auth/login` - User login

### Products
- **GET** `/api/products` - Retrieve all products
- **GET** `/api/products/{id}` - Get product details
- **POST** `/api/products` - Add a new product (Admin)

### Orders
- **POST** `/api/orders` - Place an order
- **GET** `/api/orders/{userId}` - Get user order history

## Deployment
1. Build the Angular project:
   ```sh
   ng build --prod
   ```
2. Deploy the backend on a cloud platform (Heroku, AWS, etc.).
3. Serve the frontend using **NGINX** or a static hosting service (Netlify, Vercel, etc.).

## Future Enhancements
- **Mobile App Development**
- **Multilingual Support**
- **Advanced Data Analytics for Business Insights**

## Contributing
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch`
3. Commit your changes: `git commit -m "Added a new feature"`
4. Push to the branch: `git push origin feature-branch`
5. Submit a Pull Request

## License
This project is licensed under the MIT License.

