import{styled} from '@mui/material'
import { hover } from '@testing-library/user-event/dist/hover'

  export const StyledPostList=styled('div')(({theme})=>({
   
   display :"flex" ,
   alignItems:"center" ,
   flexDirection:"column",
   
   gap:"10px",
   position:"absolute",
   top:"10px",
   left:"45%",
   
   [theme.breakpoints.down("sm")]:{
  
     display:"none"
   },
   [theme.breakpoints.down("md")]:{
    left:"15%",

   },

  }))


  export const StyledOnePost=styled('div')(({theme})=>({
   
    display :"flex" ,
    alignItems:"center" ,
    flexDirection:"column",
    position:"relative",
    gap:"5px",
    width:"450px" ,
    height:"500px",
 
   

    
   }))
   export const ButtonStyledOnePost=styled('button')(({theme,disabled})=>({
   
    backgroundColor:"rgb(238, 227, 238)",
    color:disabled===false?"blue":"black",
    padding:'10px',
    border:"none",
    borderRadius:'5px',
    width:"150px",
    margin:"10px 150px" ,
    cursor:"pointer",
     '&:hover':{
      backgroundColor:disabled===false?"blue":"",
      color:disabled===false?"white":""
     }
   
    
    
   

    
   }))
   export const EroorPara=styled('p')(({theme})=>({
   
 
    color:"red"
 
   

    
   }))