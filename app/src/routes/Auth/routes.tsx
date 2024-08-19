import { Navigate, Outlet } from "react-router-dom";
import {
  HomePage,
  AccountingPage,
  AccountingLayout,
  AddAccountingPage,
  EditAccountingPage,
  DetailAccountingPage,
} from "@/pages/Auth";
import { Card404 } from "@/components";

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
        element: <AccountingLayout />,
        children: [
          {
            index: true,
            element: <AccountingPage />,
          },
          {
            path: "add",
            element: <AddAccountingPage />,
          },
          {
            path: ":id",
            element: <Outlet />,
            children: [
              {
                index: true,
                element: <DetailAccountingPage />,
              },
              {
                path: "edit",
                element: <EditAccountingPage />,
              },
            ],
          },
        ],
      },
      {
        path: "*",
        element: (
          <Card404
            title="Page not found"
            description="The page you are looking for does not exist"
          />
        ),
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/auth/home" />,
  },
];
