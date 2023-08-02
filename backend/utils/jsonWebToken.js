const Json=require('jsonwebtoken');
const { findByIdPost } = require('../database/model/post');
require('dotenv').config();

const verifyAuth=(req,res,next)=>{
 const token=req.cookies.accessToken  


 if (!token) {
   return res.status(401).json('you are authorised for this operation') 
 }
Json.verify(token,process.env.secriteJsonWebToken,(err,userInfo)=>{
    if (err) {
      return res.status(401).json('you are authorised for this operation')  
    }
  
    req.user=userInfo
    next()
 })
 
}
const AdminOrUser=(req,res,next)=>{
    verifyAuth(req,res,()=>{
        findByIdPost(req.params.idPost, (err,data)=>{
            console.log(req.params.idPost)
            if (err) {
            return  res.send(err)  
            }
          
         
            if (req.user.isAdmin||req.user?.id===data?.userId) {
        
                next()
               }
               else{
                return res.status(401).send('you are not allow to up date the post')
               }
            
               
            
            
            
           } ); 
       
        })
}
const UserOrAdmin=(req,res,next)=>{
    verifyAuth(req,res,()=>{
   
       
        if (parseInt(req.params.idPost)===req.user.id||req.user.isAdmin) {
            next()
        }
        else{
            return res.status(401).send('you are not allow to up date the post')
           }
        
    })
}

 const IsAdmin=(req,res,next)=>{
    verifyAuth(req,res,()=>{
        if (req.user.isAdmin) {
            next()
        }
        return res.status(401).send('you are not authorised')
    })
 }




module.exports={verifyAuth,AdminOrUser,UserOrAdmin}