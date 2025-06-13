import React, { useEffect, useState } from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import '../CSS/Admin.css';
import '../CSS/Orderst.css';
import Modal from './Modal'; // Import your custom modal
import logo1 from "./Img/logo1.jpg";
import axios from 'axios';

const OrderStatus = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const loginButton = async () => {
        try {
            const res = await fetch('http://localhost:5008/log-token', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            if (res.ok) {
                const userData = await res.json();
                setUserEmail(userData.email);
                setIsLoggedIn(true);
                fetchUserOrders(userData.email);
            } else {
                setIsLoggedIn(false);
            }
        } catch (err) {
            console.log('Error fetching login status:', err);
            setIsLoggedIn(false);
        }
    };

    const fetchUserOrders = async (email) => {
        try {
            const response = await fetch(`http://localhost:5010/orders/${email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                credentials: 'include'
            });

            if (response.ok) {
                const orderData = await response.json();
                // Assuming each order contains the necessary fields: mname, image, totalAmount, and status
                setOrders(orderData); // Set orders directly if they already include menu details
            } else {
                console.error('Failed to fetch orders:', response.status);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const logoutButton = async () => {
        try {
            const response = await fetch('http://localhost:5008/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                credentials: 'include'
            });

            if (response.ok) {
                setIsLoggedIn(false);
                localStorage.removeItem('jwtoken');
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    useEffect(() => {
        loginButton();
    }, []);

    const handleLogout = () => {
        logoutButton();
        setIsLoggedIn(false);
    };

    const handleLoginClick = () => {
        navigate('/Register');
    };

    const getOrderStepStyle = (status, currentStep) => {
        if (status === 'Pending' && currentStep === 0) return 'step yellow';
        if (status === 'Canceled' && currentStep < 5) return 'step red';
        if (['Confirmed', 'Out for Delivery', 'Delivered'].includes(status) && currentStep <= orderStatusSteps[status]) {
            return 'step green';
        }
        return 'step';
    };

    const orderStatusSteps = {
        "Order Placed": 0,
        "Confirmed": 1,
        "Out for Delivery": 2,
        "Delivered": 3,
        "Cancelled": 4
    };

    const cancelOrder = async (id) => {
        try {
          await axios.put(`http://localhost:5010/api/orders/cancel-order/${id}`);
          setModalMessage('Order canceled successfully.');
          setMessageType('success');
          setShowModal(true);
          fetchUserOrders(userEmail); // Refresh orders
        } catch (error) {
          console.error('Error canceling order:', error);
          setModalMessage('Failed to cancel order.');
          setMessageType('error');
          setShowModal(true);
        }
      };
    
      // Delete order
      const deleteOrder = async (id) => {
        try {
          await axios.delete(`http://localhost:5010/api/delete-orders/${id}`);
          setModalMessage('Order deleted successfully.');
          setMessageType('success');
          setShowModal(true);
          fetchUserOrders(userEmail); // Refresh orders
        } catch (error) {
          console.error('Error deleting order:', error);
          setModalMessage('Failed to delete order.');
          setMessageType('error');
          setShowModal(true);
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
                    <button className="login-btn"   onClick={handleLogout}>Logout</button>
                ) : (
                    <button className="login-btn"   onClick={handleLoginClick}>Login</button>
                )}
          </Container>
        </Navbar>
      </div>

            <div className="order-status-container">
                {orders.length === 0 ? (
                    <p>No orders found for {userEmail}</p>
                ) : (
                    orders.map((order) => (
                        <div key={order.id} className="order-status-card">
                            <div className="order-details">
                                <h4 className="order-name">{order.menuname}</h4>
                                <img src={order.image} alt={order.menuname} className="order-image" />
                                <p className="order-amount">Total Amount: {order.totalAmount}</p>
                            </div>
                            <div className="steps-container">
                                {Object.keys(orderStatusSteps).map((step, index) => (
                                    <div
                                        key={index}
                                        className={getOrderStepStyle(order.status, index)}
                                    >
                                        {step}
                                    </div>
                                ))}

                                
                            </div>


                            <div style={{marginTop:'150px',marginRight:'50px'}}>
                            {order.status === 'Pending' ||  order.status === 'Confirmed' ? (
                                    <button onClick={() => cancelOrder(order._id)} style={{backgroundColor:'red',color:'white',padding:'5px',borderRadius:'5px',width:'150px'}} >Cancel Order</button>
                                ) : null}
                                {order.status === 'Delivered' || order.status === 'Canceled' ? (
                                    <button onClick={() => deleteOrder(order._id)} style={{backgroundColor:'red',color:'white',padding:'5px',borderRadius:'5px',width:'150px'}} >Delete Order</button>
                                ) : null}
                            </div>

                            
                        </div>
                    ))
                )}
            </div>
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

export default OrderStatus;
