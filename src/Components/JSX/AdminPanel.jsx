// src/Components/AdminPanel.jsx
import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import CreateMenu from './CreateMenu';
import CreateOffers from './CreateOffers';
import Feedbacks from './Feedbacks';
import Users from './Users';
import BookingManagement from './BookingManagement';
import AdminHeader from './AdminHeader'; // Import the AdminHeader component
import BookedTables from './BookedTables';
import '../CSS/AdminPanel.css'; // Include your CSS styles

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'createMenu':
        return <CreateMenu />;
      case 'createOffers':
        return <CreateOffers />;
      case 'feedbacks':
        return <Feedbacks />;
      case 'users':
        return <Users />;
      case 'bookingManagement':
        return <BookingManagement />;
        case 'bookedTables':
          return <BookedTables/>
      default:
        return <Dashboard />;
    }
  };

  return (
    <Container fluid>
      {/* Add AdminHeader at the top */}
      <Row style={{position:'sticky',top:'0',zIndex:'2'}}>
        <Col xs={12} style={{padding : '0px'}}>
          <AdminHeader />
        </Col>
      </Row>

      <Row >
        <Col xs={2} className="sidebar" style={{position:'fixed',zIndex:'2',overflowX:'hidden'}}>
          <Sidebar setActiveTab={setActiveTab} />
        </Col>
        <Col xs={10} className="content" style={{marginLeft:'244px'}}>
          {renderContent()}
        </Col>
      </Row>
    </Container>
  );
};

export default AdminPanel;
