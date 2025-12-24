import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const UserSignup = () => {
  const [userSignup, setUserSignup] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // ✅ FIXED: signupUser → userSignup (line 17 was wrong!)
  const signupHandler = (e) => {
    setUserSignup({
      ...userSignup,  // Now uses correct state variable
      [e.target.name]: e.target.value
    });
  };

  const signupUser = async (e) => {
    e.preventDefault();

    // ✅ Validation before API call
    if (!userSignup.name || !userSignup.email || !userSignup.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(
        "http://127.0.0.1:2727/schoolUser/signup",
        userSignup
      );

      console.log(">>>res>>", res.data);

      localStorage.setItem(
        "currentStudentDraft",
        JSON.stringify(res.data || userSignup)
      );

      alert("Student signup successfully");
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      alert("Signup failed: " + (error.response?.data?.message || "Try again"));
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center px-4"
      style={{
        backgroundImage:
        "url('https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg')",
      }}
    >
      <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" />

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-6 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-emerald-400">
            School Student Portal
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white">
            Student Sign Up
          </h1>
          <p className="mt-1 text-xs text-slate-300">
            Naya school account banayein aur apne online classroom se juden.
          </p>
        </div>

        <div className="bg-slate-900/80 border border-white/10 rounded-3xl shadow-2xl p-6">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-lime-500 flex items-center justify-center shadow-xl">
              <span className="text-white text-2xl font-bold">S</span>
            </div>
          </div>

          <form className="space-y-4" onSubmit={signupUser}>
            <div>
              <label className="block text-xs font-medium text-slate-200 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={userSignup.name}
                onChange={signupHandler}
                required
                minLength={2}
                className="w-full px-3 py-2.5 rounded-2xl bg-slate-800/80 border border-slate-600 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-200 mb-1">
                School Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="student.name@school.com"
                value={userSignup.email}
                onChange={signupHandler}
                required
                className="w-full px-3 py-2.5 rounded-2xl bg-slate-800/80 border border-slate-600 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-200 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Create a strong password"
                value={userSignup.password}
                onChange={signupHandler}
                required
                minLength={6}
                className="w-full px-3 py-2.5 rounded-2xl bg-slate-800/80 border border-slate-600 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div className="text-[11px] text-slate-400">
              Password kam se kam 6 characters ka ho, numbers aur letters ka
              use karein.
            </div>

            <button
              type="submit"
              className="w-full mt-1 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-lime-500 text-white text-sm font-semibold shadow-lg hover:from-emerald-600 hover:to-lime-600 transition-all duration-150"
            >
              Creating account...
            </button>
          </form>

          <p className="mt-4 text-[11px] text-center text-slate-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-emerald-400 hover:text-emerald-300 font-medium"
            >
              Login here
            </Link>
          </p>
        </div>

        <p className="mt-4 text-[10px] text-center text-slate-500">
          Signup karke aap school ke terms, privacy policy aur online class
          rules se sehmat hote hain.
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
