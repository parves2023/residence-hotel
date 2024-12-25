import React, { useState, useEffect } from "react";
import TestimonialCarousel from "./TestimonialCarousel"; // Import your carousel component
import axios from "axios";

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/reviews");
        setReviews(response.data); // Set the fetched reviews
      } catch (err) {
        setError("Failed to fetch reviews. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold text-center mb-6">What Our Guests Say</h2>
      <TestimonialCarousel reviews={reviews} />
    </div>
  );
};

export default ReviewsPage;
