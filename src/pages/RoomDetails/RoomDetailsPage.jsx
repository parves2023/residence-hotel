import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../../providers/AuthProvider";
import ReactTitle from "react-helmet";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BallTriangle } from "react-loader-spinner";

//room detaisl page

const RoomDetailsPage = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [bookingDate, setBookingDate] = useState(null);
  const [bookingError, setBookingError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await axios.get(
          `https://hotel-management-liart.vercel.app/api/rooms/${id}`
        );
        setRoom(response.data);
      } catch (error) {
        setError("Failed to fetch room details");
      } finally {
        setLoading(false);
      }
    };

    fetchRoomDetails();
  }, [id]);

  const handleBooking = async () => {
    if (!bookingDate) {
      setBookingError("Please select a booking date.");
      toast.error("Please select a booking date.");
      return;
    }

    if (!room.availability) {
      setBookingError("Room is not available.");
      toast.error("Room is not available.");
      return;
    }

    try {
      await axios.post(
        `https://hotel-management-liart.vercel.app/api/book-room`,
        {
          roomId: id,
          date: bookingDate,
          email: user?.email,
        }
      );

      // Update room availability after booking
      setRoom((prevRoom) => ({
        ...prevRoom,
        availability: false,
      }));
      setShowModal(false);

      // Show success message using Toastify
      toast.success("Room booked successfully!");
    } catch (error) {
      setBookingError("Failed to book the room. Please try again.");
      toast.error("Failed to book the room. Please try again.");
    }
  };

  const handleBookNow = () => {
    if (!user) {
      alert("Please log in first to proceed with the booking.");
      navigate("/login", { state: { from: window.location.pathname } }); // Pass the current location for post-login redirection
    } else {
      setShowModal(true);
    }
  };

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

  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto py-8">
      <ToastContainer />
      <ReactTitle title="RH || Details" />
      <h1 className="text-3xl font-bold mb-6 text-center font-sans text-yellow-600">
        {room.name}
      </h1>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          <img
            src={room.image}
            alt={room.name}
            className="w-full h-96 object-cover rounded-lg shadow-md"
          />
        </div>
        <div className="md:w-1/2">
          <h2 className="text-xl font-semibold text-[#2a3b26]">Details</h2>
          <p className="mt-2 text-[#2a3b26] font-mono">{room.description}</p>
          <p className="mt-2 text-xl font-bold text-[#2a3b26]">{room.price}</p>
          <p className="mt-2 text-sm text-gray-500 font-mono">
            Rating: {room.rating} ★
          </p>
          <p className="mt-2 text-sm text-gray-500 font-mono">
            Availability: {room.availability ? "Available" : "Not Available"}
          </p>

          {/* Booking Button */}
          {room.availability && (
            <button
              onClick={handleBookNow} // Remove the extra arrow function
              className="mt-4 px-6 py-2 bg-yellow-600 text-white font-sans  font-bold rounded hover:bg-yellow-700"
            >
              Book Now
            </button>
          )}

          {/* Reviews Section */}
          <div className="mt-4">
            <h3 className="text-lg font-bold font-sans ">Reviews</h3>
            {room.reviews && room.reviews.length > 0 ? (
              room.reviews.map((review, index) => (
                <div key={index} className="mt-2 border-b pb-4">
                  <p className="font-semibold text-gray-600 font-sans">
                    {review.reviewer} ||{" "}
                    <span className="font-light">
                      {review?.timestamp ? review.timestamp : "2024-12-23"}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600 font-mono">
                    {review.comment}
                  </p>
                  <p className="text-sm text-yellow-500">
                    {"★".repeat(review.rating)} ({review.rating})
                  </p>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Booking Summary</h2>
            <p className="text-gray-600 mb-2">
              <strong>Room Name:</strong> {room.name}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Price:</strong> {room.price}
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Description:</strong> {room.description}
            </p>

            <div className="mb-4">
              <label className="block text-gray-600 mb-2">
                Select Booking Date:
              </label>
              <DatePicker
                selected={bookingDate}
                onChange={(date) => setBookingDate(date)}
                dateFormat="yyyy-MM-dd"
                minDate={new Date()}
                className="w-full p-2 border rounded"
              />
            </div>

            {bookingError && (
              <p className="text-red-500 text-sm mb-2">{bookingError}</p>
            )}

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleBooking}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomDetailsPage;
