/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const DocumentManagement = () => {
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ref3, inView3] = useInView({ triggerOnce: true, threshold: 0.2 });

  const cardFadeIn = (delay = 0) => ({
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.6, delay },
    },
  });

  return (
    <div className="w-full">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="bg-gradient-to-r from-amber-600 to-orange-700 text-white p-10 lg:p-20 mb-8"
      >
        <h1 className="text-4xl font-bold mb-4">Document Management</h1>
        <p className="text-xl text-amber-100">
          Secure storage and organization for all your rental documents
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:p-10">
        <motion.div
          ref={ref1}
          variants={cardFadeIn(0.1)}
          initial="hidden"
          animate={inView1 ? 'visible' : 'hidden'}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Document Types</h2>
          <ul className="space-y-3">
            {[
              'Lease agreements',
              'Inspection reports',
              'Maintenance records',
              'Tenant applications',
              'Property photos',
              'Financial documents',
              'Insurance policies',
              'Compliance certificates',
            ].map((docType, index) => (
              <motion.li
                key={index}
                className="flex items-start"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <div className="bg-amber-100 rounded-full p-2 mr-3">
                  <div className="bg-amber-600 w-4 h-4 rounded-full"></div>
                </div>
                <span className="text-gray-700">{docType}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          ref={ref2}
          variants={cardFadeIn(0.2)}
          initial="hidden"
          animate={inView2 ? 'visible' : 'hidden'}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Security Features</h2>
          <div className="space-y-4">
            {[
              'Bank-grade 256-bit encryption',
              'Role-based access control',
              'Automated backup system',
              'Audit trail for all document access',
              'Two-factor authentication',
              'Compliance with data protection regulations',
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-start"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
              >
                <div className="bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-1">
                  ✓
                </div>
                <span className="text-gray-700">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        ref={ref3}
        variants={fadeInUp}
        initial="hidden"
        animate={inView3 ? 'visible' : 'hidden'}
        className="mt-8 bg-amber-50 rounded-xl lg:p-10 p-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Document Workflow</h2>
        <div className="flex flex-col space-y-4">
          {[
            { action: 'Upload', desc: 'Drag & drop or scan documents directly into the system' },
            { action: 'Categorize', desc: 'Auto-tag documents by type and property' },
            { action: 'Store', desc: 'Secure cloud storage with version history' },
            { action: 'Access', desc: 'Retrieve documents anytime from any device' },
            { action: 'Share', desc: 'Securely share documents with tenants or team members' },
          ].map((step, index) => (
            <motion.div
              key={index}
              className="flex items-start border-b pb-4 last:border-0 last:pb-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
            >
              <div className="bg-amber-600 text-white rounded-lg px-3 py-1 font-medium mr-4">
                {step.action}
              </div>
              <span className="text-gray-700">{step.desc}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default DocumentManagement;
