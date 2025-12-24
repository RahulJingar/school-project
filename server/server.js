// server/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 2727;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoURL = "mongodb://127.0.0.1:27017/school";

mongoose
  .connect(mongoURL)
  .then(() => console.log("mongodb is connected"))
  .catch((err) => console.log(err));

// student auth routes
const schoolUserController = require("./routes/schoolUserController");
app.use("/schoolUser", schoolUserController);

// teacher auth routes
const schoolTeacherController = require("./routes/schoolTeacherController");
app.use("/schoolTeacher", schoolTeacherController);

// teacher course routes (protected)
const teacherCourse = require("./routes/teacherCourseRoute");
app.use("/teacherCourses", teacherCourse);

// admin routes
const admin = require("./routes/adminRoute");
app.use("/admin", admin);

// public courses (students) – IMPORTANT
const coursePublic = require("./routes/coursePublicRoute");
app.use("/", coursePublic); // so /courses and /courses/:id work directly


const courseController=require("./routes/course");
app.use("/",courseController);

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
