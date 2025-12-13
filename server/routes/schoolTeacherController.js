const express=require("express");
const route=express.Router();
const schoolTeacherController=require("../controller/schoolTeacherController");

route.post('/teacherSignup',schoolTeacherController.teacherSignup);
route.post('/teacherLogin',schoolTeacherController.teacherLogin);
route.patch('/teacherReset',schoolTeacherController.teacherReset);
route.patch('/teacherForget',schoolTeacherController.teacherForget);

module.exports=route;