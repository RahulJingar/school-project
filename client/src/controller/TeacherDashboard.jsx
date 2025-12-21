import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CreateCourseModal from "./CreateCourseModal";

const TeacherDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [showCreate, setShowCreate] = useState(false);

  const navigate = useNavigate();

  const teacher = JSON.parse(localStorage.getItem("currentTeacher"));
  const teacherId = teacher?._id;
  const token = localStorage.getItem("teacherToken");

  useEffect(() => {
    if (!teacherId || !token) {
      navigate("/teacher/login");
      return;
    }
    fetchCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teacherId, token]);

  const fetchCourses = async () => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:2727/teacherCourses/myCourses",
        {
          params: { teacherId },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCourses(res.data.data || []);
    } catch (err) {
      console.error(">>> fetchCourses error >>>", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("teacherToken");
    localStorage.removeItem("currentTeacher");
    navigate("/teacher/login");
  };

  const resetHandle = (e) => {
    e.preventDefault();
    navigate("/teacher/reset");
  };

  return (
    <div
      className="
        min-h-screen w-full
        bg-cover bg-center bg-no-repeat
        relative
      "
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-slate-900/92 to-indigo-900/85" />
      <div className="pointer-events-none absolute inset-x-4 inset-y-6 border border-white/5 rounded-[32px] bg-slate-900/25" />

      {/* CONTENT */}
      <div className="relative z-10 min-h-screen max-w-7xl mx-auto px-6 py-6 flex flex-col gap-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center shadow-xl">
              <span className="text-white text-lg font-bold">T</span>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                Teacher Workspace
              </p>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                Teacher Dashboard
              </h1>
              <p className="text-xs md:text-sm text-slate-400">
                Manage your school courses, earnings and students from here.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {teacher && (
              <div className="hidden sm:block text-right">
                <p className="text-sm text-slate-200 font-semibold">
                  {teacher.name}
                </p>
                <p className="text-xs text-slate-400">{teacher.email}</p>
              </div>
            )}

            <button
              onClick={resetHandle}
              className="px-4 py-2 rounded-2xl text-xs font-semibold bg-white/5 border border-white/20 text-slate-100 hover:bg-slate-900/60 transition-colors"
            >
              Reset Password
            </button>

            <button
              onClick={handleLogout}
              className="px-5 py-2 rounded-2xl text-xs font-semibold bg-red-500/80 hover:bg-red-600 text-white shadow-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white/8 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 shadow-lg">
            <p className="text-xs text-slate-300 mb-1">Total Courses</p>
            <p className="text-3xl font-bold text-indigo-300">
              {courses.length}
            </p>
            <p className="text-[11px] text-slate-400 mt-2">
              Syllabus-based courses you have created.
            </p>
          </div>

          <div className="bg-white/8 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 shadow-lg">
            <p className="text-xs text-slate-300 mb-1">Total Earnings</p>
            <p className="text-3xl font-bold text-emerald-300">
              ₹{courses.reduce((sum, c) => sum + (c.price || 0), 0)}
            </p>
            <p className="text-[11px] text-slate-400 mt-2">
              Approx revenue from all active courses.
            </p>
          </div>

          <div className="bg-white/8 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 shadow-lg">
            <p className="text-xs text-slate-300 mb-1">Published</p>
            <p className="text-3xl font-bold text-purple-300">
              {courses.filter((c) => c.status === "published").length}
            </p>
            <p className="text-[11px] text-slate-400 mt-2">
              Courses visible to students right now.
            </p>
          </div>
        </section>

        {/* Courses */}
        <section className="bg-white/8 backdrop-blur-2xl border border-white/15 rounded-3xl p-7 shadow-lg flex-1">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Your Courses
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Manage content, pricing and visibility for each course.
              </p>
            </div>
            <button
              onClick={() => setShowCreate(true)}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold px-6 py-2.5 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-200 text-sm"
            >
              + Create New Course
            </button>
          </div>

          {courses.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-lg font-semibold text-white mb-1">
                No courses yet
              </h3>
              <p className="text-slate-400 text-sm">
                Create your first course to get started.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div
                  key={course._id}
                  className="group bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-5 hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div className="relative mb-4">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-36 object-cover rounded-2xl"
                    />
                    <span
                      className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[11px] font-semibold ${
                        course.status === "published"
                          ? "bg-emerald-500/90 text-white"
                          : "bg-amber-500/90 text-white"
                      }`}
                    >
                      {course.status}
                    </span>
                  </div>

                  <h3 className="font-bold text-white text-[15px] mb-1 line-clamp-2 group-hover:text-indigo-300 transition-colors">
                    {course.title}
                  </h3>

                  <p className="text-xs text-slate-300 mb-3 line-clamp-2">
                    {course.description}
                  </p>

                  <div className="flex items-center justify-between mb-2">
                    <span className="text-emerald-300 font-semibold text-lg">
                      ₹{course.price}
                    </span>
                    <span className="text-[11px] text-slate-300">
                      {course.grade} • {course.subject}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-4">
                    <span>{course.totalLectures} lectures</span>
                    <span>{course.totalDurationInMinutes} min</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/edit/${course._id}`)}
                      className="flex-1 bg-indigo-500/20 hover:bg-indigo-500/40 text-indigo-200 font-medium py-1.5 px-3 rounded-2xl border border-indigo-500/30 transition-all duration-200 text-xs"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() =>
                        navigate(`/courses/${course._id}`, {
                          state: { course },
                        })
                      }
                      className="flex-1 bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-200 font-medium py-1.5 px-3 rounded-2xl border border-emerald-500/30 transition-all duration-200 text-xs"
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {showCreate && (
        <CreateCourseModal onClose={() => setShowCreate(false)} onCreated={fetchCourses} />
      )}
    </div>
  );
};

export default TeacherDashboard;
