import React from 'react';
import { SelectorApp } from './redux/config/hooks';
import { postState } from './redux/post';
import{CardContent,CardMedia,CardActions,Card,Typography,Button} from "@mui/material"
import './menu.scss'
export default function Menu() {
  const info=SelectorApp(postState)

  return (
    <div className='Menu'>
      <div className='content'>
        <h2>other posts</h2>
         
       { 
       info.status?<p>... loading</p>:
       (
        <div className='posts'>
          {
            info?.post?.map((post,i)=>
            
            <Card className='Card' key={i}>
            <CardMedia
             component="img"
         
             className='imgMedia'
             image={`../uploads/${post.img}`}
             alt="text"
            />
    
           
              <CardContent>
               <div className='info'>
               <Typography color="primary"variant='h4' component="h4">
                {post?.title}
               </Typography>
                <Typography  color='GrayText' variant='body2'>
                   {post?.description}
                </Typography>
               </div>
              </CardContent>
              <CardActions>
               <Button variant='outlined' color='primary'>view</Button>
              </CardActions>
           </Card>
            
            )
          }
        </div>
       )
      }
      </div>
    </div>
  );
}
