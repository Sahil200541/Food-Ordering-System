import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Modal from './Modal'; // Import the Modal component
import '../CSS/Admin.css';

const BookedTable = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalType, setModalType] = useState("success");
    const [currentBookingId, setCurrentBookingId] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await fetch('http://localhost:5007/api/bookings');
                if (!response.ok) {
                    throw new Error('Failed to fetch bookings');
                }
                const data = await response.json();
                setBookings(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    const confirmBooking = async (bookingId) => {
        try {
            const response = await fetch(`http://localhost:5007/api/booked-tables/${bookingId}/confirm`, {
                method: 'POST'
            });

            if (!response.ok) {
                throw new Error('Failed to confirm booking');
            }

            setBookings((prevBookings) =>
                prevBookings.map((booking) =>
                    booking._id === bookingId ? { ...booking, status: 'confirmed' } : booking
                )
            );
            showModalMessage("Booking confirmed! A confirmation email will be sent.", "success");
        } catch (error) {
            setError(error.message);
        }
    };

    const rejectBooking = async (bookingId) => {
        try {
            const response = await fetch(`http://localhost:5007/api/booked-tables/${bookingId}/reject`, {
                method: 'POST'
            });

            if (!response.ok) {
                throw new Error('Failed to reject booking');
            }

            setBookings((prevBookings) =>
                prevBookings.map((booking) =>
                    booking._id === bookingId ? { ...booking, status: 'rejected' } : booking
                )
            );
            showModalMessage("Booking rejected! A rejection email will be sent.", "error");
        } catch (error) {
            setError(error.message);
        }
    };

    const deleteBooking = async (bookingId) => {
        try {
            const response = await fetch(`http://localhost:5007/api/booked-tables/${bookingId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Failed to delete booking');
            }

            setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== bookingId));
            showModalMessage("Booking deleted successfully.", "success");
        } catch (error) {
            setError(error.message);
        }
    };

    const showModalMessage = (message, type) => {
        setModalMessage(message);
        setModalType(type);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    if (loading) return <div>Loading bookings...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="admin-panel">
            <h2 className="he2">Booked Tables</h2>
            <Row xs={1} md={2} lg={3} className="g-4">
                {bookings.map((booking) => (
                    <Col key={booking._id}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{booking.name}</Card.Title>
                                <Card.Text>
                                    <strong>Email:</strong> {booking.email}<br />
                                    <strong>Phone:</strong> {booking.phone}<br />
                                    <strong>Members:</strong> {booking.members}<br />
                                    <strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}<br />
                                    <strong>Time:</strong> {booking.time}<br />
                                    <strong>Table Type:</strong> {booking.tableType}<br />
                                    <strong>Status:</strong> {booking.status}<br />
                                </Card.Text>
                                <div>
                                    {booking.status === 'pending' ? (
                                        <>
                                            <Button variant="success" onClick={() => confirmBooking(booking._id)}>Confirm</Button>
                                            <Button variant="danger" onClick={() => rejectBooking(booking._id)} style={{ marginLeft: '10px' }}>Reject</Button>
                                        </>
                                    ) : (
                                        <span>{booking.status === 'confirmed' ? 'Confirmed' : 'Rejected'}</span>
                                    )}
                                    <Button variant="danger" onClick={() => deleteBooking(booking._id)} style={{ marginLeft: '10px' }}>Delete</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            {showModal && (
                <Modal message={modalMessage} messageType={modalType} onClose={handleCloseModal} />
            )}
        </div>
    );
};

export default BookedTable;
