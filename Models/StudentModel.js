const mongoose = require("mongoose");
const bcrypt =  require('bcrypt')  
const jwt  =  require("jsonwebtoken")

const studentModel = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: true,
      minlength: [
        6,
        "Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      ],
      maxlength: [
        10,
        "Password should not exceed 50 characters",
      ],
    //   match: [
    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/,
    //     "Password should contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    //   ],
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

studentModel.pre("save" , function() {

   if(!this.isModified("password")) return; 

   let salt =  bcrypt.genSaltSync(10);
   this.password =  bcrypt.hashSync(this.password, salt);
})

studentModel.methods.comparepassword =  function(password){
  return  bcrypt.compareSync(password , this.password)
}

studentModel.methods.generateAuthToken =  function(){
  return jwt.sign({id: this._id} , process.env.JWT_SECRET,{
    expiresIn: process.env.JWT_EXPIRE,
  })
}

const student = mongoose.model("student" , studentModel)

module.exports = student;
