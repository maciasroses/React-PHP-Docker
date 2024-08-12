import { HomePage } from "../../pages/Admin";
import { NotFoundPage } from "../../pages";

const allRoutes = {
  home: { name: "Home", path: "/dashboard", element: <HomePage /> },
  notFound: { name: "Not Found", path: "404", element: <NotFoundPage /> },
};

export const routes = {
  allRoutes,
};
