/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion'; // Import Framer Motion

const Features = () => {
  const features = [
    // ... (your existing features array)
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const cardAnimation = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 120,
        damping: 14,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-16 px-4 md:px-16 overflow-hidden">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
        Why Choose Our Platform
      </h2>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={cardAnimation}
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 hover:-translate-y-2"
            whileHover={{ 
              scale: 1.03,
              transition: { duration: 0.2 }
            }}
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-blue-600 mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Features;