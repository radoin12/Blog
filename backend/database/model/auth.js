const db = require("../db.js");

const Users = function(User) {
    this.name = User.name;
    this.email = User.email
    this.password=User.password
    this.isAdmin=false
    this.image=User.image
     this.DateUser=new Date()
 
   
  };

  Users.create = ( newUser, result) => {
    
   
    db.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
    
        console.log("created tutorial: ", { id: res.insertId,date:res.date, ...newUser });
        const {password,...others}=newUser
        result(null, { id: res.insertId,DateUser:new Date(), ...others });
      });
  };
  module.exports=Users