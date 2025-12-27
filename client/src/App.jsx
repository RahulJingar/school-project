import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store"; // ← Redux store

import Ui from "./ui/Ui";
import TeacherLogin from "./controller/TeacherLogin";
import TeacherSignup from "./controller/TeacherSignup";
import TeacherDashboard from "./controller/TeacherDashboard";
import TeacherReset from "./controller/TeacherReset";
import Forget from "./controller/Forget";
import EditTeacherCourse from "./controller/EditTeacherCourse";
import UserSignup from "./controller/UserSignup";
import UserLogin from "./controller/UserLogin";
import AdminSignup from "./adminController/AdminSignup";
import AdminLogin from "./adminController/AdminLogin";
import AllData from "./adminController/AllData";

import StudentCourses from "./studentController/StudentCourses";
import StudentCourseDetail from "./studentController/StudentCourseDetail";
import StudentPayment from "./studentController/StudentPayment";
import PaymentSuccess from "./studentController/PaymentSuccess";
import StudentMyCourses from "./studentController/StudentMyCourses";
import AdminProtectedRoute from "./customhook/AdminProtectedRoute";
import TeacherProtectedRoute from "./customhook/TeacherProtectedRoute";
import StudentProtectedRoute from "./customhook/StudentProtectedRoute";
import StudentForget from "./studentController/StudentForget";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Ui />} />
          <Route path="/admin/signup" element={<AdminSignup />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <AdminProtectedRoute>
                <AllData />
              </AdminProtectedRoute>
            }
          />

          <Route path="/teacher/signup" element={<TeacherSignup />} />
          <Route path="/teacher/login" element={<TeacherLogin />} />
          <Route path="/teacher/reset" element={<TeacherReset />} />
            <Route path="/teacher/forget" element={<Forget />} />
          <Route
            path="/teacher/dashboard"
            element={
              <TeacherProtectedRoute>
                <TeacherDashboard />
              </TeacherProtectedRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <TeacherProtectedRoute>
                <EditTeacherCourse />
              </TeacherProtectedRoute>
            }
          />

          <Route path="/student/signup" element={<UserSignup />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/student/forgot" element={<StudentForget />} />

          <Route
            path="/courses"
            element={
           
                <StudentCourses />
             
            }
          />
          <Route
            path="/courses/:id"
            element={
              <StudentProtectedRoute>
                <StudentCourseDetail />
              </StudentProtectedRoute>
            }
          />
          <Route
            path="/payment"
            element={
              <StudentProtectedRoute>
                <StudentPayment />
              </StudentProtectedRoute>
            }
          />
          <Route
            path="/payment-success"
            element={
              <StudentProtectedRoute>
                <PaymentSuccess />
              </StudentProtectedRoute>
            }
          />
          <Route
            path="/my-courses"
            element={
              <StudentProtectedRoute>
                <StudentMyCourses />
              </StudentProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
