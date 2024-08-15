import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { AccountingClient } from "../../../../services";
import { IAccounting } from "../../../../interfaces";
import { useClientFetch } from "../../../../hooks";
import { AccountingForm } from "../components";

const EditAccountingPage = () => {
  const { id } = useParams();
  if (!id) throw new Error("No id provided");

  const fetchAccountings = useCallback(() => {
    return AccountingClient.getById(id) as Promise<IAccounting>;
  }, [id]);

  const { data: accounting, loading } =
    useClientFetch<IAccounting>(fetchAccountings);

  if (loading) return <div>Loading...</div>;

  return <AccountingForm isEditing accounting={accounting as IAccounting} />;
};

export default EditAccountingPage;
