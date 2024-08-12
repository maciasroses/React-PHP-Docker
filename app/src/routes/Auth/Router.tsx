import { routes } from "./routes";
import { useAuth } from "../../hooks/useAuth";
import { Route, Routes, Navigate } from "react-router-dom";
import { Footer, Header, Sidebar } from "../../pages/Auth/components";
import type { IAllRoutes } from "../../interfaces";

const Router = () => {
  const { user, isFetching } = useAuth();
  const { notFound, ...allRoutes }: IAllRoutes = routes.allRoutes;

  return (
    <>
      {isFetching ? (
        <div>Loading...</div>
      ) : (
        <>
          <Header />
          <main className="w-full max-w-[1440px] mx-auto">
            <Sidebar />
            <section className="sm:ml-48 mt-20 p-4 bg-gray-200 dark:bg-gray-900 h-[2000px]">
              <Routes>
                {Object.keys(allRoutes).map((route) => {
                  if (!user) {
                    return (
                      <Route
                        key={route}
                        path={allRoutes[route].path}
                        element={<Navigate to="/login" />}
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
            </section>
          </main>
          <Footer />
        </>
      )}
    </>
  );
};

export default Router;
