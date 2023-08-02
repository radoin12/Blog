const db = require("../db.js");
const Users = require("./auth.js");



// find by id user

const findById =  (id, result)=> {
    
        db.query(`Select * from users where id = ?`,id,(err,data)=>{
        if (err) {
          result(err,null)  
        }
        result(null,data)
        console.log(data)
       } )
    
    
    };
   

// find all
const findAll =  (result) =>{
    db.query("Select * from users", function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
      console.log(result,"false")
    }
    else{
      const others=res
      others.password=undefined
     
   
      result(null, others);
     
    }
    });
    };
  

// up date users
const update = function(id, user, result, errorResult){
  const checkEmailQuery = 'SELECT id FROM users WHERE email = ? AND id != ?';

  db.query(checkEmailQuery, [user.email, id],
    
   (err, res)=> {
    if(err) {
  
       return errorResult( err);
    }
    // If the email exists for any other user, return an error
    if (res.length > 0) {
  
     return   errorResult("email is already exist")
    }
    const updateUserQuery = 'UPDATE users SET name = ?, email = ?,image = ? WHERE id = ?';
    db.query(updateUserQuery,[user.name,user.email,user.image,id],(err,data)=>{
       if (err) {
        console.log(err)
        return errorResult(err);
       }
       const getUserQuery = 'SELECT * FROM users WHERE id = ?'; // Add a query to fetch the updated user data
      db.query(getUserQuery, [id], (err, user) => {
        if (err) {
          console.log(err);
          return errorResult(err);
        }
        const updatedUser = user[0]; // Get the updated user data from the query result
       
        return result(updatedUser); // Send both the message and the updated user data
      });
     
    })
    });
    };




const deleteUser = function(id, result){
    db.query("DELETE FROM users WHERE id = ?", [id], function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    }
    else{
      result(null, res);
    }
    });
    };
    
   
   module.exports={findAll,findById,update,deleteUser}