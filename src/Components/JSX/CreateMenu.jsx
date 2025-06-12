import React, { useState } from 'react';
import axios from 'axios';
import Modal from './Modal'; // Import the Modal component
import '../CSS/CreateMenu.css';

const CreateMenu = () => {
    const [menuData, setMenuData] = useState({
        name: '',
        category: '',
        realPrice: '',
        discountPrice: '',
        imageUrl: '',
        description: ''
    });

    const [imageFile, setImageFile] = useState(null);
    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const [modalMessage, setModalMessage] = useState(''); // State for modal message
    const [messageType, setMessageType] = useState(''); // State for message type

    const handleChange = (e) => {
        setMenuData({ ...menuData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let imageUrl = '';

            // If an image file is selected, upload it first
            if (imageFile) {
                const formData = new FormData();
                formData.append('image', imageFile);

                const uploadResponse = await axios.post('http://localhost:5005/api/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                imageUrl = uploadResponse.data.imageUrl;
            }

            // Update menuData with the uploaded image URL
            const updatedMenuData = { ...menuData, imageUrl };

            // Save the menu data to the backend
            await axios.post('http://localhost:5005/api/menus', updatedMenuData);
            
            // Set the success message and show the modal
            setModalMessage('Menu Created Successfully!');
            setMessageType('success');
            setShowModal(true);

            // Reset form
            setMenuData({
                name: '',
                category: '',
                realPrice: '',
                discountPrice: '',
                imageUrl: '',
                description: ''
            });
            setImageFile(null); // Clear the image input
        } catch (err) {
            console.error(err);
            // Set the error message and show the modal
            setModalMessage('Failed to create menu.');
            setMessageType('error');
            setShowModal(true);
        }
    };

    const closeModal = () => {
        setShowModal(false); // Hide the modal
    };

    return (
        <div className="create-menu-container">
            <form className="create-menu-form" onSubmit={handleSubmit}>
                <h2 className="he2">Create New Menu</h2>
                
                <div className="form-group">
                    <label htmlFor="imageFile">Menu Image</label>
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
                    <label htmlFor="name">Menu Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Menu Name"
                        value={menuData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <input
                        type="text"
                        name="category"
                        id="category"
                        placeholder="Category"
                        value={menuData.category}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="realPrice">Real Price</label>
                    <input
                        type="number"
                        name="realPrice"
                        id="realPrice"
                        placeholder="Real Price"
                        value={menuData.realPrice}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="discountPrice">Discount Price</label>
                    <input
                        type="number"
                        name="discountPrice"
                        id="discountPrice"
                        placeholder="Discount Price"
                        value={menuData.discountPrice}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        id="description"
                        placeholder="Description"
                        value={menuData.description}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="create-menu-btn">Create Menu</button>
            </form>

            {showModal && <Modal message={modalMessage} messageType={messageType} onClose={closeModal} />} {/* Show the modal if needed */}
        </div>
    );
};

export default CreateMenu;
