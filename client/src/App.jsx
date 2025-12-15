import React from 'react'
import UserSignup from './controller/UserSignup'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import UserLogin from './controller/UserLogin';
import Ui from './ui/Ui';
import Courses from './controller/Courses';
import TeacherLogin from './controller/TeacherLogin';
import TeacherSignup from './controller/TeacherSignup';
import TeacherDashboard from './controller/TeacherDashboard';
import TeacherReset from './controller/TeacherReset';
import Forget from './controller/Forget';
import EditTeacherCourse from './controller/EditTeacherCourse';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Ui/>}/>
          <Route path="/courses" element={<Courses/>}/>
          <Route path="/teacher/login" element={<TeacherLogin />} />
          <Route path="/teacher/signup" element={<TeacherSignup />} />
          <Route path="/teacher/reset" element={<TeacherReset />} />
          <Route path="/signup" element={<UserSignup/>}/>
          <Route path="/login" element={<UserLogin/>}/>
          <Route path="/teacher/dashboard" element={<TeacherDashboard/>}/>
          <Route path="/forget" element={<Forget/>}/>
          <Route path="/edit/:id" element={<EditTeacherCourse/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
