/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiBriefcase, FiEdit2, FiSave, FiX, FiCamera } from 'react-icons/fi';

const EditProfile = ({ user, onSave, onCancel }) => {
  const [editData, setEditData] = useState({ ...user });
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        setEditData(prev => ({ ...prev, avatarFile: file }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editData);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          <FiX className="h-6 w-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Profile Picture Upload */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-3">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Profile"
              className="h-32 w-32 rounded-full object-cover border-4 border-white shadow"
            />
            <label className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 cursor-pointer hover:bg-blue-600">
              <FiCamera className="h-5 w-5 text-white" />
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </label>
          </div>
          <p className="text-sm text-gray-500">Click camera icon to change photo</p>
        </div>

        {/* Personal Information */}
        <div className="space-y-4">
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="name"
                value={editData.name}
                onChange={handleChange}
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                value={editData.email}
                onChange={handleChange}
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiPhone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="tel"
                name="phone"
                value={editData.phone}
                onChange={handleChange}
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiBriefcase className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="position"
                value={editData.position}
                onChange={handleChange}
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea
              name="bio"
              value={editData.bio}
              onChange={handleChange}
              rows="3"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
          >
            <FiSave className="mr-2" />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

// Example usage in a parent component:
const ProfilePage = () => {
  const [user, setUser] = useState({
    name: 'John Owner',
    email: 'john.owner@example.com',
    phone: '(555) 123-4567',
    position: 'Property Manager',
    bio: 'Experienced property manager with 10+ years in residential and commercial real estate.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (updatedData) => {
    setUser(updatedData);
    setIsEditing(false);
    // Here you would typically make an API call to save the data
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {isEditing ? (
        <EditProfile 
          user={user} 
          onSave={handleSave} 
          onCancel={() => setIsEditing(false)} 
        />
      ) : (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
          {/* Display profile view */}
          <button 
            onClick={() => setIsEditing(true)}
            className="mb-4 flex items-center text-blue-600 hover:text-blue-800"
          >
            <FiEdit2 className="mr-2" /> Edit Profile
          </button>
          {/* Display user data */}
        </div>
      )}
    </div>
  );
};

export default EditProfile;