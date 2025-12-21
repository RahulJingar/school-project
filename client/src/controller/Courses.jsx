// src/controller/Courses.jsx - Courses Listing Page
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const currentStudent = JSON.parse(localStorage.getItem("currentStudent"));

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setErrorMsg("");

      const res = await axios.get("http://127.0.0.1:2727/courses");
      console.log("public courses >>>", res.data);

      setCourses(res.data?.data || []);
    } catch (err) {
      console.error(err);
      const msg =
        err?.response?.data?.message || "Failed to load courses";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col items-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2 text-center">
            Explore School Courses
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto text-center">
            Apne school teachers ke trusted courses. Notes, videos, tests - sab
            ek jagah.
          </p>

          {currentStudent && (
            <p className="mt-3 text-xs text-slate-500">
              Logged in as{" "}
              <span className="font-semibold text-slate-700">
                {currentStudent.name}
              </span>{" "}
              ({currentStudent.email})
            </p>
          )}
        </div>

        {/* Loading / Error / Empty */}
        {loading && (
          <div className="text-center text-slate-600 py-10 text-sm">
            Loading courses...
          </div>
        )}

        {!loading && errorMsg && (
          <div className="text-center text-red-500 py-10 text-sm">
            {errorMsg}
          </div>
        )}

        {!loading && !errorMsg && courses.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-lg font-semibold text-slate-800 mb-1">
              No courses available
            </h3>
            <p className="text-slate-500 text-sm">
              Jab teachers courses publish karenge to yaha dikh jayenge.
            </p>
          </div>
        )}

        {/* Courses Grid */}
        {!loading && !errorMsg && courses.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course._id}
                className="group bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50 hover:-translate-y-2"
              >
                <div className="h-48 rounded-t-2xl overflow-hidden relative">
                  <img
                    src={
                      course.thumbnail ||
                      "https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg"
                    }
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {course.status && (
                    <div className="absolute top-4 right-4 bg-indigo-500 text-white px-3 py-1 rounded-full text-xs font-semibold capitalize">
                      {course.status}
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3 text-sm text-indigo-600 font-semibold">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full" />
                    {course.teacher?.name || "School Teacher"}
                  </div>

                  <h3 className="font-bold text-xl mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                    {course.title}
                  </h3>

                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  <div className="flex items-center justify-between mb-6">
                    <div className="text-2xl font-bold text-indigo-600">
                      ₹{course.price}
                    </div>
                    <div className="flex flex-col items-end text-xs text-slate-500">
                      <span>
                        {course.totalLectures || 0} lectures •{" "}
                        {course.totalDurationInMinutes || 0} min
                      </span>
                      {course.grade && course.subject && (
                        <span>
                          Class {course.grade} • {course.subject}
                        </span>
                      )}
                    </div>
                  </div>

                  <Link
                    to={`/courses/${course._id}`}
                    className="w-full block text-center py-3 px-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    View Course Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center mt-20 p-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl text-white">
          <h2 className="text-3xl font-bold mb-4">Course pasand aaya?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Abhi browse karo aur apne school teachers ke courses buy karo.
            Limited time discount available!
          </p>
          <Link
            to="/courses"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-indigo-600 font-bold text-lg rounded-2xl hover:bg-indigo-50 transition-all duration-200 shadow-2xl hover:shadow-3xl hover:-translate-y-1"
          >
            Explore All Courses
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Courses;
