import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const StudentMyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("studentToken");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetch = async () => {
      try {
        const res = await axios.get(
          "http://127.0.0.1:2727/student-courses",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCourses(res.data.data || []);
      } catch (err) {
        console.error("my courses error >>>", err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100">
        Loading your courses...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-semibold mb-4">
          My Courses
        </h1>
        {courses.length === 0 ? (
          <p className="text-sm text-slate-400">
            Abhi tak koi course enroll nahi kiya.{" "}
            <Link to="/courses" className="text-emerald-400 underline">
              Browse courses
            </Link>
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden"
              >
                <img
                  src={
                    course.thumbnail ||
                    "https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg"
                  }
                  alt={course.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <p className="text-xs text-slate-400 mb-1">
                    {course.teacher?.name || "School Teacher"}
                  </p>
                  <h2 className="text-sm font-semibold mb-1">
                    {course.title}
                  </h2>
                  <p className="text-[11px] text-slate-400 mb-3">
                    {course.totalLectures || 0} lectures •{" "}
                    {course.totalDurationInMinutes || 0} min
                  </p>
                  <Link
                    to={`/courses/${course._id}`}
                    className="inline-block text-xs px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold"
                  >
                    Continue learning
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentMyCourses;
