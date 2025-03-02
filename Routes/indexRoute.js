const express = require("express");
const {  correctUser,homepage, studentsignup, studentsignin, studentsignOut } = require("../Controllers/indexController"); // Fix variable names
const { isAuthenticatetd } = require("../Middlewares/auth");

const router = express.Router();

router.get("/", isAuthenticatetd, homepage);
router.post("/student", isAuthenticatetd ,correctUser);
router.post("/student/signup", studentsignup);
router.post("/student/signin", studentsignin); 
router.get("/student/signOut",isAuthenticatetd , studentsignOut); 

module.exports = router;
