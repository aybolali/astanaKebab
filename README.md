[![codecov](https://codecov.io/gh/aybolali/astanaKebab/branch/main/graph/badge.svg)]
(https://codecov.io/gh/aybolali/astanaKebab)

# Astana Kebab 🍽️  
Astana Kebab is a full-stack food ordering web application built for a restaurant in Warsaw.  
It allows users to browse the menu, place secure online orders, and provides an admin dashboard for restaurant management.

---

## 🚀 Tech Stack  
- **Backend:** Java 21, Spring Boot 3, Spring Security (JWT), Hibernate, Spring Data JPA  
- **Frontend:** Angular 17, TypeScript  
- **Database:** MySQL  
- **Other Tools:** Docker, Stripe API, Swagger (OpenAPI), MapStruct, Maven  

---

## ✨ Features  
- 📋 **Dynamic Menu Browsing:** Real-time updates with categories and product images.  
- 🛒 **Secure Shopping Cart:** Stripe checkout integration for payments.  
- 🔒 **User Authentication:** Role-based access control with JWT tokens.  
- 🛠️ **Admin Panel:** Manage products, categories, and orders.  
- 📱 **Responsive Design:** Optimized for desktop and mobile users.  
- 📑 **Interactive API Documentation:** Powered by Swagger.  

---

## ⚙️ Installation & Setup  

### Backend Setup  
1. **Clone the repository:**  
    ```bash
    git clone https://github.com/aybolali/astanaKebab.git  
    cd astanaKebab/backend  
    ```  

2. **Configure MySQL:**  
    - Create a database:  
        ```sql
        CREATE DATABASE astana_kebab;  
        ```  
    - Update `application.properties`:  
        ```properties
        spring.datasource.url=jdbc:mysql://localhost:3306/astana_kebab  
        spring.datasource.username=root  
        spring.datasource.password=yourpassword  

        stripe.api.key=your_stripe_secret_key  
        ```  

3. **Run the Spring Boot application:**  
    ```bash
    mvn spring-boot:run  
    ```  

### Frontend Setup  
1. **Navigate to the frontend directory:**  
    ```bash
    cd ../frontend  
    ```  

2. **Install dependencies:**  
    ```bash
    npm install  
    ```  

3. **Start the Angular development server:**  
    ```bash
    ng serve  
    ```  

---

## 📚 API Endpoints  

### User Authentication  
- **POST /api/auth/register** — Register a new user  
- **POST /api/auth/login** — Login user  

### Products  
- **GET /api/products** — Get all products  
- **GET /api/products/{id}** — Get product details  
- **POST /api/products** — Add a new product (Admin)  

### Orders  
- **POST /api/orders** — Place a new order  
- **GET /api/orders/{userId}** — Get order history by user  

### Payments  
- **POST /api/payment/checkout** — Create a Stripe checkout session  

---

## 🚀 Deployment  
1. **Build the Angular project:**  
    ```bash
    ng build --prod  
    ```  

2. **Deploy the backend** to a cloud service (e.g., Heroku, AWS, Railway, etc.).  
3. **Serve the frontend** through a static host (e.g., Netlify, Vercel, NGINX, etc.).  

---

## 🛠️ Future Enhancements  
- 📱 **Mobile App Development:** iOS & Android support.  
- 🌎 **Multilingual Support:** Polish, English, Kazakh.  
- 📊 **Advanced Analytics:** Insights into user behavior and sales.  
- 📦 **Real-Time Order Tracking:** Status updates like "Preparing", "Ready", "Out for delivery".  
- 📬 **Email Notifications:** For orders and updates.  
- 📈 **Admin Dashboard Enhancements:** Graphs and sales insights.  
- ⚙️ **Inventory Management System.**  

---

## 🤝 Contributing  
We welcome contributions! Follow these steps:  

1. **Fork the repository.**  
2. **Create a new branch:**  
    ```bash
    git checkout -b feature-branch  
    ```  
3. **Commit your changes:**  
    ```bash
    git commit -m "Added a new feature"  
    ```  
4. **Push your branch:**  
    ```bash
    git push origin feature-branch  
    ```  
5. **Submit a Pull Request.**  

---

## 🌟 Project Highlights  
Full-stack development with secure authentication, Stripe payment integration, modern responsive design, cloud deployment readiness, and clean code practices.
