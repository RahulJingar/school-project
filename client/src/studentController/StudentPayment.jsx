// src/controller/StudentPayment.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const StudentPayment = () => {
  const [course, setCourse] = useState(null);
  const [upiId, setUpiId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("selectedCourseForPayment");
    if (!stored) {
      navigate("/courses");
      return;
    }
    try {
      setCourse(JSON.parse(stored));
    } catch {
      navigate("/courses");
    }
  }, [navigate]);

  const handlePay = () => {
    if (!upiId) {
      alert("Please enter your UPI ID");
      return;
    }

    // yaha normally payment gateway call hoga
    // abhi direct success man lete hain
    // optional: purchased course save kar sakte ho
    // localStorage.setItem("purchasedCourse", JSON.stringify(course));

    // selected course clear
    localStorage.removeItem("selectedCourseForPayment");

    // success page pe le jao
    navigate("/payment-success", { replace: true });
  };

  if (!course) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 px-4 py-8 flex items-center justify-center">
      <div className="w-full max-w-md bg-slate-900/80 border border-slate-700 rounded-3xl p-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 inline-flex items-center gap-2 text-[11px] text-slate-300 hover:text-white"
        >
          <span className="h-4 w-4 border border-slate-400 rounded-full flex items-center justify-center">
            ←
          </span>
          Back
        </button>

        <h1 className="text-xl font-semibold mb-1">{course.title}</h1>
        <p className="text-[12px] text-slate-300 mb-3">
          {course.description}
        </p>

        <div className="mb-4 text-sm">
          <p className="text-emerald-300 text-lg font-bold">
            ₹{course.price}
          </p>
          <p className="text-slate-400 text-[11px]">
            {course.totalLectures} lectures •{" "}
            {course.totalDurationInMinutes} min total
          </p>
        </div>

        <h2 className="text-sm font-semibold mb-2">UPI Payment</h2>

        <input
          type="text"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
          placeholder="Enter your UPI ID"
          className="w-full mb-3 px-3 py-2.5 rounded-2xl bg-slate-800/80 border border-slate-600 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        />

        <button
          onClick={handlePay}
          className="w-full mt-1 px-4 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold"
        >
          Pay with UPI
        </button>
      </div>
    </div>
  );
};

export default StudentPayment;
