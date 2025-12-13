import React, { useState } from "react";
import axios from "axios";

const Forget = () => {
  const [forgetData, setForgetData] = useState({
    email: "",
    newPassword: "",
  });

  const forgetHandler = async (e) => {
    e.preventDefault();
    if (!(forgetData.email && forgetData.newPassword)) {
      alert("all input field are requires");
      return;
    } else {
      alert("forget successfully");
    }

    const res = await axios.patch(
      "http://127.0.0.1:2727/schoolTeacher/teacherForget",
      forgetData
    );

    console.log(`>>>>res>>>>`, res.data);
  };

  const forgetHandle = (e) => {
    setForgetData({
      ...forgetData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center px-4 py-10">
      <div className="max-w-4xl w-full flex flex-col md:flex-row gap-8">
        {/* Left: Teacher vibe panel */}
        <div className="md:w-1/2 bg-white/5 backdrop-blur-2xl border border-white/15 rounded-3xl p-8 text-slate-50 shadow-2xl flex flex-col justify-between">
          <div>
            <span className="inline-flex items-center px-3 py-1 mb-4 rounded-full text-[11px] font-semibold tracking-[0.25em] bg-white/10 border border-white/20 uppercase">
              Teacher Access
            </span>
            <h2 className="text-2xl md:text-3xl font-semibold mb-3">
              Forgot your staff password?
            </h2>
            <p className="text-sm text-slate-200/85">
              Ye page sirf school teachers ke liye hai. Yahan se aap apna
              password securely reset kar sakte hain aur phir se apna dashboard
              open kar sakte hain.
            </p>
          </div>

          <ul className="mt-6 space-y-2 text-sm text-slate-100/90">
            <li>• Staff email use karein jo aapne signup ke time diya tha.</li>
            <li>• Strong naya password set karein jo students ke sath share na ho.</li>
            <li>• Reset ke baad Teacher Login se dubara sign in karein.</li>
          </ul>

          <p className="mt-6 text-xs text-slate-400 border-t border-white/10 pt-4">
            Note: Agar aapko email ya account yaad nahi hai, to school admin se
            contact karein.
          </p>
        </div>

        {/* Right: Original form, styled */}
        <div className="md:w-1/2 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-[0_18px_50px_rgba(0,0,0,0.65)]">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">
            Teacher Password Reset
          </h1>

          <form onSubmit={forgetHandler} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-2">
                Registered Email
              </label>
              <input
                type="text"
                placeholder="enter the email"
                name="email"
                value={forgetData.email}
                onChange={forgetHandle}
                className="w-full px-4 py-3 bg-white/15 border border-white/30 rounded-2xl text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-2">
                New Password
              </label>
              <input
                type="text"
                placeholder="enter the new password"
                name="newPassword"
                value={forgetData.newPassword}
                onChange={forgetHandle}
                className="w-full px-4 py-3 bg-white/15 border border-white/30 rounded-2xl text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
              />
            </div>

            <button
              className="w-full mt-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-3.5 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-200"
            >
              Forget
            </button>
          </form>

          <p className="text-xs text-slate-400 text-center mt-5">
            Ye reset sirf teacher accounts ke liye hai. Student password
            ke liye alag portal ka use karein.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Forget;
