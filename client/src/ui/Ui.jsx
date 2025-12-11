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
        // Education / classroom style image rakh
        backgroundImage:
          "url('https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg')",
      }}
    >
      {/* Soft dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-indigo-700/60" />

      {/* Content box */}
      <div
        className="
          relative z-10
          max-w-4xl w-full
          flex flex-col md:flex-row items-center gap-10
          text-slate-50
        "
      >
        {/* Left text area */}
        <div className="md:w-1/2">
          <span className="inline-flex items-center px-3 py-1 mb-4 rounded-full text-[11px] font-semibold tracking-[0.25em] bg-white/10 border border-white/20 uppercase">
            School Course Platform
          </span>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight mb-3">
            Buy school courses
            <span className="block text-indigo-300">
              directly from your teachers.
            </span>
          </h1>

          <p className="text-sm md:text-[15px] text-slate-200/85 mb-6">
            Notes, recorded classes, test series, aur doubt support ek hi jagah.
            Students course buy kar sakte hain aur teachers apne course easy
            panel se sell kar sakte hain.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-4">
            {/* Student CTA */}
            <Link
              to="/courses" // tu baad me ye route bana sakta hai
              className="
                inline-flex items-center justify-center
                px-6 py-2.5
                rounded-full
                bg-indigo-500 hover:bg-indigo-600
                text-sm font-semibold
                shadow-lg shadow-indigo-500/40
                transition-transform duration-150 hover:-translate-y-0.5
              "
            >
              Browse Courses
            </Link>

            {/* Teacher CTA */}
            <Link
              to="/teacher/login" // teacher auth ka route baad me
              className="
                inline-flex items-center justify-center
                px-6 py-2.5
                rounded-full
                border border-slate-100/60
                bg-white/5 hover:bg-slate-900/40
                text-sm font-semibold
                transition-transform duration-150 hover:-translate-y-0.5
              "
            >
              Sell Your Course
            </Link>
          </div>

          <p className="text-[11px] text-slate-300/80">
            For students of your school • Secure payments • Teacher-controlled pricing
          </p>
        </div>

        {/* Right small highlight card */}
        <div
          className="
            md:w-1/2
            max-w-sm w-full
            bg-white/10 backdrop-blur-2xl
            border border-white/15
            rounded-2xl
            p-5
            shadow-[0_18px_50px_rgba(0,0,0,0.6)]
          "
        >
          <h3 className="text-lg font-semibold mb-2">
            Why this platform?
          </h3>
          <ul className="space-y-2 text-sm text-slate-100/90">
            <li>• Students apne hi school teacher ka trusted course buy kar sakte hain.</li>
            <li>• Teacher apna syllabus-based course record karke sell kar sakti hai.</li>
            <li>• Notes, PDFs, tests aur leaderboard jaisa system add kiya ja sakta hai.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Ui;
