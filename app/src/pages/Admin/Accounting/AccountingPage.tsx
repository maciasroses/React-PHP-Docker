import { useCallback } from "react";
import { Loading } from "@/components";
import { useClientFetch } from "@/hooks";
import { useTranslation } from "react-i18next";
import { AccountingDatatable, Searchbar } from "./components";
import { AdminAccountingClient, AdminUserClient } from "@/services";
import type { IAdminAccouning, IAdminUser } from "@/interfaces";
import { useSearchParams } from "react-router-dom";

const AccountingPage = () => {
  const { t } = useTranslation();
  const lng = t("lang");
  const [searchParams] = useSearchParams();

  const fetchAccountings = useCallback(() => {
    return AdminAccountingClient.getAll(searchParams) as Promise<
      IAdminAccouning[]
    >;
  }, [searchParams]);

  const fetchUsers = useCallback(() => {
    return AdminUserClient.getAll() as Promise<IAdminUser[]>;
  }, []);

  const { data, loading } = useClientFetch<IAdminAccouning[]>(fetchAccountings);
  const { data: users, loading: loadingUsers } =
    useClientFetch<IAdminUser[]>(fetchUsers);

  if (loading || loadingUsers)
    return (
      <div className="w-full flex flex-col justify-center items-center gap-2">
        <Loading size={"size-[5rem]"} />
        <h1 className="text-4xl">{lng === "en" ? "Loading" : "Cargando"}...</h1>
      </div>
    );

  return (
    <>
      <Searchbar users={users as IAdminUser[]} />
      <AccountingDatatable data={data as IAdminAccouning[]} lng={lng} />
    </>
  );
};

export default AccountingPage;
