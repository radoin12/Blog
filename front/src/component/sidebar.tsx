 

 import React from 'react';
 import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

import CreditCardIcon from "@mui/icons-material/CreditCard";

import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

import { Link, useNavigate } from "react-router-dom";
import "./sideBar.scss"
import { DispatchApp } from './redux/config/hooks';
import axios from 'axios';
import { logoutUser } from './redux/auth';
import { ToastContainer, toast } from 'react-toastify';
 export default function Sidebar() {
    // logout 
    const navigate=useNavigate()
    const dispatch=DispatchApp()
    const LogoutUser=async()=>{
     
      try {
       const {data}=await axios.post('/api/auth/logout')
   
       localStorage.removeItem('userToken')
       dispatch(logoutUser())
       toast('you are logout ',{
        position: 'top-center', // Position on the screen
        autoClose: 2000, // Auto-close after 2 seconds
        hideProgressBar: true, // Hide the progress bar
        closeOnClick: true, // Close on click
        pauseOnHover: true, // Pause on hover
      })
       navigate('/')
      } catch (error) {
        console.log(error)
      }
  }
   return (
    <div className="sidebar">
       <ToastContainer  />
      <div className="center">
       
        <ul>
          <p className="title">MAIN</p>
         <Link to="/admin" style={{ textDecoration: "none" }}>
         <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
         </Link>
          <p className="title">LISTS</p>
          <Link to="/admin/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
        
         
          <Link to="/admin/posts" style={{ textDecoration: "none" }}>
          <li>
            <CreditCardIcon className="icon" />
           
            <span>Blog</span>
          </li>
          </Link>
          
        
          <p className="title">Contact</p>
         
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Notifications</span>
          </li>
         
          
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Settings</span>
          </li>
          <p className="title">USER</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          <li>
            <ExitToAppIcon className="icon" />
            <span onClick={LogoutUser} >Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
         
        ></div>
        <div
          className="colorOption"
      
        ></div>
      </div>
    </div>
   );
 }
 