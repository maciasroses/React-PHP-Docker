import { routes } from "./routes";
import { useAuth } from "../../hooks/useAuth";
import { Route, Routes, Navigate } from "react-router-dom";
import type { IAllRoutes } from "../../interfaces";

const Router = () => {
  const { user, isFetching } = useAuth();
  const { notFound, ...allRoutes }: IAllRoutes = routes.allRoutes;

  return (
    <main className="w-full max-w-[1440px] mx-auto">
      {isFetching ? (
        <div>Loading...</div>
      ) : (
        <>
          <Routes>
            {Object.keys(allRoutes).map((route) => {
              if ((route === "login" || route === "signup") && user) {
                return (
                  <Route
                    key={route}
                    path={allRoutes[route].path}
                    element={
                      <Navigate
                        to={
                          user.role === "admin"
                            ? "/admin/dashboard"
                            : "/auth/home"
                        }
                      />
                    }
                  />
                );
              }
              return (
                <Route
                  key={route}
                  path={allRoutes[route].path}
                  element={allRoutes[route].element}
                />
              );
            })}
            <Route path="*" element={notFound.element} />
          </Routes>
        </>
      )}
    </main>
  );
};

export default Router;
