/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { 
  FiHome, FiDollarSign, FiUser, FiCalendar, FiTrendingUp, 
  FiClock, FiMapPin, FiPieChart, FiBarChart2, FiFilter 
} from 'react-icons/fi';

const Reports = () => {
  // Date range state
  const [dateRange, setDateRange] = useState('last30');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  // Mock data - replace with your actual data
  const properties = [
    { id: 1, title: 'Luxury Waterfront Apartment', location: 'Downtown', status: 'occupied', rent: 3500 },
    { id: 2, title: 'Suburban Family Home', location: 'North District', status: 'occupied', rent: 2800 },
    { id: 3, title: 'Urban Studio Loft', location: 'Arts District', status: 'vacant', rent: 1800 },
    { id: 4, title: 'Garden Townhouse', location: 'South End', status: 'occupied', rent: 2200 },
    { id: 5, title: 'Modern Penthouse', location: 'Financial District', status: 'vacant', rent: 4200 },
  ];
  
  const tenants = [
    { id: 1, name: 'Alex Johnson', property: 'Luxury Waterfront Apartment', startDate: '01-06-2025', endDate: '31-05-2026', rentPaid: 3500 },
    { id: 2, name: 'Sarah Miller', property: 'Suburban Family Home', startDate: '15-03-2025', endDate: '14-03-2026', rentPaid: 2800 },
    { id: 3, name: 'Michael Chen', property: 'Garden Townhouse', startDate: '01-01-2025', endDate: '31-12-2025', rentPaid: 2200 },
  ];
  
  const payments = [
    { id: 1, tenant: 'Alex Johnson', property: 'Luxury Waterfront Apartment', amount: 3500, date: '2025-06-01', method: 'Credit Card', status: 'completed' },
    { id: 2, name: 'Sarah Miller', property: 'Suburban Family Home', amount: 2800, date: '2025-06-03', method: 'Bank Transfer', status: 'completed' },
    { id: 3, name: 'Michael Chen', property: 'Garden Townhouse', amount: 2200, date: '2025-06-05', method: 'EVC', status: 'completed' },
  ];
  
  const financials = {
    totalRevenue: 18500,
    expectedRevenue: 21000,
    occupancyRate: 60,
    latePayments: 2,
    revenueData: [
      { month: 'Jan', revenue: 8500 },
      { month: 'Feb', revenue: 9200 },
      { month: 'Mar', revenue: 8800 },
      { month: 'Apr', revenue: 9100 },
      { month: 'May', revenue: 9500 },
      { month: 'Jun', revenue: 18500 },
    ],
    expenseData: [
      { category: 'Maintenance', amount: 3200 },
      { category: 'Utilities', amount: 1800 },
      { category: 'Taxes', amount: 4500 },
      { category: 'Insurance', amount: 2200 },
      { category: 'Marketing', amount: 800 },
    ]
  };
  
  // Status colors
  const statusColors = {
    occupied: 'bg-green-100 text-green-800',
    vacant: 'bg-red-100 text-red-800',
    pending: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800',
    late: 'bg-red-100 text-red-800',
  };
  
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Rental Management Reports</h1>
            <p className="mt-2 opacity-90">Comprehensive insights for property performance and financials</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <div className="relative">
              <select 
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="bg-white/20 border border-white/30 rounded-lg py-2 pl-10 pr-8 text-white focus:outline-none focus:ring-2 focus:ring-white"
              >
                <option value="last7">Last 7 Days</option>
                <option value="last30">Last 30 Days</option>
                <option value="last90">Last 90 Days</option>
                <option value="ytd">Year to Date</option>
                <option value="custom">Custom Range</option>
              </select>
              <FiCalendar className="absolute left-3 top-2.5 text-white" />
            </div>
            <button className="bg-white text-indigo-700 px-4 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-all flex items-center">
              <FiFilter className="mr-2" /> Filter
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 flex items-center border-l-4 border-blue-500">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <FiHome className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-500">Total Properties</p>
              <p className="text-2xl font-bold">12</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 flex items-center border-l-4 border-green-500">
            <div className="bg-green-100 p-3 rounded-lg mr-4">
              <FiDollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-gray-500">Monthly Revenue</p>
              <p className="text-2xl font-bold">{formatCurrency(financials.totalRevenue)}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 flex items-center border-l-4 border-purple-500">
            <div className="bg-purple-100 p-3 rounded-lg mr-4">
              <FiUser className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-gray-500">Active Tenants</p>
              <p className="text-2xl font-bold">8</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 flex items-center border-l-4 border-amber-500">
            <div className="bg-amber-100 p-3 rounded-lg mr-4">
              <FiClock className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-gray-500">Vacancy Rate</p>
              <p className="text-2xl font-bold">{financials.occupancyRate}%</p>
            </div>
          </div>
        </div>
        
        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Chart */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <FiTrendingUp className="mr-2 text-green-500" />
                Revenue Overview
              </h2>
              <div className="text-sm">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded mr-2">
                  +12.5% from last month
                </span>
              </div>
            </div>
            
            <div className="h-64 flex items-end justify-between pt-4">
              {financials.revenueData.map((item, index) => (
                <div key={index} className="flex flex-col items-center w-1/6">
                  <div className="text-xs text-gray-500 mb-1">{item.month}</div>
                  <div className="relative w-full flex justify-center">
                    <div 
                      className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t w-3/4"
                      style={{ height: `${(item.revenue / 20000) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-xs mt-2 text-gray-600">{formatCurrency(item.revenue)}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Expenses Breakdown */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <FiPieChart className="mr-2 text-purple-500" />
                Expenses Breakdown
              </h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {financials.expenseData.map((expense, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">{expense.category}</span>
                    <span className="font-medium">{formatCurrency(expense.amount)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-indigo-600 h-2 rounded-full" 
                      style={{ width: `${(expense.amount / 12000) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Data Tables Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Properties Table */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <FiHome className="mr-2 text-blue-500" />
                Property Status
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rent</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {properties.map((property) => (
                    <tr key={property.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{property.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FiMapPin className="text-gray-400 mr-1" />
                          <span>{property.location}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                        {formatCurrency(property.rent)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[property.status]}`}>
                          {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Recent Payments */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <FiDollarSign className="mr-2 text-green-500" />
                Recent Payments
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tenant</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {payments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                        {payment.tenant || payment.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                        {payment.property}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700 font-medium">
                        {formatCurrency(payment.amount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                        {new Date(payment.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[payment.status]}`}>
                          {payment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {/* Tenants Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
              <FiUser className="mr-2 text-purple-500" />
              Current Tenants
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tenant</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lease Period</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rent Paid</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tenants.map((tenant) => (
                  <tr key={tenant.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {tenant.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {tenant.property}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {tenant.startDate} - {tenant.endDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="bg-green-100 text-green-800 px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full">
                        {formatCurrency(tenant.rentPaid || tenant.rentPaid)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Rental Management System. All rights reserved.</p>
          <p className="mt-1">Data refreshed at {new Date().toLocaleTimeString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Reports;