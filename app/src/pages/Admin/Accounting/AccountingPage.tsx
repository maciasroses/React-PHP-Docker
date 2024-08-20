import { useCallback } from "react";
import { useClientFetch } from "@/hooks";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import {
  AccountingDatatable,
  AccountingDatatableSkeleton,
  Searchbar,
} from "./components";
import { AdminAccountingClient, AdminUserClient } from "@/services";
import type { IAdminAccouning, IAdminUser } from "@/interfaces";

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

  const { data: accountings, loading } =
    useClientFetch<IAdminAccouning[]>(fetchAccountings);
  const { data: users, loading: loadingUsers } =
    useClientFetch<IAdminUser[]>(fetchUsers);

  return (
    <>
      {!loadingUsers && <Searchbar users={users as IAdminUser[]} />}
      {loading ? (
        <AccountingDatatableSkeleton />
      ) : (
        <AccountingDatatable
          accountings={accountings as IAdminAccouning[]}
          lng={lng}
        />
      )}
    </>
  );
};

export default AccountingPage;
