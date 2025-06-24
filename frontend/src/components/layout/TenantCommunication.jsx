/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const listItemVariant = (delay = 0) => ({
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, delay },
  },
});

const TenantCommunication = () => {
  const [featuresRef, inViewFeatures] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [benefitsRef, inViewBenefits] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [workflowRef, inViewWorkflow] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div className="w-full">
      {/* Header */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="bg-gradient-to-r from-blue-600 to-cyan-700 text-white p-10 lg:p-20 mb-8"
      >
        <h1 className="text-4xl font-bold mb-4">Tenant Communication</h1>
        <p className="text-xl text-blue-100">
          Streamlined messaging system for better tenant relationships
        </p>
      </motion.div>

      {/* Communication Features & Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:p-10 gap-8">
        {/* Features */}
        <motion.div
          ref={featuresRef}
          initial="hidden"
          animate={inViewFeatures ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Communication Features</h2>
          <ul className="space-y-3">
            {[
              'In-app messaging system',
              'Automated rent reminders',
              'Maintenance request tracking',
              'Announcement broadcasting',
              'Document sharing portal',
            ].map((feature, index) => (
              <motion.li
                key={index}
                className="flex items-start"
                variants={listItemVariant(index * 0.1)}
                initial="hidden"
                animate={inViewFeatures ? 'visible' : 'hidden'}
              >
                <div className="bg-blue-100 rounded-full p-2 mr-3">
                  <div className="bg-blue-600 w-4 h-4 rounded-full"></div>
                </div>
                <span className="text-gray-700">{feature}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Benefits */}
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
              'Resolve issues 40% faster',
              'Reduce missed communications by 75%',
              'Improve tenant satisfaction scores',
              'Centralize all communication history',
            ].map((benefit, index) => (
              <motion.div
                key={index}
                className="flex items-start"
                variants={listItemVariant(index * 0.1)}
                initial="hidden"
                animate={inViewBenefits ? 'visible' : 'hidden'}
              >
                <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-1">
                  ✓
                </div>
                <span className="text-gray-700">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Communication Workflow */}
      <motion.div
        ref={workflowRef}
        initial="hidden"
        animate={inViewWorkflow ? 'visible' : 'hidden'}
        variants={fadeInUp}
        className="mt-8 bg-blue-50 rounded-xl lg:p-10 p-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Communication Workflow</h2>
        <div className="flex overflow-x-auto pb-4 space-x-12">
          {[
            {
              step: 1,
              title: 'Message Initiation',
              desc: 'Start conversation via app, email, or SMS',
            },
            {
              step: 2,
              title: 'Thread Management',
              desc: 'All messages organized in one thread',
            },
            {
              step: 3,
              title: 'Attachment Sharing',
              desc: 'Share documents and images securely',
            },
            {
              step: 4,
              title: 'Resolution Tracking',
              desc: 'Mark issues as resolved with notes',
            },
          ].map((step, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow p-4 min-w-[250px] flex-shrink-0"
              initial={{ opacity: 0, y: 20 }}
              animate={inViewWorkflow ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
            >
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mb-3">
                {step.step}
              </div>
              <h3 className="font-bold text-gray-800">{step.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default TenantCommunication;
