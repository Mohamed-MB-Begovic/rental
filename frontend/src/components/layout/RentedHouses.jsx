import React, { useState, useEffect } from 'react';
import { HeartIcon, ArrowPathIcon, ChatBubbleLeftIcon, HomeModernIcon, ArrowLeftCircleIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import toast from 'react-hot-toast'
const RentedHouses = ({ userId }) => {
  const [houses, setHouses] = useState([]);
  const [sortBy, setSortBy] = useState('rentAmount');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);

  // Sample data with enhanced details
  // const sampleHouses = [
  //   {
  //     id: 1,
  //     title: 'Skyline Luxury Suite',
  //     address: '123 Downtown Blvd, Metropolis',
  //     rentAmount: 3200,
  //     leaseStart: '2023-01-01',
  //     leaseEnd: '2024-01-01',
  //     landlord: 'Elite Living Properties',
  //     status: 'active',
  //     image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  //     amenities: ['Pool', 'Gym', '24/7 Security', 'Parking']
  //   },
  //   {
  //     id: 2,
  //     title: 'Garden View Cottage',
  //     address: '456 Serene Lane, Countryside',
  //     rentAmount: 2800,
  //     leaseStart: '2022-06-01',
  //     leaseEnd: '2023-06-01',
  //     landlord: 'Nature Homes Ltd',
  //     status: 'expired',
  //     image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  //     amenities: ['Garden', 'Patio', 'Fireplace', 'Pet Friendly']
  //   }
  // ];

  useEffect(() => {
    const fetchRentedHouses = async () => {
      try {
        // setHouses(sampleHouses);
        const {data}=await axios.get('/api/properties/tenantProperties')
        // console.log(data)
        setHouses(data)
        // setHouses(sampleHouses)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching rented houses:', error);
        setLoading(false);
        toast.error('error in fetching your rented houses')
      }
    };

    fetchRentedHouses();
  }, [userId]);

  const handleAction = (action, houseId) => {
    console.log(`${action} initiated for:`, houseId);
  };

  const filteredHouses = houses
    .filter(house => filterStatus === 'all' || house.status === filterStatus)
    .sort((a, b) => {
      if (sortBy === 'rentAmount') return a.rentAmount - b.rentAmount;
      if (sortBy === 'leaseEnd') return new Date(a.leaseEnd) - new Date(b.leaseEnd);
      return 0;
    });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="animate-pulse text-2xl text-indigo-600 flex items-center gap-3">
          <HomeModernIcon className="w-8 h-8 animate-spin" />
          Loading your dream homes...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-4 sm:p-8">
  <div className="max-w-7xl mx-auto">
    {/* Back Button - Mobile */}
    <div className="md:hidden mb-6">
      <button className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
      onClick={()=>window.history.back()}
      >
        <ArrowLeftCircleIcon className="w-6 h-6 mr-2" />
        Back to Dashboard
      </button>
    </div>

    <header className="mb-8 md:mb-12 text-center relative">
      {/* Back Button - Desktop */}
      <div className="hidden md:block absolute left-0 top-1/2 transform -translate-y-1/2">
        <button className="flex items-center text-indigo-600 hover:text-indigo-800 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md">
          <ArrowLeftCircleIcon className="w-5 h-5 mr-2" />
          Back
        </button>
      </div>

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2 md:mb-4">
        Your Rental Portfolio
      </h1>
      <p className="text-gray-600 text-base md:text-lg">
        Manage your current and past rentals with ease
      </p>
    </header>

    {/* Controls Section */}
    <div className="glass-container bg-white/30 backdrop-blur-lg rounded-xl p-4 sm:p-6 shadow-sm mb-6 md:mb-8">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="flex flex-col w-full sm:w-auto">
            <label className="text-sm text-gray-600 mb-1">Sort by</label>
            <select
              className="glass-select bg-white/50 border-0 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 w-full"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="rentAmount">Monthly Rent</option>
              <option value="leaseEnd">Lease End Date</option>
            </select>
          </div>
          <div className="flex flex-col w-full sm:w-auto">
            <label className="text-sm text-gray-600 mb-1">Filter by</label>
            <select
              className="glass-select bg-white/50 border-0 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 w-full"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Properties</option>
              <option value="active">Active Leases</option>
              <option value="expired">Past Leases</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-2 text-indigo-600 w-full sm:w-auto justify-center sm:justify-start">
          <HomeModernIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="text-base sm:text-lg font-semibold">
            {filteredHouses.length} Properties
          </span>
        </div>
      </div>
    </div>

    {/* Property Cards Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredHouses.map((house) => (
        <div key={house.id} className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 ease-out">
          {/* Image Section */}
          <div className="relative h-52 sm:h-60 overflow-hidden rounded-t-2xl">
            <img 
              src={house.image} 
              alt={house.property} 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-xl font-bold mb-1">{house.property}</h3>
              <div className={`badge ${house.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'} px-3 py-1 ${house.status==='active' ?'w-[60px]' :'w-[70px]'} rounded-full text-sm`}>
                {house.status}
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="p-4 sm:p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-600 text-sm">{house.address}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-2xl font-bold text-indigo-600">
                    ${house.rentAmount}
                  </span>
                  <span className="text-gray-500">/month</span>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <HeartIcon className="w-5 h-5 sm:w-6 sm:h-6 text-rose-400" />
              </button>
            </div>

            {/* Amenities Chips */}
            <div className="flex flex-wrap gap-2 mb-4">
              {house.amenities.map((amenity) => (
                <span key={amenity} className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs sm:text-sm">
                  {amenity}
                </span>
              ))}
            </div>

            {/* Lease Info */}
            <div className="space-y-2 mb-4 sm:mb-6">
              <div className="flex items-center gap-2 text-gray-600 text-sm sm:text-base">
                <span className="font-medium">Lease Period:</span>
                <span>
                  {house.startDate} - {house.endDate}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 text-sm sm:text-base">
                <span className="font-medium">Managed by:</span>
                <span className="text-indigo-600">{house.landlord}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => handleAction('renew', house.id)}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all text-sm sm:text-base"
                disabled={house.status !== 'expired'}
              >
                <ArrowPathIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                Renew Lease
              </button>
              <button
                onClick={() => handleAction('contact', house.id)}
                className="flex-1 border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all text-sm sm:text-base"
              >
                <ChatBubbleLeftIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                Contact
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>

    {filteredHouses.length === 0 && !loading && (
      <div className="text-center py-12 sm:py-16">
        <div className="text-gray-400 mb-4 text-5xl sm:text-6xl">🏡</div>
        <h3 className="text-lg sm:text-xl text-gray-600 mb-2">No properties found</h3>
        <p className="text-gray-500 text-sm sm:text-base">
          Try adjusting your filters or check back later
        </p>
      </div>
    )}
  </div>
</div>
  );
};

export default RentedHouses;