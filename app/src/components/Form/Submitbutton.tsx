import clsx from "clsx";
import Loading from "../Loading";

interface ISubmitbutton {
  title: string;
  pending: boolean;
  color?: string;
}

const colorMap: { [key: string]: string } = {
  red: "bg-red-500",
  blue: "bg-blue-500",
  green: "bg-green-500",
};

const SubmitButton: React.FC<ISubmitbutton> = ({
  title,
  pending,
  color = "blue",
}) => {
  return (
    <button
      type="submit"
      disabled={pending}
      className={clsx(
        "px-4 py-2 text-white rounded-md w-auto",
        pending ? `${colorMap[color]}/50` : colorMap[color]
      )}
    >
      {pending ? <Loading color={color} /> : title}
    </button>
  );
};

export default SubmitButton;
