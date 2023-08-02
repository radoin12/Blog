import React from 'react';
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import "./navbarAdmin.scss"
import { DispatchApp, SelectorApp } from './redux/config/hooks';
import { CountCategory, DisplayPost, DisplayPostsUsers, postState, saerchItem } from './redux/post';
import{useEffect} from "react"
import { findAllUsers } from './redux/user';
import { authState } from './redux/auth';
export default function NavBarAdmin() {
  const dispatch=DispatchApp()
  const Post=SelectorApp(postState)
  const auth=SelectorApp(authState)
 

  const HandlChangeSearch=(e:React.ChangeEvent<HTMLInputElement>)=>{
    e.preventDefault()
   dispatch(saerchItem(e.target.value))
  }
  useEffect(() => {
 
    dispatch(findAllUsers())
    dispatch(DisplayPost(''))
    dispatch( CountCategory())
    dispatch(DisplayPostsUsers())
   
    }, [dispatch]);
  return (
    <div className="navbar">
    <div className="wrapper">
      <div className="search">
        <input type="text" placeholder="Search..." value={Post.searchVal}   onChange={HandlChangeSearch}/>
        <SearchOutlinedIcon />
      </div>
      <div className="items">
        <div className="item">
          <LanguageOutlinedIcon className="icon" />
          English
        </div>
        <div className="item">
          <DarkModeOutlinedIcon
            className="icon"
       
          />
        </div>
        <div className="item">
          <FullscreenExitOutlinedIcon className="icon" />
        </div>
        <div className="item">
          <NotificationsNoneOutlinedIcon className="icon" />
          <div className="counter">1</div>
        </div>
        <div className="item">
          <ChatBubbleOutlineOutlinedIcon className="icon" />
          <div className="counter">2</div>
        </div>
        <div className="item">
          <ListOutlinedIcon className="icon" />
        </div>
        <div className="item">
        <p>{auth.userInfo?.id? auth.userInfo?.name:""}</p>
          <img
            src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
            className="avatar"
          />
        </div>
      </div>
    </div>
  </div>
  );
}
