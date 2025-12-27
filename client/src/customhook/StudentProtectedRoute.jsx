import { Navigate } from "react-router-dom";

const StudentProtectedRoute=({children})=>{
  const studentAuth=localStorage.getItem('loggedInUser');
  if(!studentAuth){
    return <Navigate to="/courses" />
  }
  return children;
}

export default StudentProtectedRoute;