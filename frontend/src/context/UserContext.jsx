/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';

const UserContext = createContext(null);

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
// console.log(user)
  const checkServerAuth = async () => {
    try {
      const response = await axios.get('/api/login/success', { 
        withCredentials: true 
      });
      
      if (response.data.authenticated) {
        return response.data.user;
      }
      return null;
    } catch (error) {
      console.error('Auth check error:', error);
      return null;
    }
  };
  
  const syncAuthState = async () => {
    try {
      const serverUser = await checkServerAuth();
      const localUser = JSON.parse(localStorage.getItem('user') || 'null');
      // console.log(localUser)
      if (serverUser) {
        // Server-first approach
      // console.log(serverUser)
        // console.log('server')
        localStorage.setItem('user', JSON.stringify(serverUser));
        setUser(serverUser);
      } else if (localUser) {
        // console.log('local user')
// console.log(localUser)
        // localStorage.setItem('user', JSON.stringify(localUser));

        // Fallback to local storage with validation
        // const isValid = await validateLocalUser(localUser);
      setUser(localUser)
      }
      setLoading(false);
    } catch (error) {
      console.error('Sync error:', error);
      setLoading(false);
    }
  };

  // / Add validation helper
// const validateLocalUser = async (localUser) => {
//   try {
//     // console.log(localUser._id)
//     const response = await axios.get(`/api/auth/${localUser.id}`, {
//       withCredentials: true
//     });
//     return response.data.valid;
//   } catch (error) {
//     return false;
//   }
// };


  useEffect(() => {
    syncAuthState();
    window.addEventListener('focus', syncAuthState);
    return () => window.removeEventListener('focus', syncAuthState);
  }, []);

  const login = (userData) => {
    // console.log(userData)
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logOut = async () => {
    try {
      await axios.get('/api/auth/logout', { withCredentials: true });
    } catch (error) {
      console.error('Logout error:', error);
    }
    localStorage.removeItem('user');
    setUser(null);
     
  };

  const value = { user, login, logOut, loading,setUser };

  return (
    <UserContext.Provider value={value}>
      {!loading && children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
export default UserContext;