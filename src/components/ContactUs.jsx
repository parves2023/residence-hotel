import { motion } from "framer-motion";
import ContactSection from "../pages/Home/ContactSection";
import ReactTitle from "react-helmet";

import Swal from 'sweetalert2';




const ContactUs = () => {
  

  const handleContactSubmit = () => {
    // Perform your form submission logic here (e.g., API call)
  
    // On success:
    Swal.fire({
      icon: 'success',
      title: 'Message Sent!',
      text: 'Your message has been sent successfully.',
      showConfirmButton: false,
      timer: 3000, // Auto close after 3 seconds
    });
  };
  
  

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-gray-800">
      <ReactTitle title="RH || Contact"/>
      <div className="container mx-auto max-w-4xl">
        <motion.h1
          className="text-4xl font-bold text-center mb-8 text-yellow-600 font-sans"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Contact Us
        </motion.h1>
        <motion.p
          className="text-lg text-center mb-6 font-mono"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Got questions or need help with your booking? We're here for you 24/7!
        </motion.p>
        <motion.form
          className="bg-white shadow-lg rounded-lg p-6"
          onSubmit={(e) => {
            e.preventDefault(); // Prevents the default form submission behavior
            handleContactSubmit();
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <div className="mb-4">
            <label htmlFor="name" className="block font-medium text-lg">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium text-lg">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block font-medium text-lg">
              Message
            </label>
            <textarea
              id="message"
              rows="5"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your message"
            ></textarea>
          </div>
          <div className="text-center">
            <motion.button
              type="submit"
              
              className="bg-yellow-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-500 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Send Message
            </motion.button>
          </div>
        </motion.form>
      </div>
      <ContactSection></ContactSection>
    </div>
  );
};

export default ContactUs;
