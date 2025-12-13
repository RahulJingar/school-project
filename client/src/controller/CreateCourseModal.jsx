import React, { useState } from "react";
import axios from "axios";

const CreateCourseModal = ({ onClose, onCreated }) => {
  const teacher = JSON.parse(localStorage.getItem("currentTeacher"));
  const teacherId = teacher?._id;
  const token = localStorage.getItem("teacherToken");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    grade: "",
    subject: "",
    price: "",
    thumbnail: "",
    language: "Hindi + English",
    totalLectures: 0,
    totalDurationInMinutes: 0,
    tags: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!teacherId) {
      alert("Teacher not found, please login again");
      return;
    }

    if (
      !(
        formData.title &&
        formData.description &&
        formData.grade &&
        formData.subject &&
        formData.price
      )
    ) {
      alert("title, description, grade, subject, price sab required hain");
      return;
    }

    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        grade: formData.grade,
        subject: formData.subject,
        price: Number(formData.price),
        thumbnail: formData.thumbnail,
        language: formData.language,
        totalLectures: Number(formData.totalLectures) || 0,
        totalDurationInMinutes:
          Number(formData.totalDurationInMinutes) || 0,
        tags: formData.tags
          ? formData.tags.split(",").map((t) => t.trim())
          : [],
        teacherId, // backend me teacher: teacherId
      };

      const res = await axios.post(
        "http://127.0.0.1:2727/teacherCourses/create",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ); // [web:111][web:7]

      console.log("create course res >>>", res.data);
      alert("Course created successfully");
      onClose();
      if (onCreated) onCreated(); // dashboard list refresh
    } catch (err) {
      console.error(err);
      alert(
        err?.response?.data?.message || "Failed to create course"
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="w-full max-w-3xl bg-slate-900 rounded-3xl border border-white/10 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">
            Create New Course
          </h2>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white text-lg"
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={submitHandler}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="md:col-span-2">
            <label className="block text-sm text-slate-200 mb-1">
              Title
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={changeHandler}
              className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/25 text-white"
              placeholder="Class 10 Maths Full Course"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm text-slate-200 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={changeHandler}
              rows={3}
              className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/25 text-white"
              placeholder="Complete NCERT + PYQs..."
            />
          </div>

          <div>
            <label className="block text-sm text-slate-200 mb-1">
              Grade
            </label>
            <input
              name="grade"
              value={formData.grade}
              onChange={changeHandler}
              className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/25 text-white"
              placeholder="10"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-200 mb-1">
              Subject
            </label>
            <input
              name="subject"
              value={formData.subject}
              onChange={changeHandler}
              className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/25 text-white"
              placeholder="Maths"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-200 mb-1">
              Price (₹)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={changeHandler}
              className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/25 text-white"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-200 mb-1">
              Language
            </label>
            <input
              name="language"
              value={formData.language}
              onChange={changeHandler}
              className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/25 text-white"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-200 mb-1">
              Total Lectures
            </label>
            <input
              type="number"
              name="totalLectures"
              value={formData.totalLectures}
              onChange={changeHandler}
              className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/25 text-white"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-200 mb-1">
              Total Duration (minutes)
            </label>
            <input
              type="number"
              name="totalDurationInMinutes"
              value={formData.totalDurationInMinutes}
              onChange={changeHandler}
              className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/25 text-white"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm text-slate-200 mb-1">
              Thumbnail URL
            </label>
            <input
              name="thumbnail"
              value={formData.thumbnail}
              onChange={changeHandler}
              className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/25 text-white"
              placeholder="Optional, leave blank for default image"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm text-slate-200 mb-1">
              Tags (comma separated)
            </label>
            <input
              name="tags"
              value={formData.tags}
              onChange={changeHandler}
              className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/25 text-white"
              placeholder="Algebra, CBSE, Boards"
            />
          </div>

          <div className="md:col-span-2 flex justify-end gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-700 text-slate-200 text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold text-sm"
            >
              Create Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourseModal;
