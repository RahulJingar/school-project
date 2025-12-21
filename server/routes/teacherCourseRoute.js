
// const express = require("express");
// const router = express.Router();
// const teacherCourse = require("../controller/teacherCourseController");
// const auth = require("../middleware/auth");

// // prefix: /teacherCourses
// router.post("/create", teacherCourse.createCourse);
// router.patch("/teacherCourseUpdate/:id",auth, teacherCourse.teacherCourseUpdate);
// router.get("/myCourses",auth, teacherCourse.getMyCourses);

// module.exports = router;


// server/routes/teacherCourseRoute.js
const express = require("express");
const router = express.Router();
const teacherCourse = require("../controller/teacherCourseController");
const auth = require("../middleware/auth");

// existing
router.post("/create", teacherCourse.createCourse);
router.patch("/teacherCourseUpdate/:id", auth, teacherCourse.teacherCourseUpdate);
router.get("/myCourses", auth, teacherCourse.getMyCourses);

// NEW: publish / unpublish
router.patch("/status/:id", auth, teacherCourse.updateStatus);

module.exports = router;
