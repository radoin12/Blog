

 import React from 'react';
 import{CardContent,CardMedia,Card,Typography} from "@mui/material"
import { PostType } from '../../../component/redux/post';
import "./list.scss"
type TypePost={
  post:PostType
}
 export default function ListPost({post}:TypePost) {
 
   return (
     <div>
      <Card className='Card'>
        
            <CardMedia
             component="img"
         
            
             image={`../uploads/${post.img}`}
             alt="text"
            />
    
           
              <CardContent className='content'>
             
               <Typography color="primary"variant='h4' component="h4">
                {post.title}
               </Typography>
                <Typography  color='GrayText' variant='body2' component="p">
                   {post.description}
                </Typography>
            
              </CardContent>
            
           </Card> 
     </div>
   );
 }
 