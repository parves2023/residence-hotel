import React, { useState } from "react";
import { motion } from "framer-motion";
import Lottie from "react-lottie";
import faqAnimationData from "../../assets/Animation - faq.json";

const FAQ = () => {
  const faqs = [
    {
      question: "What is the check-in and check-out time?",
      answer:
        "Check-in is from 3 PM, and check-out is until 11 AM. Late check-out may be available upon request.",
    },
    {
      question: "Do you offer free Wi-Fi?",
      answer: "Yes, high-speed Wi-Fi is available throughout the property for free.",
    },
    {
      question: "Is parking available at the hotel?",
      answer: "Yes, we offer complimentary parking for all our guests.",
    },
    {
      question: "Are pets allowed in the hotel?",
      answer:
        "Yes, pets are allowed in designated pet-friendly rooms. Additional charges may apply.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: faqAnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto">
        <motion.h2
          className="text-3xl text-center mb-8 bg-yellow-600 font-mono font-semibold py-3 text-white rounded-2xl"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Frequently Asked Questions
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border rounded-lg shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-4 bg-card-bg text-left text-lg font-semibold flex justify-between items-center hover:bg-card text-cta-text"
                >
                  {faq.question}
                  <motion.span
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    ⌄
                  </motion.span>
                </button>
                {openIndex === index && (
                  <motion.div
                    className="p-4 bg-gray-50 text-gray-700 font-mono"
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </div>
            ))}
          </motion.div>
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Lottie options={defaultOptions} height={300} width={300} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
