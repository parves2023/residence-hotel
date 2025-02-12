import React from "react";
import { motion } from "framer-motion";
import pool from "../../assets/pool.jpg";
import spa from "../../assets/spa&Wellness.jpg";
import fitness from "../../assets/t4200x2520.webp";
import conference from "../../assets/ConferenceRoom.jpg";

const ExploreAmenities = () => {
  const amenities = [
    { title: "Swimming Pool", image: pool },
    { title: "Spa & Wellness", image: spa },
    { title: "Fitness Center", image: fitness },
    { title: "Conference Room", image: conference },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto">
        <motion.h2
          className="text-3xl font-bold text-center mb-8 font-sans text-yellow-600"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Explore Our Amenities
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {amenities.map((amenity, index) => (
            <motion.div
              key={index}
              className="relative group overflow-hidden rounded-lg shadow-lg"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.2 }}
            >
              <img
                src={`${amenity.image}`}
                alt={amenity.title}
                className="w-full h-40 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                <h3 className=" text-xl font-semibold font-sans text-yellow-600">
                  {amenity.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreAmenities;
