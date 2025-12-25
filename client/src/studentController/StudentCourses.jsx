// src/studentController/StudentCourses.jsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
// import { fetchPublicCourses, setSelectedCourse } from '../../store/slices/coursesSlice';  // ← Sahi path
import { fetchPublicCourses,setSelectedCourse } from "../store/slices/coursesSlice";

const StudentCourses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { publicCourses, loading, error } = useSelector(state => state.courses);
  const { role, token } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchPublicCourses());
  }, [dispatch]);

  const handleBuy = (course) => {
    if (!token || role !== 'student') {
      alert("Please login as student first");
      navigate("/login");
      return;
    }
    dispatch(setSelectedCourse(course));
    navigate("/payment");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center">
        <div className="text-lg">Loading courses...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold">
              All School Courses
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              {publicCourses?.length || 0} published courses available
            </p>
          </div>
          {token && role === 'student' ? (
            <Link
              to="/my-courses"
              className="px-4 py-2 rounded-2xl text-xs font-semibold bg-indigo-500 hover:bg-indigo-600 text-white"
            >
              My Courses
            </Link>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 rounded-2xl text-xs font-semibold bg-emerald-500 hover:bg-emerald-600 text-white"
            >
              Student Login
            </Link>
          )}
        </header>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-2xl text-red-300 text-sm text-center">
            {error}
          </div>
        )}

        {publicCourses?.length === 0 ? (
          <div className="text-center py-16 text-slate-400 text-sm">
            No courses available right now. Check back later!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publicCourses.map((course) => (
              <div
                key={course._id}
                className="group bg-slate-900/80 border border-slate-700 rounded-2xl p-4 hover:-translate-y-1 hover:border-emerald-400/60 hover:shadow-xl transition-all cursor-pointer"
              >
                <div className="relative mb-3">
                  <img
                    src={course.thumbnail || "https://images.pexels.com/photos/4144222/pexels-photo-4144222.jpeg"}
                    alt={course.title}
                    className="w-full h-36 object-cover rounded-xl"
                  />
                  <span className="absolute top-3 right-3 text-[11px] px-2 py-1 rounded-full bg-emerald-500/90 text-white font-semibold">
                    {course.grade} • {course.subject}
                  </span>
                </div>

                <h2 className="text-sm font-semibold line-clamp-2 mb-1 group-hover:text-emerald-300">
                  {course.title}
                </h2>
                <p className="text-[11px] text-slate-300 line-clamp-2 mb-3">
                  {course.description}
                </p>

                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="text-lg font-bold text-emerald-400">
                    ₹{course.price}
                  </span>
                  <span className="text-slate-400">
                    {course.totalLectures || 0} lectures
                  </span>
                </div>

                <div className="flex gap-2">
                  <Link
                    to={`/courses/${course._id}`}
                    className="flex-1 text-center text-xs font-semibold px-3 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 transition-all"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => handleBuy(course)}
                    className="flex-1 text-center text-xs font-semibold px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white transition-all"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentCourses;
