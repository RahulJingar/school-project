// server/controller/coursePublicController.js
const schoolCourse = require("../model/teacherCourse");

// GET /getAllPublishedCourses -> saare courses (simple)
exports.getAllPublishedCourses = async (req, res) => {
  try {
    const courses = await schoolCourse.find().sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Courses fetched",
      data: courses,
    });
  } catch (err) {
    console.error(">>> getAllPublishedCourses error >>>", err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

// GET /getCourseByIdPublic/:id -> single course detail (NO status check)
exports.getCourseByIdPublic = async (req, res) => {
  try {
    const id = req.params.id;

    const course = await schoolCourse.findById(id);

    if (!course) {
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
