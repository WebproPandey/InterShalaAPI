const express = require('express')
const app  = express()
require('dotenv').config({path:"./.env"})
const logger =  require("morgan")
const  {connectDatabase}  = require("./Models/DataBase");
connectDatabase()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

const ErorrHandelr = require('./utils/ErrorHandler')
const { genetatedErrors } = require('./Middlewares/error')
app.use(logger("tiny"))



app.use('/' , require("./Routes/indexRoute"))


app.all("*" , (req,res , next) =>{
 next(new ErorrHandelr(`Page not found ${req.url}`, 404))
})
app.use(genetatedErrors)
app.listen(process.env.PORT ,
     console.log(`server runing on port ${process.env.PORT}`))