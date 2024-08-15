import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import { MXFlag, USFlag } from "../../../../assets/icons";

interface ISwitchButton {
  value: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  flag: JSX.Element;
  span: string;
}

const SwitchButton = ({ value, onClick, flag, span }: ISwitchButton) => {
  return (
    <button
      name="lng"
      value={value}
      onClick={onClick}
      className="flex items-center p-2 rounded-lg dark:hover:bg-gray-700 group w-full hover:bg-gray-100 text-gray-900 dark:text-white"
    >
      {flag}
      <span className="ml-2">{span}</span>
    </button>
  );
};

const LangSelector = () => {
  const { t, i18n } = useTranslation();
  const currentLang = t("lang");
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

  const handleChangeLang = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.currentTarget as HTMLButtonElement;
    i18n.changeLanguage(target.value);
    closeMenu();
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={menuRef}>
      <div>
        <button type="button" onClick={toggleMenu}>
          {currentLang === "es" ? <MXFlag /> : <USFlag />}
        </button>
      </div>
      {menuOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow list-none bg-red-white bg-gray-50 dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none"
          aria-roledescription="menu"
        >
          <div className="py-1" aria-roledescription="none">
            <SwitchButton
              value="es"
              onClick={handleChangeLang}
              flag={<MXFlag />}
              span={t("esLang")}
            />
            <SwitchButton
              value="en"
              onClick={handleChangeLang}
              flag={<USFlag />}
              span={t("enLang")}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LangSelector;
