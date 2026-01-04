import { createBrowserRouter } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/dashboard",
    lazy: async () => {
        const Dashboard = (await import("./pages/dashboard")).default;
        return { Component: Dashboard };
      },
  },
]);

export default router;
