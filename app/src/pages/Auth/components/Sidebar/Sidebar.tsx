import NavLinkComp from "./NavLinkComp";
import { useCustomTranslation } from "../../../../hooks";

const Sidebar = () => {
  const sidebar = useCustomTranslation("sidebar");

  return (
    <aside className="fixed z-30 top-0 w-48 h-screen transition-transform -translate-x-full sm:translate-x-0">
      <div className="h-full px-4 pt-24 pb-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          <li>
            <NavLinkComp icon="home" span={sidebar.home} to="/auth/home" />
          </li>
          <li>
            <NavLinkComp
              icon="accounting"
              span={sidebar.accounting}
              to="/auth/accounting"
            />
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
