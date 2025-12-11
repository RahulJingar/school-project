import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TeacherDashboard = () => {
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    const t = localStorage.getItem("currentTeacher");
    if (t) {
      try {
        setTeacher(JSON.parse(t));
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  const sampleCourses = [
    {
      id: 1,
      title: "Class 10 Maths - Term 1",
      students: 120,
      progress: 78,
      status: "Active",
    },
    {
      id: 2,
      title: "Class 12 Physics - Boards Batch",
      students: 85,
      progress: 62,
      status: "Active",
    },
    {
      id: 3,
      title: "Class 9 Science - Foundation",
      students: 40,
      progress: 35,
      status: "Draft",
    },
  ];

  const upcomingTasks = [
    { id: 1, label: "Upload notes for Chapter 5", course: "Class 10 Maths" },
    { id: 2, label: "Create test for Electrostatics", course: "Class 12 Physics" },
    { id: 3, label: "Review doubts from yesterday", course: "All Courses" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Top bar */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-lg font-semibold shadow-lg">
              {teacher?.name ? teacher.name.charAt(0).toUpperCase() : "T"}
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                Teacher Dashboard
              </p>
              <h1 className="text-sm font-semibold">
                {teacher?.name || "Teacher Name"}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-slate-400">Logged in as</span>
              <span className="font-medium">
                {teacher?.email || "teacher@school.com"}
              </span>
            </div>

            <Link
              to="/teacher/reset"
              className="px-3 py-1.5 rounded-full border border-slate-700 text-xs hover:bg-slate-800 transition"
            >
              Reset password
            </Link>

            <button
              onClick={() => {
                localStorage.removeItem("teacherToken");
                localStorage.removeItem("currentTeacher");
                window.location.href = "/teacher/login";
              }}
              className="px-3 py-1.5 rounded-full border border-red-500/70 text-xs text-red-200 hover:bg-red-600/10 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Welcome + quick stats */}
        <section className="grid md:grid-cols-3 gap-5">
          <div className="md:col-span-2 bg-gradient-to-br from-indigo-600/80 via-purple-600/70 to-sky-500/80 rounded-3xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute -right-10 -top-10 h-32 w-32 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute right-6 bottom-4 h-16 w-16 border border-white/20 rounded-2xl" />
            <p className="text-xs uppercase tracking-[0.25em] text-indigo-100 mb-2">
              Welcome back
            </p>
            <h2 className="text-2xl font-semibold mb-1">
              {teacher?.name || "Teacher"},
            </h2>
            <p className="text-sm text-indigo-100/90 mb-4">
              Aaj ke classes, tests aur student progress yahi se control karein.
            </p>
            <div className="flex flex-wrap gap-4 text-xs text-indigo-50/90">
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20">
                Courses active: 3
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20">
                Total students: 245
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20">
                Pending tasks: {upcomingTasks.length}
              </span>
            </div>
          </div>

          <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-5 flex flex-col justify-between shadow-lg">
            <div>
              <h3 className="text-sm font-semibold mb-3">Today’s Snapshot</h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li>• 2 live classes scheduled</li>
                <li>• 1 test result pending review</li>
                <li>• 6 new doubts from students</li>
              </ul>
            </div>
            <button className="mt-4 w-full text-xs font-semibold py-2.5 rounded-2xl bg-indigo-500 hover:bg-indigo-600 transition">
              + Create New Course
            </button>
          </div>
        </section>

        {/* Courses + Tasks */}
        <section className="grid md:grid-cols-3 gap-5">
          {/* Courses list */}
          <div className="md:col-span-2 bg-slate-900/60 border border-slate-800 rounded-3xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold">Your Courses</h3>
              <button className="text-[11px] text-indigo-300 hover:text-indigo-200">
                View all
              </button>
            </div>
            <div className="space-y-3">
              {sampleCourses.map((course) => (
                <div
                  key={course.id}
                  className="flex items-center justify-between gap-3 bg-slate-900/80 border border-slate-800 rounded-2xl px-4 py-3 hover:border-indigo-500/60 transition"
                >
                  <div>
                    <p className="text-sm font-medium">{course.title}</p>
                    <p className="text-xs text-slate-400">
                      {course.students} students • {course.status}
                    </p>
                    <div className="mt-2 w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          course.status === "Draft"
                            ? "bg-slate-500"
                            : "bg-gradient-to-r from-indigo-400 to-emerald-400"
                        }`}
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                  <button className="text-[11px] px-3 py-1.5 rounded-full border border-slate-600 hover:border-indigo-500 text-slate-200 hover:text-indigo-200 transition">
                    Open
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Tasks / Tip */}
          <div className="space-y-4">
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-5 shadow-lg">
              <h3 className="text-sm font-semibold mb-3">Upcoming tasks</h3>
              <ul className="space-y-2 text-xs text-slate-300">
                {upcomingTasks.map((task) => (
                  <li
                    key={task.id}
                    className="p-2 rounded-2xl bg-slate-900/80 border border-slate-800"
                  >
                    <p>{task.label}</p>
                    <p className="text-[10px] text-slate-500 mt-1">
                      {task.course}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-indigo-500/15 border border-indigo-500/40 rounded-3xl p-4 text-xs text-indigo-100 shadow-lg">
              <p className="font-semibold mb-1">Tip for today</p>
              <p>
                Short 10–15 minute chapter recap videos students ke liye zyada
                effective hote hain. Ek recap playlist create kar ke dekho.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default TeacherDashboard;
