import { useCallback } from "react";
import { DeleteButton } from "../components";
import { useTranslation } from "react-i18next";
import { Loading } from "../../../../components";
import { useClientFetch } from "../../../../hooks";
import { Link, useParams } from "react-router-dom";
import { PencilIcon } from "../../../../assets/icons";
import { AccountingClient } from "../../../../services";
import formatDateAmerican from "../../../../utils/formatDateAmerican";
import formatDateLatinAmerican from "../../../../utils/formatDateLatinAmerican";
import type { IAccounting } from "../../../../interfaces";

const DetailAccountingPage = () => {
  const { t } = useTranslation();
  const lng = t("lang");
  const { id } = useParams();
  if (!id) throw new Error("No id provided");

  const fetchAccountings = useCallback(() => {
    return AccountingClient.getById(id) as Promise<IAccounting>;
  }, [id]);

  const {
    data: accounting,
    loading,
    error,
  } = useClientFetch<IAccounting>(fetchAccountings);

  if (loading)
    return (
      <div className="w-full flex flex-col justify-center items-center gap-2">
        <Loading size={"size-[5rem]"} />
        <h1 className="text-4xl">{lng === "en" ? "Loading" : "Cargando"}...</h1>
      </div>
    );
  if (error) throw error;

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {accounting?.description}
        </h1>
        <p
          className={`text-4xl font-bold tracking-tight
            ${
              accounting?.type === "Expense"
                ? "text-red-800 dark:text-red-400"
                : accounting?.type === "Income"
                ? "text-green-800 dark:text-green-400"
                : "text-blue-800 dark:text-blue-400"
            }`}
        >
          {accounting?.amount}
          <span
            className={`text-lg font-medium inline-flex items-center px-2.5 py-0.5 ${
              accounting?.type === "Expense"
                ? "text-red-800 dark:text-red-400"
                : accounting?.type === "Income"
                ? "text-green-800 dark:text-green-400"
                : "text-blue-800 dark:text-blue-400"
            }`}
          >
            {accounting?.type}
          </span>
        </p>
        <p
          className="
          mt-2 text-xs font-medium inline-flex items-center px-2.5 py-0.5 text-gray-800 dark:text-gray-400
        "
        >
          {lng === "en"
            ? formatDateAmerican(accounting?.date as Date)
            : formatDateLatinAmerican(accounting?.date as Date)}
        </p>
      </div>
      <div className="flex flex-col justify-center items-center gap-2 mt-4">
        <div className="flex justify-center items-center gap-2">
          <Link
            to="edit"
            className="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-blue-300 text-blue-700"
          >
            <PencilIcon />
          </Link>
          <DeleteButton accounting={accounting as IAccounting} />
        </div>
        <Link
          to="/auth/accounting"
          className="px-4 py-2 bg-gray-300 text-gray-500 dark:bg-gray-600 dark:text-gray-400 rounded-md w-auto"
        >
          {lng === "en" ? "Back" : "Atrás"}
        </Link>
      </div>
    </>
  );
};

export default DetailAccountingPage;
