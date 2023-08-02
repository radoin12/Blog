const db = require("../db.js");
const Users = require("../model/auth.js");
const { findAll, findById, update, deleteUser } = require("../model/user.js");

const bcrypt=require('bcryptjs')

// find all users
const t=[]
const getAllUsers = function(req, res) {
    findAll(function(err, employee) {
     
      if (err)res.send(err);
    const emp=employee.map((item)=>{
      item.password=undefined
      return item
    })
    
  
      res.send(emp);
    });
    };

    // find by id user
    const finduserById = function(req, res) {
    
        const id=req.params.id
        findById(id, (err,data)=>{
           
         if (err) {
          res.send(err)  
         }
          res.json(data[0])
        } ); 
    
        };
        // up date user
        const updateuser = function(req, res) {
         
          const errorResult = (err) => {
            console.log(err);
            return res.status(500).json(err);
          };
          const result = (data) => {
            return res.status(200).json(data);
          };
   
          update(req.params.idPost, new Users(req.body),result,errorResult)
         
      
            
             
       
          
          };
        //   delete user
        const DELETEOneUser = function(req, res) {
          deleteUser( req.params.id, (err, employee) =>{
              if (err)
              res.send(err);
              res.json({ error:false, message: 'Employee successfully deleted' });
            });
            };

    


const Getusers=(req,res)=>{
    
    const sql="SELECT * from users";
    db.query(sql,(err,result)=>{
     if (err) throw err
     console.log(result)
      res.send(result)
    
    })
 }

const DeleteAll=(req,res)=>{
  const sql="DELETE FROM users"
  db.query(sql,(err,result)=>{
    if(err)return res.send(err)
    res.send('users are deleted')
  })
}


module.exports={Getusers, getAllUsers,finduserById,updateuser,DELETEOneUser,DeleteAll }