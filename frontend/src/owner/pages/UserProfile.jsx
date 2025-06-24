/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FiUser, FiMail, FiPhone, FiLock, FiEdit2, FiSave, FiX, FiArrowLeft } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import toast from 'react-hot-toast'
const UserProfile = () => {
  const navigate = useNavigate();

  // Sample user data
  const {setUser,login}=useUser();   
  const [user, setUserData] = useState([]);
  // console.log(user)
  const [loading,setLoading]=useState(false)
const {id}=useParams();
const [updating ,setUpdating]=useState(false)
  const [isEditing, setIsEditing] = useState(false);
  // const [loading,setLoading]=useState(false)
  const [editData, setEditData] = useState([]);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
// console.log('edit data',editData)
  const handleEdit = () => {
    // console.log(user)
    // console.log(editData)
    setEditData(user);
    // console.log(editData)
    setIsEditing(true);
  };
  // console.log(login)
// console.log(user)
  const handleSave = async() => {
    // setUser({ ...editData });
    // console.log({...editData})
    // setUpdating(true)
    try {
        const {data}=await axios.put('/api/auth/update-profile/'+id,{...editData})
        login(data.user)
        // console.log(data.user)
        // setUser(data.user)
        // toast.success('user updated successfully')
        setIsEditing(false);
       window.location.reload();
    

    } catch (error) {
      console.log(error)
    }
    setUpdating(false)
  };

  const handleCancel = () => {
    setIsEditing(false);
  };
 
  useEffect(()=>{
    const getUser=async()=>{
      setLoading(true)
      try {
        const {data}=await axios.get('/api/auth/'+id)
      setUserData(data)
      // setUser(data)
      //   setUser(()=>({...data,
      //     // bio: 'Experienced property manager with 10+ years in residential and commercial real estate.',
      //     // company: 'Premium Properties LLC',
      //     phoneNo:data?.phoneNo ? data.phoneNo :''
      //   })
      // )
      } catch (error) {
        console.log(error)
      }
      setLoading(false)
    }
    getUser()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1500);
  },[])
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    // Add password change logic here
    alert('Password changed successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };
  const handleBack = () => {
    navigate(-1);
  };

  if(!user)   window.location.href = '/';

   // Add loading state
   if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
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
    <div className=" relative">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
            {/* Profile Header - Improved for mobile */}
               <div className="bg-gradient-to-r from-blue-600 to-blue-400 px-4 py-6 sm:px-6 sm:py-8 text-white">
                 <div className="flex flex-col items-center sm:flex-row sm:items-start sm:justify-between">
                   <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-4">
                     <div className="relative mb-4 sm:mb-0">
                       <img 
                         src={user.avatar} 
                         alt={user.name} 
                         className="h-16 w-16 sm:h-20 sm:w-20 rounded-full border-4 border-white border-opacity-50"
                       />
                       {isEditing && (
                         <button className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1 sm:p-2 hover:bg-blue-600">
                           <FiEdit2 className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                         </button>
                       )}
                     </div>
                     <div className="text-center sm:text-left">
                       <h1 className="text-xl sm:text-2xl font-bold">{user.name}</h1>
                       <p className="text-blue-100 text-sm sm:text-base mt-1">
                         {user.position} {user.company ? `at ${user.company}` : user.email}
                       </p>
                     </div>
                   </div>
                {/* update button  */}
                 <div className="mt-4 sm:mt-0">
                {!isEditing ? (
                  <button
                    onClick={handleEdit}
                    disabled={updating}
                    className="flex items-center px-4 py-2 bg-whi bg-opacity-20 rounded-md hover:bg-opacity-30"
                  >
                    <FiEdit2 className="mr-2" />
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSave}
                      className="flex items-center px-4 py-2 bg-green-500 rounded-md hover:bg-green-600"
                    >
                      <FiSave className="mr-2" />
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center px-4 py-2 bg-gray-500 rounded-md hover:bg-gray-600"
                      >
                      <FiX className="mr-2" />
                      Cancel
                    </button>
                  
                  </div>
                )}
              </div>
                 </div>
               </div>
  {/* Profile Content - Improved spacing */}
          <div className="px-4 py-4 sm:px-6 sm:py-6">
            <div className="grid grid-cols-1 gap-8">
              {/* Personal Information */}
         <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <FiUser className="h-5 w-5 text-gray-400 mr-3" />
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={editData.name}
                        onChange={handleChange}
                        className="flex-1 border-b border-gray-300 focus:border-blue-500 focus:outline-none py-1"
                      />
                    ) : (
                      <p className="text-gray-700">{user.name}</p>
                    )}
                  </div>
                  
                  <div className="flex items-center">
                    <FiMail className="h-5 w-5 text-gray-400 mr-3" />
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={editData.email}
                        onChange={handleChange}
                        disabled
                        className="flex-1 border-b  border-gray-300 focus:border-blue-500 focus:outline-none py-1"
                      />
                    ) : (
                      <p className="text-gray-700 truncate">{user.email}</p>
                    )}
                  </div>
                  
                  <div className="flex items-center">
                    <FiPhone className="h-5 w-5 text-gray-400 mr-3" />
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phoneNo"
                        value={editData.phoneNo}
                        onChange={handleChange}
                        className="flex-1 border-b border-gray-300 focus:border-blue-500 focus:outline-none py-1"
                      />
                    ) : (
                      <p className="text-gray-700">{user.phoneNo}</p>
                    )}
                  </div>
                  
                  {/* {isEditing && (
                    <div className="pt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                      <textarea
                        name="bio"
                        value={editData.bio}
                        onChange={handleChange}
                        rows="3"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  )} */}
                </div>
              </div>

             {/* Company Information - Conditional rendering */}
              {user.userType !== "tenant" && (
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Company Information</h2>
                  <div className="space-y-4">
                    {/* ... company info fields unchanged ... */}
                  </div>
                </div>
              )}
            </div>

          {/* Change Password Section - Improved responsiveness */}
                 <div className="mt-8 pt-8 border-t border-gray-200">
                   <h2 className="text-lg font-medium text-gray-900 mb-4">Change Password</h2>
                   <form onSubmit={handlePasswordChange} className="space-y-4 w-full max-w-md mx-auto">
                     {/* Password fields with improved mobile styling */}
                     <div>
                       <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1">
                         Current Password
                       </label>
                       <div className="relative rounded-md">
                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                           <FiLock className="h-5 w-5 text-gray-400" />
                         </div>
                         <input
                           id="current-password"
                           type="password"
                           required
                           value={currentPassword}
                           onChange={(e) => setCurrentPassword(e.target.value)}
                           className="pl-10 w-full text-sm border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                           placeholder="Current password"
                         />
                       </div>
                     </div>
                     
                     {/* Repeat similar structure for other password fields */}
                     
                     <div className="pt-2 flex justify-center sm:justify-start">
                       <button
                         type="submit"
                         className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                       >
                         Change Password
                       </button>
                     </div>
                   </form>
                 </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default UserProfile;