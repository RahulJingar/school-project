const schoolCourse = require("../model/teacherCourse");

exports.enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const studentId = req.user._id;

    const course = await schoolCourse.findById(courseId);
    if (!course) return res.status(404).json({ msg: "Course not found" });

    if (course.studentsEnrolled?.includes(studentId)) {
      return res.status(400).json({ msg: "Already enrolled" });
    }

    course.studentsEnrolled = course.studentsEnrolled || [];
    course.purchases = course.purchases || [];

    course.studentsEnrolled.push(studentId);
    course.purchases.push({
      studentId,
      pricePaid: course.price,
    });
    course.enrolledStudentsCount =
      (course.enrolledStudentsCount || 0) + 1;

    await course.save();

    res.json({
      message: "Course enrolled successfully!",
      course,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.getStudentCourses = async (req, res) => {
  try {
    const studentId = req.user._id;
    const courses = await schoolCourse
      .find({ studentsEnrolled: studentId })
      .populate("teacher", "name email");
    res.json({ data: courses });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
