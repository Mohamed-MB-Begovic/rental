import React, { useState, useEffect } from 'react';
import { FiSearch, FiMapPin, FiHome, FiHeart, FiFilter, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaBed, FaBath, FaRulerCombined } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductSkeleton from '../components/Skeleton/ProductSkeleton'
const Properties = () => {
  const [allProperties, setAllProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [propertyType, setPropertyType] = useState('All');
  const [bedrooms, setBedrooms] = useState('Any');
  const [showFilters, setShowFilters] = useState(false);
  const [savedProperties, setSavedProperties] = useState([]);

  useEffect(() => {
    setLoading(true)
    const fetchProperties = async () => {
      // console.log('fetch')
      try {
        const {data} = await axios.get('/api/properties');
        // console.log(data)
        setAllProperties(data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const filteredProperties = allProperties?.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = property.price >= priceRange[0] && 
                        property.price <= priceRange[1];
    const matchesType = propertyType === 'All' || property.type === propertyType;
    const matchesBedrooms = bedrooms === 'Any' || 
                          (bedrooms === '4+' ? property.bedrooms >= 4 : property.bedrooms === parseInt(bedrooms));
    
    return matchesSearch && matchesPrice && matchesType && matchesBedrooms;
  });

  const toggleSaveProperty = (propertyId) => {
    setSavedProperties(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId) 
        : [...prev, propertyId]
    );
  };


  const [currentPage, setCurrentPage] = useState(1);
  const [propertiesPerPage] = useState(6);

  // ... existing useEffect and functions ...

  // Get current properties
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, priceRange, propertyType, bedrooms]);

  // if (loading) {
  //   return (
  //     <div className="min-h-screen bg-gray-50 flex items-center justify-center">
  //       <div className="animate-pulse space-y-4">
  //         <div className="h-12 bg-gray-200 rounded w-64"></div>
  //         <div className="h-4 bg-gray-200 rounded w-48"></div>
  //       </div>
  //     </div>
  //   );
  // }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="text-red-600 text-lg mb-4">Error: {error}</div>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Search Section */}
      <div className="bg-blue-py-16 px-4 sm:px-6 lg:px-8">
      <div className="bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-700 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold text-white">Find Your Perfect Home</h1>
          <p className="mt-3 max-w-md mx-auto text-lg text-blue-100">
            Browse thousands of properties across the country
          </p>

          {/* Search Bar */}
          <div className="mt-6 sm:mt-8 max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by location or property name..."
                className="bg-white block w-full pl-10 pr-12 py-3 sm:py-4 truncate border border-transparent rounded-md shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="absolute right-2 top-2 sm:top-2.5 p-2 sm:p-2.5 bg-blue-700 rounded-md text-white hover:bg-blue-800 transition-colors duration-300"
              >
                <FiFilter className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
</div>
      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white shadow-md py-4 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Price Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="0"
                  max="50000"
                  step="1000"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                  className="w-full "
                />
                <span className="text-sm text-gray-600">
                  ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
                </span>
              </div>
            </div>

            {/* Property Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
              <select
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
              >
                <option value="All">All Types</option>
                <option value="villa">Villa</option>
                <option value="cabin">Cabin</option>
                <option value="apartment">Apartment</option>
              </select>
            </div>

            {/* Bedrooms Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
              <select
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
              >
                <option value="Any">Any</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4+">4+</option>
              </select>
            </div>

            {/* Apply Filters Button */}
            <div className="flex items-end">
              <button
                onClick={() => setShowFilters(false)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

{/* Property Listings */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="tex  text-gray-900">
            Showing <span className='font-bold'>{indexOfFirstProperty + 1}</span> - <span className='font-bold'>{Math.min(indexOfLastProperty, filteredProperties.length)} </span> of <span className='font-bold'>{filteredProperties.length} </span>Properties
          </h2>
          {/* ... sort dropdown ... */}
        </div>
      {/* Property Listings */} 
 
        {/* <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {filteredProperties.length} Properties Available
          </h2>
          <div className="hidden md:flex items-center">
            <span className="mr-2 text-sm text-gray-600">Sort by:</span>
            <select className="border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500">
              <option>Most Recent</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div> */}

{
  loading ? <ProductSkeleton/> :
  (
  <div>
        {currentProperties.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">No properties found</h3>
            <p className="mt-2 text-gray-600">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProperties.map((property) => (
              <div key={property._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative">
                  <img
                    className="w-full h-56 object-cover"
                    src={property.thumbnail || property.images?.[0]}
                    alt={property.title}
                    loading="lazy"
                  />
                  <button
                    onClick={() => toggleSaveProperty(property._id)}
                    className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300"
                  >
                    <FiHeart className={`h-5 w-5 ${savedProperties.includes(property._id) ? 'text-red-500 fill-red-500' : 'text-gray-700'}`} />
                  </button>
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{property.title}</h3>
                      <div className="flex items-center mt-1 text-gray-600">
                        <FiMapPin className="mr-1" />
                        <span>{property.location}</span>
                      </div>
                    </div>
                    <p className="text-lg font-bold text-blue-600">
                      ${property.price.toLocaleString()}
                    </p>
                  </div>

                  <div className="mt-4 flex justify-between text-sm text-gray-600">
                    <div className="flex items-center">
                      <FaBed className="mr-1" />
                      <span>{property.bedrooms} {property.bedrooms === 1 ? 'Bed' : 'Beds'}</span>
                    </div>
                    <div className="flex items-center">
                      <FaBath className="mr-1" />
                      <span>{property.bathrooms} {property.bathrooms === 1 ? 'Bath' : 'Baths'}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="capitalize">{property.type}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <span className={`text-sm px-2 py-1 rounded ${
                      property.status === 'available' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {property.status}
                    </span>
                    <Link to={`/property-details/${property._id}`}>
                      <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors duration-300">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        
        </div>
  )}
  {/* Pagination */}
        {filteredProperties.length > propertiesPerPage && (
          <div className="mt-12 flex items-center justify-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded-full ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-100'}`}
            >
              <FiChevronLeft size={20} />
            </button>

            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1;
              // Show limited page numbers (current page + neighbors)
              if (
                page === 1 || 
                page === totalPages || 
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <button
                    key={page}
                    onClick={() => paginate(page)}
                    className={`w-10 h-10 rounded-full ${
                      currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {page}
                  </button>
                );
              }
              return null;
            })}

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-full ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-100'}`}
            >
              <FiChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Properties;