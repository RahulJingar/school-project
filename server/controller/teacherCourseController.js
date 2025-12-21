// server/controller/teacherCourseController.js

const schoolCourse = require("../model/teacherCourse");

exports.createCourse = async (req, res) => {
  try {
    console.log(">>> RAW BODY >>>", req.body);

    const {
      title,
      description,
      grade,
      subject,
      price,
      thumbnail,
      language,
      totalLectures,
      totalDurationInMinutes,
      tags,
      teacher, 
    } = req.body;

    if (!(title && description && grade && subject && price && teacher)) {
      return res.status(400).json({
        message:
          "title, description, grade, subject, price, teacher sab required hain",
      });
    }

    const data = {
      title,
      description,
      grade,
      subject,
      price,
      teacher, 
      thumbnail,
      language,
      totalLectures,
      totalDurationInMinutes,
      tags,
    };

    const courseCreate = await schoolCourse.create(data);
    console.log(">>>>>>courseCreate>>>>>", courseCreate);

    return res.status(201).json({
      message: "Course created successfully",
      data: courseCreate,
    });
  } catch (err) {
    console.error(">>> createCourse error >>>", err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

exports.getMyCourses = async (req, res) => {
  try {
    const teacherId = req.query.teacherId;

    if (!teacherId) {
      return res
        .status(400)
        .json({ message: "teacherId query param required" });
    }

    const courses = await schoolCourse.find({ teacher: teacherId });

    return res.status(200).json({
      message: "Courses fetched successfully",
      data: courses,
    });
  } catch (err) {
    console.error(">>> getMyCourses error >>>", err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

exports.teacherCourseUpdate = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const teacherId = req.teacherId; 

    console.log("update id >>>", id);
    console.log("update teacherId >>>", teacherId);

    const updatedData = await schoolCourse.findOneAndUpdate(
      { _id: id, teacher: teacherId },
      data,
      { new: true, runValidators: true }
    );

    console.log("updatedData >>>", updatedData);

    if (!updatedData) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(202).json({
      message: "update successfully",
      updatedData,
    });
  } catch (err) {
    console.error(">>> teacherCourseUpdate error >>>", err.message, err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};


  // server/controller/teacherCourseController.js
exports.updateStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body; // "published" or "draft"
    const teacherId = req.teacherId; // middleware se

    if (!["draft", "published", "archived"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const course = await schoolCourse.findOneAndUpdate(
      { _id: id, teacher: teacherId },
      { status },
      { new: true }
    );

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(200).json({
      message: "Course status updated",
      data: course,
    });
  } catch (err) {
    console.error(">>> updateStatus error >>>", err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};
