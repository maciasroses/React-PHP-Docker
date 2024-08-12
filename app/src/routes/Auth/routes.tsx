import { HomePage, AccountingPage } from "../../pages/Auth";
import { NotFoundPage } from "../../pages";

const allRoutes = {
  home: { name: "Home", path: "/home", element: <HomePage /> },
  accounting: {
    name: "Accounting",
    path: "/accounting",
    element: <AccountingPage />,
  },
  notFound: { name: "Not Found", path: "404", element: <NotFoundPage /> },
};

export const routes = {
  allRoutes,
};
