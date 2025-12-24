
// src/controller/UserLogin.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  const [logindata, setLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const loginHandle = (e) => {
    setLoginData({
      ...logindata,
      [e.target.name]: e.target.value
    })
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    if (!(logindata.email && logindata.password)) {
      alert("Email aur password required hai");
      return;
    }

    const res = await axios.post(
      "http://127.0.0.1:2727/schoolUser/login",
      logindata
    );

    console.log(">>>Res>>", res.data);

    const token = res.data.token;
    const user = res.data.data;

    setLoginData({
      email: "",
      password: ""
    });

    localStorage.setItem("studentToken", token);
    localStorage.setItem("currentStudent", JSON.stringify(user));

    alert("Student login successfully");
    navigate("/courses"); 
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
          <p className="text-xs uppercase tracking-[0.25em] text-sky-400">
            School Student Portal
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white">
            Student Login
          </h1>
          <p className="mt-1 text-xs text-slate-300">
            Apne school account se login karke classes join karein.
          </p>
        </div>

        <div className="bg-slate-900/80 border border-white/10 rounded-3xl shadow-2xl p-6">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-500 flex items-center justify-center shadow-xl">
              <span className="text-white text-2xl font-bold">S</span>
            </div>
          </div>

          <form className="space-y-4" onSubmit={loginHandler}>
            <div>
              <label className="block text-xs font-medium text-slate-200 mb-1">
                School Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="student.name@school.com"
                value={logindata.email}
                onChange={loginHandle}
                className="w-full px-3 py-2.5 rounded-2xl bg-slate-800/80 border border-slate-600 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-200 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={logindata.password}
                onChange={loginHandle}
                className="w-full px-3 py-2.5 rounded-2xl bg-slate-800/80 border border-slate-600 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <button
                type="button"
                className="text-sky-400 hover:text-sky-300"
                onClick={() => navigate("/student/forgot")}
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full mt-1 py-2.5 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 text-white text-sm font-semibold shadow-lg hover:from-sky-600 hover:to-indigo-600 transition-all duration-150"
            >
              Login to Classroom
            </button>
          </form>

          <p className="mt-4 text-[11px] text-center text-slate-400">
            New student?{" "}
            <button
              type="button"
              onClick={() => navigate("/student/signup")}
              className="text-sky-400 hover:text-sky-300 font-medium"
            >
              Create school account
            </button>
          </p>
        </div>

        <p className="mt-4 text-[10px] text-center text-slate-500">
          By logging in, you agree to follow school rules and online
          classroom etiquette.
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
