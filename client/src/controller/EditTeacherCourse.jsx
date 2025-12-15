import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditTeacherCourse = () => {
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    grade: "",
    subject: "",
    price: "",
    thumbnail: "",
    language: "",
    totalLectures: "",
    totalDurationInMinutes: "",
    status: "",
    enrolledStudentsCount: "",
    tags: ""
  });

  const { id } = useParams();
  console.log(`>>id>>`,id)
  const navigate = useNavigate();

  const token = localStorage.getItem("teacherToken");

  useEffect(() => {
    if (!token) {
      navigate("/teacher/login");
    }
  }, [token, navigate]);

  // existing course fetch
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:2727/teacherCourses/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const c = res.data.data; // API response ke hisaab se
        setEditData({
          title: c.title || "",
          description: c.description || "",
          grade: c.grade || "",
          subject: c.subject || "",
          price: c.price || "",
          thumbnail: c.thumbnail || "",
          language: c.language || "",
          totalLectures: c.totalLectures || "",
          totalDurationInMinutes: c.totalDurationInMinutes || "",
          status: c.status || "",
          enrolledStudentsCount: c.enrolledStudentsCount || "",
          tags: Array.isArray(c.tags) ? c.tags.join(",") : c.tags || "",
        });
      } catch (err) {
        console.log("fetch course error", err);
      }
    };
    if (token) fetchCourse();
  }, [id, token]);

  const editHandler = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const editHandle = async (e) => {
    e.preventDefault();

    const payload = {
      ...editData,
      tags: editData.tags
        ? editData.tags.split(",").map((t) => t.trim())
        : [],
    };

    try {
      const res = await axios.patch(
        `http://127.0.0.1:2727/teacherCourses/teacherCourseUpdate/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(">>>res>>", res.data);
      // navigate("/teacher/dashboard");
    } catch (error) {
      console.log("update error", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6 md:p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Edit Course
        </h1>

        <form onSubmit={editHandle} className="space-y-5">
          {/* Title + Grade */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="Enter title"
                value={editData.title}
                onChange={editHandler}
                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Grade
              </label>
              <input
                type="text"
                name="grade"
                placeholder="Enter grade"
                value={editData.grade}
                onChange={editHandler}
                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              rows="3"
              placeholder="Enter description"
              value={editData.description}
              onChange={editHandler}
              className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Subject + Price */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                placeholder="Enter subject"
                value={editData.subject}
                onChange={editHandler}
                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <input
                type="number"
                name="price"
                placeholder="Enter price"
                value={editData.price}
                onChange={editHandler}
                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Thumbnail + Language */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Thumbnail URL
              </label>
              <input
                type="text"
                name="thumbnail"
                placeholder="Enter thumbnail URL"
                value={editData.thumbnail}
                onChange={editHandler}
                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Language
              </label>
              <input
                type="text"
                name="language"
                placeholder="Enter language"
                value={editData.language}
                onChange={editHandler}
                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Lectures, Duration, Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total Lectures
              </label>
              <input
                type="number"
                name="totalLectures"
                placeholder="Total lectures"
                value={editData.totalLectures}
                onChange={editHandler}
                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total Duration (minutes)
              </label>
              <input
                type="number"
                name="totalDurationInMinutes"
                placeholder="Total duration in minutes"
                value={editData.totalDurationInMinutes}
                onChange={editHandler}
                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={editData.status}
                onChange={editHandler}
                className="w-full px-3 py-2 border rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select status</option>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>

          {/* Enrolled + Tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enrolled Students Count
              </label>
              <input
                type="number"
                name="enrolledStudentsCount"
                placeholder="Enrolled students count"
                value={editData.enrolledStudentsCount}
                onChange={editHandler}
                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tags
              </label>
              <input
                type="text"
                name="tags"
                placeholder="Tags (comma separated)"
                value={editData.tags}
                onChange={editHandler}
                className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTeacherCourse;
