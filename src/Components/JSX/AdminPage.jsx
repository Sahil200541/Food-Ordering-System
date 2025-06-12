import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../CSS/AdminPage.css'

const AdminPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [adminEmail, setAdminEmail] = useState('');
    const navigate = useNavigate();

    const loginButton = async () => {
        try {
            const res = await fetch('http://localhost:5011/log-token', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"// Include cookies with the request
            });


            if (res.ok) {
                const adminData = await res.json();
                setAdminEmail(adminData.email); // Get the user data from the response
                console.log('Authenticated Admin:', adminData); // Log the user data
                setIsLoggedIn(true); // Update the state to reflect that the user is logged in
            } else {
                // Handle cases where the user is not authenticated
                console.error('Failed to fetch admin data:', res.status);
                setIsLoggedIn(false); // Update the state to reflect that the user is not logged in
            }

        } catch (err) {
            console.log('Error fetching login status:', err);
            setIsLoggedIn(false);
        }
    };


    const logoutButton = async () => {
        try {
            // Call the logout route on the backend
            const response = await fetch('http://localhost:5011/logout-admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                credentials: 'include' // Ensure cookies are included in the request
            });

            if (response.ok) {
                // Handle successful logout
                console.log('Logout successful');
                // Optionally clear any local state or tokens if stored locally
                setIsLoggedIn(false); // Assuming you have a state variable for login status
                localStorage.removeItem('jwtoken'); // Clear  tokens saved in local storage
            } else {
                const data = await response.json();
                console.error('Logout error:', data.message);
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
    };


    useEffect(() => {
        loginButton();
    }, []);

    const handleLogout = () => {
        logoutButton(); // Remove the cookie and tokens in database through server.js
        setIsLoggedIn(false); // Update the state
        // Redirect to login page or show a message
    };

    const handleLoginClick = () => {
        navigate('/login-admin');
    };

    const handleRegisterClick = () => {
        navigate('/register-admin');
    }

    const handleAdmin = () => {
        setTimeout(() => {
            navigate('/admin-pannel', {
                state: {
                    mail: adminEmail
                }
            });
        }, 1000);
    }

    return (
        <div className="admin-pic" style={{
            position: 'relative',
            width: '100%',
            height: '745px',
        }}>
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.7)' // Adjust the alpha (0.5) to make it darker or lighter
            }}></div>
            <div style={{
                position: 'relative',
                zIndex: 1,
                color: 'white',
                textAlign: 'center'
                
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' , justifyContent:'center', height:'745px', marginBottom:'20px'}}>
                        {/* Logo and Title */}
                        <div style={{ textAlign: 'center', backgroundColor:'none' }}>
                            
                            <h1 className="admin-h">Foody-India</h1>
                            <h1 className="admin-h1">Welcome to admin panel !!</h1>
                        </div>
        
                        {/* Conditional Content Based on Login Status */}
                        {isLoggedIn ? (
                            <div style={{ textAlign: 'center', marginTop: '30px' }}>
                                <h2>Welcome {adminEmail} </h2>
                                <button className="btn-hov" onClick={handleAdmin}>
                                    Admin Panel
                                </button>
                                <button className="btn-hov" onClick={handleLogout}>
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div  style={{ textAlign: 'center', marginTop: '30px' }}>
                                <button className="btn-hov" onClick={handleLoginClick}>
                                    Login
                                </button>
                                <button className="btn-hov" onClick={handleRegisterClick}>
                                    Register
                                </button>
                            </div>
                        )}
                    </div>
            </div>
        </div>
        
    );
}

// Button styling for consistent appearance


export default AdminPage;
