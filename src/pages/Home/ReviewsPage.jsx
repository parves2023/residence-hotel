import React, { useState, useEffect } from "react";
import TestimonialCarousel from "./TestimonialCarousel"; // Import your carousel component
import axios from "axios";
import { BallTriangle } from "react-loader-spinner";

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          "https://hotel-management-liart.vercel.app/api/reviews"
        );
        setLoading(false);
        setReviews(response.data); // Set the fetched reviews
      } catch (err) {
        setError("Failed to fetch reviews. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  
  if (loading) {
    return (
      <div className="flex justify-center items-start mt-10 h-screen">
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#4fa94d"
          ariaLabel="ball-triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }
  

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold text-center mb-6 bg-yellow-600 font-mono text-white py-3 rounded-2xl">
        What Our Guests Say
      </h2>
      <TestimonialCarousel reviews={reviews} />
    </div>
  );
};

export default ReviewsPage;
