const express = require("express");
const router = express.Router();
const teacherCourse = require("../controller/teacherCourseController");
const auth = require("../middleware/auth");

// prefix: /teacherCourses
router.post("/create", teacherCourse.createCourse);
router.patch("/teacherCourseUpdate/:id",auth, teacherCourse.teacherCourseUpdate);
router.get("/myCourses",auth, teacherCourse.getMyCourses);

module.exports = router;
