import { Outlet } from "react-router-dom";
import { ErrorBoundary } from "@/components";

const UsersLayout = () => {
  return (
    <>
      <div>Users Layout</div>
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
    </>
  );
};

export default UsersLayout;
