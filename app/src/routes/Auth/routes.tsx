import { Navigate, Outlet } from "react-router-dom";
import {
  HomePage,
  AccountingLayout,
  AccountingPage,
  AddAccountingPage,
  EditAccountingPage,
  DetailAccountingPage,
} from "../../pages/Auth";

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
        element: <div>Not found</div>,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/auth/home" />,
  },
];
