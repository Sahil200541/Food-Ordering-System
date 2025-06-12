import React, { useEffect, useState } from 'react';
import '../CSS/Feedbacks.css'; // Optional: Use your CSS file to style the component

const Feedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/feedbacks'); // Adjust the URL as necessary
        if (!response.ok) {
          throw new Error('Failed to fetch feedbacks');
        }
        const data = await response.json();
        setFeedbacks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  if (loading) {
    return <div>Loading feedbacks...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="feedbacks-container">
      <h2 className="he2">Feedbacks</h2>
      {feedbacks.length === 0 ? (
        <p>No feedbacks available.</p>
      ) : (
        <ul className="feedback-list">
          {feedbacks.map((feedback) => (
            <li key={feedback._id} className="feedback-card">
              <h3>{feedback.name}</h3>
              <strong>Email:</strong> {feedback.email} <br />
              <strong>Message:</strong> {feedback.message} <br />
              <strong>Rating:</strong> {feedback.rating} <br />
              
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Feedbacks;
