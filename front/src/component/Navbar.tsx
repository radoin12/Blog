import React from 'react';
import "../pages/style.scss"
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import { Link } from 'react-router-dom';
import { DispatchApp, SelectorApp } from './redux/config/hooks';
import { authState, logoutUser } from './redux/auth';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
export default function Navbar() {
  const info=SelectorApp(authState)
  console.log(info.userInfo.id,"id")
 const dispatch=DispatchApp()
   const LogoutUser=async()=>{
       
     try {
      const {data}=await axios.post('/api/auth/logout')
      console.log(data,"logout")
      localStorage.removeItem('userToken')
      dispatch(logoutUser())
      toast('you are logout ')
     } catch (error) {
       console.log(error)
     }
 }
  return (
    <div className='Navbar'>
       <ToastContainer />
      <div className='container'>

        <div className='Logo'>
        <Link to="/"><img alt="Blog"src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMPseecMSqp_MMrPUIO71FEw7XLlUgoup8LW2X-7SM&s" /></Link>
        </div>
        <div className='Links'> 
         <Link to="/?cat=art"><h2>Article</h2></Link>
         <Link to="/?cat=science"><h2>Science</h2></Link>
         <Link to="/?cat=technology"><h2>Technology</h2></Link>
         <Link to="/?cat=cinema"><h2>Cinema</h2></Link>
         <Link to="/?cat=design"><h2>Design</h2></Link>
         <Link to="/?cat=Food"><h2>Food</h2></Link>
         {info.userInfo.name&&<span>{info.userInfo.name}</span>}
        
        
         <span className='Write'><Link to="/write?0">Write</Link></span>
         <div className='activeCopmte'>
          {
           !info.userInfo.id?
           <div className='active'>
              <Link to="/Register"><h2>Register</h2></Link>
              <Link to="/Login"><h2>Login</h2></Link>
           </div>: <span  onClick={()=>LogoutUser()}>Logout</span>
          }
     
        
         </div>
        
        </div>
      </div>
    </div>
  );
}
