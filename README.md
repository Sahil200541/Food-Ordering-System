# 🍽️ Food Ordering System

A fully responsive, modern, and user-friendly web-based Food Ordering System built using **MERN Stack (MongoDB, Express, React, Node.js)**. It allows users to browse menus, place orders, and manage food delivery in a seamless digital environment.

---

## 🚀 Features

- 🔍 Browse restaurant menu with images and prices
- 🛒 Add to cart & manage orders
- 🧾 Checkout and place food orders
- 🔐 User authentication (Register/Login)
- 🧑 Admin dashboard for managing orders and menu
- 📱 Fully responsive UI for mobile and desktop
- ⚡ Fast and optimized performance

---

## 📂 Technologies Used

- **Frontend:** React.js, Bootstrap, CSS, Framer Motion
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Other Tools:** Axios, JWT, Mongoose

---

## 📸 Screenshots

> (Add screenshots here to show UI/UX, menu, order system, etc.)

---

## 🛠️ Installation

**Installation Guide for Food Ordering System Project**

1. **Clone the repository**

   Open your terminal or command prompt and run the following command to clone the project:

   git clone [https://github.com/Sahil200541/Food-Ordering-System.git](https://github.com/Sahil200541/Food-Ordering-System.git)

   Navigate into the project folder:

   cd Food-Ordering-System

2. **Install Frontend Dependencies**

   Go to the frontend directory:

   cd client

   Then install all required frontend packages:

   npm install

3. **Install Backend Dependencies**

   Go back to the root folder:

   cd ..

   Then navigate into the backend directory:

   cd server

   Install all backend dependencies:

   npm install

4. **Set Up Environment Variables**

   Inside the `server` folder, create a file named `.env`

   Add the following environment variables:

   MONGO\_URI=your\_mongodb\_connection\_string
   JWT\_SECRET=your\_jwt\_secret\_key
   PORT=5000

   (Replace the placeholder values with your actual MongoDB URI and secret key.)

5. **Run the Project**

   Go back to the root folder of the project:

   cd ..

   Run both frontend and backend together (if using a combined dev script):

   npm run dev

   If not, run backend and frontend in separate terminals:

   First terminal:

   * Go to server folder: `cd server`
   * Start backend server: `npm start`

   Second terminal:

   * Go to client folder: `cd client`
   * Start frontend app: `npm start`

