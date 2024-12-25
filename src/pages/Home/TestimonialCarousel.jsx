import { useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TestimonialCarousel = ({ reviews }) => {
  const [direction, setDirection] = useState("next");
  const sliderRef = useRef(null); // Create a reference for the Slider

  const settings = {
    dots: true,  // Enable navigation dots
    infinite: true,  // Infinite scroll
    speed: 500,  // Slide speed
    slidesToShow: 3,  // Number of slides to show at once
    slidesToScroll: 1,  // Number of slides to scroll at once
    focusOnSelect: true,  // Focus on the selected slide
    beforeChange: (current, next) => {
      setDirection(next > current ? "next" : "prev");
    },
  };

  return (
    <div className="relative max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 overflow-hidden">
      {reviews.length > 0 ? (
        <>
          <Slider ref={sliderRef} {...settings}>
            {reviews.map((review, index) => (
              <div
                key={index}
                className="bg-gray-100 min-h-40 p-4 rounded-lg shadow-md w-full  transform transition-transform duration-500 ease-in-out hover:scale-105"
              >
                <p className="text-lg font-medium">{review.comment}</p>
                <p className="text-sm text-gray-500 mt-2">- {review.reviewer}</p>
                <p className="mt-2 text-yellow-500">
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </p>
              </div>
            ))}
          </Slider>

          {/* Custom Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <button
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              onClick={() => sliderRef.current.slickPrev()} // Go to the previous slide
            >
              Previous
            </button>
            <button
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              onClick={() => sliderRef.current.slickNext()} // Go to the next slide
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">No reviews available.</p>
      )}
    </div>
  );
};

export default TestimonialCarousel;
