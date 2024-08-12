import { HomePage, LoginPage, SignupPage } from "../../pages/Site";
import { NotFoundPage } from "../../pages";

const allRoutes = {
  home: { name: "Home", path: "/", element: <HomePage /> },
  login: { name: "Login", path: "/login", element: <LoginPage /> },
  signup: { name: "Signup", path: "/signup", element: <SignupPage /> },
  notFound: { name: "Not Found", path: "404", element: <NotFoundPage /> },
};

export const routes = {
  allRoutes,
};
