const admin = require("../model/adminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendWelcomeEmail, sendLoginNotification } = require("./emailService"); 
const schoolUser = require("../model/schoolUserController");
const schoolTeacher = require("../model/schoolTeacherController");
const schoolCourse = require("../model/teacherCourse");

const sk = "ashishrahulmanish";

exports.adminSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
console.log(`>>>>name>>>>`,name);
console.log(`>>>>email>>>>`,email);
console.log(`>>>>password>>>>`,password);
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    console.log(`>>>> Hash generated >>>`);

    const existingAdmin = await admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const signupUser = await admin.create({
      name,
      email,
      password: hash
    });
    console.log(`>>>>>signupUser>>>>>`,signupUser);
    const token = jwt.sign({ email, id: signupUser._id }, sk);
    console.log(`>>> token >>>`);

    sendWelcomeEmail(email, name);

    return res.status(201).json({
      message: "Admin created successfully",
      signupUser,
      token
    });

  } catch (error) {
    console.error(">>>>error>>>", error);
  }
};

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(">>> Login attempt >>>", email);

    // 1. Find admin
    const adminUser = await admin.findOne({ email });
    console.log(">>> DB admin >>>", adminUser ? adminUser.email : "not found");

    if (!adminUser) {
      return res.status(400).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, adminUser.password);
    console.log(">>> Password match >>>", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ email, id: adminUser._id }, sk);

    sendLoginNotification(email, adminUser.name);

    return res.status(200).json({
      message: "Admin login success",
      adminUser,
      token
    });

  } catch (error) {
    console.error(">>>>>error>>>", error);
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    const students = await schoolUser.find();
    return res.status(200).json({
      message: "All students fetched successfully",
      count: students.length,
      data: students,
    });
  } catch (error) {
    console.error(">>>>>error >>>", error);
  }
};

exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await schoolTeacher.find().select("-password -__v");
    return res.status(200).json({
      message: "All teachers fetched successfully",
      count: teachers.length,
      data: teachers,
    });
  } catch (error) {
    console.error(">>>?>>>>>>>erro>>>", error);
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await schoolCourse
      .find()
      .populate("teacher", "name email")

    return res.status(200).json({
      message: "All courses fetched successfully",
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    console.error(">>>>>error>>>>", error);
  }
};


exports.adminExists = async (req, res) => {
  try {
    const count = await admin.countDocuments();
    return res.status(200).json({ exists: count > 0 });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};
