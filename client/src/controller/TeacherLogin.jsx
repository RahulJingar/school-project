import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const TeacherLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    if (!(formData.email && formData.password)) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://127.0.0.1:2727/schoolTeacher/teacherLogin",
        formData
      ); // [web:41][web:60]

      console.log(">>> teacher login res >>>", res.data);

      const { data, token } = res.data;

      localStorage.setItem("teacherToken", token); // [web:63]
      localStorage.setItem("currentTeacher", JSON.stringify(data)); // [web:83]

      alert("Login successful");
      navigate("/teacher/dashboard");
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center py-12 px-4">
      <div className="max-w-4xl w-full flex flex-col md:flex-row items-stretch gap-8">
        {/* Left panel: teacher-specific messaging */}
        <div className="hidden md:flex flex-col justify-between bg-white/5 backdrop-blur-2xl border border-white/15 rounded-3xl p-8 text-slate-50 shadow-2xl w-full md:w-1/2">
          <div>
            <span className="inline-flex items-center px-3 py-1 mb-4 rounded-full text-[11px] font-semibold tracking-[0.25em] bg-white/10 border border-white/20 uppercase">
              Teacher Panel
            </span>
            <h2 className="text-2xl md:text-3xl font-semibold mb-3">
              Welcome back, Teacher.
            </h2>
            <p className="text-sm text-slate-200/85">
              Apne school ke students ke liye banaye gaye courses, tests aur
              notes ko yahin se manage karein.
            </p>
          </div>
          <ul className="mt-6 space-y-2 text-sm text-slate-100/90">
            <li>• Naye courses add karein aur pricing set karein.</li>
            <li>• Students ki progress aur test results dekhein.</li>
            <li>• Doubts aur announcements ek hi dashboard se handle karein.</li>
          </ul>
        </div>

        {/* Right panel: actual login form (same glass style) */}
        <div className="w-full md:w-1/2 bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-[0_18px_50px_rgba(0,0,0,0.7)]">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="mx-auto h-20 w-20 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-3xl flex items-center justify-center mb-4 shadow-2xl">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 19c1.5-2 3.5-3 8-3s6.5 1 8 3"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-white mb-1">
              Teacher Login
            </h2>
            <p className="text-slate-300 text-sm">
              Apne school teacher account se sign in karke dashboard open karein.
            </p>
          </div>

          {/* Form */}
          <form
            className="space-y-6"
            onSubmit={formDataHandler}
          >
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-2">
                School Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="teacher@school.com"
                className="w-full px-4 py-3 bg-white/15 border border-white/30 rounded-2xl text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200"
                value={formData.email}
                onChange={formHandler}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 bg-white/15 border border-white/30 rounded-2xl text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200"
                value={formData.password}
                onChange={formHandler}
                required
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-300">
              <span>For verified school teachers only</span>
              <button
                type="button"
                className="text-indigo-300 hover:text-white transition-colors"
              >
                Forgot password?
              </button>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-3.5 px-6 rounded-2xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Logging in..." : "Login to Teacher Panel"}
              </button>
            </div>

            <div className="text-center mt-4">
              <p className="text-sm text-slate-300">
                New to this platform?{" "}
                <Link
                  to="/teacher/signup"
                  className="font-semibold text-indigo-300 hover:text-white transition-colors"
                >
                  Create teacher account
                </Link>
              </p>
            </div>
          </form>

          <div className="text-center text-xs text-slate-400 mt-5">
            Secure • Encrypted • School Verified Access
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherLogin;
