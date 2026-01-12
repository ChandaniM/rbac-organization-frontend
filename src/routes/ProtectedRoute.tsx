import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  localStorage.setItem("token", "true");
  const token = localStorage.getItem("token");
  console.log("token:", token);

  if (!token) {
    return <Navigate to='/auth/login' replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
