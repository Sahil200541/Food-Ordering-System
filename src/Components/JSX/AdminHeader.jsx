// src/Components/AdminHeader.jsx
import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const img = 'Images/logo1.png';

const AdminHeader = () => {
  const location = useLocation();
  const { mail } = location.state;
  return (
    <Navbar style={{ backgroundColor: 'tomato', height:'86px'}} variant="dark" expand="lg" className="admin-header mb-0"> {/* Remove margin-bottom if present */}
      <Container fluid className="px-0"> {/* Remove padding by setting px-0 */}
        <Navbar.Brand href="#home" style={{fontWeight:'bold',color:'#391a05'}}>
          <img
            src={img} // Replace with the path to your logo
            width="40"
            height="40"
            className="d-inline-block align-top"
            alt="Foody-India logo"
            style={{ marginTop: '-10px',marginLeft: '30px'}}
          />
          {' '}
          Foody-India
        </Navbar.Brand>
        <Nav className="ms-auto">
          <Navbar.Text className="" style={{marginRight:'15px',color:'#391a05',fontWeight:'bold'}}>
            Welcome {mail}
          </Navbar.Text>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default AdminHeader;
