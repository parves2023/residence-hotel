import React, { useState, useEffect } from "react";
import { Typewriter } from "react-simple-typewriter";
import { useNavigate } from "react-router-dom"; // For navigation

// Import images
import banner1 from "../../assets/hotel1.jpg";
import banner2 from "../../assets/hotel2.jpg";
import banner3 from "../../assets/hotel3.jpg";

const Slider = () => {
  const navigate = useNavigate(); // React Router navigation function

  const banners = [
    {
      image: banner1,
      heading: "Discover Luxury Stays",
      text: "Experience world-class comfort and style at our premium hotels.",
    },
    {
      image: banner2,
      heading: "Unwind in Serenity",
      text: "Relax in beautiful rooms designed for your ultimate comfort.",
    },
    {
      image: banner3,
      heading: "Book Your Perfect Getaway",
      text: "Plan your next adventure with our seamless booking system.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0); // Track the current slide

  // Auto-scroll logic with 6 seconds interval
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 6000); // Change slide every 6 seconds
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [banners.length]);

  const handleRoomsRedirect = () => {
    navigate("/rooms"); // Redirect to Rooms page
  };

  return (
    <div className="relative w-full h-[45vh] md:h-[35rem] mx-auto overflow-hidden">
      {/* Render all slides with conditional opacity */}
      {banners.map((banner, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${currentIndex === index ? "opacity-100 z-10" : "opacity-0 z-0"}`}
        >
          {/* Background Image with Zoom-In Animation for Active Image */}
          <div
            className={`w-full h-full overflow-hidden transition-all duration-1000 ${currentIndex === index ? "animate-zoomEffect" : ""}`}
          >
            <img
              src={banner.image}
              alt={`Slide ${index + 1}`}
              className="w-full h-[45vh] md:h-[35rem] object-cover brightness-50"
            />
          </div>

          {/* Centered Text and Button (No Zoom Effect) */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 text-center">
            {/* Typewriter Effect for Heading */}
            {currentIndex === index && (
              <h2 className="text-3xl md:text-5xl font-bold font-mono">
                <Typewriter
                  words={[banner.heading]} // Show only the current slide heading
                  
                  typeSpeed={100}
                  deleteSpeed={50}
                />
              </h2>
            )}
            <p className="mt-4 text-lg md:text-xl text-yellow-600 font-mono">
              {banner.text}
            </p>

            {/* Button to Rooms Page */}
            <button
              onClick={handleRoomsRedirect}
              className="mt-6 bg-yellow-600 hover:bg-yellow-700 text-gray-200 font-sans px-6 py-2 rounded-md text-lg font-semibold shadow-lg transition duration-300"
            >
              Explore Rooms
            </button>
          </div>
        </div>
      ))}

      {/* CSS for Smooth Zoom-In Animation with 6 seconds duration */}
      <style>
        {`
          .animate-zoomEffect {
            animation: fadeZoomIn 6s ease-in-out forwards; /* Match animation duration with interval */
          }

          @keyframes fadeZoomIn {
            0% {
              opacity: 1;
              transform: scale(1);
            }
            15% {
              opacity: 1;
              transform: scale(1);
            }
            100% {
              opacity: 1;
              transform: scale(1.15);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Slider;
