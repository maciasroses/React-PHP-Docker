import { Outlet } from "react-router-dom";
import { ErrorBoundary } from "@/components";

const AccountingLayout = () => {
  return (
    <>
      <div>Accounting Layout</div>
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
    </>
  );
};

export default AccountingLayout;
