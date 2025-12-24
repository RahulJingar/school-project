const express=require("express");
const router=express.Router();
const admin=require("../controller/adminController");
const adminAuth = require("../middleware/adminAuth");


router.post("/adminSignup",admin.adminSignup);
router.post("/adminLogin",admin.adminLogin);


router.get("/students",adminAuth, admin.getAllStudents);
router.get("/teachers",adminAuth, admin.getAllTeachers);
router.get("/courses",adminAuth, admin.getAllCourses);
router.get("/adminExists", admin.adminExists);



module.exports = router;




