import React from "react";
import { motion } from "framer-motion";



const OurSpecialOffers = () => {
  return (
    <section className="bg-gradient-to-r from-blue-500 to-purple-600 py-20 px-6 text-white">
      <motion.div
        className="max-w-7xl mx-auto text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl font-bold mb-8 font-sans text-yellow-500">Special Offers & Promotions</h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          {/* Offer 1 */}
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-500 ease-in-out hover:scale-105"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src="https://i.ibb.co.com/pxD3Cc6/50-off.jpg"
              alt="Offer 1"
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">50% Off This Month</h3>
            <p className="text-gray-600 font-mono mb-4">
              Book now and save 50% on all bookings this month. Limited-time offer!
            </p>
            <button className="bg-yellow-600 font-mono font-semibold px-4 py-2 rounded-full text-white hover:bg-yellow-700 transition duration-300">
              Grab This Deal
            </button>
          </motion.div>

          {/* Offer 2 */}
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-500 ease-in-out hover:scale-105"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src="https://img.freepik.com/free-psd/voucher-template-free-breakfast_23-2148479833.jpg"
              alt="Offer 2"
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Free Breakfast With Stay</h3>
            <p className="text-gray-600 font-mono mb-4">
              Enjoy a complimentary breakfast every morning when you book your stay with us.
            </p>
            <button className="bg-yellow-600 font-mono font-semibold px-4 py-2 rounded-full text-white hover:bg-yellow-700 transition duration-300">
              Book Now
            </button>
          </motion.div>

          {/* Offer 3 */}
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-500 ease-in-out hover:scale-105"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src="https://specials.priceless.com/mastercard/images/3d7859c4-2cf9-4e34-b90e-3e33f17b0bd3.jpg"
              alt="Offer 3"
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Stay 3 Nights, Get 1 Free</h3>
            <p className="text-gray-600 font-mono mb-4">
              Book 3 nights and get 1 night free. Perfect for a long getaway.
            </p>
            <button className="bg-yellow-600 font-mono font-semibold px-4 py-2 rounded-full text-white hover:bg-yellow-700 transition duration-300">
              Book Your Stay
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default OurSpecialOffers;
