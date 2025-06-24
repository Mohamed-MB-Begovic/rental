 import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiMapPin, FiDollarSign } from 'react-icons/fi';

const SimilarProperties = ({ similarProperties }) => {
  // Mock data - in a real app this would come from an API
 
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Properties</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {similarProperties.map((property) => (
          <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <Link to={`/properties/${property.id}`}>
              <div className="relative h-48 w-full">
                <img
                  src={property.thumbnail}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <p className="text-white font-semibold text-lg">{property.price}</p>
                </div>
              </div>
            </Link>

            <div className="p-4">
              <Link to={`/properties/${property._id}`}>
                <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-300">
                  {property.title}
                </h3>
              </Link>
              <div className="flex items-center mt-1 text-gray-600">
                <FiMapPin className="mr-1" />
                <span>{property.location}</span>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 text-sm text-gray-700">
                <div className="flex items-center">
                  <FiHome className="mr-1" />
                  <span>{property.bedrooms} {property.bedrooms === 1 ? 'Bed' : 'Beds'}</span>
                </div>
                <div className="flex items-center">
                  <FiHome className="mr-1" />
                  <span>{property.bathrooms} {property.bathrooms === 1 ? 'Bath' : 'Baths'}</span>
                </div>
                {/* <div className="flex items-center">
                  <FiHome className="mr-1" />
                  <span>{property.sqft} sqft</span>
                </div> */}
              </div>

              <Link
                to={`/properties/${property._id}`}
                className="mt-4 inline-block w-full py-2 px-4 text-center border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors duration-300"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarProperties;