/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const images = [
    { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c" },
    { src: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914" },
    { src: "https://images.unsplash.com/photo-1570129477492-45c003edd2be" },
    { src: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae" },
    { src: "https://images.unsplash.com/photo-1568605114967-8130f3a36994" }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 120, 
        damping: 20 
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: (index) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: index * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.section 
      className="flex flex-col md:flex-row items-center justify-between px-4 md:px-16 py-12 md:py-24 bg-gradient-to-br overflow-x-auto from-gray-50 to-blue-100"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Left Content */}
      <motion.div 
        className="md:w-1/2 mb-8 md:mb-0 text-center md:text-left"
        variants={containerVariants}
      >
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          variants={itemVariants}
        >
          Find Your Perfect Rental Home
        </motion.h1>
        
        <motion.p 
          className="text-xl text-gray-600 mb-8"
          variants={itemVariants}
        >
          Let's embark on the journey to find your dream house together  
          <span className='text-blue-500 ml-1 font-bold text-2xl'>
            @RentalManager
          </span> 
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
          variants={itemVariants}
        >
          <motion.button
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Browse Properties
          </motion.button>
          
          <motion.button
            className="px-6 py-3 border-2 border-blue-500 text-blue-500 font-semibold rounded-md hover:bg-blue-500 hover:text-white transition duration-300"
            whileHover={{ 
              scale: 1.05,
              backgroundColor: "#3b82f6",
              color: "#fff"
            }}
            whileTap={{ scale: 0.95 }}
          >
            List Your Property
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Right Content - Image Grid */}
      <motion.div 
        className="md:w-1/2"
        variants={itemVariants}
      >
        <div className="flex items-center justify-center">
          <div className="grid grid-cols-3 gap-4">
            {/* First row */}
            <div className="col-span-3 flex justify-center">
              {images.slice(0, 2).map((img, i) => (
                <motion.img
                  key={i}
                  src={img.src}
                  alt="Property"
                  className="w-40 h-40 object-cover rounded-lg mx-2 shadow-md"
                  variants={imageVariants}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                />
              ))}
            </div>
            
            {/* Second row */}
            <div className="col-span-3 flex justify-center">
              {images.slice(2).map((img, i) => (
                <motion.img
                  key={i + 2}
                  src={img.src}
                  alt="Property"
                  className="w-40 h-40 object-cover rounded-lg mx-2 shadow-md"
                  variants={imageVariants}
                  custom={i + 2}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;