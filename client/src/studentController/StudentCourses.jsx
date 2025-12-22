// src/controller/StudentCourses.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const StudentCourses = () => {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:2727/getAllPublishedCourses");
      setCourses(res.data.data || []);
    } catch (err) {
      console.error(">>> public courses list error >>>", err);
      setCourses([]);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold">
              All School Courses
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Published courses jo abhi students ke liye available hain.
            </p>
          </div>
          <Link
            to="/login"
            className="px-4 py-2 rounded-2xl text-xs font-semibold bg-emerald-500 hover:bg-emerald-600 text-white"
          >
            Student Login
          </Link>
        </header>

        {courses.length === 0 && (
          <div className="text-center py-16 text-slate-400 text-sm">
            Abhi koi course publish nahi hua. Thodi der baad check karein.
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="group bg-slate-900/80 border border-slate-700 rounded-2xl p-4 hover:-translate-y-1 hover:border-emerald-400/60 hover:shadow-xl transition-all"
            >
              <div className="relative mb-3">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-36 object-cover rounded-xl"
                />
                <span className="absolute top-3 right-3 text-[11px] px-2 py-1 rounded-full bg-emerald-500/80 text-white">
                  {course.grade} • {course.subject}
                </span>
              </div>

              <h2 className="text-sm font-semibold line-clamp-2 mb-1 group-hover:text-emerald-300">
                {course.title}
              </h2>
              <p className="text-[11px] text-slate-300 line-clamp-2 mb-2">
                {course.description}
              </p>

              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-lg font-bold text-emerald-300">
                  ₹{course.price}
                </span>
                <span className="text-slate-400">
                  {course.totalLectures} lectures •{" "}
                  {course.totalDurationInMinutes} min
                </span>
              </div>

              <Link
                to={`/courses/${course._id}`}
                className="block mt-2 text-center text-xs font-semibold px-4 py-2 rounded-2xl bg-emerald-500/80 hover:bg-emerald-600 text-white"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentCourses;
