import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "../CSS/Login.css"; 
import Modal from './Modal'; // Import the Modal component

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirm password
  const [passwordHelp, setPasswordHelp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state initialized to false
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState(""); // For success or error messages
  const navigate = useNavigate();

  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPasswordHelp(""); // Reset the password help message

    if (!passwordRegex.test(password)) {
      setPasswordHelp("Password does not meet the requirements!");
      return;
    }
    if (password !== confirmPassword) {
      setPasswordHelp("Passwords do not match!");
      return;
    }

    // Send registration request to the server
    const response = await fetch("http://localhost:5008/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      setModalMessage("Registration successful!"); // Set success message
      setModalType("success");
      setModalVisible(true); // Show the modal
      setTimeout(() => {
        setModalVisible(false); // Hide the modal after a few seconds
        navigate("/Login"); // Redirect to login page
      }, 2000); // Adjust timing as needed
    } else {
      const errorData = await response.json();
      setModalMessage(errorData.message || "Registration failed!");
      setModalType("error");
      setModalVisible(true); // Show the modal
    }
  };

  const handleLoginClick = () => {
    navigate('/Login');
  };

 

  return (
    <div className="img-cont-lgrg">
      <div className="container login-container">
        <div className="login-form text-center">
          <h2 className="mb-4">Register</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3 text-start">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="text"
                className="form-control inp"
                id="email"
                placeholder="Enter email or phone number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3 text-start">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control inp"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
            </div>

            <div className="mb-3 text-start">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control inp"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                Register
              </button>
            </div>
          </form>

          <p>Already registered?</p>
          <button className="btn" style={{backgroundColor:'#0fbb0f',height:'37px',width:'324px',color:'white'}} onClick={handleLoginClick}>Login</button>
        </div>
        {/* Modal */}
        {modalVisible && ( // Conditionally render the modal based on modalVisible state
          <Modal
            message={modalMessage}
            messageType={modalType}
            onClose={() => setModalVisible(false)}
          />
        )}
      
      </div>
    </div>
  );
};

export default Register;
