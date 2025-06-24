/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react';
import { 
  FiHome, 
  FiDollarSign, 
  FiCalendar, 
  FiUsers, 
  FiSettings, 
  FiMessageSquare,
  FiPieChart,
  FiFileText,
  FiLogOut,
  FiMenu,
  FiBell,
  FiUser,
  FiChevronDown,
  FiEdit,
  FiGrid,
  FiPlus
} from 'react-icons/fi';
import Properties from './pages/Properties'
import Tenants from './pages/Tenants'
import Reports from './pages/Reports'
import Settings from './pages/Settings'
import Payments from './pages/Payments'
import Messages from './pages/Messages'
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import axios from 'axios';
const Home = () => {
  const {user,logOut}=useUser()
  const [loading,setLoading]=useState(false)
  const [propertiesLength,setPropertiesLength]=useState(0)
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'New rental application for Downtown Apartment', time: '2 hours ago', read: false },
    { id: 2, text: 'Payment received from John Smith', time: '1 day ago', read: true },
    { id: 3, text: 'Maintenance request for Mountain Cabin', time: '3 days ago', read: true }
  ]);

  // Mock data
  const [properties, setProperties] =useState([
    { id: 1, name: 'Downtown Apartment', location: 'New York, NY', status: 'Occupied', income: '$2,400/mo' },
    { id: 2, name: 'Mountain Cabin', location: 'Aspen, CO', status: 'Vacant', income: '$1,800/mo' },
    { id: 3, name: 'Beachfront Villa', location: 'Miami, FL', status: 'Occupied', income: '$4,200/mo' }
  ]) 

  const upcomingTasks = [
    { id: 1, task: 'Inspect Downtown Apartment', due: 'Tomorrow', priority: 'High' },
    { id: 2, task: 'Renew lease for Beachfront Villa', due: 'In 2 weeks', priority: 'Medium' },
    { id: 3, task: 'Schedule cleaning for Mountain Cabin', due: 'Next week', priority: 'Low' }
  ];

  const financialData = {
    totalIncome: '$8,400',
    expenses: '$2,300',
    netProfit: '$6,100',
    occupancyRate: '67%'
  };

    useEffect(() => {}, [user]);


    useEffect(()=>{
      const getPropertiesCout =async ()=>{
        setLoading(true)
        try {
          const {data}= await axios.get('/api/properties')
          setPropertiesLength(data.count)
          setProperties(data.data)
          setLoading(false)
          // console.log(properties)
        } catch (error) {
          console.log(error)
          setLoading(false)
        }
      }
getPropertiesCout();
      
    },[])

        // Add loading state
   if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  const renderMainContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-gray-500">Total Properties</h3>
                <p className="text-2xl font-bold">{propertiesLength}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-gray-500">Occupancy Rate</h3>
                <p className="text-2xl font-bold">{financialData.occupancyRate}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-gray-500">Monthly Income</h3>
                <p className="text-2xl font-bold">{financialData.totalIncome}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-gray-500">Net Profit</h3>
                <p className="text-2xl font-bold">{financialData.netProfit}</p>
              </div>
            </div>

            {/* Properties List */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Your Properties</h2>
                {/* <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Add Property
                </button> */}
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Income</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {properties.map(property => (
                      <tr key={property?.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-normal text-1xl capitalize">{property.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-500">{property.location}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${property.status === 'rented' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {property.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-900">${property.price}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                          <button className="text-gray-600 hover:text-gray-900">Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Upcoming Tasks */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold mb-4">Upcoming Tasks</h2>
                <div className="space-y-4">
                  {upcomingTasks.map(task => (
                    <div key={task.id} className="border-l-4 border-blue-500 pl-4 py-2">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{task.task}</h3>
                        <span className={`text-xs px-2 py-1 rounded 
                          ${task.priority === 'High' ? 'bg-red-100 text-red-800' : 
                            task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                          {task.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">Due: {task.due}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-100 rounded-full p-2">
                      <FiDollarSign className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Payment received for Downtown Apartment</p>
                      <p className="text-sm text-gray-500">$2,400 - 2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-green-100 rounded-full p-2">
                      <FiUsers className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">New tenant approved for Beachfront Villa</p>
                      <p className="text-sm text-gray-500">John Smith - 1 week ago</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-yellow-100 rounded-full p-2">
                      <FiHome className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">Maintenance completed at Mountain Cabin</p>
                      <p className="text-sm text-gray-500">Plumbing repair - 2 weeks ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'properties':
        return <Properties/>;
      case 'tenants':
        return  <Tenants/>;
      case 'payments':
        return  <Payments/>;
      case 'reports':
        return  <Reports/>;
      case 'messages':
        return  <Messages/>;
      case 'settings':
        return  <Settings/>;
      default:
        return  
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-blue-800 text-white transition-all duration-300 ease-in-out`}>
        <div className="p-4 flex items-center justify-between">
          {sidebarOpen ? (
            <h1 className="text-xl font-bold">Rental Manager</h1>
          ) : (
            <div className="w-8 h-8 bg-blue-700 rounded-full"></div>
          )}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 rounded-md hover:bg-blue-700"
          >
            <FiMenu className="h-6 w-6" />
          </button>
        </div>
        <nav className="mt-6">
          <div 
            className={`flex items-center px-4 py-3 cursor-pointer ${activeTab === 'dashboard' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <FiHome className="h-5 w-5" />
            {sidebarOpen && <span className="ml-3">Dashboard</span>}
          </div>
          <div 
            className={`flex items-center px-4 py-3 cursor-pointer ${activeTab === 'properties' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
            onClick={() => setActiveTab('properties')}
          >
            <FiHome className="h-5 w-5" />
            {sidebarOpen && <span className="ml-3">Properties</span>}
          </div>
          <div 
            className={`flex items-center px-4 py-3 cursor-pointer ${activeTab === 'tenants' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
            onClick={() => setActiveTab('tenants')}
          >
            <FiUsers className="h-5 w-5" />
            {sidebarOpen && <span className="ml-3">Tenants</span>}
          </div>
          <div 
            className={`flex items-center px-4 py-3 cursor-pointer ${activeTab === 'payments' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
            onClick={() => setActiveTab('payments')}
          >
            <FiDollarSign className="h-5 w-5" />
            {sidebarOpen && <span className="ml-3">Payments</span>}
          </div>
          <div 
            className={`flex items-center px-4 py-3 cursor-pointer ${activeTab === 'reports' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
            onClick={() => setActiveTab('reports')}
          >
            <FiPieChart className="h-5 w-5" />
            {sidebarOpen && <span className="ml-3">Reports</span>}
          </div>
          <div 
            className={`flex items-center px-4 py-3 cursor-pointer ${activeTab === 'messages' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
            onClick={() => setActiveTab('messages')}
          >
            <FiMessageSquare className="h-5 w-5" />
            {sidebarOpen && <span className="ml-3">Messages</span>}
          </div>
          <div 
            className={`flex items-center px-4 py-3 cursor-pointer ${activeTab === 'settings' ? 'bg-blue-700' : 'hover:bg-blue-700'}`}
            onClick={() => setActiveTab('settings')}
          >
            <FiSettings className="h-5 w-5" />
            {sidebarOpen && <span className="ml-3">Settings</span>}
          </div>
        </nav>
        {/* <div className="absolute bottom-0  left-0 p-4"> */}
        <div className='mt-42'>

          <div className="flex items-center px-4 py-3 cursor-pointer hover:bg-blue-700">
            <FiLogOut className="h-5 w-5" />
            {sidebarOpen && <span className="ml-3">Logout</span>}
        </div>
          {/* </div> */}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-900">
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        </h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none">
              <FiBell className="h-6 w-6" />
            </button>
            {notifications.filter(n => !n.read).length > 0 && (
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            )}
          </div>
          
          {/* User Profile Dropdown */}
         <div className="relative">
                  <button 
                    // onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x- focus:outline-none"
                  >
                    <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                      <FiUser className="h-5 w-5 text-gray-600" />
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      {user?.name || "User"}
                    </span>
                    {/* <FiChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isUserMenuOpen ? 'transform rotate-180' : ''}`} /> */}
                  </button>
                  
                
                </div>
        </div>
      </div>
    </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
};

export default Home;