const express = require("express");
const router = express.Router();
const teacherCourse = require("../controller/teacherCourseController");

// prefix: /teacherCourses
router.post("/create", teacherCourse.createCourse);
router.get("/my-courses", teacherCourse.getMyCourses);

module.exports = router;
