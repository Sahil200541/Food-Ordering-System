// src/App.js
import React from "react";
import { HashRouter, Routes, Route } from 'react-router-dom';

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
        <HashRouter>
          <Routes>
            <Route exact path='/admin-pannel' element={<AdminPanel />} />  {/* Admin Panel Route */}
            <Route exact path='/' element={<Home />} />
            <Route exact path='/menu' element={<Menu />} />
            <Route exact path='/about' element={<AboutUs />} />
            <Route exact path='/feedback' element={<FeedbackForm />} />
            <Route exact path='/book-table' element={<Booktable />} />
            <Route exact path='/contact' element={<ContactUs />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/register' element={<Register />} />
            <Route exact path='/fp' element={<EmailInput />} />
            <Route exact path='/verify-otp' element={<Verify />} />
            <Route exact path='/reset-password' element={<PasswordReset />} />
            <Route exact path='/payment' element={<Payment />} />
            <Route exact path='/order-status' element={<OrderStatus />} />
            <Route exact path='/login-admin' element={<Loginadmin />} />
            <Route exact path='/register-admin' element={<Registeradmin />} />
            <Route exact path='/admin-page' element={<AdminPage />} />
            <Route exact path='/FP-admin' element={<EmailInputad />} />
            <Route exact path='/verify-otp-admin' element={<Verifyad />} />
            <Route exact path='/reset-password-admin' element={<PasswordResetad />} />
          </Routes>
        </HashRouter>
      </div>
  );
}

export default App;
