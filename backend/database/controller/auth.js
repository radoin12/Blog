
const bcrypt=require('bcryptjs')
const db = require('../db.js');
const Users = require('../model/auth.js');
const { findByemail } = require('../model/user.js');
const jsonwebtoken=require('jsonwebtoken')
require('dotenv').config();
var cookieParser = require('cookie-parser')
const Register=async(req,res)=>{
  var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync(req.body.password , salt);
db.query("select * from users where email=?",req.body.email,(err,data)=>{
  if(err) return res.send(err) ;
   if(data.length>0){
     return res.send('email exist')
   }
    
     // Create a user
    const user = new Users({
        name: req.body.name,
        email: req.body.email,
        password: hash,
        image:req.body.image
       
      });
      
  // Save user in the database
  
  
    Users.create(user, (err, data) => {
     
    if (err)
      return res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    else res.send(data);
  });
   })

  
 

}






 const Login=(req,res)=>{
   const sql="SELECT * FROM users WHERE email=?"
   db.query(sql,req.body.email,(err,data)=>{
    if(err) {
      console.log(err)
      res.send(err)
    }
    if (data.length===0) {
    return  res.status(408).json('check your password or email') 
    }
   
   
   
    const isCorectPassword= bcrypt.compareSync(req.body.password,data[0].password)
     
    if (!isCorectPassword) {
    return   res.status(409).send("check your password or email")
    }
    const token=jsonwebtoken.sign({id:data[0].id,name:data[0].name,email:data[0].email,isAdmin:data[0].isAdmin},process.env.secriteJsonWebToken)

    // const {password,...others}=data[0]
    res.cookie("accessToken",token,{
      httpOnly:true
    }).send({"accessToken":token})
    
   })

}
 const Logout=(req,res)=>{
   
   res.clearCookie('accessToken').send('you are logout ')
}
module.exports={Login,Logout,Register}