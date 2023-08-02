import React from 'react';
import './home.scss'

import Sidebar from '../../../component/sidebar';
import Widget from '../Widget/Widget';

import {  UserState } from '../../../component/redux/user';
import {  PostType, postState} from '../../../component/redux/post';
import {  SelectorApp } from '../../../component/redux/config/hooks';
import CountBlog from '../component/count';
import ListPost from '../component/List';
import {useState} from 'react'
export default function HomeAdmin() {

  const PostCat=SelectorApp(postState)

  const[page,setPage]=useState<number>(0)
  
   


       const allPosts:PostType[]=PostCat?.post||[]
       const pageSize=12
       const TotalCountPage=Math.ceil(allPosts.length/pageSize)
       const rowsPost:PostType[]=allPosts.slice(page*pageSize,(page+1)*pageSize)
      
        const handlePageChange=(page:number)=>{
           setPage(page)
        }
  

  const users=SelectorApp(UserState)
   const countCat= PostCat.countCat&&PostCat?.countCat
    
  return (
<div>
  {
    users.status&&PostCat.status?<p>... loading</p>:
    users.errorMsg||PostCat.errorMsg?<p>oops probleme of system or connection</p>:
  <div className='homeContainer'>
      
    <Sidebar />
    <div className='styledBody'>
   <div className='widget'>
     <Widget type="Users" />
     <Widget type="Posts" />
    </div>
    <div className='categories'>
      {
      (
         countCat?.map((count,i)=><CountBlog count={count} key={i} />
         )
       )
      } 
    </div>
    <div className='List'>
      <h2 className='title'>List of Posts</h2>
     <div className='PostStyled'>
      
      {
        PostCat.post&&rowsPost?.filter((item)=>item?.cat.includes(PostCat.searchVal)).map((post,i)=>(
          <ListPost post={post} key={i} />
        ))
      }
    </div>
    </div>
    <div className="pagination">
          <button  className="previous"onClick={() => handlePageChange(page - 1)} disabled={page === 0}>
            Previous
          </button>
          <span className='pageCount'>{page + 1} of {TotalCountPage}</span>
          <button className="next"onClick={() => handlePageChange(page + 1)} disabled={page+1 === TotalCountPage}>
            Next
          </button>
        </div>

    </div>
   </div>
  }
</div>
  );
}
