import { Navigate } from "react-router-dom";

const TeacherProtectedRoute = ({ children }) => {
  const isAuth = localStorage.getItem("loggedInUser");

  if (!isAuth) {
    return <Navigate to="/teacher/dashboard" />;
  }

  return children;
};

export default TeacherProtectedRoute;
