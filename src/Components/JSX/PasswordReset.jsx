// PasswordReset.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Modal from './Modal';
import '../CSS/ForgetPassword.css';



const PasswordReset = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [showModal, setShowModal] = useState(false);;
    const [messageType, setMessageType] = useState('');
    const [passwordHelp, setPasswordHelp] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const { email } = location.state || {};

    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

    const handlePasswordToggle = () => {
        setShowPassword(!showPassword);
    };

    const handleChangePassword = async () => {
        if (!passwordRegex.test(password)) {
            setPasswordHelp("Password does not meet the requirements!");
            return;
          }
        try {
            await axios.post('http://localhost:5009/api/change-password', { email, password });
            setModalMessage('Password changed successfully.');
            setMessageType('success');
            setShowModal('true');
            setTimeout(() => navigate("/Login"), 5000);
        } catch (error) {
            console.error(error);
            setModalMessage('Error changing password. Please try again.');
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
                    <h2 className="mb-4">Change Password</h2>
                    <form onSubmit={(e) => { e.preventDefault(); handleChangePassword(); }}>
                        <div className="mb-3 text-start">
                            <label htmlFor="password" className="form-label">Password</label>
                            <div className="input-group">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    placeholder="Enter new password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="form-control inp"
                                    required
                                />
                                <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={handlePasswordToggle}
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                            <div
                                id="passwordHelp"
                                className={`form-text ${passwordHelp && "text-danger"}`}
                            >
                                {passwordHelp ||
                                    "Password must be 8 characters long, contain a number and a special character."}
                            </div>
                        </div>


                        <div className="d-grid mb-4">
                            <button className="btn btn-primary" type="submit">
                                Change Password
                            </button>
                        </div>



                    </form>
                </div>
                {showModal && <Modal message={modalMessage} messageType={messageType} onClose={closeModal} />}
            </div>
        </div>
    );
};

export default PasswordReset;
