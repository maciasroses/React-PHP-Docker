import { Link } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import LangSelector from "./LangSelector";
import ThemeSelector from "./ThemeSelector";
import type { IUser } from "../../interfaces";

const Header = ({ user }: { user: IUser }) => {
  return (
    <header className="fixed z-40 top-0 w-full h-20">
      <div className="h-full flex justify-between items-center p-4 max-w-[1440px] mx-auto bg-gray-50 dark:bg-gray-800">
        <Link to="/" className="text-4xl dark:text-white">
          LOGO
        </Link>
        <div className="flex items-center gap-2">
          <ThemeSelector />
          <LangSelector />
          {user && <ProfileMenu user={user} />}
        </div>
      </div>
    </header>
  );
};

export default Header;
