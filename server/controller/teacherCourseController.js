const schoolCourse = require("../model/teacherCourse");

// exports.createCourse = async (req, res) => {
//   console.log(">>> RAW BODY >>>", req.body);

//   const {
//     title,
//     description,
//     grade,
//     subject,
//     price,
//     thumbnail,
//     language,
//     totalLectures,
//     totalDurationInMinutes,
//     tags,
//     teacherId,
//   } = req.body;

//   try {
//     if (!(title && description && grade && subject && price)) {
//       return res.status(400).json({
//         message:
//           "title, description, grade, subject, price, teacherId sab required hain",
//       });
//     }

//     const data = {
//       title,
//       description,
//       grade,
//       subject,
//       price,
//       teacher: teacherId, 
//       thumbnail,
//       language,
//       totalLectures,
//       totalDurationInMinutes,
//       tags,
//     };

//     const courseCreate = await schoolCourse.create(data);
//     console.log(">>>>>>courseCreate>>>>>", courseCreate);

//     return res.status(201).json({
//       message: "Course created successfully",
//       data: courseCreate,
//     });
//   } catch (err) {
//     console.error(">>> createCourse error >>>", err);
//     return res
//       .status(500)
//       .json({ message: "Server error", error: err.message });
//   }
// };


// controller
exports.createCourse = async (req, res) => {
  try {
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
    } = req.body;

    const teacherId = req.teacherId; 

    if (!(title && description && grade && subject && price)) {
      return res.status(400).json({
        message:
          "title, description, grade, subject, price sab required hain",
      });
    }

    const data = {
      title,
      description,
      grade,
      subject,
      price,
      teacher: teacherId, 
      thumbnail,
      language,
      totalLectures,
      totalDurationInMinutes,
      tags,
    };

    const courseCreate = await schoolCourse.create(data);
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

    console.log(`>>>>>req>>>>>`,req);
  console.log(`>>>>req.user>>>`,req.user);

  try {
    const teacherId = req.query.teacherId;

    if (!teacherId) {
      return res.status(400).json({ message: "teacherId query param required" });
    }

    const courses = await schoolCourse.find({ teacher: teacherId });

    return res.status(200).json({message: "Courses fetched successfully",data: courses});
  } catch (err) {
    console.error(">>> getMyCourses error >>>", err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};



// exports.teacherCourseUpdate=async(req,res)=>{
//   const id=req.params.id;
//   const data=req.body;
//   const updatedData=await schoolCourse.findByIdAndUpdate(id,data);
//   console.log(`>>>updatedData>>>>>`,updatedData);
//   if(updatedData){
//     return res.status(202).send({message: "update successfully",
//       updatedData
//     })
//   }
// }


// teacherCourseUpdate
// exports.teacherCourseUpdate = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const data = req.body;
//     const teacherId = req.teacherId;

//     const updatedData = await schoolCourse.findOneAndUpdate(
//       { _id: id, teacher: teacherId },
//       data,
//       { new: true, runValidators: true }
//     );

//     if (!updatedData) {
//       return res.status(404).json({ message: "Course not found" });
//     }

//     return res.status(202).json({
//       message: "update successfully",
//       updatedData,
//     });
//   } catch (err) {
//     console.error(">>> teacherCourseUpdate error >>>", err.message, err);
//     return res
//       .status(500)
//       .json({ message: "Server error", error: err.message });
//   }
// };


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



