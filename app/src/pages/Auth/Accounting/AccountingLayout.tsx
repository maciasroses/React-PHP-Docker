import { ErrorBoundary } from "@/components";
import { useTranslation } from "react-i18next";
import { useCustomTranslation } from "@/hooks";
import { Link, Outlet } from "react-router-dom";

const AccountingLayout = () => {
  const { t } = useTranslation();
  const lng = t("lang");
  const { title, description } = useCustomTranslation("accounting");

  return (
    <>
      <div className="relative w-full">
        <Link to="/auth/accounting">
          <h1 className="text-4xl md:text-6xl text-center dark:text-white pt-16">
            {title}
          </h1>
        </Link>
        <Link to="/auth/accounting/add">
          <button className="absolute top-0 right-0 mt-4 mr-4 bg-blue-500 text-white px-4 py-2 rounded-lg">
            {lng === "en" ? "Create" : "Crear"}
          </button>
        </Link>
      </div>
      <p className="text-2xl md:text-xl text-center dark:text-white">
        {description}
      </p>
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
    </>
  );
};

export default AccountingLayout;
