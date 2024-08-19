import { Card404 } from "@/components";
import { Navigate, Outlet } from "react-router-dom";
import {
  HomePage,
  UsersPage,
  AddUserPage,
  UsersLayout,
  EditUserPage,
  DetailUserPage,
  AccountingPage,
  AccountingLayout,
  AddAccountingPage,
  EditAccountingPage,
  DetailAccountingPage,
} from "@/pages/Admin";

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
        path: "users",
        element: <UsersLayout />,
        children: [
          {
            index: true,
            element: <UsersPage />,
          },
          {
            path: "add",
            element: <AddUserPage />,
          },
          {
            path: ":id",
            element: <Outlet />,
            children: [
              {
                index: true,
                element: <DetailUserPage />,
              },
              {
                path: "edit",
                element: <EditUserPage />,
              },
            ],
          },
        ],
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
    element: <Navigate to="/admin/dashboard" />,
  },
];
