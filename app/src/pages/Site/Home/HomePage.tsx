import { Link } from "react-router-dom";
import { useCustomTranslation } from "../../../hooks";

const HomePage = () => {
  const index = useCustomTranslation("index");

  return (
    <div className="w-full h-screen flex flex-col gap-2 justify-center items-center">
      <h1 className="text-8xl">{index.title}</h1>
      <p className="text-2xl">{index.description}</p>
      <Link to="/login" className="text-4xl text-blue-600 underline">
        {index.link}
      </Link>
    </div>
  );
};

export default HomePage;
