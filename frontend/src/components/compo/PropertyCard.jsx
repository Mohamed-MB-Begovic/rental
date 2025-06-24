import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiUser, FiCalendar, FiSettings } from 'react-icons/fi';

const PropertyCard = ({ property, userType }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <FiHome className="h-6 w-6 text-blue-600 mr-2" />
          <h3 className="text-xl font-semibold">{property.name}</h3>
        </div>

        {userType === 'owner' ? (
          <>
            <div className="flex items-center mb-2">
              <span className={`px-2 py-1 text-sm rounded-md ${
                property.status === 'Rented' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {property.status}
              </span>
            </div>
            {property.tenant && (
              <div className="flex items-center mb-2 text-gray-600">
                <FiUser className="mr-2" />
                <span>Tenant: {property.tenant}</span>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="flex items-center mb-2 text-gray-600">
              <FiUser className="mr-2" />
              <span>Landlord: {property.landlord}</span>
            </div>
            <div className="flex items-center mb-4 text-gray-600">
              <FiCalendar className="mr-2" />
              <span>Lease Ends: {new Date(property.leaseEnd).toLocaleDateString()}</span>
            </div>
          </>
        )}

        <div className="flex justify-between items-center mt-4 border-t pt-4">
          <Link
            to={`/properties/${property.id}`}
            className="text-blue-600 hover:text-blue-700 text-sm flex items-center"
          >
            View Details
          </Link>
          <div className="flex space-x-2">
            {userType === 'owner' ? (
              <button className="text-gray-600 hover:text-gray-800 text-sm flex items-center">
                <FiSettings className="mr-1" />
                Manage
              </button>
            ) : (
              <button className="text-gray-600 hover:text-gray-800 text-sm flex items-center">
                Renew Lease
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;