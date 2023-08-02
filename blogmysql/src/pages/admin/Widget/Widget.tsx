import React from 'react';

import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";


import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
 import './Widget.scss'
import { DispatchApp, SelectorApp } from '../../../component/redux/config/hooks';
import { UserState } from '../../../component/redux/user';
import {  postState } from '../../../component/redux/post';
type  types={
    type:string
}
type TypeData={
title:string ,
numbers:number|undefined,
error:string,
path:string ,
icon :any
}|undefined
export default function Widget({type}:types) {
   const dispatch=DispatchApp()
  const userInfo=SelectorApp(UserState)
  const PostInfo=SelectorApp(postState)






    let Data:TypeData
    switch (type) {
      
        case "Users":
            
          Data = {
            title: "USERS",
            
            numbers:userInfo?.users?.length,
          
            error:'cnx is failed',
            path: "/admin/users",
            icon: (
              <PersonOutlinedIcon
                className="icon"
                style={{
                  color: "crimson",
                  backgroundColor: "rgba(255, 0, 0, 0.2)",
                }}
              />
            ),
          };
          break;
        
        
        case "Posts":
          
               Data= {
            title: "Posts",
            
            numbers:PostInfo?.post?.length,
          
            error:'cnx is failed',
            path: "/admin/Posts",
            icon: (
              <MonetizationOnOutlinedIcon
                className="icon"
                style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
              />
            ),
          };
          break;
       
       
        default:
          break;
      }


  return (
    <div>
    <div className="widget">
     <div className="left">
       <span className="title">{Data?.title}</span>
       <span className="counter">
       {Data?.numbers}
       </span>
       <span className="link">see list of {Data?.title} </span>
     </div>
     <div className="right">
      
       {Data?.icon}
     </div>
     
    </div>
    </div>
  );
}
