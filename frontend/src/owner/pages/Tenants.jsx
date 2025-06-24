/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { FiSearch, FiFilter, FiChevronUp, FiChevronsDown, FiEdit2, FiTrash2, FiPhone, FiMail, FiUser, FiPlus, FiX } from "react-icons/fi";
import axios from 'axios'
import toast from 'react-hot-toast'
const Tenants = () => {
  // Sample tenant data
  // const [tenants, setTenants] = useState([
  //   {
  //     id: 1,
  //     name: "John Smith",
  //     email: "john.smith@example.com",
  //     phone: "(555) 123-4567",
  //     property: "Luxury Beach Villa",
  //     unit: "Unit 301",
  //     leaseStart: "2023-01-15",
  //     leaseEnd: "2024-01-14",
  //     rentAmount: "$2,500",
  //     status: "Active",
  //     emergencyContact: "Jane Smith (555) 987-6543"
  //   },
  //   {
  //     id: 2,
  //     name: "Maria Garcia",
  //     email: "maria.garcia@example.com",
  //     phone: "(555) 234-5678",
  //     property: "Downtown Loft",
  //     unit: "Unit 202",
  //     leaseStart: "2023-03-01",
  //     leaseEnd: "2023-12-31",
  //     rentAmount: "$1,800",
  //     status: "Active",
  //     emergencyContact: "Carlos Garcia (555) 876-5432"
  //   },
  //   {
  //     id: 3,
  //     name: "David Kim",
  //     email: "david.kim@example.com",
  //     phone: "(555) 345-6789",
  //     property: "Mountain Cabin Retreat",
  //     unit: "Cabin 1",
  //     leaseStart: "2022-11-01",
  //     leaseEnd: "2023-11-30",
  //     rentAmount: "$1,200",
  //     status: "Pending",
  //     emergencyContact: "Sarah Kim (555) 765-4321"
  //   },
  //   {
  //     id: 4,
  //     name: "Emily Chen",
  //     email: "emily.chen@example.com",
  //     phone: "(555) 456-7890",
  //     property: "Urban Studio Apartment",
  //     unit: "Studio 105",
  //     leaseStart: "2023-02-15",
  //     leaseEnd: "2024-02-14",
  //     rentAmount: "$1,500",
  //     status: "Past",
  //     emergencyContact: "Michael Chen (555) 654-3210"
  //   },
  //   {
  //     id: 5,
  //     name: "Robert Johnson",
  //     email: "robert.johnson@example.com",
  //     phone: "(555) 567-8901",
  //     property: "Modern City Apartment",
  //     unit: "Unit 408",
  //     leaseStart: "2023-04-01",
  //     leaseEnd: "2024-03-31",
  //     rentAmount: "$2,100",
  //     status: "Active",
  //     emergencyContact: "Lisa Johnson (555) 543-2109"
  //   }
  // ]);
  const [tenants, setTenants] = useState([])
  const [properties, setProperties] = useState([]);
  // Get unique property names for filter dropdown
  const propertyOptions = ["Luxury Beach Villa","Downtown Loft","Modern City Apartment","Urban Studio Apartment","Mountain Cabin Retreat"];
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [propertyFilter, setPropertyFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const tenantsPerPage = 4;

  // State for modals
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  
  // State for new tenant form
  const [newTenant, setNewTenant] = useState({
    name: "",
    email: "",
    phone: "",
    property: "Luxury Beach Villa",
    unit: "",
    leaseStart: new Date().toISOString().split('T')[0],
    leaseEnd: "",
    rentAmount: "",
    status: "Active",
    emergencyContact: ""
  });

  const [isLoading,setIsLoading]=useState(false)
  // Filter tenants based on search and filters
  const filteredTenants = tenants.filter(tenant => {
    const matchesSearch = tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         tenant.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tenant.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || tenant.status === statusFilter;
    const matchesProperty = propertyFilter === 'All' || tenant.property === propertyFilter;
    
    return matchesSearch && matchesStatus && matchesProperty;
  });

  // Pagination logic
  const indexOfLastTenant = currentPage * tenantsPerPage;
  const indexOfFirstTenant = indexOfLastTenant - tenantsPerPage;
  const currentTenants = filteredTenants.slice(indexOfFirstTenant, indexOfLastTenant);
  const totalPages = Math.ceil(filteredTenants.length / tenantsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  // Tenant actions

  // Fetch tenants from API
  useEffect(() => {
    const fetchTenants = async () => {
      try {
        setIsLoading(true);
        const params = {
          status: statusFilter !== 'All' ? statusFilter : undefined,
          property: propertyFilter !== 'All' ? propertyFilter : undefined,
          search: searchTerm || undefined
        };
        
        const { data } = await axios.get('/api/tenants');
        setTenants(data);
        console.log(data)
      } catch (error) {
        toast.error('Failed to load tenants');
        console.log(error)
      } finally {
        setIsLoading(false);
      }
    };

    fetchTenants();
  }, []);
  // }, [statusFilter, propertyFilter, searchTerm]);


  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const  {data}  = await axios.get('/api/properties/propertyTitles');
        setProperties(data);         
        
      } catch (error) {
        toast.error('Failed to load properties');
        console.log(error)
      } finally {
        // setLoadingProperties(false);
      }
    };
    
    // fetchProperties();
  }, []);


  const updateTenantStatus = (id, newStatus) => {
    setTenants(tenants.map(tenant => 
      tenant.id === id ? {...tenant, status: newStatus} : tenant
    ));
  };

  const deleteTenant = (id) => {
    setTenants(tenants.filter(tenant => tenant.id !== id));
    if (currentTenants.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

   // Create Tenant
   const addNewTenant = async () => {
    try {
      const { data } = await axios.post('/api/tenants', {
        ...newTenant,
        rentAmount: Number(newTenant.rentAmount.replace(/[^0-9.-]+/g,"")),
        leaseStart: new Date(newTenant.leaseStart),
        leaseEnd: new Date(newTenant.leaseEnd)
      });
      
      setTenants([...tenants, data]);
      setShowAddModal(false);
      setNewTenant({
        name: "",
        email: "",
        phone: "",
        property: "Luxury Beach Villa",
        unit: "",
        leaseStart: new Date().toISOString().split('T')[0],
        leaseEnd: "",
        rentAmount: "",
        status: "Active",
        emergencyContact: ""
      });
      toast.success('Tenant added successfully');
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Error adding tenant');
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTenant(prev => ({
      ...prev,
      [name]: value
    }));
  };


// console.log(tenants)
   // Add loading state
   if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold">Tenants Management</h2>
        <div className="mt-4 md:mt-0">
          {/* <button 
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
          >
            <FiPlus className="mr-2" />
            Add New Tenant
          </button> */}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search tenants..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
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
                  setCurrentPage(1);
                }}
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Past">Past</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Property</label>
              <select
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={propertyFilter}
                onChange={(e) => {
                  setPropertyFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                {propertyOptions.map(property => (
                  <option key={property} value={property}>{property}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Tenants Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tenant
                </th>
                {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th> */}
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lease Period
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rent
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentTenants.length > 0 ? (
                currentTenants.map((tenant) => (
                  <tr key={tenant.phone} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <FiUser className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{tenant.name}</div>
                          <div className="text-sm text-gray-500">{tenant.phoneNo}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{tenant.property}</div>
                      <div className="text-sm text-gray-500">{tenant.type}</div>
                    </td>
                    {/* <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{tenant.property}</div>
                    </td> */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {tenant.startDate}-
                        <span className="text-red-500">{tenant.endDate}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-500">
                      {tenant.rentAmount}$
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${tenant.status === 'active' ? 'bg-green-100 text-green-800' : 
                          tenant.status === 'expired' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                        {tenant.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => setSelectedTenant(tenant)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View
                        </button>
                        <button 
                          onClick={() => deleteTenant(tenant.id)}
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
                  <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                    No tenants found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {filteredTenants.length > 0 && (
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
                  Showing <span className="font-medium">{indexOfFirstTenant + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(indexOfLastTenant, filteredTenants.length)}
                  </span>{' '}
                  of <span className="font-medium">{filteredTenants.length}</span> tenants
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

      {/* Tenant Detail Modal */}
      {selectedTenant && (
        <div className="fixed z-50 inset-0 overflow-y-auto bg-opacity-10 backdrop-blur-sm ">
  <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
 

    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
    
    {/* Modal container */}
    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
            <div className="flex justify-between items-start">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Tenant Details: 
              </h3>
                <button
                                  onClick={() => setSelectedTenant(null)}
                                  className="text-gray-400 hover:text-gray-500"
                                >
                                  <FiX className="h-6 w-6" />
                                </button>
            </div>
                 <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Tenant Name: {selectedTenant.name}
              </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
         
              <div>
                <h4 className="font-medium text-gray-900">Contact Information</h4>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center">
                    <FiMail className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-gray-600 truncate">{selectedTenant.email}</span>
                  </div>
                  <div className="flex items-center">
                    <FiPhone className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-gray-600">{selectedTenant.phoneNo}</span>
                  </div>
                  {/* <div className="mt-4 pt-4 border-t border-gray-200">
                    <h5 className="text-sm font-medium text-gray-500">Emergency Contact</h5>
                    <p className="mt-1 text-gray-600">{selectedTenant.emergencyContact}</p>
                  </div> */}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Lease Information</h4>
                <div className="mt-4 space-y-3">
                  <p><span className="text-gray-600">Property:</span> {selectedTenant.property}</p>
                  <p><span className="text-gray-600">Term:</span> {selectedTenant.term}</p>
                  <p><span className="text-gray-600">Lease Period: </span>{selectedTenant.startDate} - {selectedTenant.endDate} </p>
                  <p><span className="text-gray-600">Rent:</span> {selectedTenant.rentAmount}$</p>
                  <p><span className="text-gray-600">Total Rent:</span> {selectedTenant.totalRent}$</p>
                  <p><span className="text-gray-600">Status:</span> {selectedTenant.status}</p>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={() => setSelectedTenant(null)}
        >
          Close
        </button>
      </div>
    </div>
  </div>
</div>
      )}

      {/* Add Tenant Modal */}
      {/* {showAddModal && (
       <div className="fixed z-10 inset-0 overflow-y-auto  bg-opacity-15 backdrop-blur-sm">
       <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
         <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
           <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
             <div className="sm:flex sm:items-start">
               <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                 <div className="flex justify-between items-start">
                   <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                     Add New Tenant
                   </h3>
                   <button
                     onClick={() => setShowAddModal(false)}
                     className="text-gray-400 hover:text-gray-500"
                   >
                     <FiX className="h-6 w-6" />
                   </button>
                 </div>
                 <div className="grid grid-cols-1 gap-6 mt-4">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                       <label className="block text-sm font-medium text-gray-700">Full Name</label>
                       <input
                         type="text"
                         name="name"
                         value={newTenant.name}
                         onChange={handleInputChange}
                         className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                         required
                       />
                     </div>
                     <div>
                       <label className="block text-sm font-medium text-gray-700">Email</label>
                       <input
                         type="email"
                         name="email"
                         value={newTenant.email}
                         onChange={handleInputChange}
                         className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                         required
                       />
                     </div>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                       <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                       <input
                         type="tel"
                         name="phone"
                         value={newTenant.phone}
                         onChange={handleInputChange}
                         className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                         required
                       />
                     </div>
                     <div>
                       <label className="block text-sm font-medium text-gray-700">Emergency Contact</label>
                       <input
                         type="text"
                         name="emergencyContact"
                         value={newTenant.emergencyContact}
                         onChange={handleInputChange}
                         className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                       />
                     </div>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                       <label className="block text-sm font-medium text-gray-700">Property</label>
                       <select
                         name="property"
                         value={newTenant.property}
                         onChange={handleInputChange}
                         className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                       >
                         {propertyOptions.filter(p => p !== "All").map(property => (
                           <option key={property} value={property}>{property}</option>
                         ))}
                       </select>
                     </div>
                     <div>
                       <label className="block text-sm font-medium text-gray-700">Unit Number</label>
                       <input
                         type="text"
                         name="unit"
                         value={newTenant.unit}
                         onChange={handleInputChange}
                         className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                         required
                       />
                     </div>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                       <label className="block text-sm font-medium text-gray-700">Lease Start Date</label>
                       <input
                         type="date"
                         name="leaseStart"
                         value={newTenant.leaseStart}
                         onChange={handleInputChange}
                         className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                         required
                       />
                     </div>
                     <div>
                       <label className="block text-sm font-medium text-gray-700">Lease End Date</label>
                       <input
                         type="date"
                         name="leaseEnd"
                         value={newTenant.leaseEnd}
                         onChange={handleInputChange}
                         className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                         required
                       />
                     </div>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                       <label className="block text-sm font-medium text-gray-700">Monthly Rent</label>
                       <div className="mt-1 relative rounded-md shadow-sm">
                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                           <span className="text-gray-500 sm:text-sm">$</span>
                         </div>
                         <input
                           type="text"
                           name="rentAmount"
                           value={newTenant.rentAmount}
                           onChange={handleInputChange}
                           className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md py-2"
                           placeholder="0.00"
                           required
                         />
                       </div>
                     </div>
                     <div>
                       <label className="block text-sm font-medium text-gray-700">Status</label>
                       <select
                         name="status"
                         value={newTenant.status}
                         onChange={handleInputChange}
                         className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                       >
                         <option value="Active">Active</option>
                         <option value="Pending">Pending</option>
                         <option value="Past">Past</option>
                       </select>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
           <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
             <button
               type="button"
               onClick={addNewTenant}
               disabled={!newTenant.name || !newTenant.email || !newTenant.phone || !newTenant.unit || !newTenant.leaseEnd || !newTenant.rentAmount}
               className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm ${!newTenant.name || !newTenant.email || !newTenant.phone || !newTenant.unit || !newTenant.leaseEnd || !newTenant.rentAmount ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
             >
               Add Tenant
             </button>
             <button
               type="button"
               onClick={() => setShowAddModal(false)}
               className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
             >
               Cancel
             </button>
           </div>
         </div>
       </div>
     </div>
      )} */}
    </div>
  );
};

export default Tenants;






