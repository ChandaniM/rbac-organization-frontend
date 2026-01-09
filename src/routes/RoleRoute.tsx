import { Navigate, Outlet } from "react-router-dom";

const RoleRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default RoleRoute;
