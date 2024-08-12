import { useAuth } from "../hooks";
import { Loading } from "../components";
import { useRoutes } from "react-router-dom";
import { SiteRoutes, AuthRoutes, AdminRoutes } from "./index";
import { Footer, Header, Sidebar } from "../pages/Auth/components";

export default function AppRouter() {
  const { user, isFetching } = useAuth();

  const routes = useRoutes(
    !user ? SiteRoutes : user.role !== "admin" ? AuthRoutes : AdminRoutes
  );

  if (isFetching)
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center gap-2">
        <Loading color="blue" size={"size-[5rem]"} />
        <h1 className="text-4xl">Loading...</h1>
      </div>
    );

  return (
    <>
      {!user ? (
        <main className="w-full max-w-[1440px] mx-auto">{routes}</main>
      ) : (
        <>
          {user.role === "admin" ? (
            <div>
              <h1>Admin Header</h1>
            </div>
          ) : (
            <Header />
          )}
          <main className="w-full max-w-[1440px] mx-auto">
            {user.role === "admin" ? (
              <div>
                <h1>Admin Sidebar</h1>
              </div>
            ) : (
              <Sidebar />
            )}
            <section className="sm:ml-48 mt-20 p-4 bg-gray-200 dark:bg-gray-900 h-[2000px]">
              {routes}
            </section>
          </main>
          {user.role === "admin" ? (
            <div>
              <h1>Admin Footer</h1>
            </div>
          ) : (
            <Footer />
          )}
        </>
      )}
    </>
  );
}
