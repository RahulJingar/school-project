// src/controller/StudentCourseDetail.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const StudentCourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchDetail = async () => {
      try {
        setLoading(true);
        setErrorMsg("");

        const res = await axios.get(
          `http://127.0.0.1:2727/getCourseByIdPublic/${id}`
        );
        setCourse(res.data.data || res.data);
      } catch (err) {
        console.error(">>> public course detail error >>>", err);
        setErrorMsg(
          err?.response?.data?.message || "Course detail load nahi ho paaya."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  const handleBuyCourse = () => {
    if (!course) return;

    // course ko localStorage me save
    localStorage.setItem("selectedCourseForPayment", JSON.stringify(course));

    // payment page pe bhej do
    navigate("/payment");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <div className="h-10 w-10 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-slate-200 text-sm">Loading course...</p>
        </div>
      </div>
    );
  }

  if (errorMsg || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="bg-slate-900/80 border border-red-500/40 rounded-3xl px-8 py-6 text-center max-w-md">
          <h2 className="text-xl font-semibold text-red-400 mb-2">
            Something went wrong
          </h2>
          <p className="text-slate-300 text-sm mb-4">
            {errorMsg || "Course not found"}
          </p>
          <button
            onClick={() => navigate("/courses")}
            className="px-5 py-2 rounded-2xl text-sm font-semibold bg-slate-800 text-slate-100 hover:bg-slate-700"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 px-4 py-8">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: card */}
        <div className="md:col-span-1">
          <div className="bg-slate-900/80 border border-slate-700 rounded-2xl overflow-hidden">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-52 object-cover"
            />
            <div className="p-4 space-y-2">
              <p className="text-lg font-bold text-emerald-300">
                ₹{course.price}
              </p>
              <p className="text-xs text-slate-300">
                {course.grade} • {course.subject}
              </p>
              <p className="text-[11px] text-slate-400">
                {course.totalLectures} lectures •{" "}
                {course.totalDurationInMinutes} min total
              </p>
              <button
                onClick={handleBuyCourse}
                className="w-full mt-2 px-4 py-2 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold"
              >
                Buy Course
              </button>
            </div>
          </div>
        </div>

        {/* Right: title, description, lectures */}
        <div className="md:col-span-2">
          <button
            onClick={() => navigate(-1)}
            className="mb-4 inline-flex items-center gap-2 text-xs text-slate-300 hover:text-white"
          >
            <span className="h-4 w-4 border border-slate-400 rounded-full flex items-center justify-center">
              ←
            </span>
            Back
          </button>

          <h1 className="text-2xl md:text-3xl font-semibold mb-2">
            {course.title}
          </h1>
          <p className="text-sm text-slate-200 mb-4">
            {course.description}
          </p>

          <div className="mt-4">
            <h2 className="text-sm font-semibold mb-2">
              What you will learn
            </h2>

            {Array.isArray(course.lectures) && course.lectures.length > 0 ? (
              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {course.lectures.map((lec, idx) => (
                  <div
                    key={lec._id || idx}
                    className="flex items-start gap-3 bg-slate-900/80 border border-slate-800 rounded-2xl p-3 text-[11px]"
                  >
                    <div className="h-6 w-6 rounded-full bg-emerald-500/30 flex items-center justify-center text-[11px] text-emerald-100">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="font-medium">{lec.title}</p>
                      {lec.durationInMinutes && (
                        <p className="text-slate-400">
                          {lec.durationInMinutes} min
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[11px] text-slate-400">
                Lectures abhi add nahi kiye gaye. Jaldi hi update hoga.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCourseDetail;
