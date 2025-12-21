import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const TeacherSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
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

    if (!(formData.name && formData.email && formData.password)) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://127.0.0.1:2727/schoolTeacher/teacherSignup",
        formData
      ); // [web:41][web:60]

      console.log(">>> teacher signup res >>>", res.data);

      const teacherData = res.data;

      // list of teachers
      const existingTeachers =
        JSON.parse(localStorage.getItem("teachers")) || []; // [web:52][web:83]
      existingTeachers.push(teacherData);
      localStorage.setItem("teachers", JSON.stringify(existingTeachers)); // [web:49][web:55]

      // current teacher
      localStorage.setItem("currentTeacher", JSON.stringify(teacherData)); // [web:83]

      alert("Teacher signup successful");
      navigate("/teacher/login");
    } catch (error) {
      console.log(error);
      alert(error?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-screen
        bg-cover bg-center bg-no-repeat
        flex items-center justify-center
        px-4
      "
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/5212330/pexels-photo-5212330.jpeg')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-900/80 to-indigo-800/70" />

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col md:flex-row items-stretch gap-8">
        {/* Left side - teacher highlight */}
        <div className="hidden md:flex flex-col justify-between bg-white/5 backdrop-blur-2xl border border-white/15 rounded-3xl p-7 text-slate-50 shadow-2xl w-full md:w-1/2">
          <div>
            <span className="inline-flex items-center px-3 py-1 mb-4 rounded-full text-[11px] font-semibold tracking-[0.25em] bg-white/10 border border-white/20 uppercase">
              For School Teachers
            </span>
            <h2 className="text-2xl font-semibold mb-3">
              Launch your own digital classroom.
            </h2>
            <p className="text-sm text-slate-200/85">
              Apne school ke students ke liye notes, recorded classes aur test
              series ek hi jagah becho. No tech headache, sirf teaching. 
            </p>
          </div>
          <ul className="mt-6 space-y-2 text-sm text-slate-100/90">
            <li>• Class-wise structured courses create karo.</li>
            <li>• Apni pricing khud set karo, monthly income track karo.</li>
            <li>• Doubts, PDFs, leaderboard sab ek smart panel se manage karo.</li>
          </ul>
        </div>

        {/* Right side - actual form */}
        <div className="w-full md:w-1/2 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-[0_18px_50px_rgba(0,0,0,0.7)]">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-semibold text-slate-50 mb-2">
              Create teacher account
            </h1>
            <p className="text-sm text-slate-300">
              2 minute ka signup, lifetime access to your teaching dashboard.
            </p>
          </div>

          <form onSubmit={formDataHandler} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="e.g. Priya Sharma"
                value={formData.name}
                onChange={formHandler}
                className="w-full px-4 py-3 bg-white/10 border border-white/25 rounded-2xl text-sm text-slate-50 placeholder-slate-300/80 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-2">
                School Email
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

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={formHandler}
                className="w-full px-4 py-3 bg-white/10 border border-white/25 rounded-2xl text-sm text-slate-50 placeholder-slate-300/80 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200"
              />
            </div>

            <p className="text-[11px] text-slate-300 pt-1">
              By continuing, you agree to our Terms of Use and Privacy Policy.
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold py-3.5 px-6 rounded-2xl hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Creating account..." : "Sign up as Teacher"}
            </button>

            <div className="text-center mt-4">
              <p className="text-sm text-slate-300">
                Already have an account?{" "}
                <Link
                  to="/teacher/login"
                  className="font-semibold text-indigo-300 hover:text-white transition-colors"
                >
                  Login here
                </Link>
              </p>
            </div>
          </form>

          <div className="mt-6 text-[11px] text-slate-400 text-center">
            Only verified school teachers can create accounts on this platform.
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherSignup;
