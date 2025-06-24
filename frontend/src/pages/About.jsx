import React from 'react';
import { FiUsers, FiHome, FiAward, FiCheckCircle } from 'react-icons/fi';

const About = () => {
  const stats = [
    { value: '10,000+', label: 'Properties Listed' },
    { value: '50,000+', label: 'Happy Customers' },
    { value: '100+', label: 'Cities Covered' },
    { value: '24/7', label: 'Customer Support' }
  ];

  const features = [
    {
      icon: <FiCheckCircle className="h-8 w-8 text-blue-600" />,
      title: 'Verified Listings',
      description: 'Every property goes through a rigorous verification process to ensure quality and accuracy.'
    },
    {
      icon: <FiCheckCircle className="h-8 w-8 text-blue-600" />,
      title: 'Secure Payments',
      description: 'All transactions are protected with bank-level security and encryption.'
    },
    {
      icon: <FiCheckCircle className="h-8 w-8 text-blue-600" />,
      title: 'Dedicated Support',
      description: 'Our team is available around the clock to assist with any questions or concerns.'
    }
  ];

  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
    },
    // {
    //   name: 'David Wilson',
    //   role: 'Head of Operations',
    //   image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=699&q=80'
    // },
    // {
    //   name: 'Emily Rodriguez',
    //   role: 'Customer Success',
    //   image: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=686&q=80'
    // }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gray-900">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover opacity-50"
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            alt="Modern office space"
          />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            About Rental Manager
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl">
            Revolutionizing the way people find and manage rental properties since 2025.
          </p>
        </div>
      </div>

      {/* Our Story */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Our Story
            </h2>
            <p className="mt-3 text-lg text-gray-500">
              Founded in 2025, Rental Manager began as a simple solution to a complex problem: making rental property management effortless for both tenants and owners. What started as a small team in Kismayo has grown into a nationwide platform serving thousands of customers every day.
            </p>
            <p className="mt-4 text-lg text-gray-500">
              Our mission is to create seamless connections between property owners and renters while providing tools that simplify every step of the rental process. We believe everyone deserves a great place to live and the tools to manage it effectively.
            </p>
          </div>
          <div className="mt-12 lg:mt-0">
            <img
              className="w-full rounded-lg shadow-xl"
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              alt="Our team working together"
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl font-extrabold text-blue-600">{stat.value}</p>
                <p className="mt-2 text-lg font-medium text-gray-900">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Values
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
            These principles guide everything we do at Rental Manager
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="pt-6">
              <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8 h-full">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                      {feature.icon}
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="mt-5 text-base text-gray-500">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Meet Our Team
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
              The passionate people behind Rental Manager
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                 <div className="flow-root bg-white rounded-lg px-6 pb-8 h-full">
                  <div className="-mt-6 text-center">
                    <div className="flex justify-center">
                      <img
                        className="h-24 w-24 rounded-full object-cover"
                        // src="c:\Users\dhechdekch\Downloads\WhatsApp Image 2025-06-08 at 01.35.45.jpeg"
                        src="/p-4.jpeg"
                        alt="mohamed"
                      />
                    </div>
                    <h3 className="mt-6 text-lg font-medium text-gray-900 tracking-tight">
                    mohamed mohamud
                    </h3>
                    <p className="mt-2 text-base text-blue-600">
                    CEO & Founder
                    </p>
                  </div>
                </div>
                 <div className="flow-root bg-white rounded-lg px-6 pb-8 h-full">
                  <div className="-mt-6 text-center">
                    <div className="flex justify-center">
                      <img
                        className="h-24 w-24 rounded-full object-cover"
                        // src="c:\Users\dhechdekch\Downloads\WhatsApp Image 2025-06-08 at 01.35.45.jpeg"
                        src="/p-2.jpeg"
                        alt="sulieman"
                      />
                    </div>
                    <h3 className="mt-6 text-lg font-medium text-gray-900 tracking-tight">
                    sulieman mohamed
                    </h3>
                    <p className="mt-2 text-base text-blue-600">
                   Head Of Operation
                    </p>
                  </div>
                </div>
            {teamMembers.map((member, index) => (
              <div key={index} className="pt-6">
                <div className="flow-root bg-white rounded-lg px-6 pb-8 h-full">
                  <div className="-mt-6 text-center">
                    <div className="flex justify-center">
                      <img
                        className="h-24 w-24 rounded-full object-cover"
                        src={member.image}
                        alt={member.name}
                      />
                    </div>
                    <h3 className="mt-6 text-lg font-medium text-gray-900 tracking-tight">
                      {member.name}
                    </h3>
                    <p className="mt-2 text-base text-blue-600">
                      {member.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-blue-700">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Ready to find your perfect home?</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-blue-200">
            Join thousands of happy customers using Rental Manager today.
          </p>
          <a
            href="/properties"
            className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 sm:w-auto"
          >
            Browse Properties
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;