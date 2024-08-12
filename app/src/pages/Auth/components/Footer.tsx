const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full max-w-[1440px] mx-auto">
      <div className="sm:ml-48 bg-gray-800 dark:bg-black text-white text-center p-4">
        <p>&copy; {currentYear} - All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
