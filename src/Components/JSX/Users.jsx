import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../CSS/Users.css';  // Optional: Use your CSS file to style the component

const Users = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch contact details from the backend
        const fetchContacts = async () => {
            try {
                const response = await axios.get('http://localhost:5004/api/contacts');
                setContacts(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching contacts:', error);
                setLoading(false);
            }
        };

        fetchContacts();
    }, []);

    if (loading) {
        return <p className="loading">Loading...</p>;
    }

    return (
        <div className="users-container">
            <h2 className="he2">Users ( Contact )</h2>
            {contacts.length === 0 ? (
                <p>No users found.</p>
            ) : (
                <div>
                    {contacts.map((contact, index) => (
                        <div key={index} className="contact-card">
                            <h3>{contact.name}</h3>
                            <p><strong>Email:</strong> {contact.email}</p>
                            <p><strong>Phone:</strong> {contact.phone}</p>
                            <p><strong>Message:</strong> {contact.message}</p>
                            <p><strong>Date:</strong> {new Date(contact.date).toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Users;
