import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const TeacherCoursesView = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const course = state?.course;
  console.log("VIEW STATE >>>", state);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="bg-slate-900/80 border border-slate-800 rounded-3xl px-8 py-6 text-center max-w-md">
          <h2 className="text-xl font-semibold text-white mb-2">
            Course data missing
          </h2>
          <p className="text-slate-400 text-sm mb-4">
            Please open this page from Teacher Dashboard View button.
          </p>
          <button
            onClick={() => navigate("/teacher/dashboard")}
            className="px-5 py-2 rounded-2xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg')",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-slate-900/92 to-indigo-900/85" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 py-8">
        {/* top bar */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-semibold bg-white/5 border border-white/15 text-slate-100 hover:bg-slate-900/60 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>

          <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/20 border border-emerald-400/40 text-emerald-200">
            {course.status || "draft"}
          </span>
        </div>

        {/* main card */}
        <div className="bg-white/10 backdrop-blur-2xl border border-white/15 rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {/* left: image */}
            <div className="md:col-span-1 relative">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover md:h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="text-2xl font-bold text-emerald-300">
                  ₹{course.price}
                </span>
                <span className="text-[11px] text-slate-200 bg-slate-900/70 px-3 py-1 rounded-full">
                  {course.grade} • {course.subject}
                </span>
              </div>
            </div>

            {/* right: details */}
            <div className="md:col-span-2 p-6 md:p-8 flex flex-col gap-5">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {course.title}
                </h1>
                <p className="text-sm text-slate-300">
                  {course.description}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-3">
                  <p className="text-slate-400 mb-1">Lectures</p>
                  <p className="text-lg font-semibold text-indigo-300">
                    {course.totalLectures}
                  </p>
                </div>
                <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-3">
                  <p className="text-slate-400 mb-1">Duration</p>
                  <p className="text-lg font-semibold text-indigo-300">
                    {course.totalDurationInMinutes} min
                  </p>
                </div>
                <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-3">
                  <p className="text-slate-400 mb-1">Grade</p>
                  <p className="text-lg font-semibold text-indigo-300">
                    {course.grade}
                  </p>
                </div>
                <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-3">
                  <p className="text-slate-400 mb-1">Subject</p>
                  <p className="text-lg font-semibold text-indigo-300">
                    {course.subject}
                  </p>
                </div>
              </div>

              {Array.isArray(course.lectures) && course.lectures.length > 0 && (
                <div className="mt-2">
                  <h2 className="text-sm font-semibold text-slate-100 mb-2">
                    Course Outline
                  </h2>
                  <div className="max-h-64 overflow-y-auto pr-1 space-y-2">
                    {course.lectures.map((lec, idx) => (
                      <div
                        key={lec._id || idx}
                        className="flex items-start gap-3 bg-slate-900/60 border border-white/5 rounded-2xl p-3"
                      >
                        <div className="h-6 w-6 rounded-full bg-indigo-500/40 flex items-center justify-center text-[11px] text-indigo-100">
                          {idx + 1}
                        </div>
                        <div>
                          <p className="text-xs font-medium text-slate-100">
                            {lec.title}
                          </p>
                          {lec.durationInMinutes && (
                            <p className="text-[11px] text-slate-400">
                              {lec.durationInMinutes} min
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-3 flex flex-wrap gap-3">
                <button
                  onClick={() => navigate(`/edit/${course._id}`)}
                  className="px-5 py-2 rounded-2xl text-xs font-semibold bg-indigo-500/80 hover:bg-indigo-600 text-white shadow-lg transition-colors"
                >
                  Edit Course
                </button>
                <button
                  onClick={() => navigate("/teacher/dashboard")}
                  className="px-5 py-2 rounded-2xl text-xs font-semibold bg-white/5 border border-white/20 text-slate-100 hover:bg-slate-900/60 transition-colors"
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherCoursesView;
