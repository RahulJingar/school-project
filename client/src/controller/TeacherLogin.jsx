import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const TeacherLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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
      const res = await axios.post(
        "http://127.0.0.1:2727/schoolTeacher/teacherLogin",
        formData
      );

      console.log(">>> teacher login res >>>", res.data);

      const { data, token } = res.data;

      localStorage.setItem("teacherToken", token);
      localStorage.setItem("currentTeacher", JSON.stringify(data));

      alert("Login successful");
      navigate("/teacher/dashboard");
    } catch (error) {
      console.log(error);
      alert("Login failed");
    }
  };

  const forgetHandle = () => {
    navigate("/forget");
  };

  return (
    <div
      className="
        min-h-screen w-full
        bg-cover bg-center bg-no-repeat
        relative
        flex items-center justify-center
        py-12 px-4
      "
      style={{
        // staff room / classroom style background
        backgroundImage:
          "url('https://images.pexels.com/photos/4090007/pexels-photo-4090007.jpeg')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-slate-900/92 to-indigo-900/85" />

      {/* Soft board frame */}
      <div className="pointer-events-none absolute inset-x-6 inset-y-10 border border-white/5 rounded-[34px] bg-slate-900/25" />

      <div className="relative z-10 max-w-5xl w-full flex flex-col md:flex-row items-stretch gap-8">
        {/* Left: Teacher messaging */}
        <div className="hidden md:flex flex-col justify-between bg-white/5 backdrop-blur-2xl border border-white/15 rounded-3xl p-8 text-slate-50 shadow-2xl w-full md:w-1/2">
          <div>
            <span className="inline-flex items-center px-3 py-1 mb-4 rounded-full text-[11px] font-semibold tracking-[0.25em] bg-white/10 border border-white/20 uppercase">
              Teacher Panel • Staff only
            </span>
            <h2 className="text-2xl md:text-3xl font-semibold mb-3">
              Staff Room se digital board tak.
            </h2>
            <p className="text-sm text-slate-200/85">
              Yahin se aap apne school ke students ke liye courses, tests,
              notes aur announcements manage karte hain. Ye panel sirf verified
              teachers ke liye hai.
            </p>
          </div>

          <ul className="mt-6 space-y-2 text-sm text-slate-100/90">
            <li>• Board ke syllabus ke hisaab se course banayein.</li>
            <li>• Test results aur performance ek jagah se track karein.</li>
            <li>• Homework, notes aur announcements online share karein.</li>
          </ul>

          <p className="mt-6 text-[11px] text-slate-300 border-t border-white/10 pt-3">
            Reminder: Apna login kisi student ke sath share na karein. Har
            teacher ka account alag hota hai.
          </p>
        </div>

        {/* Right: Login form */}
        <div className="w-full md:w-1/2 bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-[0_18px_50px_rgba(0,0,0,0.7)]">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="mx-auto h-20 w-20 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-3xl flex items-center justify-center mb-4 shadow-2xl">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.4}
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.4}
                  d="M4 19c1.5-2 3.5-3 8-3s6.5 1 8 3"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-white mb-1">
              Teacher Login
            </h2>
            <p className="text-slate-300 text-sm">
              Apne school teacher account se sign in karke dashboard open
              karein.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={formDataHandler}>
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
                onClick={forgetHandle}
                className="text-indigo-300 hover:text-white transition-colors"
              >
                Forgot password?
              </button>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-3.5 px-6 rounded-2xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
              >
                Login to Teacher Panel
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
