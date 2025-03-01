const express = require("express");
const { homepage, studentsignup, studentsignin, studentsignOut } = require("../Controllers/indexController"); // Fix variable names

const router = express.Router();

router.get("/", homepage);
router.post("/student/signup", studentsignup);
router.post("/student/signin", studentsignin); 
router.get("/student/signOut", studentsignOut); 

module.exports = router;
