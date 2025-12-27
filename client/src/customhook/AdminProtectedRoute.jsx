import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const isAuth = localStorage.getItem("loggedInUser");

  if (!isAuth) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};

export default AdminProtectedRoute;
