// Modal.jsx
import React from 'react';
 // Include your modal styling here
import '../CSS/Modal.css';
const Modal = ({ message, messageType, onClose }) => {
    const modalStyle = {
        color: messageType === "success" ? "green" : "red", // Set color based on message type
    };

    const modalStyle1 = {
        backgroundColor : messageType === "success" ? "green" : "red", // Set color based on message type
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content1">
                <p style={modalStyle}>{message}</p>
                <button style={modalStyle1} className="mod-bt" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Modal;