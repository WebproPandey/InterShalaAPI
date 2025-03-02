const jwt  = require("jsonwebtoken")
const ErrorHandler =  require("../utils/ErrorHandler")
const { catchAsyncError } = require("./catchAsyncError")

exports.isAuthenticatetd =  catchAsyncError(async(req, res , next) =>{
    const  {token} =  req.cookies;
    if(!token) {
        throw new ErrorHandler("Not Authenticated", 401)
    }
    const {id} =  jwt.verify(token , process.env.JWT_SECRET)
    req.id =  id
    next()
})