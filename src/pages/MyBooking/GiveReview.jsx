import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";

const GiveReview = ({ roomId }) => {
  const { user } = useContext(AuthContext); // Fetch user from AuthContext
  const [showModal, setShowModal] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleReviewSubmit = async () => {
    if (!reviewText || !rating) {
      alert("Please provide a review and select a rating.");
      return;
    }

    try {
      setSubmitting(true); // Disable form during submission
      const response = await axios.put(
        "http://localhost:5000/api/rooms/review",
        {
          roomId,
          review: {
            comment: reviewText,
            rating: parseInt(rating, 10), // Convert rating to a number
            reviewer: user?.displayName || "Anonymous", // Fetch displayName or fallback
            timestamp: new Date().toISOString(), // Add current timestamp
          },
        }
      );

      if (response.data.success) {
        alert("Review submitted successfully!");
        setShowModal(false);
        setReviewText("");
        setRating("");
      } else {
        alert(response.data.message || "Failed to submit review.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false); // Re-enable form
    }
  };

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 font-semibold"
      >
        Give Review
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Submit Your Review</h2>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your review..."
              className="w-full p-2 border rounded mb-4"
              rows="4"
            ></textarea>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            >
              <option value="">Select Rating</option>
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num} Star{num > 1 ? "s" : ""}
                </option>
              ))}
            </select>
            <div className="flex gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                onClick={handleReviewSubmit}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                disabled={submitting}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GiveReview;
