import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store/store';  // ← Redux store

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

const App = () => {
  return (
    <Provider store={store}>  {/* ← Redux Provider */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Ui />} />

          <Route path="/teacher/login" element={<TeacherLogin />} />
          <Route path="/teacher/signup" element={<TeacherSignup />} />
          <Route path="/teacher/reset" element={<TeacherReset />} />
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="/edit/:id" element={<EditTeacherCourse />} />

          <Route path="/student/signup" element={<UserSignup />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/forget" element={<Forget />} />

          <Route path="/admin/signup" element={<AdminSignup />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AllData />} />

          <Route path="/courses" element={<StudentCourses />} />
          <Route path="/courses/:id" element={<StudentCourseDetail />} />
          <Route path="/payment" element={<StudentPayment />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/my-courses" element={<StudentMyCourses />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
