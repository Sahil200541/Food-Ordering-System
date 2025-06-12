import React, { useEffect, useState } from 'react';
import '../CSS/Feedback.css';
import { Navbar, Nav, NavDropdown, Button, Container } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import '../CSS/Admin.css';
import axios from 'axios';
import logo1 from "./Img/logo1.jpg"; // Ensure to update the logo path
import Modal from './Modal'; // Import the Modal component

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    rating: '5', // Default rating is set to 5
  });
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [modalMessage, setModalMessage] = useState(''); // State for modal message
  const [messageType, setMessageType] = useState(''); // State for message type
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();


  const loginButton = async () => {
    try {
      const res = await fetch('http://localhost:5008/log-token', {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"// Include cookies with the request
      });


      if (res.ok) {
        const userData = await res.json(); // Get the user data from the response
        console.log('Authenticated User:', userData); // Log the user data
        setIsLoggedIn(true); // Update the state to reflect that the user is logged in
      } else {
        // Handle cases where the user is not authenticated
        console.error('Failed to fetch user data:', res.status);
        setIsLoggedIn(false); // Update the state to reflect that the user is not logged in
      }

    } catch (err) {
      console.log('Error fetching login status:', err);
      setIsLoggedIn(false);
    }
  };


  const logoutButton = async () => {
    try {
      // Call the logout route on the backend
      const response = await fetch('http://localhost:5008/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include' // Ensure cookies are included in the request
      });

      if (response.ok) {
        // Handle successful logout
        console.log('Logout successful');
        // Optionally clear any local state or tokens if stored locally
        setIsLoggedIn(false); // Assuming you have a state variable for login status
        localStorage.removeItem('jwtoken'); // Clear  tokens saved in local storage
      } else {
        const data = await response.json();
        console.error('Logout error:', data.message);
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };


  useEffect(() => {
    loginButton();
  }, []);

  const handleLogout = () => {
    logoutButton(); // Remove the cookie and tokens in database through server.js
    setIsLoggedIn(false); // Update the state
    // Redirect to login page or show a message
  };

  const handleLoginClick = () => {
    navigate('/Register');
  };





  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission and send data to the backend API
  const handleSubmit = async (e) => {
    e.preventDefault();

    const feedbackData = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      rating: formData.rating,
    };

    try {
      const response = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Feedback submitted:', data);
        setModalMessage('Feedback submitted successfully');
        setMessageType('success');
      } else {
        setModalMessage('Failed to submit feedback');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error:', error);
      setModalMessage('An error occurred while submitting feedback');
      setMessageType('error');
    }

    setIsModalOpen(true); // Show the modal after submission
    setFormData({ name: '', email: '', message: '', rating: '5' }); // Reset form after submission
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="feedback">
      {/* Navbar */}
      <div className="upper">
        <Navbar expand="lg" style={{ backgroundColor: 'white' }}>
          <Container>
            {/* Left side: Logo and Name */}
            <Navbar.Brand href="/" className="logo-text" style={{ color: 'tomato' }}>
              <img
                src={logo1} // Ensure to update the logo path
                alt="Logo"
                width="40"
                height="40"
                className="d-inline-block align-top"
                style={{ marginTop: '-10px' }} // Adjusts logo position
              />
              Foody-India
            </Navbar.Brand>

            {/* Center: Navigation links */}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mx-auto">
                <NavLink
                  to="/"
                  className="nav-link"
                  style={({ isActive }) => ({
                    color: isActive ? 'rgb(171, 7, 7)' : 'tomato', // Active color
                    transition: 'color 0.2s',
                    margin: '0 10px',
                    fontSize: '16px',
                    textDecoration: 'none', // Remove underline
                  })}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/about"
                  className="nav-link"
                  style={({ isActive }) => ({
                    color: isActive ? 'rgb(171, 7, 7)' : 'tomato',
                    transition: 'color 0.2s',
                    margin: '0 10px',
                    fontSize: '16px',
                    textDecoration: 'none',
                  })}
                >
                  About Us
                </NavLink>
                <NavLink
                  to="/menu"
                  className="nav-link"
                  style={({ isActive }) => ({
                    color: isActive ? 'rgb(171, 7, 7)' : 'tomato',
                    transition: 'color 0.2s',
                    margin: '0 10px',
                    fontSize: '16px',
                    textDecoration: 'none',
                  })}
                >
                  Menu
                </NavLink>
                <NavLink
                  to="/book-table"
                  className="nav-link"
                  style={({ isActive }) => ({
                    color: isActive ? 'rgb(171, 7, 7)' : 'tomato',
                    transition: 'color 0.2s',
                    margin: '0 10px',
                    fontSize: '16px',
                    textDecoration: 'none',
                  })}
                >
                  Book a Table
                </NavLink>
                <NavDropdown title="More" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/feedback" style={{ color: 'tomato', fontWeight: 'bold' }}>Feedback</NavDropdown.Item>
                  <NavDropdown.Item href="/contact" style={{ color: 'tomato', fontWeight: 'bold' }}>Contact Us</NavDropdown.Item>
                  <NavDropdown.Item href="/order-status" style={{ color: 'tomato', fontWeight: 'bold' }}>Check Order Status</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>

            {/* Right side: Login Button */}
            {isLoggedIn ? (
              <button className="login-btn" onClick={handleLogout}>Logout</button>
            ) : (
              <button className="login-btn" onClick={handleLoginClick}>Login</button>
            )}
          </Container>
        </Navbar>
      </div>

      {/* Feedback Form */}
      <div className='img-cont'>
        <div className="container-1">
          <div className="row justify-content-end wd">
            <div className="col-md-6 col-lg-4" style={{ marginRight: '210px' }}>
              <form onSubmit={handleSubmit} className="feedback-form p-4 mt-5 mr-8 swarna">
                <h2 className="text-center mt-0 mb-3">Feedback Form</h2>

                <div className="form-group">
                  <label htmlFor="name" className="lbl-wh">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="lbl-wh">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="lbl-wh">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-control"
                    rows="4"
                    placeholder="Enter your feedback"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="rating" className="lbl-wh">Rating</label>
                  <select
                    id="rating"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    className="form-control"
                    required
                  >
                    <option value="5">5 - Excellent</option>
                    <option value="4">4 - Very Good</option>
                    <option value="3">3 - Good</option>
                    <option value="2">2 - Fair</option>
                    <option value="1">1 - Poor</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-primary btn-block mt-3">
                  Submit Feedback
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Component */}
      {isModalOpen && (
        <Modal
          message={modalMessage}
          messageType={messageType}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default FeedbackForm;
