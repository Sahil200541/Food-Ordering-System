import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal';

const ModalAddress = ({ onClose, email, editAddress, onDelete }) => {
  const [phnNo1, setPhnNo1] = useState('');
  const [phnNo2, setPhnNo2] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (editAddress) {
      setIsEditMode(true);
      setPhnNo1(editAddress.phnNo1);
      setPhnNo2(editAddress.phnNo2);
      setAddressLine1(editAddress.addressLine1);
      setAddressLine2(editAddress.addressLine2);
      setCity(editAddress.city);
      setState(editAddress.state);
      setPinCode(editAddress.pinCode);
    }
  }, [editAddress]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const addressData = { email, phnNo1, phnNo2, addressLine1, addressLine2, city, state, pinCode };

    try {
      if (isEditMode) {
        await axios.put(`http://localhost:5010/api/addresses-update`, addressData);
      } else {
        await axios.post('http://localhost:5010/api/address', addressData);
      }
      onClose();
    } catch (error) {
      console.error('Error saving address:', error);
      setModalMessage('Failed to save address.');
      setMessageType('error');
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    onClose();
  };

  const handleDelete = async () => {
    try {
      await onDelete(editAddress._id);
      onClose();
    } catch (error) {
      console.error('Error deleting address:', error);
      setModalMessage('Failed to delete address.');
      setMessageType('error');
      setShowModal(true);
    }
  };

  return (
    <>
      <div style={overlayStyle} onClick={onClose} /> {/* Dark overlay */}
      <div style={modalContainerStyle}>
        <button onClick={onClose} style={closeButtonStyle}>✕</button>
        <h2 style={headerStyle}>{isEditMode ? 'Edit Address' : 'Add New Address'}</h2>
        <form onSubmit={handleSubmit} style={formStyle}>
          <input type="text" value={phnNo1} onChange={(e) => setPhnNo1(e.target.value)} placeholder="Phone Number 1" required style={inputStyle} />
          <input type="text" value={phnNo2} onChange={(e) => setPhnNo2(e.target.value)} placeholder="Phone Number 2" style={inputStyle} />
          <input type="text" value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} placeholder="Address Line 1" required style={inputStyle} />
          <input type="text" value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} placeholder="Address Line 2" style={inputStyle} />
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" required style={inputStyle} />
          <input type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder="State" required style={inputStyle} />
          <input type="text" value={pinCode} onChange={(e) => setPinCode(e.target.value)} placeholder="Pin Code" required style={inputStyle} />

          <button type="submit" style={submitButtonStyle}>{isEditMode ? 'Update Address' : 'Add Address'}</button>
          {isEditMode && <button type="button" onClick={handleDelete} style={deleteButtonStyle}>Delete Address</button>}
        </form>

        {showModal && (
          <Modal
            message={modalMessage}
            messageType={messageType}
            onClose={closeModal}
          />
        )}
      </div>
    </>
  );
};

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark transparent background
  zIndex: 999, // Behind the modal but in front of the rest of the content
};

const modalContainerStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#fff',
  padding: '20px',
  width: '400px',
  borderRadius: '8px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  zIndex: 1000,
};

const headerStyle = {
  color: 'tomato',
  textAlign: 'center',
  marginBottom: '20px',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const inputStyle = {
  padding: '10px',
  marginBottom: '12px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  fontSize: '14px',
};

const submitButtonStyle = {
  backgroundColor: 'tomato',
  color: '#fff',
  padding: '10px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px',
  marginTop: '10px',
};

const deleteButtonStyle = {
  backgroundColor: 'red',
  color: '#fff',
  padding: '10px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px',
  marginTop: '10px',
};

const closeButtonStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  background: 'none',
  border: 'none',
  fontSize: '18px',
  cursor: 'pointer',
  color: '#555',
};

export default ModalAddress;
