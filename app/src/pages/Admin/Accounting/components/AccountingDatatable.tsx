import { useState } from "react";
import { AccountingCard, Card404, Datatable, ProfileCard } from "@/components";
import type { IAdminAccouning } from "@/interfaces";
import type {
  ConditionalStyles,
  ExpanderComponentProps,
} from "react-data-table-component";
import { TrashIcon } from "@/assets/icons";
import {
  formatAmount,
  formatDateAmerican,
  formatDateLatinAmerican,
  formatType,
} from "@/utils";
import EditButton from "./EditButton";

const ExpandedComponent: React.FC<
  ExpanderComponentProps<IAdminAccouning> & { lng: string }
> = ({ data, lng }) => {
  const accounting = {
    id: data.id,
    description: data.description,
    amount: data.amount,
    type: data.type,
    currency: data.currency,
    date: data.date,
    created_at: data.created_at,
    updated_at: data.updated_at,
  };

  const user = {
    user_id: data.user_id,
    user_name: data.user_name,
    user_email: data.user_email,
    user_role: data.user_role,
  };

  return (
    <div className="dark:bg-gray-700 dark:text-white p-4 flex flex-row gap-4">
      <AccountingCard data={accounting} lng={lng} isAdminView />
      <ProfileCard data={user} />
    </div>
  );
};

const conditionalRowStyles = (
  theme: string
): ConditionalStyles<IAdminAccouning>[] => {
  return [
    {
      when: (row: IAdminAccouning) => row.type === "Income",
      style: {
        color: theme === "dark" ? "#C2FBD0" : "#047857",
        backgroundColor: theme === "dark" ? "#02701D" : "#ecfdf5",
      },
    },
    {
      when: (row: IAdminAccouning) => row.type === "Expense",
      style: {
        color: theme === "dark" ? "#FCCACA" : "#dc2626",
        backgroundColor: theme === "dark" ? "#730101" : "#fde8e3",
      },
    },
    {
      when: (row: IAdminAccouning) => row.type === "Transfer",
      style: {
        color: theme === "dark" ? "#9DCCFB" : "#2563eb",
        backgroundColor: theme === "dark" ? "#013971" : "#eff6ff",
      },
    },
  ];
};

const AccountingDatatable = ({
  accountings,
  lng,
}: {
  accountings: IAdminAccouning[];
  lng: string;
}) => {
  const [accountingsSelected, setAccountingsSelected] = useState<
    IAdminAccouning[]
  >([]);
  const [showMultiActions, setShowMultiActions] = useState(false);
  const handleSelectRows = ({
    selectedRows,
  }: {
    selectedRows: IAdminAccouning[];
  }) => {
    if (selectedRows.length === 0) {
      setAccountingsSelected([]);
      setShowMultiActions(false);
      return;
    }
    setAccountingsSelected(selectedRows);
    setShowMultiActions(true);
  };

  const columns = [
    {
      name: lng === "en" ? "Actions" : "Acciones",
      width: "100px",
      cell: (row: IAdminAccouning) => (
        <div className="flex justify-center items-center gap-2">
          {/* <button
            onClick={() => alert(JSON.stringify(row))}
            className="rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-blue-300 text-blue-700 bg-blue-100 dark:bg-blue-700 border border-blue-700 dark:border-blue-300"
          >
            <PencilIcon />
          </button> */}
          <EditButton accountings={[row]} />
          <button
            onClick={() => alert(JSON.stringify(row))}
            className="rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-red-300 text-red-700 bg-red-100 dark:bg-red-700 border border-red-700 dark:border-red-300"
          >
            <TrashIcon />
          </button>
        </div>
      ),
    },
    {
      name: lng === "en" ? "Responsible" : "Responsable",
      width: "150px",
      selector: (row: { user_name: string }) => row.user_name,
      sortable: true,
    },
    {
      name: lng === "en" ? "Description" : "Descripción",
      width: "200px",
      selector: (row: { description: string }) => row.description,
      sortable: true,
    },
    {
      name: lng === "en" ? "Amount" : "Monto",
      width: "150px",
      selector: (row: { amount: number }) => Number(row.amount),
      sortable: true,
      format: (row: { currency: string; amount: number }) =>
        formatAmount(row.amount, row.currency),
    },
    {
      name: lng === "en" ? "Currency" : "Moneda",
      width: "100px",
      selector: (row: { currency: string }) => row.currency,
      sortable: true,
    },
    {
      name: lng === "en" ? "Type" : "Tipo",
      width: "120px",
      selector: (row: { type: string }) => row.type,
      sortable: true,
      format: (row: { type: string }) => formatType(lng, row.type),
    },
    {
      name: lng === "en" ? "Date" : "Fecha",
      width: "190px",
      selector: (row: { date: Date }) => row.date.toString(),
      sortable: true,
      format: (row: { date: Date }) =>
        lng === "en"
          ? formatDateAmerican(row.date)
          : formatDateLatinAmerican(row.date),
    },
    {
      name: lng === "en" ? "Created At" : "Creado en",
      width: "190px",
      selector: (row: { created_at: Date }) => row.created_at.toString(),
      sortable: true,
      format: (row: { created_at: Date }) =>
        lng === "en"
          ? formatDateAmerican(row.created_at)
          : formatDateLatinAmerican(row.created_at),
    },
    {
      name: lng === "en" ? "Updated At" : "Actualizado en",
      width: "190px",
      selector: (row: { updated_at: Date }) => row.updated_at.toString(),
      sortable: true,
      format: (row: { updated_at: Date }) =>
        lng === "en"
          ? formatDateAmerican(row.updated_at)
          : formatDateLatinAmerican(row.updated_at),
    },
  ];

  return (
    <>
      {accountings.length > 0 ? (
        <>
          {showMultiActions && (
            <div className="flex justify-center items-center gap-2">
              <EditButton accountings={accountingsSelected} />
              <button onClick={() => alert("Delete")}>Delete</button>
            </div>
          )}
          <Datatable
            lng={lng}
            columns={columns}
            data={accountings}
            onSelectedRowsChange={handleSelectRows}
            expandableRowsComponent={(props) => (
              <ExpandedComponent {...props} lng={lng} />
            )}
            conditionalRowStyles={conditionalRowStyles}
          />
        </>
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

export default AccountingDatatable;
