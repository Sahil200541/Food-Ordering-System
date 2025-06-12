import React, { useState } from 'react';
import axios from 'axios';
import Modal from './Modal'; // Import your Modal component
import '../CSS/CreateOffers.css'; // Import your CSS styles

const CreateOffers = () => {
    const [offerData, setOfferData] = useState({
        description: ''
    });
    const [imageFile, setImageFile] = useState(null);
    const [modalMessage, setModalMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [messageType, setMessageType] = useState('success');

    const handleChange = (e) => {
        setOfferData({ ...offerData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]); // Capture the image file
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let imageUrl = '';

            // If an image file is selected, upload it first
            if (imageFile) {
                const formData = new FormData();
                formData.append('image', imageFile);

                const uploadResponse = await axios.post('http://localhost:5006/api/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                imageUrl = uploadResponse.data.imageUrl; // Get the image URL from the response
            }

            // Update offerData with the uploaded image URL
            const updatedOfferData = { ...offerData, imageUrl };

            // Save the offer data to the backend
            await axios.post('http://localhost:5006/api/offers', updatedOfferData);
            
            // Show success modal
            setModalMessage('Offer Created Successfully!');
            setMessageType('success');
            setShowModal(true);

            // Reset form
            setOfferData({
                description: ''
            });
            setImageFile(null); // Clear the image input
        } catch (err) {
            console.error(err);
            setModalMessage('Failed to create offer.');
            setMessageType('error');
            setShowModal(true);
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className="create-offer-container">
            <form className="create-offer-form" onSubmit={handleSubmit}>
                <h2 style={{ color: 'tomato' }}>Create New Offer</h2>
                
                <div className="form-group">
                    <label htmlFor="imageFile">Offer Image</label>
                    <input
                        type="file"
                        name="imageFile"
                        id="imageFile"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="description">Offer Description</label>
                    <textarea
                        name="description"
                        id="description"
                        placeholder="Enter offer description"
                        value={offerData.description}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="create-offer-btn">Create Offer</button>
            </form>

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

export default CreateOffers;
