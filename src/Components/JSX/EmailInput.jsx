// EmailInput.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from './Modal';
import '../CSS/ForgetPassword.css';

const EmailInput = () => {
    const [email, setEmail] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const navigate = useNavigate();

    const closeModal = () => {
        setShowModal(false); // Hide the modal
    };

    const handleSendOtp = async () => {
        try {
            const response = await axios.post('http://localhost:5009/api/check-email', { email });
            if (response.data.registered) {
                const generatedOtp = Math.floor(1000 + Math.random() * 9000);
                const send = await axios.post('http://localhost:5009/api/send-otp', { email, otp: generatedOtp });
                if (send.data.otp) {

                    setModalMessage('OTP sent successfully');
                    setMessageType('success');
                    setShowModal(true);
                    console.log("Modal should show: OTP sent successfully");
                    setTimeout(() => {navigate('/verify-otp', { state: { email, generatedOtp } });}, 5000);
                }
            } else {
                setModalMessage('User not registered, please register first.');
                setMessageType('error');
                setShowModal(true);
                console.log("Modal should show: User not registered.");
                setTimeout(() => navigate("/Register"), 3000);
            }
        } catch (error) {
            console.error(error);
            setModalMessage('Error sending OTP. Please try again later.');
            setMessageType('error');
            setShowModal(true);
        }
    };
    

    return (
        <div className="img-cont-lgrg-fp">
        <div className="container login-container">
            <div className="login-form text-center">
            <h2 className="mb-4">Mail Verification</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleSendOtp(); }}>
                <div className="mb-3 text-start">
                <label htmlFor="mail" className="form-label">Mail</label>
                    <input
                        type="email"
                        id="mail"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control inp"
                        required
                    />
                    </div>
                    <div className="d-grid mb-4">
                    <button type="submit" className="btn btn-primary">Send OTP</button>
                    </div>
                </form>

            </div>
                {showModal && (
                <Modal
                    message={modalMessage}
                    messageType={messageType}
                    onClose={closeModal}
                />
            )}
        </div>
        </div>
    );
};

export default EmailInput;
