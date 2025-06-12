// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// ALL PAGES IMPORT HERE -- 
import Home from "./Components/JSX/Home";
import Menu from "./Components/JSX/Menu";
import AboutUs from "./Components/JSX/AboutUs";
import FeedbackForm from "./Components/JSX/FeedbackForm";
import Booktable from "./Components/JSX/Booktable";
import ContactUs from "./Components/JSX/ContactUs";
import AdminPanel from "./Components/JSX/AdminPanel";
import Login from "./Components/JSX/Login";
import Register from "./Components/JSX/Register";
import EmailInput from "./Components/JSX/EmailInput";
import Verify from "./Components/JSX/Verify";
import PasswordReset from "./Components/JSX/PasswordReset";
import Payment from "./Components/JSX/Payment";
import OrderStatus from "./Components/JSX/OrderStatus";
import Loginadmin from "./Components/JSX/Loginadmin";
import Registeradmin from "./Components/JSX/Registeradmin";
import AdminPage from "./Components/JSX/AdminPage";
import EmailInputad from "./Components/JSX/EmailInputad";
import Verifyad from "./Components/JSX/Verifyad";
import PasswordResetad from "./Components/JSX/PasswordResetad";

function App() {
  return (

      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/admin-pannel" element={<AdminPanel />} />  {/* Admin Panel Route */}
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/feedback" element={<FeedbackForm />} />
            <Route path="/book-table" element={<Booktable />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/fp" element={<EmailInput />} />
            <Route path="/verify-otp" element={<Verify />} />
            <Route path="/reset-password" element={<PasswordReset />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/order-status" element={<OrderStatus />} />
            <Route path="/login-admin" element={<Loginadmin />} />
            <Route path="/register-admin" element={<Registeradmin />} />
            <Route path="/admin-page" element={<AdminPage />} />
            <Route path="/FP-admin" element={<EmailInputad />} />
            <Route path="/verify-otp-admin" element={<Verifyad />} />
            <Route path="/reset-password-admin" element={<PasswordResetad />} />
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
