import React, { useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown, Button, Container } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import logo1 from "./Img/logo1.jpg";
import '../CSS/Admin.css';
import '../CSS/ContactUs.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Modal from './Modal'; // Import the Modal component
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import axios from "axios";

const cus = 'Images/cus.webp';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // For success or error modal
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



    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5003/submitContact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setModalMessage('Your contact form has been submitted successfully!');
                setMessageType('success');
                setShowModal(true);
                setFormData({ name: '', email: '', phone: '', message: '' }); // Reset form after submission
            } else {
                setModalMessage('Failed to submit the contact form. Please try again.');
                setMessageType('error');
                setShowModal(true);
            }
        } catch (error) {
            setModalMessage('Error occurred while submitting the form.');
            setMessageType('error');
            setShowModal(true);
        }
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
                  <NavDropdown.Item as={Link} to="/feedback" style={{ color: 'tomato', fontWeight: 'bold' }}>
                    Feedback
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/contact" style={{ color: 'tomato', fontWeight: 'bold' }}>
                    Contact Us
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/order-status" style={{ color: 'tomato', fontWeight: 'bold' }}>
                    Check Order Status
                  </NavDropdown.Item>
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

            {/* Page Header */}
            <div className="bg-1">
                <h1 className="abt-txt">Contact Us</h1>
            </div>

            {/* Contact Page */}
            <div className="contact-container">
                {/* Contact Information Section */}
                <div className="contact-info">
                    <div className="info-box">
                        <i className="fas fa-map-marker-alt"></i> {/* Address Icon */}
                        <h5 style={{ color: 'tomato', fontWeight: 'bold' }}>Our Location</h5>
                        <p>24, 1A, Chandi Ghosh Rd, Ashok Nagar, Tollygunge, Kolkata, West Bengal 700040</p>
                    </div>
                    <div className="info-box">
                        <i className="fas fa-phone-alt"></i> {/* Phone Icon */}
                        <h5 style={{ color: 'tomato', fontWeight: 'bold' }}>Call Us</h5>
                        <p>+91 9876543210</p>
                        <p>+91 9876543210</p>
                    </div>
                    <div className="info-box">
                        <i className="fas fa-envelope"></i> {/* Email Icon */}
                        <h5 style={{ color: 'tomato', fontWeight: 'bold' }}>E-mail</h5>
                        <p>ardentproject602@gmail.com</p>
                    </div>
                </div>

                {/* Description */}
                <h2 className="fii">Foody-India</h2>
                <div className="row mb-5">
                    <div className="col-md-6">
                        <p className="about-text justified-text" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                            At <span style={{ color: 'tomato' }}>Foody-India</span>, we believe that great food brings people together, creating unforgettable memories and connections. Our passion for delicious cuisine drives us to provide an exceptional dining experience that delights every palate. Whether you're planning a special celebration, a casual get-together, or a cozy meal for two, we’re here to make every moment extraordinary.
                        </p>
                        <p className="about-text justified-text" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                            Looking to reserve a table for your next dining adventure? Have a question about our diverse and carefully crafted menu? Or perhaps you’d like to share your feedback to help us serve you better? No matter the reason, our dedicated team is here to assist you every step of the way.
                        </p>
                        <p className="about-text justified-text" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                            At <span style={{ color: 'tomato' }}>Foody-India</span>, your satisfaction is our priority, and we’re committed to ensuring your time with us is nothing short of perfect. So go ahead, reach out, and let us help make your dining experience one to remember!
                        </p>
                        <p className="about-text justified-text" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                            At <span style={{ color: 'tomato' }}>Foody-India</span>, we celebrate the joy of sharing exceptional meals that bring people closer. With a focus on quality, creativity, and hospitality, we strive to create a dining experience that exceeds your expectations. Whether it's a special event, a casual outing, or simply a desire to explore new flavors, we’re here to make every moment count.
                        </p>
                    </div>

                    <div className="col-md-6" style={{ paddingLeft: '15px' }}>
                        <img
                            src={cus}
                            alt="Company"
                            className="img-fluid rounded shadow"
                            style={{ height: '560px', marginTop: '5px' }}
                        />
                    </div>
                </div>

                {/* Google Map and Contact Form Section */}
                <h2 className="fi">Contact Us Now</h2>

                <div className="contact-details">
                    {/* Google Map Section */}
                    <div className="map-container">
                        <iframe
                            title="Google Map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.682494413212!2d88.3452!3d22.494884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02714972a5e51b%3A0xf3f9b6c9e8e04d3b!2s24%2C%201A%2C%20Chandi%20Ghosh%20Rd%2C%20Ashok%20Nagar%2C%20Tollygunge%2C%20Kolkata%2C%20West%20Bengal%20700040!5e0!3m2!1sen!2sin!4v1697646499623!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="map"
                        ></iframe>
                    </div>

                    {/* Contact Form Section */}
                    <div className="form-container">
                        <form className="frm" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">Phone</label>
                                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter your phone number" required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea className="txt-ar" id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Write your message" rows="5" required></textarea>
                            </div>

                            <button type="submit" className="submit-btn">Contact Us</button>
                        </form>
                    </div>
                </div>
            </div>

            <footer style={{ backgroundColor: 'tomato', paddingTop: '20px', borderTop: '1px solid #ddd', height: '134px' }}>
                <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                    <h4 style={{ color: 'white' }}>Follow Us</h4>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '12px' }}>
                        <a href="https://facebook.com" style={{ color: 'white' }}>
                            <FaFacebookF size={24} />
                        </a>
                        <a href="https://twitter.com" style={{ color: 'white' }}>
                            <FaTwitter size={24} />
                        </a>
                        <a href="https://instagram.com" style={{ color: 'white' }}>
                            <FaInstagram size={24} />
                        </a>
                        <a href="https://linkedin.com" style={{ color: 'white' }}>
                            <FaLinkedinIn size={24} />
                        </a>
                    </div>
                </div>

                <div style={{ textAlign: 'center', color: 'white' }}>
                    <p>&copy; {new Date().getFullYear()} Foody-India. All Rights Reserved.</p>

                </div>
            </footer>

            {/* Modal to show after form submission */}
            {showModal && (
                <Modal
                    message={modalMessage}
                    messageType={messageType}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
};

export default ContactUs;
