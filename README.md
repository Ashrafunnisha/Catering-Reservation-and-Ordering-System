# Catering Reservation and Ordering System

A comprehensive web-based platform connecting Catering Service Providers (Admins) with Customers (Users), allowing for seamless menu management and ordering.

## Features

### Admin (Caterer)
- **Registration**: Sign up with business details.
- **Dashboard**: View and manage products.
- **Product Management**: Add new menu items with prices, categories, and images.
- **Order Management**: View incoming orders from customers.

### User (Customer)
- **Registration**: Sign up with delivery details.
- **Dashboard**: Browse available catering menus.
- **Cart**: Add items to cart and review total.
- **Order**: Place orders securely.
- **History**: View past order history.
- **Profile**: Update delivery address.

## Technologies Used
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend/Database**: Firebase (Auth, Firestore)
- **Architecture**: Modular Client-Side SPA structure.

## Execution / How to Run

1. **Prerequisites**:
   - A modern web browser.
   - Internet connection (for Firebase).
   - Python (optional, for running local server).

2. **Setup Firebase**:
   - Open `js/firebase-config.js`.
   - Replace the placeholder keys (`YOUR_API_KEY`, etc.) with your actual Firebase project configuration.
   - Ensure your Firebase project has **Authentication** (Email/Password) and **Firestore** enabled.

3. **Running the Application**:
   - Since this uses ES6 modules and Firebase, strict CORS policies apply. It is best to run via a local server rather than double-clicking HTML files.
   - **Using Python**:
     ```bash
     python -m http.server 8000
     ```
   - Open your browser and go to `http://localhost:8000`.

4. **Workflow**:
   - **Step 1**: Register as an Admin (via "Register as Admin" on login page).
   - **Step 2**: Login as Admin, add a few products.
   - **Step 3**: Logout/Open Incognito.
   - **Step 4**: Register as a User.
   - **Step 5**: add items to cart and Checkout.
   - **Step 6**: Login as Admin again to see the order.

## Project Structure
- `index.html`: Entry point (Login).
- `admin/`: Admin-specific pages.
- `user/`: User-specific pages.
- `js/`: Core logic (`auth.js`, `db.js`, `utils.js`).
- `css/`: Global styles.

## Coding Standards Implemented
- **Modular Code**: Separated concerns (Auth vs DB vs UI).

- **Logging**: Centralized `Logger` utility in `js/utils.js`.
- **Security**: Role-based redirection in `auth.js`.

