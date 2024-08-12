import { Routes, Route } from "react-router-dom";

import SiteRouter from "./Site/SiteRouter";
import AuthRouter from "./Auth/AuthRouter";
import AdminRouter from "./Admin/AdminRouter";

export default function AppRouter() {
  return (
    <Routes>
      <Route path={"/*"} element={<SiteRouter />}></Route>
      <Route path={"/auth/*"} element={<AuthRouter />}></Route>
      <Route path={"/admin/*"} element={<AdminRouter />}></Route>
    </Routes>
  );
}
