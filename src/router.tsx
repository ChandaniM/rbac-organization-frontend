import { createBrowserRouter, redirect } from "react-router-dom";
const router = createBrowserRouter([
    {
    path: "/",
    loader: () => redirect("/auth/login"),
  },
  {
    path: "/dashboard",
    lazy: async () => {
        const Dashboard = (await import("./pages/dashboard")).default;
        return { Component: Dashboard };
      },
  },
 {
  path: "auth/:type",
  lazy: async () => {
    const AuthPage = (await import("./pages/auth")).default;
    return { Component: AuthPage };
  },
}

]);

export default router;
