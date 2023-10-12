import React, { useEffect, useState } from 'react';
import "../../style.scss"
import {Avatar,IconButton} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useLocation, useParams } from 'react-router-dom';
import Menu from '../../../component/Menu';
import { DispatchApp, SelectorApp } from '../../../component/redux/config/hooks';
import { DeletePost, DisplayPost, FindOnePost, PostType, postState } from '../../../component/redux/post';
import moment from 'moment'
import { authState } from '../../../component/redux/auth';

export default function Single() {
  const {id}=useParams()
const postInfo=SelectorApp(postState)
const infoUser=SelectorApp(authState)
const[deletePost,setDeletePost]=useState<Boolean|null>(null)
   
  const{userInfo}=infoUser

  const {state}=useLocation()

 const{onePost,status}=postInfo


  console.log(onePost,"one post")
  console.log(id,'id')

  const dispatch=DispatchApp()
   useEffect(()=>{
    dispatch(FindOnePost(id))
    dispatch(DisplayPost(`?cat=${state.cat}`))
   },[state.cat ,id])

   const DeletePosts=(id:any)=>{
  
   dispatch(DeletePost(id))
   setDeletePost(true)
   }

  return (
    <div className='single'>
      <div className='content'>
       {!deletePost&&onePost? <>
        <img alt="" className='img'  src={`../uploads/${onePost?.img}`}/>
        <div className='user'>
         {<img alt={`${onePost?.name}` } src={onePost?.image==="https://img.freepik.com/icones-gratuites/utilisateur_318-159711.jpg"?onePost?.image:`../uploads/${onePost?.image}`}/>}
           <div className='info'>
            <span className='name'>{onePost?.name}</span>
            <span>Publiched At {moment(onePost?.date).fromNow()}</span>
          
           </div>
         { (state.id=== userInfo.id||userInfo.isAdmin)&&onePost&& <div className='edit'>
           


             <Link to={"/write?1"} state={{onePost,id}}>
             <IconButton aria-label="edit" size="large">
             
              <Avatar sx={{ bgcolor: "green" }}>
                <EditIcon color="inherit"fontSize="inherit" />
              </Avatar>
                
            </IconButton>
             </Link>
            <IconButton aria-label="delete" size="large"  onClick={()=>DeletePosts(id)}>
             
             <Avatar sx={{ bgcolor: "red" }}>
              <DeleteIcon   />
             </Avatar>
                  
              </IconButton>
            
             </div>
             }
        </div>
        <h2>{onePost?.title}</h2>
        <p className='desc'>{onePost?.description}</p>

        </>:deletePost!==null?
        <p>Post is deleted</p>:''
        }
       
       </div>
       <Menu  />
    </div>
  );
}
