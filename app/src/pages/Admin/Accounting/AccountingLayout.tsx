import { Outlet } from "react-router-dom";
import { ErrorBoundary } from "@/components";

const AccountingLayout = () => {
  return (
    <>
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
    </>
  );
};

export default AccountingLayout;
