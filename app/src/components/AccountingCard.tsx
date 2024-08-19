import clsx from "clsx";
import { Link } from "react-router-dom";
import { formatDateAmerican, formatDateLatinAmerican } from "@/utils";
import type { IAccounting } from "@/interfaces";

interface IAccountingCard {
  data: IAccounting;
  lng: string;
  isAdminView?: boolean;
}

const AccountingCard = ({ data, lng, isAdminView }: IAccountingCard) => {
  return (
    <Link
      to={`${data.id}`}
      className={clsx(
        `rounded-lg shadow bg-white border border-gray-200 dark:border-gray-500 dark:bg-gray-800 flex flex-col items-center justify-between p-4 space-y-4 w-full hover:bg-gray-100 dark:hover:bg-gray-700 ${
          isAdminView && "max-w-[450px]"
        }`
      )}
    >
      <div className="flex items-center justify-between gap-2 w-full">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          ID:{" "}
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {data.id}
          </span>
        </p>
        <p
          className={`text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded border dark:bg-gray-700 ${
            data.type === "Expense"
              ? "bg-red-100 text-red-800 dark:text-red-400 border-red-400"
              : data.type === "Income"
              ? "bg-green-100 text-green-800 dark:text-green-400 border-green-400"
              : "bg-blue-100 text-blue-800 dark:text-blue-400 border-blue-400"
          }`}
        >
          {lng === "en"
            ? data.type
            : data.type === "Expense"
            ? "Gasto"
            : data.type === "Income"
            ? "Ingreso"
            : "Transferencia"}
        </p>
      </div>
      <div>
        <p
          className={`text-center text-4xl font-bold tracking-tight
      ${
        data.type === "Expense"
          ? "text-red-800 dark:text-red-400"
          : data.type === "Income"
          ? "text-green-800 dark:text-green-400"
          : "text-blue-800 dark:text-blue-400"
      }`}
        >
          {data.currency === "GBP" ? "£" : data.currency === "EUR" ? "€" : "$"}
          {data.amount} {data.currency}
        </p>
        <h5 className="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {data.description}
        </h5>
      </div>
      <div className="flex flex-col w-full">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {lng === "en" ? "Expected for: " : "Esperado para: "}
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {lng === "en"
              ? formatDateAmerican(data.date)
              : formatDateLatinAmerican(data.date)}
          </span>
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {lng === "en" ? "Created at: " : "Creado en: "}
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {lng === "en"
              ? formatDateAmerican(data.created_at)
              : formatDateLatinAmerican(data.created_at)}
          </span>
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {lng === "en" ? "Updated at: " : "Actualizado en: "}
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {lng === "en"
              ? formatDateAmerican(data.updated_at)
              : formatDateLatinAmerican(data.updated_at)}
          </span>
        </p>
      </div>
    </Link>
  );
};

export default AccountingCard;
