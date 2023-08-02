
import{styled } from "@mui/material"

export const Detailuser=styled("div")(({theme})=>({
    display:'flex',
    flexDirection:"column",
    gap:1,alignItems:"center",
    pt:1 ,
    [theme.breakpoints.down("sm")]:{
      fontSize:"12px"
    },

  }))
  export const  User=styled('div')(({theme})=>({
    alignItems:"center",pt:2,display:"flex",gap:1,
  
    [theme.breakpoints.down("sm")]:{
        display:"flex" ,
        flexDirection:"column",
        alignItems:"center",
        gap :0
      
      },
  }))

  export const ImgDateUser=styled('div')(({theme})=>({
      display:"flex",
      gap:1 ,
      pt:1 ,
      [theme.breakpoints.down("sm")]:{
         
      }

  }))
  export const ButtonStyled=styled("button")(({theme})=>({
    width: 150,
    padding: 5,
    color:"red",
 
    position:"absolute",
    right:10,
    bottom:10,
    [theme.breakpoints.down("md")]:{
         
         bottom:5
        
    }

}))
export const ModelUser=styled('div')(({theme})=>({
    position: 'relative',
    top:"50%",
    left:"50%",
    transform: 'translate(-50%, -50%)',
    height:700,
    bgcolor: 'background.paper',
    border: '2px solid #444040',
    boxShadow:"5px 3px 1px  #4a4a4a",
    padding:"10px",

}))
export const UserInfo=styled('div')(({theme})=>({
  display:"flex",
   
  gap:"10px",
  alignItems:"center"
 
}))
export const Container=styled('div')(({theme})=>({
  display:"flex",
  flexDirection:"column",

  alignItems:"center" ,
  gap:"5px"
 
}))
export const ImgUser=styled('img')(({theme})=>({
     height:"100px" ,
     width:"100px",
     border:"1px solid gray",
     borderRadius:"5px" ,
     padding:"5px ",
     WebkitBoxShadow: "2px 4px 10px 1px rgba(0, 0, 0, 0.47)",
     boxShadow: "2px 4px 10px 1px rgba(201, 201, 201, 0.47)",
     margin:"10px" ,

    
   
  }))
  export const Para=styled("span")({
    fontSize:"20px",
  
    width:"80px"

  })


