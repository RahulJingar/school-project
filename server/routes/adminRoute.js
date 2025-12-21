const express=require("express");
const router=express.Router();
const admin=require("../controller/adminController");


router.post("/adminSignup",admin.adminSignup);
router.post("/adminLogin",admin.adminLogin);
// router.get("/getAllStudents",admin.getAllStudents);
// router.get("/getAllTeachers",admin.getAllTeachers);
// router.get("/getAllCourses",admin.getAllCourses);

router.get("/students", admin.getAllStudents);
router.get("/teachers", admin.getAllTeachers);
router.get("/courses", admin.getAllCourses);


module.exports = router;
