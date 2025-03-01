const mongoose = require("mongoose");
const bcrypt =  require('bcrypt')  

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
   let salt =  bcrypt.genSaltSync(10);
   this.password =  bcrypt.hashSync(this.password, salt);
})
const student = mongoose.model("student" , studentModel)

module.exports = student;
