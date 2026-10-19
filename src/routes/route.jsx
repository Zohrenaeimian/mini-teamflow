import { createBrowserRouter, Navigate } from "react-router-dom";
import Layout from "../layout/Layout";
import DashboardPage from "../pages/DashboardPage";
import TasksPage from "../pages/TasksPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "tasks",
        element: <TasksPage />,
      },
    ],
  },
]);
