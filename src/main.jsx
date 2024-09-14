import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Components/Home/Home';
import App from './App'
import AuthProvider from './Shared/AuthContext/AuthProvider';
import SignUp from './Shared/Firebase/Signup';
import LogIn from './Shared/Firebase/Login';
import PrivateRoute from './Shared/PrivateRoute/PrivateRoute';
import Profile from './Components/Dashboard/Profile/Profile';
import Dashboard from './Components/Dashboard/Dashboard';
import AddDonation from './Components/Dashboard/AddDonation/AddDonation';
import HomeDashboard from './Components/Dashboard/HomeDashboard/HomeDashboard';
import MyDonation from './Components/Dashboard/MyDonation/MyDonation';
import UpdateDonation from './Components/Dashboard/MyDonation/UpdateDonation';
import DonationDetail from './Components/Dashboard/MyDonation/DonationDetail';
import DonationRequests from './Components/DonationRequests/DonationRequests';
import FundForm from './Components/Fund/FundForm';
import AllUsers from './Components/Dashboard/AllUsers/AllUsers';
import AllRequests from './Components/Dashboard/AllDonationRequests/AllRequests';
import SearchDonor from './Components/SearchDonor/SearchDonor';
import BlogForm from './Components/Dashboard/ContentManagement/BlogForm';
import ContentManagement from './Components/Dashboard/ContentManagement/ContentMangement';
import 'react-toastify/dist/ReactToastify.css';



const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/donationRequests',
        element: <PrivateRoute><DonationRequests></DonationRequests></PrivateRoute>
      },
      {
        path: '/funds',
        element:<PrivateRoute><FundForm></FundForm></PrivateRoute>
      },
      {
        path: '/searchDonor',
        element:<PrivateRoute><SearchDonor></SearchDonor></PrivateRoute>
      },

    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      {
        path: '/dashboard/profile',
        element: <Profile></Profile>
      },
      {
        path: '/dashboard',
        element: <HomeDashboard></HomeDashboard>
      },
      {
        path:'/dashboard/create-donation-request',
        element:<AddDonation></AddDonation>
      },
      {
        path:'/dashboard/my-donations',
        element:<MyDonation></MyDonation>
      },
      {
        path:'/dashboard/users',
        element:<AllUsers></AllUsers>
      },
      {
        path:'/dashboard/all-requests',
        element:<AllRequests></AllRequests>
      },
      {
        path:'/dashboard/blog-form',
        element:<BlogForm></BlogForm>
      },
      {
        path:'/dashboard/blogs',
        element:<ContentManagement></ContentManagement>
      },
      {
        path:'/dashboard/my-donations-edit/:id',
        loader:({params})=>fetch(`http://localhost:5000/donations/${params.id}`),
        element:<UpdateDonation></UpdateDonation>
      },
      {
        path:'/dashboard/donation-detail/:id',
        loader:({params})=>fetch(`http://localhost:5000/donations/${params.id}`),
        element:<DonationDetail></DonationDetail>
      },
    ]
  },
  {
    path: '/register',
    element: <SignUp></SignUp>
  },
  {
    path: '/logIn',
    element: <LogIn></LogIn>
  }
]);

const queryClient = new QueryClient()


createRoot(document.getElementById('root')).render(


  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />

      </QueryClientProvider>
    </AuthProvider>

  </React.StrictMode>
)
