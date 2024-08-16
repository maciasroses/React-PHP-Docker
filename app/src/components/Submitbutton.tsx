import clsx from "clsx";
import Loading from "./Loading";

interface ISubmitbutton {
  title: string;
  pending: boolean;
  color?: string;
}

const SubmitButton = ({ title, pending, color = "blue" }: ISubmitbutton) => {
  return (
    <button
      type="submit"
      disabled={pending}
      className={clsx(
        "px-4 py-2 text-white rounded-md w-auto",
        pending ? `bg-${color}-500/50` : `bg-${color}-500`
      )}
    >
      {pending ? <Loading color={color} /> : title}
    </button>
  );
};

export default SubmitButton;
