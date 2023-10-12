import React from 'react';
import { Link,NavLink,useLocation} from 'react-router-dom';
import { DispatchApp, SelectorApp } from '../../../component/redux/config/hooks';
import { authState } from '../../../component/redux/auth';
import { DisplayPost, postState } from '../../../component/redux/post';
import{useEffect} from 'react'
import { ToastContainer } from 'react-toastify';



export default function Home() {
  const CheckAuth=SelectorApp(authState)

  const cat=useLocation().search

  const dispatch=DispatchApp()
  const infoPost=SelectorApp(postState)
  console.log(infoPost.post,'infopost')
  useEffect(() => {
    dispatch(DisplayPost(cat))
  }, [cat]);

  return (
    <div className='home'>
       <ToastContainer />
       <div className='posts'>
         {
          infoPost?.post?.map((item,i)=>
          <div className='post' key={item.id}>
             <div className='img'>
               <img alt={item?.title} src={ `./uploads/${item?.img}`} />
             </div>
             <div className='content'>
             <h2>{item.title}</h2>
              
              {item.description}
              <NavLink className="link" to={`/post/${item.id}` }state={{cat:item.cat,id:item.userId}}><button>view article</button></NavLink>
             
           
             </div>
          </div>
          
          )
         }
       </div>
    </div>
  );
}
