/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiArrowLeft, FiMapPin, FiHome, FiCalendar, FiDollarSign, FiUser, FiShare2, FiHeart, FiX } from 'react-icons/fi';
import axios from 'axios';
import SimilarProperties from './SimilarProperties';
import ContactAgentModel from './ContactAgentModel';
import { FaBath, FaBed } from 'react-icons/fa';
import {useUser} from '../../context/UserContext'
const PropertyDetails = () => {
  const {user}=useUser();
  // console.log(user)
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);
  const [saved, setSaved] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  // const [loginModal, setLoginModal] = useState(false);
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [similarProperties,setSimilarProperties]=useState([])
// console.log(id)
  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        setLoading(true);
        const {data} = await axios.get(`/api/properties/${id}`);
        // console.log(data)
        setProperty(data.data);
        setSimilarProperties(data.similarProperties)
        setError(null);
      } catch (err) {
        setError(err.message);
        setProperty(null);
        console.log(err)
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
    
    return () => {
      // Cleanup if needed
    };
  }, [id]);
  const handleBack = () => {
    navigate(-1);
  };
  // Handle link clicks with authentication check
  const handleLinkClick = (e, path) => {
    if (!user) {
      e.preventDefault(); // Prevent link navigation
     navigate('/login', { state: { from: location.pathname } });
      // setLoginModal(true)
    }
    // If user exists, default link behavior will proceed
  };

 
// console.log(property)
  if (loading) return (
    <>
    <div className="flex justify-center items-center h-64">
        <div className="flex flex-col items-center space-y-2">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    </>
  )
  // <div className="min-h-screen flex items-center justify-center">Loading property details...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center">Error: {error}</div>;
  if (!property) return <div className="min-h-screen flex items-center justify-center">No property found</div>;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Back Button - Mobile */}
      <button
        onClick={handleBack}
        className="md:hidden fixed top-4 left-4 z-20 bg-white p-2 rounded-full shadow-md text-blue-600 hover:text-blue-800 transition-colors duration-300"
      >
        <FiArrowLeft className="h-6 w-6" />
      </button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button - Desktop */}
        <button
          onClick={handleBack}
          className="hidden md:flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors duration-300"
        >
          <FiArrowLeft className="mr-2" />
          Back to Properties
        </button>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Property Images */}
          <div className="relative">
            <div className="h-64 sm:h-96 w-full">
              <img
                src={ property.thumbnail}
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>
            {property.images?.length > 1 && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {property.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`w-3 h-3 rounded-full ${activeImage === index ? 'bg-white' : 'bg-white bg-opacity-50'}`}
                    aria-label={`View image ${index + 1}`}
                  />
                ))}
              </div>
            )}
            <div className="absolute top-4 right-4 flex space-x-2">
              <button
                onClick={() => setSaved(!saved)}
                className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300"
                aria-label={saved ? 'Remove from saved' : 'Save property'}
              >
                <FiHeart className={`h-5 w-5 ${saved ? 'text-red-500 fill-red-500' : 'text-gray-700'}`} />
              </button>
              <button
                className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300"
                aria-label="Share property"
              >
                <FiShare2 className="h-5 w-5 text-gray-700" />
              </button>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start">
              <div className="md:w-2/3">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{property.title}</h1>
                <div className="flex items-center mt-2 text-gray-600">
                  <FiMapPin className="mr-1" />
                  <span>{property.location}</span>
                </div>
                <p className="mt-4 text-xl font-semibold text-blue-600">${property.price?.toLocaleString()}</p>

                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="flex items-center">
                    {/* <FiHome className="mr-2 text-gray-500" /> */}
                     <FaBed className="mr-2 text-gray-500" />
                    <span>{property.bedrooms} {property.bedrooms === 1 ? 'Bed' : 'Beds'}</span>
                  </div>
                  <div className="flex items-center">
                    {/* <FiHome className="mr-2 text-gray-500" /> */}
                      <FaBath className="mr-2 text-gray-500" />
                    <span>{property.bathrooms} {property.bathrooms === 1 ? 'Bath' : 'Baths'}</span>
                  </div>
                  <div className="flex items-center">
                    <FiHome className="mr-2 text-gray-500" />
                    <span>{property.type}</span>
                  </div>
                  <div className="flex items-center">
                    <FiHome className="mr-2 text-gray-500" />
                    <span>{property.furnished}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {/* <FiHome className="mr-2 text-gray-500" /> */}
                    <h2>published:</h2>
                    <span>{new Date(property.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="mt-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
                  <p className="text-gray-600">{property.description}</p>
                </div>

                {property.commonAttributes?.length > 0 && (
                  <div className="mt-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Features</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {property.commonAttributes.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                          <span className="text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {property.specificAttributes?.length > 0 && (
                  <div className="mt-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Additional Features</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {property.specificAttributes.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                          <span className="text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Contact & Schedule Tour Card */}
              <div className="mt-8 md:mt-0 md:w-1/3 md:pl-8">
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                 {property.status === 'available' && user?.userType != "owner" &&
                 <>
                 <h3 className="text-lg font-semibold text-gray-900 mb-4">Schedule a Tour</h3>
                 <Link  to={`/tour-details/${property._id}`}
                  onClick={(e) => handleLinkClick(e, `/tour-details/${property._id}`)}
                 >  
                  <button
                    // onClick={handleScheduleTour}
                    className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300 mb-4"
                  >
                    Schedule a Visit
                  </button>
                  </Link>
                  <Link to={`/rental-payment/${property._id}`}
                    onClick={(e) => handleLinkClick(e, `/rental-payment/${property._id}`)}
                  >
                  {/* <Link to='/lease'> */}
                    <button
                     disabled={property.status==='rented'} 
                    className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg
                     hover:bg-blue-700 transition-colors duration-300 mb-4">

                      Rent
                    </button>
                  </Link>
                  </>
                  }

                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Status</h3>
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                      <span className="font-medium">Availability:</span>
                      <span className={`px-2 py-1 rounded text-sm ${
                        property.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {property.status}
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
        
        {showContactModal && (
          <ContactAgentModel 
            property={property} 
            onClose={() => setShowContactModal(false)} 
          />
        )}
    
        {/* Similar Properties Section */}
        <SimilarProperties  similarProperties={similarProperties}/>
      </div>
    </div>
  );
};

export default PropertyDetails;