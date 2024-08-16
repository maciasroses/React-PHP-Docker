import { Navigate, Outlet } from "react-router-dom";
import { HomePage } from "../../pages/Admin";

export const AdminRoutes = [
  {
    path: "/admin",
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" />,
      },
      {
        path: "dashboard",
        element: <HomePage />,
      },
      {
        path: "user",
        element: <div>Users</div>,
      },
      {
        path: "accounting",
        element: <div>Accountings</div>,
      },
      {
        path: "*",
        element: <div>Not found</div>,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/admin/dashboard" />,
  },
];
