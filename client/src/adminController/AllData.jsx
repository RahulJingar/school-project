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
          <p className="text-slate-200 text-sm">Loading all data...</p>
        </div>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="bg-slate-900/80 border border-red-500/40 rounded-3xl px-8 py-6 text-center max-w-md">
          <h2 className="text-xl font-semibold text-red-400 mb-2">
            Something went wrong
          </h2>
          <p className="text-slate-300 text-sm mb-4">{errorMsg}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2 rounded-2xl text-sm font-semibold bg-slate-800 text-slate-100 hover:bg-slate-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 px-4 py-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold">
              Admin Overview
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              All students, teachers and courses in one place.
            </p>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem("adminToken");
              localStorage.removeItem("currentAdmin");
              navigate("/admin/login");
            }}
            className="px-4 py-2 rounded-2xl text-xs font-semibold bg-red-500/80 hover:bg-red-600 text-white"
          >
            Logout
          </button>
        </header>

        {/* Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-900/80 border border-slate-700 rounded-2xl p-4">
            <p className="text-xs text-slate-400 mb-1">Total Students</p>
            <p className="text-2xl font-bold text-emerald-300">
              {students.length}
            </p>
          </div>
          <div className="bg-slate-900/80 border border-slate-700 rounded-2xl p-4">
            <p className="text-xs text-slate-400 mb-1">Total Teachers</p>
            <p className="text-2xl font-bold text-indigo-300">
              {teachers.length}
            </p>
          </div>
          <div className="bg-slate-900/80 border border-slate-700 rounded-2xl p-4">
            <p className="text-xs text-slate-400 mb-1">Total Courses</p>
            <p className="text-2xl font-bold text-amber-300">
              {courses.length}
            </p>
          </div>
        </section>

        {/* Students table */}
        <section className="bg-slate-900/80 border border-slate-700 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Students</h2>
            <span className="text-[11px] text-slate-400">
              Showing {students.length} records
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs">
              <thead className="bg-slate-800">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold">Name</th>
                  <th className="px-3 py-2 text-left font-semibold">Email</th>
                  <th className="px-3 py-2 text-left font-semibold">Created</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr
                    key={s._id}
                    className="border-b border-slate-800 hover:bg-slate-800/60"
                  >
                    <td className="px-3 py-2">{s.name}</td>
                    <td className="px-3 py-2">{s.email}</td>
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

        {/* Teachers table */}
        <section className="bg-slate-900/80 border border-slate-700 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Teachers</h2>
            <span className="text-[11px] text-slate-400">
              Showing {teachers.length} records
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs">
              <thead className="bg-slate-800">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold">Name</th>
                  <th className="px-3 py-2 text-left font-semibold">Email</th>
                  <th className="px-3 py-2 text-left font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((t) => (
                  <tr
                    key={t._id}
                    className="border-b border-slate-800 hover:bg-slate-800/60"
                  >
                    <td className="px-3 py-2">{t.name}</td>
                    <td className="px-3 py-2">{t.email}</td>
                    <td className="px-3 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-[10px] ${
                          t.status === "approved"
                            ? "bg-emerald-500/20 text-emerald-300"
                            : "bg-amber-500/20 text-amber-300"
                        }`}
                      >
                        {t.status || "pending"}
                      </span>
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

        {/* Courses table */}
        <section className="bg-slate-900/80 border border-slate-700 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Courses</h2>
            <span className="text-[11px] text-slate-400">
              Showing {courses.length} records
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs">
              <thead className="bg-slate-800">
                <tr>
                  <th className="px-3 py-2 text-left font-semibold">Title</th>
                  <th className="px-3 py-2 text-left font-semibold">Teacher</th>
                  <th className="px-3 py-2 text-left font-semibold">Price</th>
                  <th className="px-3 py-2 text-left font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((c) => (
                  <tr
                    key={c._id}
                    className="border-b border-slate-800 hover:bg-slate-800/60"
                  >
                    <td className="px-3 py-2">{c.title}</td>
                    <td className="px-3 py-2">
                      {c.teacher?.name || c.teacherName || "-"}
                    </td>
                    <td className="px-3 py-2">
                      ₹{c.price != null ? c.price : "-"}
                    </td>
                    <td className="px-3 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-[10px] ${
                          c.status === "published"
                            ? "bg-emerald-500/20 text-emerald-300"
                            : "bg-slate-500/30 text-slate-200"
                        }`}
                      >
                        {c.status || "draft"}
                      </span>
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
