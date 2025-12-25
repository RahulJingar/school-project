import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
// import { enrollCourse, clearSelectedCourse, clearError } from '../../store/slices/coursesSlice';  // ← Redux
import { enrollCourse,clearSelectedCourse,clearError } from "../store/slices/coursesSlice";

const StudentPayment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { selectedCourse, loading: enrollLoading, error: enrollError } = useSelector(state => state.courses);
  const { token, role } = useSelector(state => state.auth);

  useEffect(() => {
    if (!selectedCourse) {
      navigate("/courses");
    }
    if (role !== 'student') {
      navigate("/login");
    }
  }, [selectedCourse, role, navigate]);

  const handlePay = () => {
    if (!selectedCourse?._id || !token) {
      navigate("/login");
      return;
    }

    dispatch(enrollCourse(selectedCourse._id))
      .unwrap()
      .then(() => {
        dispatch(clearSelectedCourse());
        navigate("/payment-success");
      })
      .catch((err) => {
        alert(err);
      });
  };

  if (!selectedCourse) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-slate-900/80 border border-slate-800 rounded-3xl p-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 inline-flex items-center gap-2 text-[11px] text-slate-300 hover:text-white"
        >
          <span className="h-4 w-4 border border-slate-400 rounded-full flex items-center justify-center">
            ←
          </span>
          Back
        </button>
        
        <h1 className="text-xl font-semibold mb-2">{selectedCourse.title}</h1>
        <p className="text-sm text-slate-300 mb-4">
          Confirm your purchase to access course content.
        </p>
        
        <div className="mb-6 p-4 bg-slate-800/50 rounded-2xl">
          <p className="text-2xl font-bold text-emerald-400 mb-2">
            ₹{selectedCourse.price}
          </p>
          <p className="text-xs text-slate-400">
            {selectedCourse.totalLectures || 0} lectures • {selectedCourse.totalDurationInMinutes || 0} min
          </p>
          <p className="text-xs text-slate-400">
            {selectedCourse.grade} • {selectedCourse.subject}
          </p>
        </div>

        {enrollError && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 text-sm">
            {enrollError}
          </div>
        )}

        <button
          onClick={handlePay}
          disabled={enrollLoading || !token}
          className="w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm disabled:opacity-60 disabled:cursor-not-allowed transition-all"
        >
          {enrollLoading ? "Processing Payment..." : "Pay & Enroll Now"}
        </button>
      </div>
    </div>
  );
};

export default StudentPayment;
