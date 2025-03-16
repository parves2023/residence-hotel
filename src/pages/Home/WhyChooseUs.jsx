import React from "react";
import { motion } from "framer-motion";

const WhyChooseUs = () => {
  return (
    <section className="py-16 space-x-3 rounded-2xl px-3 my-5 bg-gradient-to-r from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto text-center">
        <motion.h2
          className="text-3xl font-bold mb-8 font-sans text-yellow-600"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          Why Choose Us
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: "🏨", title: "Luxury Rooms", description: "Experience the ultimate comfort in our modern, fully equipped rooms." },
            { icon: "🍴", title: "Fine Dining", description: "Delight your taste buds with our world-class cuisine." },
            { icon: "📍", title: "Prime Location", description: "Located at the heart of the city with easy access to attractions." },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 shadow-lg rounded-lg bg-cardback"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.2 }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 font-sans text-yellow-700">{feature.title}</h3>
              <p className="text-gray-600 font-mono">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
