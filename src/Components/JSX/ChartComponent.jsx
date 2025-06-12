// src/Components/ChartComponent.jsx
import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const ChartComponent = () => {
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalBookedTables, setTotalBookedTables] = useState(0);

  // Function to fetch total food orders
  const fetchTotalOrders = async () => {
    try {
      const response = await fetch('http://localhost:5010/api/orders/total'); // Adjust the port if necessary
      const data = await response.json();
      setTotalOrders(data.totalOrders);
    } catch (error) {
      console.error('Error fetching total orders:', error);
    }
  };

  // Function to fetch total table bookings
  const fetchTotalBookings = async () => {
    try {
      const response = await fetch('http://localhost:5007/api/bookings/total'); // Adjust the port if necessary
      const data = await response.json();
      setTotalBookedTables(data.totalBookings);
    } catch (error) {
      console.error('Error fetching total bookings:', error);
    }
  };

  useEffect(() => {
    fetchTotalOrders();
    fetchTotalBookings();
  }, []);

  return (
    <div>
      <h4>Food Orders and Table Booking Summary</h4>
      <Row>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Total Food Ordered</Card.Title>
              <Card.Text>
                {totalOrders}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Total Booked Tables</Card.Title>
              <Card.Text>
                {totalBookedTables}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ChartComponent;
