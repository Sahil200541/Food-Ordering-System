// OtpVerification.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Modal from './Modal';
import '../CSS/ForgetPassword.css';

const Verifyad = () => {
    const [otp, setOtp] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [showModal, setShowModal] = useState(false);;
    const [messageType, setMessageType] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { email, generatedOtp } = location.state || {};

    const handleVerifyOtp = () => {
        if (parseInt(otp) === generatedOtp) {
            setModalMessage('OTP verified');
            setMessageType('success');
            setShowModal('true');

            setTimeout(() => {
                navigate('/reset-password-admin', { state: { email } });
            }, 5000);
        } else {
            setModalMessage('Incorrect OTP. Please try again.');
            setMessageType('error');
            setShowModal('true');
        }
    };

    const closeModal = () => {
        setShowModal(false); // Hide the modal
    };

    return (
        <div className="img-cont-lgrg-fp">
        <div className="container login-container">
            <div className="login-form text-center">
            <h2 className="mb-4">OTP Verification</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleVerifyOtp(); }}>
            <div className="mb-3 text-start">
                <label htmlFor="otp" className="form-label">Enter OTP</label>
                <input
                    type="text"
                    id="otp"
                    className="form-control inp"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                />
                </div>
                
                <div className="d-grid mb-4">
                    <button type="submit" className="btn btn-primary">Verify OTP</button>
                    </div>
                </form>
                </div>
                {showModal && <Modal message={modalMessage} messageType={messageType} onClose={closeModal} />}
            </div>
        </div>
    );
};

export default Verifyad;
