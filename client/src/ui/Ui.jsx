import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Ui = () => {
  const [adminExists, setAdminExists] = useState(false);
  const [loadingAdmin, setLoadingAdmin] = useState(true);

  // OPTIONAL: check from backend if any admin already exists
  useEffect(() => {
    const checkAdmin = async () => {
      try {
        // simple GET: backend me /admin/adminExists jaisa ek route bana sakta hai
        const res = await axios.get("http://127.0.0.1:2727/admin/adminExists");
        setAdminExists(res.data.exists); // { exists: true/false }
      } catch (err) {
        console.error(">>> adminExists error >>>", err);
      } finally {
        setLoadingAdmin(false);
      }
    };
    checkAdmin();
  }, []);

  return (
    <div
      className="
        min-h-screen w-full
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
            One platform for admin,
            <span className="block text-indigo-300">
              teachers & students of your school.
            </span>
          </h1>

          <p className="text-sm md:text-[15px] text-slate-200/85 mb-6">
            Admin pura system control kare, teachers apne courses manage karein
            aur students trusted content se padhai karein – sab kuch ek hi
            jagah se.
          </p>

          <p className="text-[11px] text-slate-300/80">
            Single admin • Teacher approval system • Open student signup
          </p>
        </div>

        {/* RIGHT: 3 role cards */}
        <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Admin block */}
          <div className="bg-white/14 backdrop-blur-2xl border border-white/25 rounded-2xl p-5 shadow-[0_18px_50px_rgba(0,0,0,0.65)] flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <div className="h-9 w-9 rounded-2xl bg-red-500/85 flex items-center justify-center shadow-lg">
                  <span className="text-sm font-bold">A</span>
                </div>
                <h3 className="text-lg font-semibold">Admin Panel</h3>
              </div>
              <p className="text-xs text-slate-200/90 mb-4">
                Sirf ek hi admin account allowed. Admin teachers ko approve
                karega, courses monitor karega aur students ka overall data
                dekh sakega.
              </p>
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <Link
                to="/admin/login"
                className="
                  inline-flex items-center justify-center
                  px-4 py-2.5 text-sm font-semibold
                  rounded-full
                  bg-red-500 hover:bg-red-600
                  shadow-lg shadow-red-500/40
                  transition-transform hover:-translate-y-0.5
                "
              >
                Admin Login
              </Link>

              {/* Admin signup – sirf tab enable jab adminExists false ho */}
              <button
                disabled={adminExists || loadingAdmin}
                onClick={() => {
                  if (!adminExists) {
                    window.location.href = "/admin/signup";
                  }
                }}
                className={`
                  inline-flex items-center justify-center
                  px-4 py-2.5 text-xs font-semibold
                  rounded-full
                  border border-slate-100/60
                  transition-transform
                  ${
                    adminExists || loadingAdmin
                      ? "bg-slate-600/60 text-slate-300 cursor-not-allowed"
                      : "bg-white/5 hover:bg-slate-900/40 hover:-translate-y-0.5"
                  }
                `}
              >
                {loadingAdmin
                  ? "Checking admin..."
                  : adminExists
                  ? "Admin already created"
                  : "Create Admin Account"}
              </button>
            </div>
          </div>

          {/* Teacher block */}
          <div className="bg-white/12 backdrop-blur-2xl border border-white/20 rounded-2xl p-5 shadow-[0_18px_50px_rgba(0,0,0,0.6)] flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <div className="h-9 w-9 rounded-2xl bg-indigo-500/80 flex items-center justify-center shadow-lg">
                  <span className="text-sm font-bold">T</span>
                </div>
                <h3 className="text-lg font-semibold">Teacher Space</h3>
              </div>
              <p className="text-xs text-slate-200/90 mb-4">
                Teacher signup karega, lekin account pehle <span className="font-semibold">Admin approval</span>{" "}
                se active hoga. Active hone ke baad hi courses create / manage
                kar paayega.
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
                Teacher Signup (Pending Approval)
              </Link>
            </div>
          </div>

          {/* Student block */}
          <div className="md:col-span-2 bg-white/10 backdrop-blur-2xl border border-white/15 rounded-2xl p-5 shadow-[0_18px_50px_rgba(0,0,0,0.55)] flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <div className="h-9 w-9 rounded-2xl bg-emerald-500/80 flex items-center justify-center shadow-lg">
                  <span className="text-sm font-bold">S</span>
                </div>
                <h3 className="text-lg font-semibold">Student Corner</h3>
              </div>
              <p className="text-xs text-slate-200/90 mb-4">
                Koi bhi student easily signup kar sakta hai, courses browse
                kar sakta hai aur apne school ke teachers ke courses buy karke
                padhai kar sakta hai.
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
                  to="/student/signup"
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
                Student signup hamesha open hai – koi approval required nahi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ui;
