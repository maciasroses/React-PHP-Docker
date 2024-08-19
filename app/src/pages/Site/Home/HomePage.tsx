import { Link } from "react-router-dom";
import { useCustomTranslation } from "@/hooks";

const HomePage = () => {
  const index = useCustomTranslation("index");

  return (
    <div className="w-full h-screen flex flex-col gap-2 justify-center items-center px-4 pt-20">
      <h1 className="text-4xl md:text-8xl text-center">{index.title}</h1>
      <p className="text-lg md:text-2xl">{index.description}</p>
      <Link
        to="/login"
        className="text-2xl md:text-4xl text-blue-600 underline"
      >
        {index.link}
      </Link>
    </div>
  );
};

export default HomePage;
