import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";
import DatePicker from "react-datepicker";
import GiveReview from "./GiveReview";
import ReactTitle from "react-helmet";
import Swal from "sweetalert2";
import moment from "moment";

const MyBooking = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [newBookingDate, setNewBookingDate] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const userEmail = user?.email;

  const [cancelButton, setCancleButton] = useState(true);

  useState(() => {}, []);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/my-bookings/${userEmail}`
        );
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userEmail) fetchBookings();
  }, [userEmail]);

  const handleCancelBooking = async (roomId) => {
    try {
      // Show confirmation dialog using SweetAlert2
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to cancel this booking? This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, cancel it!",
        cancelButtonText: "No, keep it",
      });

      if (result.isConfirmed) {
        // Proceed with cancellation
        await axios.post("http://localhost:5000/api/cancel-booking", {
          roomId,
          email: userEmail,
        });

        // Remove the canceled booking from state
        setBookings((prevBookings) =>
          prevBookings.filter((room) => room._id !== roomId)
        );

        // Show success message
        Swal.fire("Canceled!", "Your booking has been canceled.", "success");
      }
    } catch (error) {
      console.error("Error canceling booking:", error);

      // Show error message
      Swal.fire(
        "Error!",
        "Failed to cancel booking. Please try again.",
        "error"
      );
    }
  };

  const handleUpdateDateClick = (date, booking, roomId) => {
    setShowDatePicker(true);
    setNewBookingDate(new Date(date)); // Ensure date is converted to Date object
    setSelectedBooking({ ...booking, roomId }); // Add roomId explicitly
  };

  const handleDateChange = (date) => {
    setNewBookingDate(date);
  };

  const handleUpdateBooking = () => {
    if (!selectedBooking || !newBookingDate) {
      alert("Room ID and new date are required.");
      return;
    }
    console.log(selectedBooking, "this is missing here");

    fetch("http://localhost:5000/api/update-booking", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomId: selectedBooking.roomId, // Use roomId from selectedBooking
        newDate: newBookingDate.toISOString().split("T")[0], // Send date in `YYYY-MM-DD` format
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.message || "Failed to update booking date.");
          });
        }
        return response.json();
      })
      .then((data) => {
        alert(data.message);

        // Update the bookings in state
        setBookings((prevBookings) =>
          prevBookings.map((room) =>
            room._id === selectedBooking.roomId
              ? {
                  ...room,
                  bookings: room.bookings.map((booking) =>
                    booking._id === selectedBooking._id
                      ? {
                          ...booking,
                          date: newBookingDate.toISOString().split("T")[0],
                        }
                      : booking
                  ),
                }
              : room
          )
        );

        setShowDatePicker(false); // Close the modal
      })
      .catch((error) => {
        alert(
          error.message || "Failed to update booking date. Please try again."
        );
      });
  };

  if (loading) {
    return <p className="text-center">Loading your bookings...</p>;
  }

  if (bookings.length === 0) {
    return <p className="text-center">You have no bookings yet.</p>;
  }

  return (
    <div className="container mx-auto py-8">
      <ReactTitle title="RH || Booking" />
      <h1 className="text-3xl font-bold mb-8 text-center">My Bookings</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2 border-b border-gray-300">Room Image</th>
              <th className="px-4 py-2 border-b border-gray-300">Room Name</th>
              <th className="px-4 py-2 border-b border-gray-300">Price</th>
              <th className="px-4 py-2 border-b border-gray-300">
                Booking Date
              </th>
              <th className="px-4 py-2 border-b border-gray-300">Status</th>
              <th className="px-4 py-2 border-b border-gray-300">Actions</th>
              <th className="px-4 py-2 border-b border-gray-300">Review</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((room) =>
              room?.bookings.map((booking, index) => (
                <tr key={`${room._id}-${index}`} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b border-gray-300">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    {room.name}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    ${room.price}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    {booking.date}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    Confirmed
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    {moment(booking.date).diff(moment(), "hours") > 24 ? (
                      <>
                        <button
                          onClick={() =>
                            handleCancelBooking(room._id, booking?.date)
                          }
                          className="mr-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() =>
                            handleUpdateDateClick(
                              booking.date,
                              booking,
                              room._id
                            )
                          }
                          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          Update
                        </button>
                      </>
                    ) : (
                      <p className="text-gray-500 italic">
                        Not available for changes
                      </p>
                    )}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-300">
                    <GiveReview roomId={room._id} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showDatePicker && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <label className="block text-gray-600 mb-2">
              Select New Booking Date:
            </label>
            <DatePicker
              selected={newBookingDate}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              minDate={new Date()} // Ensure date cannot be in the past
              className="w-full p-2 border rounded"
            />
            <div className="mt-4 flex gap-4">
              <button
                onClick={() => setShowDatePicker(false)}
                className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateBooking}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Confirm Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBooking;
