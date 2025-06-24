/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Landing from './pages/Landing'
import { Outlet } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import axios from 'axios'
import { useUser } from './context/UserContext'
import ScrollToTop from './context/ScrollToTop'

export default function App() {
//   const [loading,setLoading]=useState(false)
//   const {user,login,setUser}=useUser();
//    useEffect(() => {
//      // console.log(user)\
//    const checkAuth = async () => {
//      // console.log('checkout')
//      setLoading(true)
//      try {
//        const { data } = await axios.get('/api/login/success', {
//          withCredentials: true
//        });
//        console.log(data)
//        if (data.authenticated) {
//          login(data.user);
//        }
//        setLoading(false)
//      } catch (error) {
//       //  logOut();
//        setLoading(false)
//      }
//    };
 
//    const getUser=async()=>{
//      // console.log('get user')
//      // console.log(user)
//      // console.log(user)
//      // console.log(user._id)
//      setLoading(true)
//        try {
//          const {data}=await axios.get(`/api/auth/${user?._id}`)
//          // console.log(data)
//          login(data);
//          setUser(data)
//          // console.log(data
//          setLoading(true)
//        } catch (error) {
//          console.log(error)
//        }
//        setLoading(false)
//      }
 
//   getUser();
//    // if (!user)  getUser();
//    // if (!user)  getUser;
//  }, []);
 
  return (
    <div >

      {/* <Landing/> */}
      <ScrollToTop/>
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  )
}
