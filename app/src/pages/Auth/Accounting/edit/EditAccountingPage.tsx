import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AccountingForm } from "../components";
import { Loading } from "../../../../components";
import { useClientFetch } from "../../../../hooks";
import { IAccounting } from "../../../../interfaces";
import { AccountingClient } from "../../../../services";

const EditAccountingPage = () => {
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

  return <AccountingForm isEditing accounting={accounting as IAccounting} />;
};

export default EditAccountingPage;
