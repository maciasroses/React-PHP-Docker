import { Link } from "react-router-dom";
import { IAccounting } from "../../../../../interfaces";
import { useTranslation } from "react-i18next";
import formatDateAmerican from "../../../../../utils/formatDateAmerican";
import formatDateLatinAmerican from "../../../../../utils/formatDateLatinAmerican";

const AccountingCard = ({ accounting }: { accounting: IAccounting }) => {
  const { t } = useTranslation();
  const lng = t("lang");
  return (
    <Link
      to={`${accounting.id}`}
      className="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {accounting.description}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {accounting.amount} {accounting.currency}
      </p>
      <p
        className={`mt-2 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded border dark:bg-gray-700 ${
          accounting.type === "Expense"
            ? "bg-red-100 text-red-800 dark:text-red-400 border-red-400"
            : accounting.type === "Income"
            ? "bg-green-100 text-green-800 dark:text-green-400 border-green-400"
            : "bg-blue-100 text-blue-800 dark:text-blue-400 border-blue-400"
        }`}
      >
        {lng === "en"
          ? accounting.type
          : accounting.type === "Expense"
          ? "Gasto"
          : accounting.type === "Income"
          ? "Ingreso"
          : "Transferencia"}
      </p>
      <p className="text-right text-xs font-medium text-gray-600 dark:text-gray-400">
        {lng === "en"
          ? formatDateAmerican(accounting.date)
          : formatDateLatinAmerican(accounting.date)}
      </p>
    </Link>
  );
};

export default AccountingCard;
