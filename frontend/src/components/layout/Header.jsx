/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiChevronDown, FiLogOut, FiMenu, FiSettings, FiUser, 
  FiX, FiEdit, FiGrid, FiPlus, FiHome, FiFileText 
} from 'react-icons/fi';
import { useUser } from '../../context/UserContext';
import axios from 'axios';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  const {user, logOut ,login,setUser} = useUser();
  const [userprofile,setUserData]=useState([])
  const [loading,setLoading]=useState(false)

  useEffect(() => {
    // console.log(user)\
  const checkAuth = async () => {
    // console.log('checkout')
    setLoading(true)
    try {
      const { data } = await axios.get('/api/login/success', {
        withCredentials: true
      });
      console.log(data)
      if (data.authenticated) {
        login(data.user);
      }
      setLoading(false)
    } catch (error) {
      logOut();
      setLoading(false)
    }
  };

  const getUser=async()=>{
    // console.log('get user')
    // console.log(user)
    // console.log(user)
    // console.log(user._id)
    setLoading(true)
      try {
        const {data}=await axios.get(`/api/auth/${user?._id}`)
        // console.log(data)
        // login(data);
        setUser(data)
        // console.log(data
        setLoading(true)
      } catch (error) {
        // console.log(error)
      }
      setLoading(false)
    }

 getUser();
  // if (!user)  getUser();
  // if (!user)  getUser;
}, []);

// Update logout handler
const logout = async () => {
  await logOut();
  window.location.href = '/';
};
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-blue-600">RentalManager</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="text-gray-700 hover:text-blue-600 transition">Home</Link>
          <Link to="/properties" className="text-gray-700 hover:text-blue-600 transition">Properties</Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600 transition">About</Link>
          <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition">Contact</Link>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {!user ? (
            <>
              <Link to="/login" className="px-4 py-2 text-gray-700 hover:text-blue-600 transition">
                Login
              </Link>
              <Link to="/signup" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                Sign Up
              </Link>
            </>
          ) : (
            <div className="relative">
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
             {  loading ? 'loading':
             <>
             <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
               {user.avatar ?
               <img src={user?.avatar} alt='user profile' className='h-full w-full rounded-full'/>
               :  <FiUser className="h-5 w-5 text-gray-600" />
}
                </div>
               
                <span className="ml-2 text-sm font-medium text-gray-700">
                  {user?.name}
                </span>
               
                <FiChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isUserMenuOpen ? 'transform rotate-180' : ''}`} />
               </>
                }
              </button>
              
              {/* Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm text-gray-700">Signed in as</p>
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {user.email || "user@example.com"}
                    </p>
                  </div>
                  <Link
                    to={`user-profile/${user._id || user.id}`}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FiUser className="mr-2 h-4 w-4" />
                    Your Profile
                  </Link>
                  {/* <Link
                    to="/edit-profile"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FiEdit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Link> */}
                  {/* <Link
                    to="/settings"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FiSettings className="mr-2 h-4 w-4" />
                    Settings
                  </Link> */}
                  {/* <Link
                    to="/rented-houses"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FiHome className="mr-2 h-4 w-4" />
                        My Rentals
                  </Link> */}

                  {/* Owner Specific Links */}
                  {user.userType === 'owner' && (
                    <>
                      <Link
                        to="/owner"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FiGrid className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                      {/* <Link
                        to="/add-property"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FiPlus className="mr-2 h-4 w-4" />
                        Add Property
                      </Link> */}
                    </>
                  )}

                  {/* Tenant Specific Links */}
                  {user.userType === 'tenant' && (
                    <>
                      <Link
                        to="/rented-houses"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FiHome className="mr-2 h-4 w-4" />
                        My Rentals
                      </Link>
                      {/* <Link
                        to="/applications"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FiFileText className="mr-2 h-4 w-4" />
                        Applications
                      </Link> */}
                    </>
                  )}

                  <div className="border-t border-gray-100"></div>
                  <button
                    className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={logout}
                  >
                    <FiLogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700 hover:text-blue-600 focus:outline-none"
          onClick={() => setMobileMenuOpen(true)}
        >
          <FiMenu className="h-6 w-6" />
        </button>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 md:hidden">
            <div className="fixed inset-y-0 right-0 w-4/5 max-w-sm bg-white shadow-lg">
              <div className="flex justify-end p-4">
                <button 
                  className="text-gray-700 hover:text-blue-600 focus:outline-none"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FiX className="h-6 w-6" />
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <nav className="flex flex-col p-4 space-y-4">
                <Link 
                  to="/" 
                  className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/properties" 
                  className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Properties
                </Link>
                <Link 
                  to="/about" 
                  className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link 
                  to="/contact" 
                  className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </nav>

              {/* Mobile Auth Buttons */}
              <div className="p-4 border-t border-gray-200">
                {!user ? (
                  <div className="flex flex-col space-y-4">
                    <Link 
                      to="/login" 
                      className="px-4 py-2 text-center text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded transition"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link 
                      to="/signup" 
                      className="px-4 py-2 text-center bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-4">
                    {/* Owner Mobile Links */}
                    <div className='flex items-center'>

                 
                     <div className="h-8 w-8  rounded-full bg-gray-300 ">
               {user.avatar ?
               <img src={user?.avatar} alt='user profile' className='h-full w-full rounded-full'/>
               :  <FiUser className="mt-1 h-[70%] w-full text-gray-600" />
}
                </div>
               <span className="ml-2 text-sm font-medium text-gray-700">
                  {user?.name}
                </span>
                   </div>
                    {user.userType === 'owner' && (
                      <>
                        <Link 
                          to="/owner"
                          className="px-4 py-2 text-center text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded transition"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Dashboard
                        </Link>
                        {/* <Link 
                          to="/add-property"
                          className="px-4 py-2 text-center text-gray-700 hover:text-blue-600 hover:bg-gray-100 rounded transition"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Add Property
                        </Link> */}
                      </>
                    )}

                    {/* Tenant Mobile Links */}
                    {user.userType === 'tenant' && (
                      <>
                          <Link
                      to={`user-profile/${user._id || user.id}`}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FiHome className="mr-2 h-4 w-4" />
                        Your Profile
                      </Link>
                          <Link
                      to='/rented-houses'
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FiHome className="mr-2 h-4 w-4" />
                        My Rentals
                      </Link>
                        
                      </>
                    )}

                    <button 
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                      // onClick={() => { logOut(); setMobileMenuOpen(false); }}
                    onClick={()=>{
                      logout()
                       setMobileMenuOpen(false)}}

                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
