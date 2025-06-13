import React, { useEffect, useState } from 'react'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import axios from 'axios';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

// ALL CSS FILE INPORT HERE --
import '../CSS/Admin.css';
import '../CSS/Slide.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../CSS/FoodItems.css";



// ALL IMAGES IMPORT HERE --
import img1 from './Img/img1.png';
import img2 from './Img/img2.png';
import img3 from './Img/img3.png';
import img4 from './Img/img4.png'; // New image
import img5 from './Img/img5.png'; // New image
import img6 from './Img/img6.png'; // New image
import img7 from './Img/img7.png'; // New image
import img8 from './Img/img8.png'; // New image

import pizzaImg from "./Img/food_1.png";
import sushiImg from "./Img/food_2.png";
import tacosImg from "./Img/food_3.png";
import pastaCarbonaraImg from "./Img/food_4.png";
import biryaniImg from "./Img/food_5.png";
import burgerImg from "./Img/food_6.png";
import padThaiImg from "./Img/food_7.png";
import falafelImg from "./Img/food_8.png";
import ramenImg from "./Img/food_9.png";
import hummusImg from "./Img/food_10.png";
import curryImg from "./Img/food_11.png";
import dumplingsImg from "./Img/food_12.png";
import steakImg from "./Img/food_13.png";
import paellaImg from "./Img/food_14.png";
import crepesImg from "./Img/food_15.png";
import shawarmaImg from "./Img/food_16.png";
import lasagnaImg from "./Img/food_17.png";
import friedRiceImg from "./Img/food_18.png";
import burritoImg from "./Img/food_19.png";
import samosaImg from "./Img/food_20.png";
import phoImg from "./Img/food_21.png";
import kebabsImg from "./Img/food_22.png";
import poutineImg from "./Img/food_23.png";
import gyozaImg from "./Img/food_24.png";
import bruschettaImg from "./Img/food_25.png";
import nachosImg from "./Img/food_26.png";
import risottoImg from "./Img/food_27.png";
import tempuraImg from "./Img/food_28.png";
import springRollsImg from "./Img/food_29.png";
import quesadillaImg from "./Img/food_30.png";


import logo1 from "./Img/logo1.jpg";

const foodItems = [
  { name: "Pizza", img: pizzaImg },
  { name: "Sushi", img: sushiImg },
  { name: "Tacos", img: tacosImg },
  { name: "Pasta Carbonara", img: pastaCarbonaraImg },
  { name: "Biryani", img: biryaniImg },
  { name: "Burger", img: burgerImg },
  { name: "Pad Thai", img: padThaiImg },
  { name: "Falafel", img: falafelImg },
  { name: "Ramen", img: ramenImg },
  { name: "Hummus", img: hummusImg },
  { name: "Curry", img: curryImg },
  { name: "Dumplings", img: dumplingsImg },
  { name: "Steak", img: steakImg },
  { name: "Paella", img: paellaImg },
  { name: "Crepes", img: crepesImg },
  { name: "Shawarma", img: shawarmaImg },
  { name: "Lasagna", img: lasagnaImg },
  { name: "Fried Rice", img: friedRiceImg },
  { name: "Burrito", img: burritoImg },
  { name: "Samosa", img: samosaImg },
  { name: "Pho", img: phoImg },
  { name: "Kebabs", img: kebabsImg },
  { name: "Poutine", img: poutineImg },
  { name: "Gyoza", img: gyozaImg },
  { name: "Bruschetta", img: bruschettaImg },
  { name: "Nachos", img: nachosImg },
  { name: "Risotto", img: risottoImg },
  { name: "Tempura", img: tempuraImg },
  { name: "Spring Rolls", img: springRollsImg },
  { name: "Quesadilla", img: quesadillaImg },
];

const Home = () => {
  const [offers, setOffers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate hook
  
  const fetchOffers = async () => {
    try {
      const response = await axios.get('http://localhost:5006/api/offers');
      console.log('Fetched offers:', response.data); // Log offers
      setOffers(response.data);
    } catch (error) {
      console.log('Error fetching offers:', error);
    }
  };

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
    fetchOffers();
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

  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7, // Shows 7 circles per slide
    slidesToScroll: 1, // Slides 1 circle at once on click
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    onSwipe: (direction) => {
      // Adjust slidesToScroll during drag/swipe
      settings.slidesToScroll = 7; // Slides 7 circles at once on drag
    },
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

      {/* Slider */}

      <div className="Slide-bar">
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="5"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="6"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="7"></li>
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img className="d-block w-100" src={img1} alt="First slide" />
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src={img2} alt="Second slide" />
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src={img3} alt="Third slide" />
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src={img4} alt="Fourth slide" /> {/* New image */}
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src={img5} alt="Fifth slide" /> {/* New image */}
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src={img6} alt="Sixth slide" /> {/* New image */}
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src={img7} alt="Seventh slide" /> {/* New image */}
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src={img8} alt="Eighth slide" /> {/* New image */}
            </div>
          </div>
          <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>

      {/* FoodItems */}
      <h2 className="home">Food Items</h2>
      <div className="Food-items">
        <div className="food-items-container">
          <Slider {...settings}>
            {foodItems.map((food, index) => (
              <div key={index} className="food-slide">
                <div className="food-circle">
                  <img src={food.img} alt={food.name} className="food-image" />
                </div>
                <p className="food-name">{food.name}</p>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* Offers card */}
      <div className="offers" style={{ marginBottom: '15px' }}>
        <h2 className="home">Special Offers</h2>
        {offers.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'black', fontWeight: 'bold', fontSize: '15px' }}>No  offers available.</p>
        ) : (
          <div className="offers-display">
            <div className="offers-list">
              {offers.map((offer) => (
                <div className="offer-card" key={offer._id}>
                  <img
                    src={offer.imageUrl}
                    alt={offer.description}
                    className="offer-image"

                  />
                  <div className="des-div-"><p className="offer-description">{offer.description}</p></div>
                </div>
              ))}
            </div>
          </div>
        )}
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
  )
}

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <button
      className={className}
      style={{
        ...style,
        display: "block",
        background: "black",
        color: "#fff",
        border: "none",
        padding: "0px",
        borderRadius: "50%",
        cursor: "pointer",
        position: 'absolute', // Keep it positioned correctly
        top: '79px',// Adjust as needed
        zIndex: 1,
      }}
      onClick={onClick}
    >
      &rarr;
    </button>
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <button
      className={className}
      style={{
        ...style,
        display: "block",
        background: "#333",
        color: "#fff",
        border: "none",
        padding: "0px",
        borderRadius: "50%",
        cursor: "pointer",
        position: 'absolute', // Keep it positioned correctly
        top: '79px',
        left: '-30px', // Adjust as needed
        zIndex: 1,
      }}
      onClick={onClick}
    >
      &larr;
    </button>
  );
};

export default Home;
