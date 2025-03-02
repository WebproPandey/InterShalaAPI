const { catchAsyncError } = require("../Middlewares/catchAsyncError");
const Student = require('../Models/StudentModel');
const ErorrHandelr = require("../utils/ErrorHandler");
const { sendToken } = require("../utils/SendToken");

exports.homepage = catchAsyncError(async (req, res, next) => {
    res.send({ message: " Secure homepage" });
});

exports.correctUser = catchAsyncError(async (req, res, next) => {
        const student = await  Student.findById(req.id).exec();
        res.json({student});
    });
    

exports.studentsignup = catchAsyncError(async (req, res, next) => {
    const student = await new Student(req.body).save();
    sendToken(student ,201, res)
});

exports.studentsignin = catchAsyncError(async (req, res, next) => {
        const student  = await Student.findOne({email:req.body.email}).select("+password").exec();

        if(!student) return next(new ErorrHandelr("User Not Found with this email address",404))
                
        const isMatch =  student.comparepassword(req.body.password);
        
        if(!isMatch) return next(new ErorrHandelr("Wrong Credientials",500))

                sendToken(student ,201, res)
        });

exports.studentsignOut = catchAsyncError(async (req, res, next) => {
        res.clearCookie("token");
        res.status(200).json({ message: "Logged out successfully" });
});
