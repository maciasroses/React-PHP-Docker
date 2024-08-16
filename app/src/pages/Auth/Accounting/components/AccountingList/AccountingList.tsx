import AccountingCard from "./AccountingCard";
import { useTranslation } from "react-i18next";
import { Card404 } from "../../../../../components";
import type { IAccounting } from "../../../../../interfaces";

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
              ? "Accountings were not found for show"
              : "No se encontraron contabilidades para mostrar"
          }
          description={
            lng === "en"
              ? "Try with another search or add a new one"
              : "Intenta con otra búsqueda o agrega una nueva"
          }
        />
      )}
    </>
  );
};

export default AccountingList;
