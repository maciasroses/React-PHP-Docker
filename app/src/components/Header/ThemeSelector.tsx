import { useEffect, useRef, useState } from "react";
import { useCustomTranslation, useTheme } from "../../hooks";
import { DarkIcon, LightIcon, SystemIcon } from "../../assets/icons";

interface IThemeButton {
  theme: string;
  themeColor: string;
  handleThemeChange: () => void;
  icon: JSX.Element;
  span: string;
}

const ThemeButton = ({
  theme,
  themeColor,
  handleThemeChange,
  icon,
  span,
}: IThemeButton) => {
  return (
    <button
      className={`flex items-center p-2 rounded-lg dark:hover:bg-gray-700 group w-full hover:bg-gray-100 ${
        theme === themeColor ? "text-blue-500" : "text-gray-900 dark:text-white"
      }`}
      onClick={handleThemeChange}
    >
      {icon}
      <span>{span}</span>
    </button>
  );
};

const ThemeSelector = () => {
  const { themeSelector } = useCustomTranslation("header");
  const { theme, setTheme } = useTheme();
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleThemeChange = (theme: string) => {
    setTheme(theme);
    setMenuOpen(false);
  };

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

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? "dark" : "light");
    };

    setSystemTheme(darkModeMediaQuery.matches ? "dark" : "light");

    darkModeMediaQuery.addEventListener("change", handleSystemThemeChange);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      darkModeMediaQuery.removeEventListener("change", handleSystemThemeChange);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={menuRef}>
      <div>
        <button type="button" onClick={toggleMenu}>
          {theme === "light" ||
          (theme === "system" && systemTheme === "light") ? (
            <LightIcon theme={theme} />
          ) : (
            <DarkIcon theme={theme} />
          )}
        </button>
      </div>
      {menuOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow list-none bg-red-white bg-gray-50 dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none"
          aria-roledescription="menu"
        >
          <div className="py-1" aria-roledescription="none">
            <ThemeButton
              theme={theme}
              themeColor="light"
              handleThemeChange={() => handleThemeChange("light")}
              icon={<LightIcon theme={theme} />}
              span={themeSelector.light}
            />
            <ThemeButton
              theme={theme}
              themeColor="dark"
              handleThemeChange={() => handleThemeChange("dark")}
              icon={<DarkIcon theme={theme} />}
              span={themeSelector.dark}
            />
            <ThemeButton
              theme={theme}
              themeColor="system"
              handleThemeChange={() => handleThemeChange("system")}
              icon={<SystemIcon theme={theme} />}
              span={themeSelector.system}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;
