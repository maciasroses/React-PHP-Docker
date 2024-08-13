import { Outlet } from "react-router-dom";

const AccountingLayout = () => {
  return (
    <>
      <div className="relative w-full">
        <a href="/auth/accounting">
          <h1 className="text-4xl md:text-6xl text-center dark:text-white pt-16">
            Global Accounting Page
          </h1>
        </a>
        <a href="/auth/accounting/add">
          <button className="absolute top-0 right-0 mt-4 mr-4 bg-blue-500 text-white px-4 py-2 rounded-lg">
            Create
          </button>
        </a>
      </div>
      <p className="text-2xl md:text-xl text-center dark:text-white">
        This is where your accounting data will be displayed.
      </p>
      <Outlet />
    </>
  );
};

export default AccountingLayout;
