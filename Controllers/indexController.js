const {catchAsyncError } = require("../Middlewares/catchAsyncError")
const Student = require('../Models/StudentModel')

exports.homepage = catchAsyncError (async (req , res , next) =>{
        res.send({message : "homepage"})
})



exports.studentsignup = catchAsyncError (async (req , res , next) =>{
        const student =  await new Student(req.body).save();
        res.status(201).json(student)
})
exports.studentsignin = catchAsyncError (async (req , res , next) =>{
        res.json(req.body)
})

