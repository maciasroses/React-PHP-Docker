import { NavLink } from "react-router-dom";
import { AccountingIcon, HomeIcon, UserIcon } from "../../../../assets/icons";

interface INavLinkComp {
  to: string;
  span: string;
  icon: string;
}

const NavLinkComp = ({ to, span, icon }: INavLinkComp) => {
  const isActive = window.location.pathname === to;
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center p-2 text-gray-900 rounded-lg dark:text-white group group-hover:bg-gray-200 hover:bg-gray-200 dark:group-hover:bg-gray-700 dark:hover:bg-gray-700 ${
          isActive ? "bg-gray-200 dark:bg-gray-700" : ""
        }`
      }
    >
      {icon === "home" ? (
        <HomeIcon isActive={isActive} />
      ) : icon === "user" ? (
        <UserIcon isActive={isActive} />
      ) : (
        <AccountingIcon isActive={isActive} />
      )}
      <span className="ms-3">{span}</span>
    </NavLink>
  );
};

export default NavLinkComp;
