// import React,{ StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// 
// const sampleProperty = {
//   title: "Luxury Beach Villa",
//   address: "123 Ocean Drive, Miami, FL 33139",
//   image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
//   managementCompany: "Premium Properties LLC"
// };

// const sampleLeaseDetails = {
//   firstMonthRent: 2500,
//   securityDeposit: 2500,
//   applicationFee: 50,
//   startDate: "June 15, 2023",
//   term: 12,
//   monthlyRent: 2500
// };
// const router=createBrowserRouter([
//   {
//     path:'/',
//     element:<App/>,
//     children:[
//       {
//         index:true,
//         element:<Landing/>
//       },
//       {
//         path:'/about',
//         element:<About/>
//       },
//       {
//         path:'/contact',
//         element:<Contact/>
//       },
//       {
//         path:'/properties',
//         element:<Properties/>
//       }
//     ]
//   },
//   {
//     path:"/rentals",
//     element:<Rentals/>
//   },
//   {
//     path:'/login',
//     element:<Login/>
//   },
//   {
//     path:'/signup',
//     element:<SignUp/>
//   },
//   {
//     path:"/tour-details",
//     element:<ScheduleTourPage/>
//   },
//   {
//     path:"/property-details",
//     element:<PropertyDetails/>
//   },
//   {
//     path:"/properties/:id",
//     element:<PropertyDetails/>
//   }
//   ,
//   {
//     path:"/owner",
//     element:<Home/>
//   },
//   {
//     path:"/user-profile",
//     element:<UserProfile/>
//   },
//   {
//     path:"/edit-profile",
//     element:<EditProfile/>
//   },
//   {
//     path:"/rental-payment",
//     element:<RentalPayment property={sampleProperty} leaseDetails={sampleLeaseDetails} />
//   }
// ])
// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <ContextProvider>
      
//     <RouterProvider router={router}>
//     </RouterProvider>
//     </ContextProvider>
//   </StrictMode>,
// )
import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider ,  Navigate} from 'react-router-dom'

import Contact from './pages/Contact.jsx'
import About from './pages/About.jsx'
import Properties from './pages/Properties.jsx'
import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import ScheduleTourPage from './components/layout/ScheduleTourPage.jsx'
import PropertyDetails from './components/layout/PropertyDetails.jsx'

// owner
import Home from './owner/Home.jsx'
import UserProfile from './owner/pages/UserProfile.jsx'
import EditProfile from './owner/pages/EditProfile..jsx'
import RentalPayment from './components/layout/RentalPayment.jsx'
import { ContextProvider } from './context/UserContext.jsx'
 
import Rentals from './pages/tenant/Rentals.jsx'
import ProtectedRoute from './components/compo/ProtectedRoute.jsx'
import { Toaster } from 'react-hot-toast'
import ToastWrapper from './components/compo/ToastWrapper.jsx'
import Lease from './components/layout/Lease.jsx'
import RentedHouses from './components/layout/RentedHouses.jsx'
import PortfolioManagement from './components/layout/PortfolioManagement.jsx'
import FinancialTracking from './components/layout/FinancialTracking.jsx'
import TenantCommunication from './components/layout/TenantCommunication.jsx'
import DocumentManagement from './components/layout/DocumentManagement.jsx'
// import ScrollToTop from './context/ScrollToTop.jsx'
 
const sampleProperty = {
  title: "Luxury Beach Villa",
  address: "123 Ocean Drive, Miami, FL 33139",
  image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  managementCompany: "Premium Properties LLC"
};

const sampleLeaseDetails = {
  firstMonthRent: 2500,
  securityDeposit: 2500,
  applicationFee: 50,
  startDate: "June 15, 2023",
  term: 12,
  monthlyRent: 2500
};



const router=createBrowserRouter([
    {
      path:'/',
      element:<App/>,
      children:[
        {
          index:true,
          element:<Landing/>
        },
        {
          path:'/about',
          element:<About/>
        },
        {
          path:'/contact',
          element:<Contact/>
        },
        {
          path:'/properties',
          element:<Properties/>
        },
        {
          path:'/portfolioManagement',
          element:<PortfolioManagement/>
        },
        {
          path:'/financialTracking',
          element:<FinancialTracking/>
        },
        {
          path:'/tenantCommunication',
          element:<TenantCommunication/>
        },
        {
          path:'/documentManagement',
          element:<DocumentManagement/>
        },

      ]
    },
    // {
    //   path:"/rentals",
    //   element:<Rentals/>
    // },
    {
      path:'/login',
      element:<Login/>
    },
    {
      path:'/signup',
      element:<SignUp/>
    },
    {
      path:"/tour-details/:id",
      element:<ScheduleTourPage/>
    },
    {
      path:"/property-details/:id",
      element:<PropertyDetails/>
    },
    {
      path:'/lease',
      element:<Lease/>
    },
    {
      path:"/properties/:id",
      element:<PropertyDetails/>
    }
    ,
    {
      path:"/owner",
      element:<Home/>
    },
    {
      path:"/user-profile/:id",
      element:<UserProfile/>
    },
    {
      path:"/edit-profile",
      element:<EditProfile/>
    },
    {
      path:"/rental-payment/:id",
      element:<RentalPayment  property={sampleProperty} leaseDetails={sampleLeaseDetails} />
    },
    {
      path:"/rented-houses",
      element:<RentedHouses/>
    }
  ])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
    {/* <ToastWrapper /> */}
    {/* <Toaster/> */}
    <Toaster/>
    {/* <ScrollToTop/> */}
      <RouterProvider router={router} />
    </ContextProvider>
  </StrictMode>
);