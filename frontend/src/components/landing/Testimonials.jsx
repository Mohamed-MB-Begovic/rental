import React from 'react';
// import avatar1 from '../../assets/avatar1.jpg';
// import avatar2 from '../../assets/avatar2.jpg';
// import avatar3 from '../../assets/avatar3.jpg';

const Testimonials = () => {
    const testimonials = [
        {
          name: 'Sarah Johnson',
          role: 'Property Owner',
          content: 'This platform has made managing my rental properties so much easier...',
          avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
        },
        {
          name: 'Michael Chen',
          role: 'Tenant',
          content: 'Found my perfect apartment in just two days...',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
        },
        {
          name: 'David Wilson',
          role: 'Property Manager',
          content: 'The dashboard gives me complete control...',
          avatar: 'https://randomuser.me/api/portraits/men/75.jpg'
        }
      ];

  return (
    <section className="py-16 px-4 md:px-16">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
        What Our Users Say
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div 
            key={index} 
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="mb-6">
              <p className="text-gray-600 italic">"{testimonial.content}"</p>
            </div>
            <div className="flex items-center">
              <img 
                src={testimonial.avatar} 
                alt={testimonial.name} 
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div>
                <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                <span className="text-gray-500 text-sm">{testimonial.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;