import AccountingCard from "./AccountingCard";
import type { IAccounting } from "../../../../../interfaces";
import { Card404 } from "../../../../../components";
import { useTranslation } from "react-i18next";

interface AccountingListPageProps {
  accountings: IAccounting[];
}

const AccountingList = ({ accountings }: AccountingListPageProps) => {
  const { t } = useTranslation();
  const lng = t("lang");

  return (
    <>
      {accountings.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-6">
          {accountings.map((accounting) => (
            <AccountingCard key={accounting.id} accounting={accounting} />
          ))}
        </div>
      ) : (
        <Card404
          title={
            lng === "en"
              ? "Accountings were not found with this search"
              : "No se encontraron contabilidades con esta búsqueda"
          }
          description={
            lng === "en" ? "Try another search" : "Intenta otra búsqueda"
          }
        />
      )}
    </>
  );
};

export default AccountingList;
