import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const TeacherReset = () => {
  const [formData, setFormData] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const formDataHandler = async (e) => {
    e.preventDefault();

    if (!(formData.email && formData.oldPassword && formData.newPassword)) {
      alert("Please fill all fields");
      return;
    }

    if (formData.oldPassword === formData.newPassword) {
      alert("New password should be different from old password");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.patch(
        "http://127.0.0.1:2727/schoolTeacher/teacherReset",
        formData
      ); // [web:132][web:135]

      console.log(">>> teacher reset res >>>", res.data);
      alert("Password updated successfully");

      // optional: agar currentTeacher ka email match kare to localStorage se logout
      const current = JSON.parse(localStorage.getItem("currentTeacher") || "{}");
      if (current?.email === formData.email) {
        localStorage.removeItem("teacherToken");
        localStorage.removeItem("currentTeacher"); // [web:144]
      }

      navigate("/teacher/login");
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message || "Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center px-4 py-10">
      <div className="max-w-3xl w-full flex flex-col md:flex-row gap-8">
        {/* Left info card */}
        <div className="hidden md:flex flex-col justify-between bg-white/5 backdrop-blur-2xl border border-white/15 rounded-3xl p-8 text-slate-50 shadow-2xl w-full md:w-1/2">
          <div>
            <span className="inline-flex items-center px-3 py-1 mb-4 rounded-full text-[11px] font-semibold tracking-[0.25em] bg-white/10 border border-white/20 uppercase">
              Password Reset
            </span>
            <h2 className="text-2xl font-semibold mb-3">
              Reset your teacher account password.
            </h2>
            <p className="text-sm text-slate-200/85">
              Apni existing password se verify karke nayi secure password set
              karein. Ye sirf aapke teacher account ke liye use hoga.
            </p>
          </div>

          <ul className="mt-6 space-y-2 text-xs text-slate-100/90">
            <li>• Same email use karein jo login ke liye use hota hai.</li>
            <li>• Old password sahi hone par hi reset hoga.</li>
            <li>• Reset ke baad dobara login karna hoga.</li>
          </ul>
        </div>

        {/* Right form card */}
        <div className="w-full md:w-1/2 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-[0_18px_50px_rgba(0,0,0,0.7)]">
          <div className="text-center mb-6">
            <div className="mx-auto h-16 w-16 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-2xl flex items-center justify-center mb-3 shadow-xl">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 11c1.105 0 2-.895 2-2V5a2 2 0 10-4 0v4c0 1.105.895 2 2 2z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M7 11h10v6a3 3 0 01-3 3H10a3 3 0 01-3-3v-6z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold text-slate-50">
              Teacher Password Reset
            </h1>
            <p className="text-xs text-slate-300 mt-1">
              Email + old password se verify karke naya password set karein.
            </p>
          </div>

          <form onSubmit={formDataHandler} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-2">
                Registered Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="teacher@school.com"
                value={formData.email}
                onChange={formHandler}
                className="w-full px-4 py-3 bg-white/10 border border-white/25 rounded-2xl text-sm text-slate-50 placeholder-slate-300/80 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Old password */}
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-2">
                Old Password
              </label>
              <input
                type="password"
                name="oldPassword"
                placeholder="Current password"
                value={formData.oldPassword}
                onChange={formHandler}
                className="w-full px-4 py-3 bg-white/10 border border-white/25 rounded-2xl text-sm text-slate-50 placeholder-slate-300/80 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* New password */}
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-2">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                placeholder="Set a new password"
                value={formData.newPassword}
                onChange={formHandler}
                className="w-full px-4 py-3 bg-white/10 border border-white/25 rounded-2xl text-sm text-slate-50 placeholder-slate-300/80 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200"
              />
            </div>

            <p className="text-[11px] text-slate-300">
              After successful reset, you will be logged out from all current
              sessions.
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold py-3.5 px-6 rounded-2xl hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Updating password..." : "Reset Password"}
            </button>

            <div className="text-center mt-4 text-sm text-slate-300">
              Remembered your password?{" "}
              <Link
                to="/teacher/login"
                className="font-semibold text-indigo-300 hover:text-white transition-colors"
              >
                Go back to login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TeacherReset;
