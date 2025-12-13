import React from "react";
import { Link } from "react-router-dom";

const Ui = () => {
  return (
    <div
      className="
        h-screen w-full
        bg-cover bg-center bg-no-repeat
        relative
        flex items-center justify-center
        px-4
      "
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-indigo-700/60" />

      <div className="relative z-10 max-w-6xl w-full flex flex-col lg:flex-row items-stretch gap-10 text-slate-50">
        {/* LEFT: main heading */}
        <div className="lg:w-1/2 flex flex-col justify-center">
          <span className="inline-flex items-center px-3 py-1 mb-4 rounded-full text-[11px] font-semibold tracking-[0.25em] bg-white/10 border border-white/20 uppercase">
            School Course Platform
          </span>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight mb-3">
            Buy and manage school courses
            <span className="block text-indigo-300">
              students & teachers ke liye ek hi jagah.
            </span>
          </h1>

          <p className="text-sm md:text-[15px] text-slate-200/85 mb-6">
            Students apne school ke teachers se directly courses buy kar sakte
            hain. Teachers apna syllabus-based paid content, notes aur test
            series is panel se manage kar sakte hain.
          </p>

          <p className="text-[11px] text-slate-300/80">
            Same school ecosystem • Secure access • Teacher-controlled pricing
          </p>
        </div>

        {/* RIGHT: role selector cards */}
        <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Teacher block */}
          <div className="bg-white/12 backdrop-blur-2xl border border-white/20 rounded-2xl p-5 shadow-[0_18px_50px_rgba(0,0,0,0.6)] flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <div className="h-9 w-9 rounded-2xl bg-indigo-500/80 flex items-center justify-center shadow-lg">
                  <span className="text-sm font-bold">T</span>
                </div>
                <h3 className="text-lg font-semibold">For Teachers</h3>
              </div>
              <p className="text-xs text-slate-200/90 mb-4">
                Apne school ke students ke liye online courses, notes, tests
                aur recordings manage karein. Dashboard se sab control aapke
                paas rahega.
              </p>
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <Link
                to="/teacher/login"
                className="
                  inline-flex items-center justify-center
                  px-4 py-2.5 text-sm font-semibold
                  rounded-full
                  bg-indigo-500 hover:bg-indigo-600
                  shadow-lg shadow-indigo-500/40
                  transition-transform hover:-translate-y-0.5
                "
              >
                Teacher Login
              </Link>
              <Link
                to="/teacher/signup"
                className="
                  inline-flex items-center justify-center
                  px-4 py-2.5 text-xs font-semibold
                  rounded-full
                  border border-slate-100/60
                  bg-white/5 hover:bg-slate-900/40
                  transition-transform hover:-translate-y-0.5
                "
              >
                Create Teacher Account
              </Link>
              <div className="flex justify-between text-[11px] text-slate-300 mt-1">
                <Link to="/teacher/reset" className="hover:text-white">
                  Reset password
                </Link>
                <Link to="/forget" className="hover:text-white">
                  Forgot password?
                </Link>
              </div>
            </div>
          </div>

          {/* Student block */}
          <div className="bg-white/10 backdrop-blur-2xl border border-white/15 rounded-2xl p-5 shadow-[0_18px_50px_rgba(0,0,0,0.55)] flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <div className="h-9 w-9 rounded-2xl bg-emerald-500/80 flex items-center justify-center shadow-lg">
                  <span className="text-sm font-bold">S</span>
                </div>
                <h3 className="text-lg font-semibold">For Students</h3>
              </div>
              <p className="text-xs text-slate-200/90 mb-4">
                Apne hi school ke trusted teachers se courses buy karo, notes
                download karo aur tests attempt karke apni prep strong banao.
              </p>
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <Link
                to="/courses"
                className="
                  inline-flex items-center justify-center
                  px-4 py-2.5 text-sm font-semibold
                  rounded-full
                  bg-emerald-500 hover:bg-emerald-600
                  shadow-lg shadow-emerald-500/40
                  transition-transform hover:-translate-y-0.5
                "
              >
                Browse Courses
              </Link>
              <div className="flex gap-2">
                <Link
                  to="/login"
                  className="
                    flex-1 inline-flex items-center justify-center
                    px-3 py-2 text-xs font-semibold
                    rounded-full
                    bg-white/5 hover:bg-slate-900/40
                    border border-slate-100/50
                    transition-transform hover:-translate-y-0.5
                  "
                >
                  Student Login
                </Link>
                <Link
                  to="/signup"
                  className="
                    flex-1 inline-flex items-center justify-center
                    px-3 py-2 text-xs font-semibold
                    rounded-full
                    bg-white/5 hover:bg-slate-900/40
                    border border-slate-100/50
                    transition-transform hover:-translate-y-0.5
                  "
                >
                  Student Signup
                </Link>
              </div>
              <p className="text-[11px] text-slate-300 mt-1">
                Access only for students of your school.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ui;
