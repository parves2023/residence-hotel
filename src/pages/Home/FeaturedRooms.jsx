import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { Link } from "react-router";
import { motion } from "motion/react";
import { BallTriangle } from "react-loader-spinner";

function FeaturedRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch top-rated rooms from the backend
  useEffect(() => {
    const fetchTopRatedRooms = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/top-rated-rooms"
        );
        const data = response.data;

        // Ensure the response is an array
        if (Array.isArray(data)) {
          setLoading(false);
          setRooms(data);
          // setLoading(false);
        } else {
          console.error("Expected an array, but got:", data);
          setRooms([]); // Fallback to an empty array
          // setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching top-rated rooms:", error);
        setRooms([]); // Fallback to an empty array in case of an error
        setLoading(false);
      }
    };

    fetchTopRatedRooms();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-start mt-10 h-screen">
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#d49f0f"
          ariaLabel="ball-triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

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

  // Define enhanced animation variants
  const cardVariants = {
    hidden: {
      opacity: 0, // Fully transparent
      y: 50, // Starts 50px below
      scale: 0.95, // Slightly smaller
    },
    visible: {
      opacity: 1, // Fully visible
      y: 0, // Moves to original position
      scale: 1, // Scales up to normal size
      transition: {
        duration: 0.8, // Longer animation duration
        ease: [0.25, 0.46, 0.45, 0.94], // A smoother cubic-bezier easing
        delay: 0.2, // Delay to stagger animations
      },
    },
  };

  return (
    <section className="text-gray-600 body-font py-4">
      <div className="container px-5 mx-auto text-center mb-12">
        <motion.h2
          initial={{ scale: 1 }} // Initial scale
          animate={{ scale: [1, 1.1, 1] }} // Scale up and down
          transition={{
            duration: 1.5, // Total duration of the animation
            repeat: Infinity, // Repeat the animation infinitely
            repeatType: "reverse", // Smooth reversing for the scale
          }}
          className="text-3xl w-7/12 mx-auto font-semibold  mb-4 font-mono text-yellow-600"
        >
          Featured Rooms
        </motion.h2>

        <p className="leading-relaxed text-lg text-gray-600 font-mono">
          Discover our top-rated rooms, each designed to provide you with an
          unforgettable stay.
        </p>
      </div>
      <div className="flex flex-wrap -m-4">
        {rooms.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {rooms.map((room) => (
              <div key={room.id}>
                <motion.div
                  className="room-card border rounded-lg p-4 shadow-md"
                  variants={cardVariants} // Apply animation variants
                  initial="hidden" // Start with hidden state
                  whileInView="visible" // Transition to visible when in view
                  viewport={{ once: true, amount: 0.3 }} // Trigger when 30% of the card is in view
                >
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-lg font-semibold font-sans text-yellow-600">
                    {room.name}
                  </h3>
                  <p className="text-gray-500 font-mono">{room.description}</p>
                  <p className=" font-bold my-2  text-yellow-600">
                    {room.price}
                  </p>
                  <div className="flex items-center mt-2">
                    {renderStars(room?.rating)}
                    <span className="ml-2 text-gray-600">
                      {room?.rating.toFixed(1)}
                    </span>
                  </div>
                  <Link
                    to={`/rooms/${room._id}`}
                    className="text-white bg-yellow-600 hover:bg-yellow-700 rounded-md px-4 py-2 mt-3 inline-block"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Details
                    </motion.div>
                  </Link>
                </motion.div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No rooms available at the moment.</p>
        )}
      </div>
    </section>
  );
}

export default FeaturedRooms;
