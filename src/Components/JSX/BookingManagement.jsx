// src/Components/BookingManagement.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from './Modal'; // Import your custom modal
import '../CSS/BookingManagement.css';

const BookingManagement = () => {
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  
  // Fetch orders from the server
  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5010/api/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  // Confirm order
  const confirmOrder = async (id) => {
    try {
      await axios.put(`http://localhost:5010/api/orders/confirm/${id}`);
      setModalMessage('Order confirmed successfully.');
      setMessageType('success');
      setShowModal(true);
      fetchOrders(); // Refresh orders
    } catch (error) {
      console.error('Error confirming order:', error);
      setModalMessage('Failed to confirm order.');
      setMessageType('error');
      setShowModal(true);
    }
  };

  // Cancel order
  const cancelOrder = async (id) => {
    try {
      await axios.put(`http://localhost:5010/api/orders/cancel/${id}`);
      setModalMessage('Order canceled successfully.');
      setMessageType('success');
      setShowModal(true);
      fetchOrders(); // Refresh orders
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
      await axios.delete(`http://localhost:5010/api/orders/${id}`);
      setModalMessage('Order deleted successfully.');
      setMessageType('success');
      setShowModal(true);
      fetchOrders(); // Refresh orders
    } catch (error) {
      console.error('Error deleting order:', error);
      setModalMessage('Failed to delete order.');
      setMessageType('error');
      setShowModal(true);
    }
  };

  // Set order status to Out for Delivery
  const outForDelivery = async (id) => {
    try {
      await axios.put(`http://localhost:5010/api/orders/out-for-delivery/${id}`);
      setModalMessage('Order is now out for delivery.');
      setMessageType('success');
      setShowModal(true);
      fetchOrders(); // Refresh orders
    } catch (error) {
      console.error('Error updating order status:', error);
      setModalMessage('Failed to update order status.');
      setMessageType('error');
      setShowModal(true);
    }
  };

  // Set order status to Delivered
  const markAsDelivered = async (id) => {
    try {
      await axios.put(`http://localhost:5010/api/orders/delivered/${id}`);
      setModalMessage('Order marked as delivered.');
      setMessageType('success');
      setShowModal(true);
      fetchOrders(); // Refresh orders
    } catch (error) {
      console.error('Error updating order status:', error);
      setModalMessage('Failed to mark order as delivered.');
      setMessageType('error');
      setShowModal(true);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="admin-panel">
      <h2 className="he2">Food Orders</h2>
      {orders.length === 0 ? (
        <p>No orders available.</p>
      ) : (
        <div className="orders-container">
          {orders.map((order) => (
            <div className="order-card" key={order._id}>
              <h4>Email: {order.email}</h4>
              <p><strong>Food Item:</strong> {order.menuname}</p>
              <p><strong>Description:</strong> {order.description}</p>
              <p><strong>Image:</strong> <img src={order.image} alt={order.mname} className="order-image" /></p>
              <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Address:</strong> {order.address}</p>
              {order.status === 'Confirmed' && <p className="status-confirmed">Order Confirmed</p>}
              {order.status === 'Canceled' && <p className="status-canceled">Order Canceled</p>}
              <div className="order-buttons">
                {order.status === 'Pending' && (
                  <>
                    <button style={{backgroundColor:'green'}} onClick={() => confirmOrder(order._id)}>Confirm</button>
                    <button style={{backgroundColor:'red'}} onClick={() => cancelOrder(order._id)}>Cancel</button>
                  </>
                )}
                {order.status === 'Confirmed' && (
                  <>
                    <button style={{backgroundColor:'orange'}} onClick={() => outForDelivery(order._id)}>Out for Delivery</button>
                    <button style={{backgroundColor:'blue'}} onClick={() => markAsDelivered(order._id)}>Delivered</button>
                  </>
                )}
                {order.status === 'Out for Delivery' && (
                  <>
                    <button style={{backgroundColor:'blue'}} onClick={() => markAsDelivered(order._id)}>Delivered</button>
                  </>
                )}
                {order.status === 'Delivered' || order.status === 'Canceled' ? (
                  <button style={{backgroundColor:'tomato'}} onClick={() => deleteOrder(order._id)}>Delete</button>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      )}

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

export default BookingManagement;
