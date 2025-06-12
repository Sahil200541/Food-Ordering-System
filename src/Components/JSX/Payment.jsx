import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo1 from './Img/logo1.jpg';
import ModalAddress from './ModalAddress';
import '../CSS/Payment.css';
import Modal from './Modal';

const Payment = () => {
  const location = useLocation();
  const { mname, realprice, discprice, email, description, image } = location.state;
  const deliveryCharge = 40;
  const totalAmount = discprice + deliveryCharge;
  const navigate = useNavigate();

  const [selectedPayment, setSelectedPayment] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [editAddress, setEditAddress] = useState(null);

  useEffect(() => {
    fetchAddresses();
  }, [email]);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(`http://localhost:5010/api/addresses?email=${email}`);
      setAddresses(response.data);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      setModalMessage('Please select an address.');
      setMessageType('error');
      setShowModal(true);
      return;
    }

    const orderDetails = {
      email,
      mname,
      image,
      realprice,
      discprice,
      description,
      deliveryCharge,
      totalAmount,
      address: selectedAddress,
      status: 'Pending',
    };

    try {
      await axios.post('http://localhost:5010/api/orders', orderDetails);
      setModalMessage('Your Order Request Received!');
      setMessageType('success');
      setShowModal(true);
      setTimeout(() => {
        navigate('/order-status');
      }, 4000);
    } catch (error) {
      console.error('Error placing order:', error);
      setModalMessage('Order Request failed!');
      setMessageType('error');
      setShowModal(true);
    }
  };

  const handlePaymentOptionClick = (paymentMode) => {
    if (!selectedAddress) {
      setModalMessage('Please select an address before proceeding to payment.');
      setMessageType('error');
      setShowModal(true);
      return;
    }
    setSelectedPayment(paymentMode);
  };

  const handleEditAddress = (address) => {
    setEditAddress(address);
    setShowAddAddressModal(true);
  };

  const handleAddAddress = () => {
    setEditAddress(null); // Clear the edit mode
    setShowAddAddressModal(true); // Open the modal
  };

  const handleDeleteAddress = async (id) => {
    try {
      await axios.delete(`http://localhost:5010/api/addresses/${id}`, {
        data: { email }
      });
      setModalMessage('Address deleted successfully!');
      setMessageType('success');
      setShowModal(true);
      fetchAddresses();
    } catch (error) {
      console.error('Error deleting address:', error);
      setModalMessage('Failed to delete address.');
      setMessageType('error');
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const closeAddressModal = () => {
    setShowAddAddressModal(false);
    fetchAddresses(); // Refresh the address list after closing the modal
  };

  return (
    <div className="payment-page">
      <div className="payment-header">
        <img src={logo1} alt="Foody-India Logo" className="logo" />
        <h1 className="payment-title">Foody-India</h1>
      </div>

      <div className="payment-content">
        <div className="payment-sidebar">
          <h4 className="mb-4" style={{ color: 'tomato' }}>Payment Options</h4>
          <div onClick={() => handlePaymentOptionClick('upi')} className={`payment-option ${selectedPayment === 'upi' ? 'selected' : ''}`}>
            UPI
          </div>
          <div onClick={() => handlePaymentOptionClick('cod')} className={`payment-option ${selectedPayment === 'cod' ? 'selected' : ''}`}>
            Cash on Delivery
          </div>
          <h4 style={{ marginTop: '25px', marginBottom: '15px', color: 'tomato' }}>Select Address</h4>
          {addresses.map((addr, index) => (
            <div key={index}>
              <label>
                <input
                  type="radio"
                  style={{ marginRight: '10px', fontSize: '20px', color: 'tomato' }}
                  name="selectedAddress"
                  value={`Phone Numbers : ${addr.phnNo1}, ${addr.phnNo2} Address : ${addr.addressLine1}, ${addr.addressLine2} ${addr.city}, ${addr.state} - ${addr.pinCode}`}
                  onChange={(e) => setSelectedAddress(e.target.value)}
                />
                {`Phone Numbers : ${addr.phnNo1}, ${addr.phnNo2} Address : ${addr.addressLine1}, ${addr.addressLine2} ${addr.city}, ${addr.state} - ${addr.pinCode}`}
              </label>
              <div className="address-buttons">
                <button style={{ backgroundColor: 'green', padding: '4px', marginRight: '6px', marginTop: '10px', marginBottom: '10px', width: '50px', marginLeft: '200px' }} onClick={() => handleEditAddress(addr)}>Edit</button>
                <button style={{ backgroundColor: 'red', padding: '4px', marginTop: '10px', marginBottom: '10px', width: '60px' }} onClick={() => handleDeleteAddress(addr._id)}>Delete</button>
              </div>
            </div>
          ))}
          <button style={{ marginTop: '10px' }} onClick={handleAddAddress}>Add Address</button>
        </div>

        <div className="payment-details">
          {selectedPayment === 'upi' && <p>UPI is not available now.</p>}

          {selectedPayment === 'cod' && (
            <div className="cod-section">
              <h4>Order Summary</h4>
              <p><strong>Email:</strong> {email}</p>
              <p><strong>Food Item:</strong> {mname}</p>
              <img src={image} alt={mname} className="food-image" />
              <p><strong>Real Price:</strong> ₹{realprice}</p>
              <p><strong>Discount Price:</strong> ₹{discprice}</p>
              <p><strong>Delivery Charge:</strong> ₹{deliveryCharge}</p>
              <h5><strong>Total Amount:</strong> ₹{totalAmount}</h5>
              <button className="order-button" onClick={handlePlaceOrder}>Place Order</button>
            </div>
          )}
        </div>
      </div>

      {showAddAddressModal && (
        <ModalAddress
          onClose={closeAddressModal}
          email={email}
          editAddress={editAddress} // Pass editAddress state to ModalAddress
        />
      )}

      {showModal && (
        <Modal
          message={modalMessage}
          messageType={messageType}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Payment;
