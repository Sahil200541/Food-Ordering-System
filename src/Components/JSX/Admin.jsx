import React from 'react';
import { Navbar, Nav, NavDropdown, Button, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'; // Make sure this line is present
import '../CSS/Admin.css'; // Update path to Admin.css

const img = 'Images/logo1.png';
const Admin = () => {
  return (
    <div>
<Navbar expand="lg" style={{ backgroundColor: 'white' }}>
        <Container>
          {/* Left side: Logo and Name, slightly moved left */}
          <Navbar.Brand href="#home" className="logo-text" style={{ color: 'tomato' }}>
            <img
              src={img} // Ensure to update the logo path
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
                to="/home"
                className="nav-link"
                style={({ isActive }) => ({
                  color: isActive ? 'red' : 'tomato',
                  transition: 'transform 0.2s',
                  margin: '0 10px',
                  fontSize: '16px',
                })}
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                className="nav-link"
                style={({ isActive }) => ({
                  color: isActive ? 'red' : 'tomato',
                  transition: 'transform 0.2s',
                  margin: '0 10px',
                  fontSize: '16px',
                })}
              >
                About Us
              </NavLink>
              <NavLink
                to="/menu"
                className="nav-link"
                style={({ isActive }) => ({
                  color: isActive ? 'red' : 'tomato',
                  transition: 'transform 0.2s',
                  margin: '0 10px',
                  fontSize: '16px',
                })}
              >
                Menu
              </NavLink>
              <NavLink
                to="/book-table"
                className="nav-link"
                style={({ isActive }) => ({
                  color: isActive ? 'red' : 'tomato',
                  transition: 'transform 0.2s',
                  margin: '0 10px',
                  fontSize: '16px',
                })}
              >
                Book a Table
              </NavLink>
              <NavDropdown title="More" id="basic-nav-dropdown">
                <NavDropdown.Item href="#feedback">Feedback</NavDropdown.Item>
                <NavDropdown.Item href="#contact">Contact Us</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>

          {/* Right side: Login Button */}
          <Button className="login-btn">
            Login
          </Button>
        </Container>
      </Navbar>
    </div>
  );
};

export default Admin;
