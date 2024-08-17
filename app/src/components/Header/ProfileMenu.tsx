import { Link } from "react-router-dom";
import { UserClient } from "../../services";
import { useCustomTranslation } from "../../hooks";
import { useEffect, useRef, useState } from "react";
import type { IUser } from "../../interfaces";

interface IProfileLink {
  to: string;
  onClick: () => void;
  text: string;
}

const ProfileLink = ({ to, onClick, text }: IProfileLink) => {
  return (
    <Link
      to={to}
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
      onClick={onClick}
    >
      {text}
    </Link>
  );
};

const ProfileMenu = ({ user }: { user: IUser }) => {
  const { profileMenu } = useCustomTranslation("header");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !(menuRef.current as HTMLElement).contains(event.target as Node)
    ) {
      setMenuOpen(false);
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleSubmit = async () => {
    await UserClient.logout();
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-full border border-gray-300 shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
          onClick={toggleMenu}
        >
          <img
            src="/assets/profilepic.webp"
            alt="Profile"
            className="h-10 w-10 rounded-full"
          />
        </button>
      </div>
      {menuOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow list-none bg-red-white bg-gray-50 dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none"
          aria-roledescription="menu"
        >
          <div className="py-1" aria-roledescription="none">
            <div className="px-4 py-3">
              <p className="text-base text-gray-900 dark:text-white">
                {user?.name}
              </p>
              <p className="text-sm font-medium text-gray-500 truncate dark:text-gray-400">
                {user?.email}
              </p>
            </div>

            {/* THE FOLLOWING IS FOR MOBILE DEVICES */}

            <div className="sm:hidden pb-1">
              <div className="border-t border-gray-300 dark:border-gray-800"></div>
              <ProfileLink
                to={user.role === "admin" ? "/admin/dashboard" : "/auth/home"}
                onClick={closeMenu}
                text={profileMenu.home}
              />
              {user.role === "admin" && (
                <ProfileLink
                  to="/admin/user"
                  onClick={closeMenu}
                  text={profileMenu.user}
                />
              )}
              <ProfileLink
                to={
                  user.role === "admin"
                    ? "/admin/accounting"
                    : "/auth/accounting"
                }
                onClick={closeMenu}
                text={profileMenu.accounting}
              />
            </div>

            <div className="border-t border-gray-300 dark:border-gray-800"></div>
            <ProfileLink
              to="/auth/profile"
              onClick={closeMenu}
              text={profileMenu.profile}
            />
            <ProfileLink
              to="/auth/settings"
              onClick={closeMenu}
              text={profileMenu.settings}
            />
            <form onSubmit={handleSubmit}>
              <button
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white w-full text-left"
                type="submit"
              >
                {profileMenu.logout}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
