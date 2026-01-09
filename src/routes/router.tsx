import { createBrowserRouter, redirect } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
const router = createBrowserRouter([
    {
    path: "/",
    loader: () => redirect("/auth/login"),
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        lazy: async () => {
          const Dashboard = (await import("../pages/dashboard")).default;
          return { Component: Dashboard };
        },
      },
    ]
  },
 {
  path: "auth/:type",
  lazy: async () => {
    const AuthPage = (await import("../pages/auth")).default;
    return { Component: AuthPage };
  },
}

]);

export default router;
