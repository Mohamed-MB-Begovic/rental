/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const LandingFeatureSection = () => {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96] 
      }
    }
  };

  const card = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -10,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      transition: { duration: 0.3 }
    }
  };

  const statItem = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: (index) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: index * 0.2,
        duration: 0.6,
        type: "spring",
        stiffness: 100
      }
    })
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.8,
        ease: "easeOut" 
      } 
    }
  };

  return (
    <motion.section 
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 to-purple-50"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={container}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          variants={item}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Revolutionize Your Rental Management
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Powerful tools designed to simplify property management and maximize your returns
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={container}
        >
          {/* Feature Card 1 */}
          <motion.div 
            className="group bg-white rounded-2xl shadow-lg p-6 transition-all duration-300"
            variants={card}
            whileHover="hover"
          >
            <div className="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Portfolio Management</h3>
            <p className="text-gray-600 mb-4">Manage all your properties in one centralized dashboard with real-time insights.</p>
          <Link to='portfolioManagement'>
            <button className="text-indigo-600 font-medium flex items-center group-hover:text-indigo-800 transition-colors">
              Learn more
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </Link>
          </motion.div>

          {/* Feature Card 2 */}
          <motion.div 
            className="group bg-white rounded-2xl shadow-lg p-6 transition-all duration-300"
            variants={card}
            whileHover="hover"
          >
            <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Financial Tracking</h3>
            <p className="text-gray-600 mb-4">Track rent payments, expenses, and profits with automated reports and analytics.</p>
            <Link to='/financialTracking'>
            <button className="text-purple-600 font-medium flex items-center group-hover:text-purple-800 transition-colors">
              Learn more
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            </Link>
          </motion.div>

          {/* Feature Card 3 */}
          <motion.div 
            className="group bg-white rounded-2xl shadow-lg p-6 transition-all duration-300"
            variants={card}
            whileHover="hover"
          >
            <div className="w-16 h-16 bg-cyan-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-cyan-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-600 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Tenant Communication</h3>
            <p className="text-gray-600 mb-4">Integrated messaging system to communicate with tenants and resolve issues faster.</p>
           <Link to='/tenantCommunication'>
            <button className="text-cyan-600 font-medium flex items-center group-hover:text-cyan-800 transition-colors">
              Learn more
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
           </Link>
          </motion.div>

          {/* Feature Card 4 */}
          <motion.div 
            className="group bg-white rounded-2xl shadow-lg p-6 transition-all duration-300"
            variants={card}
            whileHover="hover"
          >
            <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Document Management</h3>
            <p className="text-gray-600 mb-4">Securely store and organize lease agreements, inspection reports, and other documents.</p>
          <Link to='/documentManagement'>
            <button className="text-emerald-600 font-medium flex items-center group-hover:text-emerald-800 transition-colors">
              Learn more
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </Link>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="mt-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white shadow-xl overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeIn}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[0, 1, 2, 3].map((index) => (
              <motion.div 
                key={index}
                className="p-4"
                variants={statItem}
                custom={index}
              >
                <div className="text-4xl font-bold mb-2">
                  {index === 0 ? "95%" : index === 1 ? "10K+" : index === 2 ? "24/7" : "30%"}
                </div>
                <div className="text-indigo-100">
                  {index === 0 ? "User Satisfaction" : 
                   index === 1 ? "Properties Managed" : 
                   index === 2 ? "Customer Support" : "Time Saved"}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="mt-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { 
                duration: 0.6,
                ease: "easeOut" 
              } 
            }
          }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Ready to streamline your property management?</h3>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.button 
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg shadow-lg"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.5)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              Get Started for Free
            </motion.button>
            <motion.button 
              className="px-8 py-4 bg-white text-indigo-600 font-medium rounded-lg border border-indigo-200 shadow-sm"
              whileHover={{ 
                backgroundColor: "#f5f3ff",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              Schedule a Demo
            </motion.button>
          </div>
          <p className="text-gray-500 mt-6">No credit card required. Cancel anytime.</p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default LandingFeatureSection;