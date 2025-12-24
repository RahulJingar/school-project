


// // server/routes/coursePublicRoute.js
// const express = require("express");
// const route = express.Router();
// const courseController = require("../controller/courseController");
// const auth=require("../middleware/auth");

// route.post('/enroll/:courseId', auth, courseController.enrollCourse);
// route.get('/student-courses', auth, courseController.getStudentCourses);

// module.exports = route;


const express = require("express");
const route = express.Router();
const courseController = require("../controller/courseController");
const studentAuth = require("../middleware/studentAuth");

route.post("/enroll/:courseId", studentAuth, courseController.enrollCourse);
route.get("/student-courses", studentAuth, courseController.getStudentCourses);

module.exports = route;
