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

<img width="944" height="422" alt="image" src="https://github.com/user-attachments/assets/f0335e5f-4de6-4261-b2bf-a5bea179a16f" />
<img width="947" height="440" alt="image" src="https://github.com/user-attachments/assets/01a7df40-f4db-459e-8887-778d4d24b002" />
<img width="950" height="440" alt="image" src="https://github.com/user-attachments/assets/5e810bd7-1d2a-41d1-8d57-e9e584623bf9" />
## Customer Side
<img width="953" height="435" alt="image" src="https://github.com/user-attachments/assets/8a91d1db-7588-441c-84a9-8e3662259295" />
<img width="944" height="415" alt="image" src="https://github.com/user-attachments/assets/8dcd9fd6-017f-406b-abab-3e58c395e95a" />
<img width="927" height="462" alt="image" src="https://github.com/user-attachments/assets/a41cbd24-d2d5-4ed6-b0ff-a7b480894d63" />






