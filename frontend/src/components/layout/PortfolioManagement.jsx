/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const listItemVariants = (delay = 0) => ({
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, delay },
  },
});

const PortfolioManagement = () => {
  const [featuresRef, inViewFeatures] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [benefitsRef, inViewBenefits] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [workflowRef, inViewWorkflow] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div className="w-full">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white p-10 lg:p-20 mb-8"
      >
        <h1 className="text-4xl font-bold mb-4">Portfolio Management</h1>
        <p className="text-xl text-indigo-100">
          Centralized dashboard for all your properties with real-time insights
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:p-10">
        {/* Features Section */}
        <motion.div
          ref={featuresRef}
          initial="hidden"
          animate={inViewFeatures ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Features</h2>
          <ul className="space-y-3">
            {[
              'Real-time property performance metrics',
              'Interactive property map visualization',
              'Vacancy rate tracking',
              'Maintenance request dashboard',
            ].map((item, index) => (
              <motion.li
                key={index}
                variants={listItemVariants(index * 0.1)}
                initial="hidden"
                animate={inViewFeatures ? 'visible' : 'hidden'}
                className="flex items-start"
              >
                <div className="bg-indigo-100 rounded-full p-2 mr-3">
                  <div className="bg-indigo-600 w-4 h-4 rounded-full"></div>
                </div>
                <span className="text-gray-700">{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          ref={benefitsRef}
          initial="hidden"
          animate={inViewBenefits ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Benefits</h2>
          <div className="space-y-4">
            {[
              { value: '+30%', text: 'Increase in portfolio overview efficiency' },
              { value: '-25%', text: 'Reduction in management time' },
              { value: '99%', text: 'Data accuracy in reporting' },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                variants={listItemVariants(index * 0.1)}
                initial="hidden"
                animate={inViewBenefits ? 'visible' : 'hidden'}
                className="flex items-start"
              >
                <div className="bg-green-100 text-green-800 rounded-lg px-3 py-1 mr-3 text-sm font-medium">
                  {benefit.value}
                </div>
                <span className="text-gray-700">{benefit.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* How It Works Section */}
      <motion.div
        ref={workflowRef}
        initial="hidden"
        animate={inViewWorkflow ? 'visible' : 'hidden'}
        variants={fadeInUp}
        className="mt-8 bg-indigo-50 rounded-xl lg:p-14 px-10 py-12"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">How It Works</h2>
        <ol className="space-y-4">
          {[
            'Connect all your properties to our centralized system',
            'Track performance metrics in real-time',
            'Receive automated insights and recommendations',
            'Manage all properties from a single dashboard',
          ].map((step, index) => (
            <motion.li
              key={index}
              variants={listItemVariants(index * 0.15)}
              initial="hidden"
              animate={inViewWorkflow ? 'visible' : 'hidden'}
              className="flex items-start"
            >
              <div className="bg-white border-2 border-indigo-600 rounded-full w-8 h-8 flex items-center justify-center text-indigo-700 font-bold mr-3">
                {index + 1}
              </div>
              <span className="text-gray-700">{step}</span>
            </motion.li>
          ))}
        </ol>
      </motion.div>
    </div>
  );
};

export default PortfolioManagement;
