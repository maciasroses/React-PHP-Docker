import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { AccountingClient } from "../../../services";
import { useClientFetch, useCustomTranslation } from "../../../hooks";
import {
  AccountingList,
  AccountingListSkeleton,
  Pagination,
  Searchbar,
} from "./components";
import type { IAccountingList } from "../../../interfaces";

const AccountingPage = () => {
  const [searchParams] = useSearchParams();
  const { searchbar } = useCustomTranslation("accounting");

  const fetchAccountings = useCallback(() => {
    return AccountingClient.getAll(searchParams) as Promise<IAccountingList>;
  }, [searchParams]);

  const { data, loading } = useClientFetch<IAccountingList>(fetchAccountings);

  const { accounting_data, total_pages } = data || {
    accounting_data: [],
    total_pages: 0,
  };

  return (
    <>
      <Searchbar searchbarProps={searchbar} />
      {loading ? (
        <AccountingListSkeleton />
      ) : (
        <AccountingList accountings={accounting_data} />
      )}
      <Pagination totalPages={total_pages} />
    </>
  );
};

export default AccountingPage;
