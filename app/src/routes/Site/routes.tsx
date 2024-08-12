import { Navigate } from "react-router-dom";
import { HomePage, LoginPage, SignupPage } from "../../pages/Site";

export const SiteRoutes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "signup",
    element: <SignupPage />,
  },
  {
    path: "*",
    element: <Navigate to="/login" />,
  },
];
