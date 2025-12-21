const admin=require("../model/adminModel");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const sk="ashishrahulmanish"
const Admin = require("../model/adminModel");
const schoolUser = require("../model/schoolUserController");   // student model
const schoolTeacher = require("../model/schoolTeacherController"); // teacher model
const schoolCourse = require("../model/teacherCourse");        // course model



exports.adminSignup=async(req,res)=>{
  const {name,email,password}=req.body;
  console.log(`>>>name>>>`,name);
  console.log(`>>>name>>>`,email);
  console.log(`>>>name>>>`,password);

  const data={
    name,
    email,
    password
  }

  const salt=bcrypt.genSaltSync(10);
  const hash=bcrypt.hashSync(password,salt);

  console.log(`>>>>hash>>>`,hash);

  const signupUser=await admin.create({
    name,
    email,
    password:hash
  })

  const token=await jwt.sign({email},sk);
  console.log(`>>>token>>>`,token);

  if(signupUser){
    return res.status(202).send({signupUser,token});
  }

}


exports.adminLogin = async (req, res) => {
    const { email, password } = req.body;

    const adminUser = await admin.findOne({ email });
    console.log(">>> db admin >>>", adminUser);

    if (!adminUser) {
      return res.status(400).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, adminUser.password);
    console.log(">>> password match >>>", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    return res.status(200).json({
      message: "Admin login success",
      adminUser,
    });
  } 



// 1) sab students list
exports.getAllStudents = async (req, res) => {
    const students = await schoolUser.find().select("-password");
    return res.status(200).json({
      message: "All students fetched",
      data: students,
    });
  } 

exports.getAllTeachers = async (req, res) => {
    const teachers = await schoolTeacher.find().select("-password");
    return res.status(200).json({
      message: "All teachers fetched",
      data: teachers,
    });
  } 

exports.getAllCourses = async (req, res) => {
    const courses = await schoolCourse
      .find()
      .populate("teacher", "name email"); 

    return res.status(200).json({
      message: "All courses fetched",
      data: courses,
    });
  }

