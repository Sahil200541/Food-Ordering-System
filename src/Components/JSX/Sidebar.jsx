// src/Components/Sidebar.jsx
import React from 'react';
import { Nav } from 'react-bootstrap';

const Sidebar = ({ setActiveTab }) => {
  return (
    <Nav className="flex-column">
      <Nav.Link onClick={() => setActiveTab('dashboard')} style={{color:'#391a05',fontWeight:'bold'}}>Dashboard</Nav.Link>
      <Nav.Link onClick={() => setActiveTab('createMenu')} style={{color:'#391a05',fontWeight:'bold'}}>Create Menu</Nav.Link>
      <Nav.Link onClick={() => setActiveTab('createOffers')} style={{color:'#391a05',fontWeight:'bold'}}>Create Offers</Nav.Link>
      <Nav.Link onClick={() => setActiveTab('feedbacks')} style={{color:'#391a05',fontWeight:'bold'}}>Feedbacks</Nav.Link>
      <Nav.Link onClick={() => setActiveTab('users')} style={{color:'#391a05',fontWeight:'bold'}}>Contact Users</Nav.Link>
      <Nav.Link onClick={() => setActiveTab('bookingManagement')} style={{color:'#391a05',fontWeight:'bold'}}>Food Orders</Nav.Link>
      <Nav.Link onClick={() => setActiveTab('bookedTables')} style={{color:'#391a05',fontWeight:'bold'}}>Booked Tables</Nav.Link>
    </Nav>
  );
};

export default Sidebar;
