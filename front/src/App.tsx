


import * as React from "react";

import {
  createBrowserRouter,
  RouterProvider,
 
  Outlet,
  useNavigate,
} from "react-router-dom";
import Register from './pages/client/register/Register';
import Login from './pages/client/login/Login';
import Home from './pages/client/home/Home';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import Single from './pages/client/singlePage/Single';
import Write from './pages/client/writePage/Write';


import HomeAdmin from './pages/admin/home/home';

import NavBarAdmin from "./component/NavBarAdmin";
import List from "./pages/admin/liste/list";
import { postColumns, userColumns } from "./pages/admin/columnData/inputData";
import CreatePost from "./pages/admin/component/createPost";
import Createuser from "./pages/admin/component/CreateUser";
import Protect from "./pages/admin/protectRoute/proutectRouteAdmin";
import { SelectorApp } from "./component/redux/config/hooks";
import { authState } from "./component/redux/auth";


const Layout=()=>{
  return(
    <>
     <Navbar/>
     <Outlet/>
     <Footer/>
    </>
  )
}
const LayoutAdmin=()=>{
  return (  
  <div >
     <NavBarAdmin/>
       <Outlet/>
  </div>
  )
}
const router = createBrowserRouter([
  {
    path: "/",
    element:<Layout/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/post/:id",
        element:<Single/>
      },
      {
        path:"/write",
        element:<Write/>
      }, {
        path: "Register",
        element: <Register/>
      },
      {
        path: "Login",
        element: <Login/>
      }
    ]

  },
 {
    path:"/admin",
    element:<LayoutAdmin/>,
    children:[
      {
      path:'/admin',
      element:<Protect><HomeAdmin /></Protect>
    },
    {
      path:'/admin/Posts',
      element:<Protect><List column={postColumns} /></Protect>
    },
    {
      path:'/admin/Posts/create',
      element:<Protect><CreatePost /></Protect>
    },
    {
      path:'/admin/users',
      element:<Protect><List column={userColumns} /></Protect>
    },
    {
      path:'/admin/users/create',
      element:<Protect><Createuser/></Protect>
    },

  ]
  }
  
]);
function App() {

  return (
   <div className=''>
     <div className='containers' >
      <RouterProvider router={router}/>
     </div>
   </div>
  );
}

export default App;
