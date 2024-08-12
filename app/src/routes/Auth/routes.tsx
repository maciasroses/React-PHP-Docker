import { Navigate, Outlet } from "react-router-dom";
import { HomePage, AccountingPage } from "../../pages/Auth";

export const AuthRoutes = [
  {
    path: "/auth",
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <Navigate to="home" />,
      },
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "accounting",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <AccountingPage />,
          },
        ],
      },
      {
        path: "*",
        element: <div>Not found</div>,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/auth/home" />,
  },
];
