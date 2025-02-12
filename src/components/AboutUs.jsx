import { motion } from "framer-motion";
import ExploreAmenities from "../pages/Home/ExploreAmenities";
import ReactTitle from "react-helmet";


const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6">
      <ReactTitle title="RH || About Us"/>
      <div className="container mx-auto max-w-4xl text-center">
        <motion.h1
          className="text-4xl font-bold mb-4 text-yellow-600 font-sans"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          About Us
        </motion.h1>
        
        <motion.p
          className="text-lg leading-relaxed mb-6 font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Welcome to <span className="font-bold text-yellow-600">Residence Hotel</span>, 
          your ultimate destination for luxury, comfort, and world-class service. 
          Nestled in the heart of vibrant cities, our hotels are designed to provide 
          unforgettable experiences. Whether you're traveling for business or leisure, 
          we ensure every stay feels like home.
        </motion.p>
        <motion.p
          className="text-lg leading-relaxed font-sans"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Our mission is to blend elegance and hospitality with the convenience of 
          modern technology, offering you seamless booking and unmatched satisfaction. 
          Join us in creating memories that last a lifetime.
        </motion.p>
      </div>
      <div className="mt-10">
        <motion.img
          src="https://images.unsplash.com/photo-1561501900-3701fa6a0864?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Luxury Hotel"
          className="rounded-lg shadow-lg mx-auto"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        />
      </div>
      <ExploreAmenities></ExploreAmenities>
    </div>
  );
};

export default AboutUs;
