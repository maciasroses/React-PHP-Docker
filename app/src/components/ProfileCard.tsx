import { Link } from "react-router-dom";
import type { IAdminUserForIAdminAccounting } from "@/interfaces";

interface IProfileCard {
  data: IAdminUserForIAdminAccounting;
}

const ProfileCard = ({ data }: IProfileCard) => {
  return (
    <Link
      to={`/admin/users/${data.user_id}`}
      className="rounded-lg shadow border border-gray-200 dark:border-gray-500 dark:bg-gray-800 flex flex-col items-center justify-center p-4 space-y-4 w-full max-w-[300px] hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      <div className="flex items-start justify-between gap-2 w-full">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          ID:{" "}
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {data.user_id}
          </span>
        </p>
        <p
          className={`text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded border dark:bg-gray-700 ${
            data.user_role === "admin"
              ? "bg-gray-100 text-gray-800 dark:text-gray-100 border-gray-400"
              : "bg-yellow-100 text-yellow-800 dark:text-yellow-400 border-yellow-400"
          }`}
        >
          {data.user_role}
        </p>
      </div>
      <div className="flex flex-col items-center justify-center space-y-1">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src="/assets/profilepic.webp"
          alt="Bonnie image"
        />
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">
          {data.user_name}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {data.user_email}
        </span>
      </div>
    </Link>
  );
};

export default ProfileCard;
