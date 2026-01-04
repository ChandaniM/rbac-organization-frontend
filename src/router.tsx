import { createBrowserRouter } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/dashboard",
    lazy: async () => {
        const Dashboard = (await import("./pages/dashboard")).default;
        return { Component: Dashboard };
      },
  },
  {
    path : "auth/login",
    lazy : async ()=>{
        const AuthPage  = (await import("./pages/auth")).default;
        return {Component : AuthPage }
    }
  }
]);

export default router;
