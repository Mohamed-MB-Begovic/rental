/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast'
import ProductSkeleton from '../Skeleton/ProductSkeleton';
const RecentPlacesRent = () => {
    // const [allProperties, setAllProperties] = useState([]);
    const [loading, setLoading] = useState(false);
    const [properties,setProperties]=useState([])
  // const properties = [
  //   {
  //     id: 1,
  //     title: 'Modern Downtown Apartment',
  //     location: 'New York, NY',
  //     price: '$2,400/mo',
  //     beds: 2,
  //     baths: 1,
  //     sqft: 950,
  //     image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  //     featured: true
  //   },
  //   {
  //     id: 2,
  //     title: 'Luxury Beachfront Villa',
  //     location: 'Miami, FL',
  //     price: '$4,200/mo',
  //     beds: 3,
  //     baths: 2,
  //     sqft: 1800,
  //     image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  //     featured: false
  //   },
  //   {
  //     id: 3,
  //     title: 'Cozy Mountain Cabin',
  //     location: 'Aspen, CO',
  //     price: '$1,800/mo',
  //     beds: 2,
  //     baths: 1,
  //     sqft: 1200,
  //     image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  //     featured: true
  //   },
  //   {
  //     id: 4,
  //     title: 'Historic Townhouse',
  //     location: 'Boston, MA',
  //     price: '$3,100/mo',
  //     beds: 3,
  //     baths: 2.5,
  //     sqft: 2200,
  //     image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  //     featured: false
  //   },
  //   {
  //     id: 5,
  //     title: 'Urban Loft Studio',
  //     location: 'Chicago, IL',
  //     price: '$1,650/mo',
  //     beds: 1,
  //     baths: 1,
  //     sqft: 700,
  //     image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  //     featured: false
  //   },
  //   {
  //     id: 6,
  //     title: 'Suburban Family Home',
  //     location: 'Austin, TX',
  //     price: '$2,800/mo',
  //     beds: 4,
  //     baths: 3,
  //     sqft: 2600,
  //     image: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  //     featured: true
  //   }
  // ];
  useEffect(() => {
    setLoading(true)
    const fetchProperties = async () => {
      // console.log('fetch')
      try {
        const {data} = await axios.get('/api/properties');
        // console.log(data)
        setProperties(data.data.slice(0,6));
        setLoading(false);
      } catch (err) {
        // setError(err.message);\
        toast.error(err.message)
        
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);


  
  if (loading) <ProductSkeleton/>
  

  // if (error) {
  //   return (
  //     <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
  //       <div className="text-red-600 text-lg mb-4">Error: {error}</div>
  //       <button 
  //         onClick={() => window.location.reload()}
  //         className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
  //       >
  //         Try Again
  //       </button>
  //     </div>
  //   );
  // }


  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Recent Places for Rent
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-600 sm:mt-4">
            Discover your perfect home from our curated selection
          </p>
        </div>

        {loading ? (
  <ProductSkeleton />
) : (
<>
<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
  {properties.map((property) => (
    <div 
      key={property._id}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
    >
      <div className="relative">
        <img 
          className="w-full h-64 object-cover"
          src={property.thumbnail} 
          alt={property.title}
        />
        {property.featured && (
          <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            Featured
          </div>
        )}

        {/* Hover button on large screens only */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 hidden lg:flex items-end p-6">
          <Link to={`/property-details/${property._id}`}>
            <button className="w-full py-2 px-4 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors duration-300">
              View Details
            </button>
          </Link>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{property.title}</h3>
            <p className="text-gray-600">{property.location}</p>
          </div>
          <span className="text-xl font-bold text-blue-600">${property.price}</span>
        </div>

        <div className="mt-4 flex items-center text-gray-600">
          <div className="flex items-center mr-4">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>{property.bedrooms} beds</span>
          </div>
          <div className="flex items-center mr-4">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{property.bathrooms} baths</span>
          </div>
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            <span>{property.sqft} sqft</span>
          </div>
        </div>

        {/* Mobile view: combined buttons */}
        <div className="mt-6 flex flex-col space-y-2 lg:hidden">
          <Link to={`/property-details/${property._id}`}>
            <button className="w-full py-2 px-4 bg-white text-blue-600 font-medium rounded-lg border border-blue-600 hover:bg-gray-100 transition-colors duration-300">
              View Details
            </button>
          </Link>
          <Link to={`/tour-details/${property._id}`}>
            <button className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300">
              Schedule a Tour
            </button>
          </Link>
        </div>

        {/* Desktop view: only tour button */}
        <div className="mt-6 hidden lg:block">
          <Link to={`/tour-details/${property._id}`}>
            <button className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300">
              Schedule a Tour
            </button>
          </Link>
        </div>
      </div>
    </div>
  ))}
</div>

          </>
          )
        }
        <div className="mt-12 text-center">
          <Link to='/properties'>
          <button className="px-6 py-3 border-2 border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-300">
            View All Properties
          </button>
          </Link>
       
        </div>
      </div>
    </section>
  );
};

export default RecentPlacesRent;