import { useAuth } from "../hooks";
import { useRoutes } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SiteRoutes, AuthRoutes, AdminRoutes } from "./index";
import { Loading, Footer, Header, Sidebar } from "../components";
import type { IUser } from "../interfaces";

export default function AppRouter() {
  const { t } = useTranslation();
  const lng = t("lang");
  const { user, isFetching } = useAuth();

  const routes = useRoutes(
    !user ? SiteRoutes : user.role !== "admin" ? AuthRoutes : AdminRoutes
  );

  if (isFetching)
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center gap-2">
        <Loading color="blue" size={"size-[5rem]"} />
        <h1 className="text-4xl">{lng === "en" ? "Loading" : "Cargando"}...</h1>
      </div>
    );

  return (
    <>
      <Header user={user as IUser} />
      {!user ? (
        <MainSection>{routes}</MainSection>
      ) : (
        <MainSection>
          <Sidebar user={user} />
          <section className="sm:ml-48 pt-24 px-4 pb-4 bg-gray-200 dark:bg-gray-900 min-h-screen">
            {/* BEFORE mt-20 p-4 ^ */}
            {routes}
          </section>
        </MainSection>
      )}
      <Footer user={user as IUser} />
    </>
  );
}

const MainSection = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w-full min-h-screen max-w-[1440px] mx-auto bg-gray-200 dark:bg-gray-900">
      {children}
    </main>
  );
};
