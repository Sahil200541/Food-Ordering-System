import React, { useEffect, useState } from 'react';
import { Navbar, Nav, NavDropdown, Button, Container } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import logo1 from "./Img/logo1.jpg";
import '../CSS/Admin.css';
import '../CSS/AboutUs.css';
import axios from 'axios';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const about = 'Images/about.jpg';
const member1 = 'Images/swarna.jpg';
const member2 = 'Images/sahil.webp';
const member3 = 'Images/chandan.jpeg';
const member4 = 'Images/arif.jpeg';
const member5 = 'Images/sumit.jpeg';


const AboutUs = () => {
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
  return (
    <div>
      {/* Navbar */}
      <div className="upper">
        <Navbar expand="lg" style={{ backgroundColor: 'white' }}>
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
          <Container>

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

          </Container>
            {/* Right side: Login Button */}
            {isLoggedIn ? (
                    <button className="login-btn"   onClick={handleLogout}>Logout</button>
                ) : (
                    <button className="login-btn"   onClick={handleLoginClick}>Login</button>
                )}
        </Navbar>
      </div>
      <div className="bg">
        <h1 className="abt-txt">About Us</h1>
      </div>

      {/* About Us */}
      <div className="about-us">
        <div className="container about-section" style={{ padding: '50px 0' }}>
          {/* <h1 className="text-center mb-4">About Us</h1> */}

          {/* Text Content */}
          <div className="row mb-5">
            <div className="col-md-6">
              <p className="about-text justified-text" style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
                Welcome to Foody-India, where we bring the vibrant and diverse flavors of Indian cuisine to your table! Established in [Year], our mission is to deliver an exceptional dining experience, blending traditional Indian recipes with a modern twist. Our chefs craft every dish using the freshest ingredients and authentic spices, ensuring bold, rich flavors that reflect the heart of Indian culture.

                From aromatic curries and flavorful biryanis to fresh tandoori delights, Foody-India offers a menu that caters to all tastes, including vegetarian and vegan options. Whether you’re dining in or ordering for home, we aim to provide top-notch service and unforgettable meals.
              </p>
              <p className="about-text justified-text" style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
                Our mission is to provide exceptional value and support, making a lasting impact. We owe our success to our
                dedicated team, committed to excellence and passionate about driving progress.
              </p>
            </div>

            {/* Image */}
            <div className="col-md-6">
              <img
                src={about}
                alt="Company"
                className="img-fluid rounded shadow"
              />
            </div>
          </div>

          <h2 className="fi">Team Members</h2>

          {/* Team Section */}
          <div className="row text-center">
            {/* Team Member 1 */}
            <div className="col-md-4 mb-5 ">
              <img
                src={member1}
                alt="Team Member 1"
                className="img-fluid rounded-circle mb-3 crcl"
              />
              <h5>Swarnadeep Maity</h5>
              <p>CEO & Founder</p>
            </div>

            {/* Team Member 2 */}
            <div className="col-md-4 mb-5 ">
              <img
                src={member2}
                alt="Team Member 2"
                className="img-fluid rounded-circle mb-3 crcl"
              />
              <h5>Sahil Laha</h5>
              <p>Chief Operations Officer</p>
            </div>

            {/* Team Member 3 */}
            <div className="col-md-4 mb-5 ">
              <img
                src={member3}
                alt="Team Member 3"
                className="img-fluid rounded-circle mb-3 crcl"
              />
              <h5>Chandan Biswas</h5>
              <p>Chief Marketing Officer</p>
            </div>

            {/* Team Member 4 */}
            <div className="col-md-6 mb-5 ">
              <img
                src={member4}
                alt="Team Member 4"
                className="img-fluid rounded-circle mb-3 crcl"
              />
              <h5>Arif Sekh</h5>
              <p>Chief Technology Officer</p>
            </div>

            {/* Team Member 5 */}
            <div className="col-md-6 mb-5 ">
              <img
                src={member5}
                alt="Team Member 5"
                className="img-fluid rounded-circle mb-3 crcl"
              />
              <h5>Sumit BK</h5>
              <p>Chief Financial Officer</p>
            </div>
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
    </div>
  );
};

export default AboutUs;
