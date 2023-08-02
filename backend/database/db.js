const mySql=require('mysql2')
const express=require('express')
const app=express()
 const  db=mySql.createConnection({
    host:"localhost",
    user:"root",
    password:"radoin",
    database:"blog"
   
})

db.connect((err)=>{
    try {
        if (err) {
            console.log(err)
             }
         console.log("mysql is connected")   
    } catch (error) {
        console.log(error)
    }
 
})








module.exports=db