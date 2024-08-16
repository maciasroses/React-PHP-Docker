import NavLinkComp from "./NavLinkComp";
import { IUser } from "../../../../interfaces";
import { useCustomTranslation } from "../../../../hooks";

const Sidebar = ({ user }: { user: IUser }) => {
  const sidebar = useCustomTranslation("sidebar");

  return (
    <aside className="fixed z-30 top-0 w-48 h-screen transition-transform -translate-x-full sm:translate-x-0">
      <div className="h-full px-4 pt-24 pb-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          <li>
            <NavLinkComp
              icon="home"
              span={sidebar.home}
              to={user.role === "admin" ? "/admin/dashboard" : "/auth/home"}
            />
          </li>
          {user.role === "admin" && (
            <li>
              <NavLinkComp icon="user" span={sidebar.user} to="/admin/user" />
            </li>
          )}
          <li>
            <NavLinkComp
              icon="accounting"
              span={sidebar.accounting}
              to={
                user.role === "admin" ? "/admin/accounting" : "/auth/accounting"
              }
            />
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
