import React, { useEffect, useState } from 'react';
import { Navbar, Nav, NavDropdown, Button, Container } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import logo1 from "./Img/logo1.jpg";
import '../CSS/Admin.css';
import axios from 'axios';
import '../CSS/Menu.css';

const Menu = () => {
  const [menus, setMenus] = useState([]);
  const [filteredMenus, setFilteredMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    priceRange: '',
    category: '',
    discountPercentage: ''
  });
  const [showFilter, setShowFilter] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  const fetchMenus = async () => {
    try {
      const response = await axios.get('http://localhost:5005/api/menus');
      setMenus(response.data);
      setFilteredMenus(response.data);
      const uniqueCategories = [...new Set(response.data.map(menu => menu.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching menus:', error);
    } finally {
      setLoading(false);
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
        const userData = await res.json();
        setUserEmail(userData.email);// Get the user data from the response
        console.log('Authenticated User mail :', userData.email); // Log the user data
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
    fetchMenus();
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

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);
    const filtered = menus.filter(menu => menu.name.toLowerCase().includes(searchValue));
    setFilteredMenus(filtered);
  };

  const handleFilter = () => {
    let filtered = menus;

    if (filters.priceRange) {
      filtered = filtered.filter(menu => {
        const price = menu.discountPrice || menu.realPrice;
        if (filters.priceRange === 'low') return price < 100;
        if (filters.priceRange === 'medium') return price >= 100 && price <= 300;
        if (filters.priceRange === 'high') return price > 300;
        return true;
      });
    }

    if (filters.category) {
      filtered = filtered.filter(menu => menu.category === filters.category);
    }

    if (filters.discountPercentage) {
      filtered = filtered.filter(menu => {
        const discount = ((menu.realPrice - menu.discountPrice) / menu.realPrice) * 100;
        if (filters.discountPercentage === 'low') return discount <= 10;
        if (filters.discountPercentage === 'medium') return discount > 10 && discount <= 30;
        if (filters.discountPercentage === 'high') return discount > 30;
        return true;
      });
    }

    setFilteredMenus(filtered);
  };

  const toggleDescription = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleOrderNow = (menu, userData) => {
    if (isLoggedIn) {
      const { name, realPrice, discountPrice, imageUrl, description } = menu;
      console.log(menu.imageUrl);
      setTimeout(() => {
        navigate('/payment', {
          state: {
            mname: name,
            realprice: realPrice,
            discprice: discountPrice,
            email: userEmail,
            description: description, // Add this line to include the description
            image: imageUrl // Add this line to include the food image URL
          }
        });

      }, 1000);
    } else {
      navigate('/register');
    }
  };


  return (
    <div>
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

      {/* Search and Filter Section */}
      <div className="search-filter-container">
        <div className="filter-container">
          <Button onClick={() => setShowFilter(!showFilter)} className="filter-btn">
            Filter
          </Button>
          {showFilter && (
            <div className="filter-dropdown">
              <div className="filter-header">
                <h4>Filters</h4>
                <button onClick={() => setShowFilter(false)} className="close-filter">
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div>
                <label>Price Range:</label>
                <select onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}>
                  <option value="">All</option>
                  <option value="low">Less than ₹100</option>
                  <option value="medium">₹100 - ₹300</option>
                  <option value="high">More than ₹300</option>
                </select>
              </div>
              <div>
                <label>Category:</label>
                <select onChange={(e) => setFilters({ ...filters, category: e.target.value })}>
                  <option value="">All</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label>Discount Percentage:</label>
                <select onChange={(e) => setFilters({ ...filters, discountPercentage: e.target.value })}>
                  <option value="">All</option>
                  <option value="low">Less than 10%</option>
                  <option value="medium">10% - 30%</option>
                  <option value="high">More than 30%</option>
                </select>
              </div>
              <Button onClick={handleFilter} className="apply-filter-btn abtn">Apply Filter</Button>
            </div>
          )}
        </div>

        <h2 style={{ marginLeft: '230px', color: 'tomato' }} >Menu</h2>

        <input
          type="text"
          placeholder="Search menu..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-bar"
        />
      </div>

      <div className="menu-container">

        {filteredMenus.length === 0 ? (
          <p>No menus available.</p>
        ) : (
          <div className="menu-grid">
            {filteredMenus.map((menu, index) => (
              <div key={menu._id} className="menu-card">
                <img src={menu.imageUrl} alt={menu.name} className="menu-image" />
                <h3 className="menu-name">{menu.name}</h3>
                <div className="menu-pricing">
                  <span className="real-price">₹{menu.realPrice}</span>
                  {menu.discountPrice && (
                    <span className="discount-price">₹{menu.discountPrice}</span>
                  )}
                  {menu.discountPrice && (
                    <span className="discount-percentage">
                      {(((menu.realPrice - menu.discountPrice) / menu.realPrice) * 100).toFixed(0)}% off
                    </span>
                  )}
                </div>
                <button
                  className="toggle-description hv"
                  style={{ backgroundColor: 'tomato', color: 'white', border: '1px solid tomato' }}
                  onClick={() => toggleDescription(index)}
                >
                  {expandedIndex === index ? 'Hide Description' : 'Show Description'}
                </button>
                {expandedIndex === index && (
                  <p className="menu-description">{menu.description}</p>
                )}
                <button
                  className="order-now-btn"
                  onClick={() => handleOrderNow(menu)}
                  style={{ backgroundColor: 'green', color: 'white', marginLeft: '20px', borderRadius: '5px', padding: '8px', border: 'none' }}
                >
                  Order Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
