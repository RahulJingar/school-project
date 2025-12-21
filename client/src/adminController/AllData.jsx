// src/adminController/AllData.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllData = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const token = localStorage.getItem("adminToken");
  const currentAdmin = JSON.parse(localStorage.getItem("currentAdmin") || "{}");

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }

    const fetchAll = async () => {
      try {
        setLoading(true);
        setErrorMsg("");

        const headers = { Authorization: `Bearer ${token}` };

        const [stuRes, teaRes, couRes] = await Promise.all([
          axios.get("http://127.0.0.1:2727/admin/students", { headers }),
          axios.get("http://127.0.0.1:2727/admin/teachers", { headers }),
          axios.get("http://127.0.0.1:2727/admin/courses", { headers }),
        ]);

        setStudents(stuRes.data.data || []);
        setTeachers(teaRes.data.data || []);
        setCourses(couRes.data.data || []);
      } catch (err) {
        console.error(">>> AllData fetch error >>>", err);
        setErrorMsg(
          err?.response?.data?.message || "Data load nahi ho paaya, try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [token, navigate]);

  if (!token) return null;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <div className="h-10 w-10 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-slate-100 text-sm">Loading all data...</p>
        </div>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100">
        <div className="bg-slate-900 border border-red-500/60 rounded-3xl px-8 py-6 text-center max-w-md shadow-2xl">
          <h2 className="text-xl font-semibold text-red-400 mb-2">
            Something went wrong
          </h2>
          <p className="text-sm mb-4">{errorMsg}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2 rounded-2xl text-sm font-semibold bg-slate-800 hover:bg-slate-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* solid top bar */}
      <div className="border-b border-slate-800 bg-slate-900/95 backdrop-blur sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-lg">
              <span className="text-slate-950 text-lg font-bold">A</span>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">
                School Admin
              </p>
              <h1 className="text-xl md:text-2xl font-semibold text-white">
                Dashboard
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {currentAdmin?.name && (
              <div className="hidden sm:block text-right">
                <p className="text-sm font-semibold text-white">
                  {currentAdmin.name}
                </p>
                <p className="text-[11px] text-slate-400">
                  {currentAdmin.email}
                </p>
              </div>
            )}
            <button
              onClick={() => {
                localStorage.removeItem("adminToken");
                localStorage.removeItem("currentAdmin");
                navigate("/admin/login");
              }}
              className="px-4 py-2 rounded-2xl text-xs font-semibold bg-red-500 hover:bg-red-600 text-white shadow-md"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* main content */}
      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        {/* Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-md">
            <p className="text-xs text-slate-400 mb-1">Total Students</p>
            <p className="text-2xl font-bold text-emerald-300">
              {students.length}
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              Active registered students.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-md">
            <p className="text-xs text-slate-400 mb-1">Total Teachers</p>
            <p className="text-2xl font-bold text-cyan-300">
              {teachers.length}
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              Verified teachers in system.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-md">
            <p className="text-xs text-slate-400 mb-1">Total Courses</p>
            <p className="text-2xl font-bold text-amber-300">
              {courses.length}
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              Draft + published courses.
            </p>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Students */}
          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-white">Students</h2>
              <span className="text-[11px] text-slate-400">
                {students.length} records
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-[11px]">
                <thead className="bg-slate-800">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-slate-100">
                      Name
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-slate-100">
                      Email
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-slate-100">
                      Created
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s) => (
                    <tr
                      key={s._id}
                      className="border-b border-slate-800 hover:bg-slate-800/70"
                    >
                      <td className="px-3 py-2">{s.name}</td>
                      <td className="px-3 py-2 text-slate-100">{s.email}</td>
                      <td className="px-3 py-2 text-slate-400">
                        {s.createdAt
                          ? new Date(s.createdAt).toLocaleDateString()
                          : "-"}
                      </td>
                    </tr>
                  ))}
                  {students.length === 0 && (
                    <tr>
                      <td
                        colSpan={3}
                        className="px-3 py-3 text-center text-slate-400"
                      >
                        No students found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* Teachers */}
          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-white">Teachers</h2>
              <span className="text-[11px] text-slate-400">
                {teachers.length} records
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-[11px]">
                <thead className="bg-slate-800">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-slate-100">
                      Name
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-slate-100">
                      Email
                    </th>
                    <th className="px-3 py-2 text-left font-semibold text-slate-100">
                      Subject
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.map((t) => (
                    <tr
                      key={t._id}
                      className="border-b border-slate-800 hover:bg-slate-800/70"
                    >
                      <td className="px-3 py-2">{t.name}</td>
                      <td className="px-3 py-2 text-slate-100">{t.email}</td>
                      <td className="px-3 py-2 text-slate-100">
                        {t.subject || "-"}
                      </td>
                    </tr>
                  ))}
                  {teachers.length === 0 && (
                    <tr>
                      <td
                        colSpan={3}
                        className="px-3 py-3 text-center text-slate-400"
                      >
                        No teachers found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Courses */}
        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-white">Courses</h2>
            <span className="text-[11px] text-slate-400">
              {courses.length} records
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-[11px]">
              <thead className="bg-slate-800">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold text-slate-100">
                    Title
                  </th>
                  <th className="px-3 py-2 text-left font-semibold text-slate-100">
                    Teacher
                  </th>
                  <th className="px-3 py-2 text-left font-semibold text-slate-100">
                    Price
                  </th>
                 
                </tr>
              </thead>
              <tbody>
                {courses.map((c) => (
                  <tr
                    key={c._id}
                    className="border-b border-slate-800 hover:bg-slate-800/70"
                  >
                    <td className="px-3 py-2">{c.title}</td>
                    <td className="px-3 py-2 text-slate-100">
                      {c.teacher?.name || c.teacherName || "-"}
                    </td>
                    <td className="px-3 py-2 text-slate-100">
                      ₹{c.price != null ? c.price : "-"}
                    </td>
                   
                  </tr>
                ))}
                {courses.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-3 py-3 text-center text-slate-400"
                    >
                      No courses found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AllData;
