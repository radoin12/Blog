const express=require('express')
const app=express()
const cors=require('cors')

const bodyParser = require('body-parser');
const routePost = require('./database/routes/post.js')
const routeUser = require('./database/routes/user.js')
const routeAuth = require('./database/routes/auth.js')
var cookieParser = require('cookie-parser')
app.use(cors({
    origin:"*"
}))
app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
require('dotenv').config();
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../blogmysql/public/uploads')
    },
    filename: function (req, file, cb) {
     
      cb(null,Date.now() + file.originalname);
    }
  })
  
  const upload = multer({ storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  })
  app.post('/api/upload',upload.single('file'),function(req,res){
    const file=req.file

    return res.status(200).send(file?.filename)
  })

app.use(routePost)
app.use(routeAuth)
app.use(routeUser)
app.listen(process.env.port,()=>{
    console.log(process.env.port)
})