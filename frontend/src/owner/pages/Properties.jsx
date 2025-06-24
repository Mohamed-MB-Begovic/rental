/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useState } from "react";
import { FiChevronsDown, FiChevronUp, FiFilter, FiSearch, FiStar, FiPlus, FiX, FiEdit, FiTrash } from "react-icons/fi";
import { FiZoomIn, FiHeart, FiShare2, FiArrowLeft, FiArrowRight } from 'react-icons/fi';

import axios from 'axios'
import toast from 'react-hot-toast'
import {useUser} from '../../context/UserContext'
 
const Properties = () => {
const {user} =useUser();

  const [propertyData, setPropertyData] = useState({
    type: 'cabin',
    title: '',
    description: '',
    price: '',
    tourPrice:'',
    location: '',
    bedrooms: '',
    bathrooms: '',
    thumbnail:"",
    commonAttributes:  {
      wifi: false,
      parking: false,
      pool: false,
      kitchen: false,
      ac: false
    },
    specificAttributes: {},
    images:[],
    ownerId:user._id
  });

  // Define property type specific attributes
  const propertyTypeAttributes = {
    cabin: {
      fireplace: false,
      woodSupplied: false,
      hotTub: false,
      mountainView: false
    },
    villa: {
      privateBeachAccess: false,
      staffIncluded: false,
      securitySystem: false,
      garden: false
    },
    apartment: {
      elevator: false,
      doorman: false,
      gymAccess: false,
      balcony: false
    }
  };



  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 3;
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editing, setEditing] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [adding,setAdding]=useState(false)
 
  const [editedProperty, setEditedProperty] = useState({
    title: '',
    owner: '',
    location: '',
    status: 'Active',
    type: 'Apartment',
    bedrooms:'',
    bathrooms:'',
    price: '',
    listedDate: '',
    featured: false,
    image: ''
  });
// console.log(user)
 
  const [currentStep, setCurrentStep] = useState(1); // For multi-step form
 
  const propertyTypes = [
    {
      id: 'cabin',
      name: 'Cabin',
      description: 'Cozy wooden retreats in nature',
      image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'villa',
      name: 'Villa',
      description: 'Luxurious private residences',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    },
     
  ];

 
 
  const handleTypeSelect = (type) => {
    setPropertyData({
      ...propertyData,
      type,
      specificAttributes: propertyTypeAttributes[type]
    });
    setCurrentStep(2); // Move to next step
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name in propertyData.commonAttributes) {
      setPropertyData({
        ...propertyData,
        commonAttributes: {
          ...propertyData.commonAttributes,
          [name]: type === 'checkbox' ? checked : value
        }
      });
    } else if (name.startsWith('specific.')) {
      const specificField = name.split('.')[1];
      setPropertyData({
        ...propertyData,
        specificAttributes: {
          ...propertyData.specificAttributes,
          [specificField]: type === 'checkbox' ? checked : value
        }
      });
    } else {
      setPropertyData({
        ...propertyData,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setPropertyData({
      ...propertyData,
      type: newType,
      specificAttributes: propertyTypeAttributes[newType]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
 
    addNewProperty(propertyData)
 
  };
 
  
 

  // Filter properties based on search and filters
  const filteredProperties = properties?.filter(property => {
    const matchesSearch = property.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         property.location?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || property?.status === statusFilter;
    const matchesType = typeFilter === 'All' || property?.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Pagination logic
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  // Property actions
  const updatePropertyStatus = (id, newStatus) => {
    setProperties(properties.map(prop => 
      prop.id === id ? {...prop, status: newStatus} : prop
    ));
  };

  const toggleFeatured = (id) => {
    setProperties(properties.map(prop => 
      prop.id === id ? {...prop, featured: !prop.featured} : prop
    ));
  };
 
// // Edit Property Functions
const handleEditInputChange = (e) => {
  const { name, value, type, checked } = e.target;
  setEditedProperty(prev => ({
    ...prev,
    [name]: type === 'checkbox' ? checked : value
  }));
};


const handleImageUpload = (e) => {
  const files = Array.from(e.target.files);
  setPropertyData({
    ...propertyData,
    images: [...propertyData.images, ...files]
  });
};

const deleteImage = (index) => {
  const newImages = [...propertyData.images];
  newImages.splice(index, 1);
  setPropertyData({
    ...propertyData,
    images: newImages
  });
};


 // Fetch properties from API on component mount
 useEffect(() => {
  const fetchProperties = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get('/api/properties');
      setProperties(data.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setIsLoading(false);
    }
  };
  fetchProperties();
}, []);
 

 // Delete property
 const deleteProperty = async (id) => {
  if(!confirm('are you sure to delete this property')) return
 try {
   await axios.delete(`/api/properties/${id}`);
   setProperties(properties.filter(prop => prop._id !== id));
   toast.success('successfully deleted')
   if (currentProperties.length === 1 && currentPage > 1) {
     setCurrentPage(currentPage - 1);
   }
   
 } catch (error) {
   console.error('Error deleting property:', error);
 }
};
// Utility function to transform attributes to an array of strings
const transformAttributes = (attributes) => {
  return Object.keys(attributes).filter(key => attributes[key]);
};

const addNewProperty = async (propertyData) => {
  // console.log(propertyData)
  try {
    setAdding(true);

    // Prepare FormData for file and text upload
    const formData = new FormData();
    formData.append('title', propertyData.title);
    formData.append('type', propertyData.type);
    formData.append('price', propertyData.price);
    formData.append('location', propertyData.location);
    formData.append('bedrooms', propertyData.bedrooms);
    formData.append('bathrooms', propertyData.bathrooms);
    formData.append('furnished', propertyData.furnished);
    formData.append('description', propertyData.description);
    formData.append('tourPrice', propertyData.tourPrice);

  
   if(propertyData.commonAttributes){
     const commonAttributes = Object.keys(propertyData.commonAttributes).filter(key => propertyData.commonAttributes[key]);
     formData.append('commonAttributes',commonAttributes)
   }
   if(propertyData.specificAttributes){
    const specificAttributes = Object.keys(propertyData.specificAttributes).filter(key => propertyData.specificAttributes[key]);
    formData.append('specificAttributes',specificAttributes)

   }
    // Append files
    if (propertyData.thumbnail) {
      formData.append('thumbnail', propertyData.thumbnail);
    }

    if (propertyData.images && propertyData.images.length > 0) {
      propertyData.images.forEach((image) => {
        formData.append('images', image);
      });
    }
    const { data } = await axios.post('/api/properties', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });

    setProperties(prev => [...prev, data.data]);
      toast.success('Property added successfully');
      setAdding(false)
      setShowAddModal(false);
     setPropertyData({
        type: 'cabin',
        title: '',
        description: '',
        price: '',
        location: '',
        bedrooms: '',
        bathrooms: '',
        thumbnail:"",
        commonAttributes:  {
          wifi: false,
          parking: false,
          pool: false,
          kitchen: false,
          ac: false
        },
        specificAttributes: {},
        images:[],
        ownerId:user._id
      })

    // console.log('Property added:', data);
  } catch (error) {
    console.error('Error adding property:', error);
  } finally {
    setAdding(false);
  }
};


// For handling array inputs
const addImageField = () => {
  setEditedProperty(prev => ({ ...prev, images: [...prev.images, ''] }));
};

// const deleteImage = (index) => {
//   setEditedProperty(prev => ({
//     ...prev,
//     images: prev.images.filter((_, i) => i !== index)
//   }));
// };

const handleImageChange = (index, value) => {
  const newImages = [...editedProperty.images];
  newImages[index] = value;
  setEditedProperty({ ...editedProperty, images: newImages });
};

// Similar handlers for commonAttributes and specificAttributes
// const [editing, setEditing] = useState(false);

// Handler for input changes
// const handleEditInputChange = (e) => {
//   const { name, value } = e.target;
//   setEditedProperty(prev => ({
//     ...prev,
//     [name]: value
//   }));
// };

// // Handler for image changes
// const handleImageChange = (index, value) => {
//   const newImages = [...editedProperty.images];
//   newImages[index] = value;
//   setEditedProperty(prev => ({
//     ...prev,
//     images: newImages
//   }));
// };

// // Add a new image field
// const addImageField = () => {
//   setEditedProperty(prev => ({
//     ...prev,
//     images: [...prev.images, '']
//   }));
// };

// Remove an image
const removeImage = (index) => {
  const newImages = editedProperty.images.filter((_, i) => i !== index);
  setEditedProperty(prev => ({
    ...prev,
    images: newImages
  }));
};

// Handler for common attribute changes
const handleCommonAttributeChange = (index, value) => {
  const newAttributes = [...editedProperty.commonAttributes];
  newAttributes[index] = value;
  setEditedProperty(prev => ({
    ...prev,
    commonAttributes: newAttributes
  }));
};

// Add a new common attribute
const addCommonAttribute = () => {
  setEditedProperty(prev => ({
    ...prev,
    commonAttributes: [...prev.commonAttributes, '']
  }));
};

// Remove a common attribute
const removeCommonAttribute = (index) => {
  const newAttributes = editedProperty.commonAttributes.filter((_, i) => i !== index);
  setEditedProperty(prev => ({
    ...prev,
    commonAttributes: newAttributes
  }));
};

// Handler for specific attribute changes
const handleSpecificAttributeChange = (index, value) => {
  const newAttributes = [...editedProperty.specificAttributes];
  newAttributes[index] = value;
  setEditedProperty(prev => ({
    ...prev,
    specificAttributes: newAttributes
  }));
};

// Add a new specific attribute
const addSpecificAttribute = () => {
  setEditedProperty(prev => ({
    ...prev,
    specificAttributes: [...prev.specificAttributes, '']
  }));
};

// Remove a specific attribute
const removeSpecificAttribute = (index) => {
  const newAttributes = editedProperty.specificAttributes.filter((_, i) => i !== index);
  setEditedProperty(prev => ({
    ...prev,
    specificAttributes: newAttributes
  }));
};

// Handler for form submission
const handleEditSubmit = async () => {
  // Validate required fields
  // if (!editedProperty.title || 
  //     !editedProperty.price || 
  //     !editedProperty.bedrooms || 
  //     !editedProperty.bathrooms || 
  //     !editedProperty.thumbnail || 
  //     !editedProperty.description) {
  //   alert('Please fill in all required fields');
  //   return;
  // }

  setEditing(true);
  
  try {
    // Here you would typically make an API call to update the propert
    const {data} = await axios.put(`/api/properties/${editedProperty._id}`, editedProperty);
    toast.success('Property updated successfully');
    setProperties(prev => prev.map(p => p._id === editedProperty._id ? editedProperty : p));
    setShowEditModal(false);
  } catch (error) {
    console.error('Error updating property:', error);
    alert('Failed to update property. Please try again.');
  } finally {
    setEditing(false);
  }
};

// Function to open the modal with a specific property's data
const openEditModal = (property) => {
  setEditedProperty({
    id: property.id,
    title: property.title || '',
    type: property.type || 'Cabin',
    price: property.price || 0,
    bedrooms: property.bedrooms || 0,
    bathrooms: property.bathrooms || 0,
    furnished: property.furnished || 'fully',
    status: property.status || 'available',
    thumbnail: property.thumbnail || '',
    images: property.images ? [...property.images] : [],
    videoTour: property.videoTour || '',
    description: property.description || '',
    commonAttributes: property.commonAttributes ? [...property.commonAttributes] : [],
    specificAttributes: property.specificAttributes ? [...property.specificAttributes] : []
  });
  setShowEditModal(true);
};
  return (
    <div className="space-y-6">
      {/* Property Management Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold">Properties Management</h2>
        <div className="mt-4 md:mt-0">
          <button 
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
          >
            <FiPlus className="mr-2" />
            Add New Property
          </button>
        </div>
      </div>

   {
    isLoading ? (
      <div className="flex justify-center items-center h-64">
        <div className="flex flex-col items-center space-y-2">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Loading properties...</p>
        </div>
      </div>
    ) :(
 <>
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search properties..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page when searching
              }}
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <FiFilter className="mr-2" />
            Filters
            {showFilters ? (
              <FiChevronUp className="ml-2" />
            ) : (
              <FiChevronsDown className="ml-2" />
            )}
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1); // Reset to first page when filtering
                }}
              >
                <option value="All">All Statuses</option>
                <option value="available">Available</option>
                <option value="Pending Approval">Pending Approval</option>
                <option value="rented">Rented</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Property Type</label>
              <select
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={typeFilter}
                onChange={(e) => {
                  setTypeFilter(e.target.value);
                  setCurrentPage(1); // Reset to first page when filtering
                }}
              >
                <option value="All">All Types</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Cabin">Cabin</option>
                <option value="Studio">Studio</option>
                <option value="Cottage">Cottage</option>
                <option value="House">House</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Properties Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentProperties.length > 0 ? (
                currentProperties.map((property) => (
                  <tr key={property._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-md overflow-hidden">
                          <img 
                            src={property.thumbnail} 
                            alt={property.title} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 flex items-center">
                            {property.title}
                            {property.featured && (
                              <FiStar className="ml-1 h-4 w-4 text-yellow-500" />
                            )}
                          </div>
                          <div className="text-sm text-gray-500">{property.type}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{property.type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{property.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${property.status === 'available' ? 'bg-green-100 text-green-800' : 
                          property.status === 'rented' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                        {property.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {property.price}{`${property.type==='cabin' ?'/night' :'/mounth'}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => setSelectedProperty(property)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View
                        </button>
                        <button 
            onClick={() => {
              setEditedProperty(property);
              setShowEditModal(true);
            }}
            className="text-blue-600 hover:text-blue-900"
          >
            <FiEdit className="h-4 w-4" />
          </button>

                        {/* <button 
                          onClick={() => toggleFeatured(property.id)}
                          className={`${property.featured ? 'text-yellow-500' : 'text-gray-400'} hover:text-yellow-600`}
                        >
                          <FiStar className="h-4 w-4" />
                        </button> */}
                        <button 
                          onClick={() => deleteProperty(property._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                    No properties found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {filteredProperties.length > 0 && (
          <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                Previous
              </button>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{indexOfFirstProperty + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(indexOfLastProperty, filteredProperties.length)}
                  </span>{' '}
                  of <span className="font-medium">{filteredProperties.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'}`}
                  >
                    <span className="sr-only">Previous</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === number ? 'z-10 bg-blue-50 border-blue-500 text-blue-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'}`}
                    >
                      {number}
                    </button>
                  ))}
                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'}`}
                  >
                    <span className="sr-only">Next</span>
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
 </>

  )}
      {/* Property Detail Modal */}
      {selectedProperty && (
  <PropertyViewModel 
    property={selectedProperty}
    onClose={() => setSelectedProperty(null)}
  />
)}

      {/* Add Property Modal */}
      {showAddModal && (
       <div className="fixed z-10 inset-0 overflow-y-auto bg-opacity-15 backdrop-blur-sm">
       <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
         <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
           <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
             <div className="sm:flex sm:items-start">
               <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                 <div className="flex justify-between items-start">
                   <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                     Add New Property
                   </h3>
                   <button
                     onClick={() => {
                       setShowAddModal(false);
                       setCurrentStep(1);
                     }}
                     className="text-gray-400 hover:text-gray-500"
                   >
                     <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                     </svg>
                   </button>
                 </div>
     
                 {/* Progress Steps */}
                 <div className="mb-6">
                   <div className="flex items-center">
                     <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                       1
                     </div>
                     <div className={`flex-1 h-1 mx-2 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                     <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                       2
                     </div>
                   </div>
                   <div className="flex justify-between mt-2 text-sm text-gray-600">
                     <span>Property Type</span>
                     <span>Details</span>
                   </div>
                 </div>
     
                 <form onSubmit={handleSubmit}>
                   {/* Step 1: Property Type Selection */}
                   {currentStep === 1 && (
                     <div className="mb-6">
                       <h3 className="text-lg font-semibold mb-6 text-center text-gray-700">What type of property are you listing?</h3>
                       
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                         {propertyTypes.map((property) => (
                           <div
                             key={property.id}
                             onClick={() => handleTypeSelect(property.id)}
                             className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200 ${propertyData.type === property.id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'}`}
                           >
                             <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                               <img
                                 src={property.image}
                                 alt={property.name}
                                 className="object-cover w-full h-48"
                               />
                             </div>
                             <div className="p-4">
                               <h4 className="text-lg font-semibold text-gray-800">{property.name}</h4>
                               <p className="text-sm text-gray-600">{property.description}</p>
                             </div>
                             {propertyData.type === property.id && (
                               <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                 </svg>
                               </div>
                             )}
                           </div>
                         ))}
                       </div>
     
                       <div className="mt-6 flex justify-end">
                         <button
                           type="button"
                           disabled={!propertyData.type}
                           onClick={() => setCurrentStep(2)}
                           className={`px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white ${propertyData.type ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                         >
                           Next
                         </button>
                       </div>
                     </div>
                   )}
     
                   {/* Step 2: Property Details */}
                   {currentStep === 2 && (
                     <>
                       <div className="mb-6">
                         <h3 className="text-lg font-semibold mb-3 text-gray-700 border-b pb-2">Property Details</h3>
                         
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div>
                             <label className="block text-sm font-medium text-gray-700">Title</label>
                             <input
                               type="text"
                               name="title"
                               value={propertyData.title}
                               onChange={handleInputChange}
                               required
                               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                             />
                           </div>
     
                           {/* Dynamic Pricing Field */}
                           <div>
                             <label className="block text-sm font-medium text-gray-700">
                               {propertyData.type === 'cabin' ? 'Price per night ($)' : 'Price per month ($)'}
                             </label>
                             <div className="mt-1 relative rounded-md shadow-sm">
                               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                 <span className="text-gray-500 sm:text-sm">$</span>
                               </div>
                               <input
                                 type="number"
                                 name="price"
                                 value={propertyData.price}
                                 onChange={handleInputChange}
                                 required
                                 className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md py-2"
                                 placeholder={propertyData.type === 'cabin' ? '0.00 per night' : '0.00 per month'}
                               />
                             </div>
                           </div>
                           <div>
                             <label className="block text-sm font-medium text-gray-700">
                             Tour Price per hour($)
                               {/* {propertyData.type === 'cabin' ? 'Price per hour ($)' : 'Price per month ($)'} */}
                             </label>
                             <div className="mt-1 relative rounded-md shadow-sm">
                               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                 <span className="text-gray-500 sm:text-sm">$</span>
                               </div>
                               <input
                                 type="number"
                                 name="tourPrice"
                                 value={propertyData.tourPrice}
                                 onChange={handleInputChange}
                                //  required
                                 className="focus:ring-blue-500 {propertyData.type focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md py-2"
                                 placeholder={'0.00 per hour'}
                                
                               />
                             </div>
                           </div>
     
                           <div>
                             <label className="block text-sm font-medium text-gray-700">Location</label>
                             <input
                               type="text"
                               name="location"
                               value={propertyData.location}
                               onChange={handleInputChange}
                               required
                               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                             />
                           </div>
     
                           <div>
                             <label className="block text-sm font-medium text-gray-700">Property Type</label>
                             <div className="mt-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700 capitalize">
                               {propertyData.type}
                             </div>
                           </div>
     
                           <div>
                             <label className="block text-sm font-medium text-gray-700">Bedrooms</label>
                             <input
                               type="number"
                               name="bedrooms"
                               value={propertyData.bedrooms}
                               onChange={handleInputChange}
                               required
                               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                             />
                           </div>
     
                           <div>
                             <label className="block text-sm font-medium text-gray-700">Bathrooms</label>
                             <input
                               type="number"
                               name="bathrooms"
                               value={propertyData.bathrooms}
                               onChange={handleInputChange}
                               required
                               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                             />
                           </div>
     
                           {/* Furnished Status */}
                           <div>
                             <label className="block text-sm font-medium text-gray-700">Furnished</label>
                             <select
                               name="furnished"
                               value={propertyData.furnished || ''}
                               onChange={handleInputChange}
                               className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                             >
                               <option value="">Select option</option>
                               <option value="fully">Fully Furnished</option>
                               <option value="partially">Partially Furnished</option>
                               <option value="unfurnished">Unfurnished</option>
                             </select>
                           </div>
                           <div>
                              <label className="block text-sm font-medium text-gray-700">Thumbnail</label>
                              <input
                                type="file"
                                name="thumbnail"
                                onChange={(e) => setPropertyData({...propertyData, thumbnail: e.target.files[0]})}
                                required
                                accept="image/*"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              />
                            </div>
                           {/* Video Tour Field */}
                           <div className="md:col-span-2">
                             <label className="block text-sm font-medium text-gray-700">Video Tour URL</label>
                             <input
                               type="url"
                               name="videoTour"
                               value={propertyData.videoTour || ''}
                               onChange={handleInputChange}
                               placeholder="https://youtube.com/embed/example"
                               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                             />
                           </div>
     
                           {/* Images Upload */}
                           <div className="md:col-span-2">
                             <label className="block text-sm font-medium text-gray-700">Property Images</label>
                             <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                               <div className="space-y-1 text-center">
                                 <svg
                                   className="mx-auto h-12 w-12 text-gray-400"
                                   stroke="currentColor"
                                   fill="none"
                                   viewBox="0 0 48 48"
                                   aria-hidden="true"
                                 >
                                   <path
                                     d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                     strokeWidth={2}
                                     strokeLinecap="round"
                                     strokeLinejoin="round"
                                   />
                                 </svg>
                                 <div className="flex text-sm text-gray-600">
                                   <label
                                     htmlFor="file-upload"
                                     className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                                   >
                                     <span>Upload files</span>
                                     <input
                                       id="file-upload"
                                       name="images"
                                       type="file"
                                       multiple
                                       onChange={(e) => {
                                        const files = Array.from(e.target.files);
                                        setPropertyData({
                                          ...propertyData,
                                          images: files
                                        });
                                      }}
                                       className="sr-only"
                                       accept="image/*"
                                     />
                                   </label>
                                   <p className="pl-1">or drag and drop</p>
                                 </div>
                                 <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                               </div>
                             </div>
                             {/* Preview uploaded images */}
                             {propertyData.images && propertyData.images.length > 0 && (
                               <div className="mt-2 flex flex-wrap gap-2">
                                 {propertyData.images.map((image, index) => (
                                   <div key={index} className="relative h-20 w-20">
                                     <img
                                       src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                                       alt={`Property ${index + 1}`}
                                       className="h-full w-full object-cover rounded"
                                     />
                                     <button
                                       type="button"
                                       onClick={() => deleteImage(index)}
                                       className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                                     >
                                       <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                       </svg>
                                     </button>
                                   </div>
                                 ))}
                               </div>
                             )}
                           </div>
                         </div>
     
                         <div className="mt-4">
                           <label className="block text-sm font-medium text-gray-700">Description</label>
                           <textarea
                             name="description"
                             value={propertyData.description}
                             onChange={handleInputChange}
                             required
                             rows={3}
                             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                           />
                         </div>
                       </div>
     
                       {/* Common Amenities */}
                       <div className="mb-6">
                         <h3 className="text-lg font-semibold mb-3 text-gray-700 border-b pb-2">Amenities</h3>
                         <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                           {Object.entries(propertyData.commonAttributes).map(([key, value]) => (
                             <div key={key} className="flex items-center">
                               <input
                                 type="checkbox"
                                 id={`common-${key}`}
                                 name={key}
                                 checked={value}
                                 onChange={handleInputChange}
                                 className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                               />
                               <label htmlFor={`common-${key}`} className="ml-2 text-sm text-gray-700 capitalize">
                                 {key}
                               </label>
                             </div>
                           ))}
                         </div>
                       </div>
     
                       {/* Type-Specific Features */}
                       {propertyData.type && (
  <div className="mb-6">
    <h3 className="text-lg font-semibold mb-3 text-gray-700 border-b pb-2">
      {propertyData.type.charAt(0).toUpperCase() + propertyData.type.slice(1)} Features
    </h3>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {propertyData.type === 'cabin' && (
        <>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="fireplace"
              name="specific.fireplace"
              checked={propertyData.specificAttributes.fireplace}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="fireplace" className="ml-2 text-sm text-gray-700">
              Fireplace
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="woodSupplied"
              name="specific.woodSupplied"
              checked={propertyData.specificAttributes.woodSupplied}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="woodSupplied" className="ml-2 text-sm text-gray-700">
              Wood Supplied
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="hotTub"
              name="specific.hotTub"
              checked={propertyData.specificAttributes.hotTub}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="hotTub" className="ml-2 text-sm text-gray-700">
              Hot Tub
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="mountainView"
              name="specific.mountainView"
              checked={propertyData.specificAttributes.mountainView}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="mountainView" className="ml-2 text-sm text-gray-700">
              Mountain View
            </label>
          </div>
        </>
      )}

      {propertyData.type === 'villa' && (
        <>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="privateBeachAccess"
              name="specific.privateBeachAccess"
              checked={propertyData.specificAttributes.privateBeachAccess}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="privateBeachAccess" className="ml-2 text-sm text-gray-700">
              Private Beach Access
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="staffIncluded"
              name="specific.staffIncluded"
              checked={propertyData.specificAttributes.staffIncluded}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="staffIncluded" className="ml-2 text-sm text-gray-700">
              Staff Included
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="securitySystem"
              name="specific.securitySystem"
              checked={propertyData.specificAttributes.securitySystem}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="securitySystem" className="ml-2 text-sm text-gray-700">
              Security System
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="garden"
              name="specific.garden"
              checked={propertyData.specificAttributes.garden}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="garden" className="ml-2 text-sm text-gray-700">
              Private Garden
            </label>
          </div>
        </>
      )}
    </div>
  </div>
)}
                     </>
                   )}
                 </form>
               </div>
             </div>
           </div>
           {currentStep === 2 && (
             <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
               <button
                 type="button"
                 disabled={isLoading}
                 onClick={handleSubmit}
                 className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 sm:ml-3 sm:w-auto sm:text-sm"
               >
             {adding ? "loading" : "Add Property"}
               </button>
               <button
                 type="button"
                 onClick={() => setCurrentStep(1)}
                 className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
               >
                 Back
               </button>
             </div>
           )}
         </div>
       </div>
     </div>
      )}

{showEditModal && (
  <div className="fixed z-50 inset-0 overflow-y-auto bg-opacity-15 backdrop-blur-sm">
    <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <div className="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:max-w-3xl sm:w-full">
        <div className="bg-white px-6 pt-6 pb-2">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-semibold text-gray-900">Edit Property</h3>
            <button
              onClick={() => setShowEditModal(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Close modal"
            >
              <FiX className="h-7 w-7" />
            </button>
          </div>
        </div>
        
        <div className="px-6 py-4">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={editedProperty.title}
                  onChange={handleEditInputChange}
                  className="w-full px-4 py-2 border outline-none border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Type *
                </label>
                <select
                  name="type"
                  value={editedProperty.type}
                  onChange={handleEditInputChange}
                  className="w-full px-4 py-2 border outline-none border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Cabin">Cabin</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price per Night ($) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={editedProperty.price}
                  onChange={handleEditInputChange}
                  className="w-full px-4 py-2 border outline-none border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  min="0"
                  required
                />
              </div>

              {/* Property Specifications */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bedrooms *
                </label>
                <input
                  type="number"
                  name="bedrooms"
                  value={editedProperty.bedrooms}
                  onChange={handleEditInputChange}
                  className="w-full px-4 py-2 border outline-none border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  min="0"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bathrooms *
                </label>
                <input
                  type="number"
                  name="bathrooms"
                  value={editedProperty.bathrooms}
                  onChange={handleEditInputChange}
                  className="w-full px-4 py-2 border outline-none border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  min="0"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Furnishing *
                </label>
                <select
                  name="furnished"
                  value={editedProperty.furnished}
                  onChange={handleEditInputChange}
                  className="w-full px-4 py-2 border outline-none border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="fully">Fully Furnished</option>
                  <option value="partially">Partially Furnished</option>
                  <option value="none">Not Furnished</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status *
                </label>
                <select
                  name="status"
                  value={editedProperty.status}
                  onChange={handleEditInputChange}
                  className="w-full px-4 py-2 border outline-none border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="available">Available</option>
                  <option value="rented">Rented</option>
                  <option value="maintenance">Under Maintenance</option>
                </select>
              </div>

              {/* Media Section */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Thumbnail URL *
                </label>
                <input
                  type="url"
                  name="thumbnail"
                  value={editedProperty.thumbnail}
                  onChange={handleEditInputChange}
                  className="w-full px-4 py-2 border outline-none border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URLs
                </label>
                {editedProperty.images.map((image, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="url"
                      value={image}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      className="w-full px-4 py-2 border outline-none border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FiTrash className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addImageField}
                  className="mt-2 text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <FiPlus className="w-4 h-4" /> Add Image URL
                </button>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Video Tour URL
                </label>
                <input
                  type="url"
                  name="videoTour"
                  value={editedProperty.videoTour || ''}
                  onChange={handleEditInputChange}
                  className="w-full px-4 py-2 border outline-none border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={editedProperty.description}
                  onChange={handleEditInputChange}
                  rows="4"
                  className="w-full px-4 py-2 border outline-none border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Attributes */}
              <div className="md:col-span-2">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Common Attributes
                    </label>
                    {editedProperty.commonAttributes.map((attr, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={attr}
                          onChange={(e) => handleCommonAttributeChange(index, e.target.value)}
                          className="w-full px-4 py-2 border outline-none border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() => removeCommonAttribute(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FiTrash className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addCommonAttribute}
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <FiPlus className="w-4 h-4" /> Add Attribute
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Specific Attributes
                    </label>
                    {editedProperty.specificAttributes.map((attr, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={attr}
                          onChange={(e) => handleSpecificAttributeChange(index, e.target.value)}
                          className="w-full px-4 py-2 border outline-none border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() => removeSpecificAttribute(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FiTrash className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addSpecificAttribute}
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <FiPlus className="w-4 h-4" /> Add Specific Attribute
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 flex justify-end gap-4">
          <button
            onClick={() => setShowEditModal(false)}
            className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleEditSubmit}
            disabled={editing}
            className={`px-6 py-2 text-white rounded-lg ${
              editing ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {editing ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  )};
export default Properties;
 

 

const PropertyViewModel = ({ property, onClose }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Image gallery handlers
  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  // Data formatting helpers
  const formatPrice = (price) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="fixed inset-0 flex items-center justify-center p-10 z-50 bg-black/30 backdrop-blur-md ">
      <div className="bg-white backdrop-blur-lg shadow-2xl rounded-xl max-w-6xl w-full max-h-[90vh] ">

        {/* Header */}
      
          <button
            onClick={onClose}
            className= " absolute right-10 top-5 text-gray-500 hover:text-gray-800 text-2xl font-bold transition-colors"
          >
            &times;
          </button>
      

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-12 mt-10" >
          
          {/* Image Gallery */}
          <div className="relative group">
            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden shadow-md">
              <img
                src={property.images[selectedImageIndex] || property.thumbnail}
                alt={property.title}
                className="w-full h-full object-cover cursor-zoom-in transition-transform duration-300 hover:scale-105"
                onClick={() => setIsZoomed(!isZoomed)}
              />

              {/* Gallery Controls */}
              <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={prevImage}
                  className="bg-white/70 p-2 rounded-full shadow hover:bg-white/90"
                >
                  <FiArrowLeft className="w-6 h-6 text-gray-700" />
                </button>
                <button
                  onClick={nextImage}
                  className="bg-white/70 p-2 rounded-full shadow hover:bg-white/90"
                >
                  <FiArrowRight className="w-6 h-6 text-gray-700" />
                </button>
              </div>

              {/* Thumbnail Strip */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {property.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-2 h-2 rounded-full ${
                      index === selectedImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
 
       {/* Details Section */}
       <div className="space-y-6">
            {/* Price and Status */}
            <div className="flex justify-between items-start">
              <div>
              <h2 className="text-2xl font-bold text-gray-800 capitalize mb-3">{property.title}</h2>
                <p className="text-3xl font-semibold text-blue-600">
                  {formatPrice(property.price)}/night
                </p>
                <span
                  className={`inline-block px-3 py-1 mt-3 rounded-full text-sm font-medium ${
                    property.status === 'available'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {capitalize(property.status)}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`p-2 rounded-full transition-all ${
                    isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                  }`}
                >
                  <FiHeart className="w-6 h-6" />
                </button>
                <button className="p-2 rounded-full text-gray-500 hover:text-blue-600">
                  <FiShare2 className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Key Details Grid */}
            <div className="grid grid-cols-2 gap-4 py-4">
              <DetailItem label="Type" value={capitalize(property.type)} />
              <DetailItem label="Location" value={property.location} />
              <DetailItem label="Bedrooms" value={`${property.bedrooms} beds`} />
              <DetailItem label="Bathrooms" value={`${property.bathrooms} baths`} />
              <DetailItem label="Furnished" value={capitalize(property.furnished)} />
              <DetailItem label="Listing Date" value={new Date(property.createdAt).toLocaleDateString()} />
            </div>

            {/* Description */}
            <div className="prose max-w-none text-gray-700">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p>{property.description}</p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Components
const DetailItem = ({ label, value }) => (
  <div className="flex justify-between items-center py-2">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

 
