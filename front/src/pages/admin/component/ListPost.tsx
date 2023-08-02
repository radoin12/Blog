

import React from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import{CardContent,CardMedia,Card,Typography} from "@mui/material"
import { StyledOnePost } from './StyledPost';
export type TypePropsPost={
    userPost:{
        id:number ,
        img?:string|undefined,
        description:string ,
        title:string,
        date:string ,
        cat:string,
      },
      toggle:boolean, 
      setToggle:React.Dispatch<React.SetStateAction<any>>
     
}


export default function ListPostUser({userPost,toggle,setToggle}:TypePropsPost) {
 
  return (
    <StyledOnePost>
       { toggle&&<div onClick={()=>setToggle(false)}><HighlightOffIcon  color='error'style={{position:"absolute",right:"50px",top:"0px"}} /></div>}
      <Card className='Card' >
            <CardMedia
             component="img"
         
           
             image={`../uploads/${userPost.img}`}
             alt="text"
            />
    
           
              <CardContent className='content'>
             
               <Typography color="primary"variant='h4' component="h4">
                {userPost.title}
               </Typography>
                <Typography  color='GrayText' variant='body2' component="p">
                {userPost.description}
                </Typography>
            
              </CardContent>
             
           </Card> 
    </StyledOnePost>
  );
}
