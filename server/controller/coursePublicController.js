// server/controller/coursePublicController.js
const schoolCourse = require("../model/teacherCourse");

// GET /courses  -> all published courses for students
exports.getAllPublishedCourses = async (req, res) => {
  try {
    const courses = await schoolCourse
      .find({ status: "published" }) // sirf published
      .sort({ createdAt: -1 });      // latest pehle

    return res.status(200).json({
      message: "Published courses fetched",
      data: courses,
    });
  } catch (err) {
    console.error(">>> getAllPublishedCourses error >>>", err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

// GET /courses/:id  -> single course public detail
exports.getCourseByIdPublic = async (req, res) => {
  try {
    const id = req.params.id;

    const course = await schoolCourse.findById(id);

    if (!course || course.status !== "published") {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(200).json({
      message: "Course detail fetched",
      data: course,
    });
  } catch (err) {
    console.error(">>> getCourseByIdPublic error >>>", err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};
