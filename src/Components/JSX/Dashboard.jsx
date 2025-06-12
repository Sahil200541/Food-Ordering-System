// src/Components/Dashboard.jsx
import React from 'react';
import { Card } from 'react-bootstrap';
import ChartComponent from './ChartComponent';

const Dashboard = () => {
  return (
    <div>
      <h2 className="he2">Dashboard</h2>
      <Card style={{marginTop:'30px'}}>
        <Card.Body>
          <ChartComponent />
        </Card.Body>
      </Card>
    </div>
  );
};

export default Dashboard;
