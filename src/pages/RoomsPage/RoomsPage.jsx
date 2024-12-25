import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"; // Import icons
import ReactTitle from "react-helmet";

// all rooms page


const RoomsPage = () => {
  const [rooms, setRooms] = useState([]);


  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");



  // Function to render star ratings
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {Array(fullStars)
          .fill(0)
          .map((_, i) => (
            <FaStar key={`full-${i}`} className="text-yellow-500 text-lg" />
          ))}
        {halfStar && <FaStarHalfAlt className="text-yellow-500 text-lg" />}
        {Array(emptyStars)
          .fill(0)
          .map((_, i) => (
            <FaRegStar key={`empty-${i}`} className="text-yellow-500 text-lg" />
          ))}
      </>
    );
  };

  // Fetch all rooms from the backend
  // useEffect(() => {
  //   const fetchRooms = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:5000/api/rooms"); // Adjust API endpoint
  //       const data = response.data;

  //       // Ensure data is an array
  //       if (Array.isArray(data)) {
  //         setRooms(data);
  //       } else {
  //         console.error("Expected an array, but got:", data);
  //         setRooms([]);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching rooms:", error);
  //       setRooms([]);
  //     }
  //   };

  //   fetchRooms();
  // }, []);




   // Fetch all rooms from the backend
   useEffect(() => {
    const fetchRooms = async () => {
      try {
        // Construct query parameters for price filter
        const query = new URLSearchParams();
        if (minPrice) query.append("minPrice", minPrice);
        if (maxPrice) query.append("maxPrice", maxPrice);

        const response = await axios.get(`http://localhost:5000/api/rooms?${query.toString()}`);
        const data = response.data;

        // Ensure data is an array
        if (Array.isArray(data)) {
          setRooms(data);
        } else {
          console.error("Expected an array, but got:", data);
          setRooms([]);
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
        setRooms([]);
      }
    };

    fetchRooms();
  }, [minPrice, maxPrice]); // Re-fetch rooms whenever the price range changes






  return (
    <div className="container mx-auto py-8">
      <ReactTitle title="RH || Rooms" />
      <h1 className="text-3xl font-bold mb-8 text-center">Rooms 🛌</h1>



       {/* Filter Section */}
       <div className="mb-8 flex justify-center gap-4">
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border p-2"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border p-2"
        />
        <button
          onClick={() => {
            setMinPrice(""); // Reset the filters
            setMaxPrice(""); // Reset the filters
          }}
          className="bg-gray-200 px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>





      
      {rooms.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div
              key={room._id}
              className="card pb-4 border rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all group relative"
            >
              <img
                src={room.image}
                alt={room.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />

              {/* View Details Text (Visible only on hover) */}
              <div className="absolute rounded-lg inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xl font-bold">View Details</span>
              </div>

              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{room.name}</h2>
                <p className="text-gray-600 mb-1">${room.price} per night</p>
                <p className="text-sm text-gray-500 mb-1">
                  {Array.isArray(room.reviews) ? room.reviews.length : 0}{" "}
                  Review(s)
                </p>
                <p className="text-sm text-gray-400">
                  Available: {room.availability ? "Yes" : "No"}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-yellow-500 text-sm font-medium">
                    {(
                      room.reviews.reduce(
                        (sum, review) => sum + review.rating,
                        0
                      ) / room.reviews.length
                    ).toFixed(1)}
                  </span>
                  <div className="flex">
                    {room.reviews.length > 0 ? (
                      <div className="flex items-center">
                        {renderStars(
                          (
                            room.reviews.reduce(
                              (sum, review) => sum + review.rating,
                              0
                            ) / room.reviews.length
                          ).toFixed(1)
                        )}
                      </div>
                    ) : (
                      <div>No reviews yet</div>
                    )}
                  </div>

                </div>
              </div>

              {/* Link to Room Details Page */}
              <Link
                to={`/rooms/${room._id}`}
                className="absolute inset-0" // Ensures the link is the size of the card
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">
          No rooms available at the moment.
        </p>
      )}
    </div>
  );
};

export default RoomsPage;
