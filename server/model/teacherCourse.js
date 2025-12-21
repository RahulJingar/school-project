
const mongoose = require("mongoose");

const newSchoolCourse = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    grade: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "schoolTeacher",
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    thumbnail: {
      type: String,
      default:
        "https://images.pexels.com/photos/4144222/pexels-photo-4144222.jpeg",
    },
    language: {
      type: String,
      default: "Hindi + English",
    },
    totalLectures: {
      type: Number,
      default: 0,
    },
    totalDurationInMinutes: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
    enrolledStudentsCount: {
      type: Number,
      default: 0,
    },
    tags: [{ 
      type: String, 
    }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("schoolCourse", newSchoolCourse);
