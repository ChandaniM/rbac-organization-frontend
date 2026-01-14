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
      {
        path: "/org-directory",
        lazy: async () => {
          const UserManagement = (await import("../pages/UserManagement"))
            .default;
          return { Component: UserManagement };
        },
      },
      {
        path: "/org-tree",
        lazy: async () => {
          const OrganizationTree = (await import("../pages/OrganizationTree"))
            .default;
          return { Component: OrganizationTree };
        },
      },
      {
        path: "/job-portal",
        lazy: async () => {
          const JobPortal = (await import("../pages/JobPortal"))
            .default;
          return { Component: JobPortal };
        },
      },
      {
        path: "/setting",
        lazy: async () => {
          const setting = (await import("../pages/setting"))
            .default;
          return { Component: setting };
        },
      },
    ],
  },
  {
    path: "auth/:type",
    lazy: async () => {
      const AuthPage = (await import("../pages/auth")).default;
      return { Component: AuthPage };
    },
  },
]);

export default router;
