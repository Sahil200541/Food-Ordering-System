import React, { useEffect, useState } from "react";
import "../CSS/Booktable.css";
import { Navbar, Nav, NavDropdown, Button, Container } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import '../CSS/Admin.css';
import axios from "axios";
import logo1 from "./Img/logo1.jpg";
import Modal from './Modal';  // Import the Modal component

function Booktable() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        members: "",
        date: "",
        time: "",
        tableType: "normal",
        specialRequest: ""
    });

    const [message, setMessage] = useState("");   // For displaying success or error message
    const [messageType, setMessageType] = useState("");  // To track if it's a success or error message
    const [showModal, setShowModal] = useState(false);  // Modal visibility state
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



    // Handle form input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5007/api/book-table', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                setMessage("Your request is received. You will get a confirmation mail.");
                setMessageType("success");  // Set message type
                setShowModal(true);  // Show modal
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    members: "",
                    date: "",
                    time: "",
                    tableType: "normal",
                    specialRequest: ""
                });
            } else {
                setMessage(result.message || "Booking failed. Please try again.");  // Set error message
                setMessageType("error");  // Set error message type
                setShowModal(true);  // Show modal
            }
        } catch (error) {
            setMessage("Error occurred while booking. Please try again later.");  // Handle network errors
            setMessageType("error");
            setShowModal(true);  // Show modal
        }
    };

    // Close modal function
    const handleCloseModal = () => {
        setShowModal(false);  // Hide modal
    };

    return (
        <div>
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

            {/* Book A Table */}
            <div className="img-cont">
                <div className="container-1">
                    <div className="booking-form-container hello">
                        <form className="booking-form" onSubmit={handleSubmit}>
                            <h2 className="ffm">Book A Table</h2>

                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />

                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                            <label htmlFor="phone">Phone Number:</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />

                            <label htmlFor="members">Number of Members:</label>
                            <input
                                type="number"
                                id="members"
                                name="members"
                                value={formData.members}
                                onChange={handleChange}
                                required
                            />

                            <label htmlFor="date">Date:</label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                            />

                            <label htmlFor="time">Time:</label>
                            <input
                                type="time"
                                id="time"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                required
                            />

                            <label htmlFor="tableType">Reservation Type:</label>
                            <select
                                id="tableType"
                                name="tableType"
                                value={formData.tableType}
                                onChange={handleChange}
                            >
                                <option value="normal">Normal</option>
                                <option value="premium">Premium</option>
                            </select>

                            <label htmlFor="specialRequest">Any special request?</label>
                            <textarea
                                style={{ color: 'black' }}
                                id="specialRequest"
                                name="specialRequest"
                                className="ffm"
                                value={formData.specialRequest}
                                onChange={handleChange}
                                placeholder="e.g., Wheelchair access, high chair, birthday party etc."
                            />

                            <button type="submit">Book Now</button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <Modal
                    message={message}
                    messageType={messageType}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
}

export default Booktable;
