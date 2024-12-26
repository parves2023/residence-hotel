import React, { useState } from "react";
import { motion } from "framer-motion";
import "./App.css";  // You can adjust the styling here


const SpecialOffersModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="modal-content"
            initial={{ y: "-100vh" }}
            animate={{ y: 0 }}
            exit={{ y: "100vh" }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <div className="modal-header">
              <h2 className="modal-title font-sans text-yellow-600">Special Offers & Promotions</h2>
              <button className="close-btn text-yellow-600 hover:bg-gray-300 p-2 rounded-lg" onClick={closeModal}>✖</button>
            </div>
            <div className="modal-body">
              <img src='https://www.easemytrip.com/images/hotel-img/emtbook-23apr-lp2.png' alt="Offer" className="offer-image max-w-sm mx-auto p-2" />
              <p className="offer-details font-mono">
                Get 35% off on all bookings made today! Don't miss out on this limited-time offer!
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default SpecialOffersModal;
