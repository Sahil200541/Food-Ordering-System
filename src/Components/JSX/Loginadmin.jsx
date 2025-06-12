import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/Login.css"; // Import your CSS
import Modal from './Modal'; // Import the Modal component

const Loginadmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordHelp, setPasswordHelp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState(""); // For success or error messages
  const navigate = useNavigate();

  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

  const handleForget = () => {
    navigate("/FP-admin");
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };
  const gotoHome = () => {
    navigate("/admin-page");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!passwordRegex.test(password)) {
      setPasswordHelp("Password does not meet the requirements!");
      return;
    }

    // Send login request to the server
    const response = await fetch("http://localhost:5011/login-admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include'
    });
    
    if (response.ok) {
      setModalMessage("Login successful!"); // Set success message
      setModalType("success");
      setModalVisible(true); // Show the modal
      setTimeout(() => {
        setModalVisible(false); // Hide the modal after a few seconds
        navigate("/admin-page"); // Redirect to home
      }, 2000); // Adjust timing as needed
    } else {
      const errorData = await response.json();
      setModalMessage(errorData.message || "Login failed!");
      setModalType("error");
      setModalVisible(true); // Show the modal
    }
  };

  return (
    <div className="img-cont-lgrg" >
      <div className="container login-container">
        <div className="login-form text-center">
          <h2 className="mb-4">Admin Login</h2>
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
              <div
                id="passwordHelp"
                className={`form-text ${passwordHelp && "text-danger"}`}
              >
                {passwordHelp ||
                  "Password must be 8 characters long, contain a number and a special character."}
              </div>
            </div>

            <div className="mb-3 text-center">
              <button className="but" style={{border:'none', backgroundColor:'transparent', color:'black'}} onClick={handleForget}>Forget Password</button>
            </div>

            <div className="d-grid mb-4">
              <button className="btn btn-primary" type="submit">
                Login
              </button>

              <div className="d-grid mt-4">
              <button className="btn btn-primary" onClick={gotoHome}>
                Back to Home
              </button>
            </div>
            </div>
          </form>
        </div>
      {modalVisible && (
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

export default Loginadmin;
