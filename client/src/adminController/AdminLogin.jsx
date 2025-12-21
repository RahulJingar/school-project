import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const body = {
        email: form.email,
        password: form.password,
      };

      const res = await axios.post(
        "http://127.0.0.1:2727/admin/adminLogin",
        body
      );

      console.log(">>> admin login res >>>", res.data);

      // yaha se token + admin data store
      if (res.data.token) {
        localStorage.setItem("adminToken", res.data.token);
      }
      if (res.data.adminUser) {
        localStorage.setItem(
          "currentAdmin",
          JSON.stringify(res.data.adminUser)
        );
      }

      alert("Admin login successful");
      navigate("/admin/dashboard"); // admin dashboard route
    } catch (err) {
      console.error(">>> adminLogin error >>>", err);
      const msg = err?.response?.data?.message || "Login failed";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="max-w-md w-full bg-slate-900/80 border border-slate-700 rounded-3xl shadow-2xl p-8">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-white mb-1">
            Admin Login
          </h1>
          <p className="text-xs text-slate-400">
            Sirf approved admin ko hi iss panel ka access milega.
          </p>
        </div>

        <form className="space-y-4" onSubmit={submitHandler}>
          <div>
            <label className="block text-xs text-slate-300 mb-1">
              Email address
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={changeHandler}
              required
              className="w-full px-3 py-2 rounded-2xl bg-slate-800 border border-slate-600 text-sm text-slate-100 outline-none focus:ring-2 focus:ring-red-500"
              placeholder="admin@school.com"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-300 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={changeHandler}
              required
              className="w-full px-3 py-2 rounded-2xl bg-slate-800 border border-slate-600 text-sm text-slate-100 outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 inline-flex items-center justify-center px-4 py-2.5 rounded-2xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold shadow-lg shadow-red-500/40 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login as Admin"}
          </button>
        </form>

        <p className="mt-4 text-[11px] text-slate-400 text-center">
          First time here?{" "}
          <Link
            to="/admin/signup"
            className="text-red-400 hover:text-red-300 font-medium"
          >
            Create admin account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
