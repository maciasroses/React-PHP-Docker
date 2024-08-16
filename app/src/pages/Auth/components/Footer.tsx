import { useCustomTranslation } from "../../../hooks";
import type { IUser } from "../../../interfaces";

const Footer = ({ user }: { user: IUser }) => {
  const footer = useCustomTranslation("footer");
  const currentYear = new Date().getFullYear();
  return (
    <footer
      className={`w-full bg-gray-800 dark:bg-black ${
        user && "max-w-[1440px] mx-auto"
      }`}
    >
      <div
        className={`max-w-[1440px] mx-auto bg-gray-800 dark:bg-black text-white text-center p-4 ${
          user && "sm:ml-48"
        }`}
      >
        <p>
          &copy; {currentYear} - {footer.rights}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
