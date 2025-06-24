/* eslint-disable no-unused-vars */
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const FinancialTracking = () => {
  // Create refs for each animated section
  const headerRef = useRef(null);
  const featuresRef = useRef(null);
  const reportsRef = useRef(null);
  const insightsRef = useRef(null);
  
  // Check if sections are in view
  const headerInView = useInView(headerRef, { once: true, margin: "-20% 0px" });
  const featuresInView = useInView(featuresRef, { once: true, margin: "-10% 0px" });
  const reportsInView = useInView(reportsRef, { once: true, margin: "-10% 0px" });
  const insightsInView = useInView(insightsRef, { once: true, margin: "-10% 0px" });

  // Animation variants
  const fadeInUp = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
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

  const scaleUp = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { 
        duration: 0.5,
        type: "spring",
        stiffness: 120 
      }
    }
  };

  const features = [
    "Automated rent payment tracking",
    "Expense categorization and reporting",
    "Profit/loss statements",
    "Tax preparation reports",
    "Customizable financial dashboards"
  ];

  const reports = [
    { name: "Monthly Cash Flow", frequency: "Auto-generated monthly" },
    { name: "Expense Breakdown", frequency: "Real-time tracking" },
    { name: "Tenant Payment History", frequency: "Per tenant basis" },
    { name: "Yearly Tax Summary", frequency: "Generated annually" }
  ];

  const insights = [
    { value: "+15%", label: "Average revenue increase" },
    { value: "-20%", label: "Reduction in late payments" },
    { value: "8.5h", label: "Monthly time saved on accounting" },
    { value: "98%", label: "Accuracy in financial reporting" }
  ];

  return (
    <div className="w-full">
      {/* Header with scroll animation */}
      <motion.div 
        ref={headerRef}
        className="bg-gradient-to-r from-green-600 to-emerald-700 text-white p-10 lg:p-20 mb-8"
        initial="hidden"
        animate={headerInView ? "visible" : "hidden"}
        variants={fadeIn}
      >
        <motion.h1 
          className="text-4xl font-bold mb-4"
          variants={fadeInUp}
        >
          Financial Tracking
        </motion.h1>
        <motion.p 
          className="text-xl text-green-100"
          variants={fadeInUp}
          transition={{ delay: 0.2 }}
        >
          Automated financial reports and analytics for your rental business
        </motion.p>
      </motion.div>
      
      {/* Features & Reports Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:p-10">
        {/* Key Features Card */}
        <motion.div 
          ref={featuresRef}
          className="bg-white rounded-xl shadow-lg p-6"
          initial="hidden"
          animate={featuresInView ? "visible" : "hidden"}
          variants={fadeInUp}
          transition={{ delay: 0.1 }}
        >
          <motion.h2 
            className="text-2xl font-bold text-gray-800 mb-4"
            variants={fadeInUp}
          >
            Key Features
          </motion.h2>
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <motion.li 
                key={index} 
                className="flex items-start"
                variants={fadeInUp}
                initial="hidden"
                animate={featuresInView ? "visible" : "hidden"}
                custom={index}
                transition={{ delay: index * 0.1 }}
              >
                <div className="bg-green-100 rounded-full p-2 mr-3">
                  <motion.div 
                    className="bg-green-600 w-4 h-4 rounded-full"
                    initial={{ scale: 0 }}
                    animate={featuresInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                  />
                </div>
                <span className="text-gray-700">{feature}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
        
        {/* Financial Reports Card */}
        <motion.div 
          ref={reportsRef}
          className="bg-white rounded-xl shadow-lg p-10 lg:p-6"
          initial="hidden"
          animate={reportsInView ? "visible" : "hidden"}
          variants={fadeInUp}
          transition={{ delay: 0.2 }}
        >
          <motion.h2 
            className="text-2xl font-bold text-gray-800 mb-4"
            variants={fadeInUp}
          >
            Financial Reports
          </motion.h2>
          <div className="space-y-4">
            {reports.map((report, index) => (
              <motion.div 
                key={index} 
                className="border-b pb-3 last:border-0 last:pb-0"
                variants={fadeInUp}
                initial="hidden"
                animate={reportsInView ? "visible" : "hidden"}
                custom={index}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 10 }}
              >
                <h3 className="font-semibold text-gray-800">{report.name}</h3>
                <p className="text-sm text-gray-600">{report.frequency}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Financial Insights Section */}
      <motion.div 
        ref={insightsRef}
        className="mt-8 bg-green-50 rounded-xl p-8 lg:p-10"
        initial="hidden"
        animate={insightsInView ? "visible" : "hidden"}
        variants={fadeIn}
        transition={{ delay: 0.2 }}
      >
        <motion.h2 
          className="text-2xl font-bold text-gray-800 mb-4"
          variants={fadeInUp}
        >
          Financial Insights
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {insights.map((insight, index) => (
            <motion.div 
              key={index} 
              className="bg-white rounded-lg p-4 shadow hover:shadow-md transition-shadow"
              variants={scaleUp}
              initial="hidden"
              animate={insightsInView ? "visible" : "hidden"}
              custom={index}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                y: -5,
                scale: 1.03,
                transition: { duration: 0.2 }
              }}
            >
              <div className="text-3xl font-bold text-green-600 mb-2">
                {insight.value}
              </div>
              <p className="text-gray-700">{insight.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default FinancialTracking;