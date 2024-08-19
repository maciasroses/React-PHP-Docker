import { useState } from "react";
import { AccountingCard, Datatable, ProfileCard } from "@/components";
import type { IAdminAccouning } from "@/interfaces";
import type {
  ConditionalStyles,
  ExpanderComponentProps,
} from "react-data-table-component";

const columns = [
  {
    name: "Responsible",
    selector: (row: { user_name: string }) => row.user_name,
    sortable: true,
  },
  {
    name: "Description",
    selector: (row: { description: string }) => row.description,
    sortable: true,
  },
  {
    name: "Amount",
    selector: (row: { amount: number }) => Number(row.amount),
    sortable: true,
  },
  {
    name: "Currency",
    selector: (row: { currency: string }) => row.currency,
    sortable: true,
  },
  {
    name: "Type",
    selector: (row: { type: string }) => row.type,
    sortable: true,
  },
  {
    name: "Date",
    selector: (row: { date: Date }) => row.date.toString(),
    sortable: true,
  },
  {
    name: "Created At",
    selector: (row: { created_at: Date }) => row.created_at.toString(),
    sortable: true,
  },
  {
    name: "Updated At",
    selector: (row: { updated_at: Date }) => row.updated_at.toString(),
    sortable: true,
  },
  {
    name: "Actions",
    cell: (row: { id: string }) => (
      <div className="flex justify-center items-center gap-2">
        <button onClick={() => alert(JSON.stringify(row))}>Edit</button>
        <button onClick={() => alert(JSON.stringify(row))}>Delete</button>
      </div>
    ),
  },
];

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
  data,
  lng,
}: {
  data: IAdminAccouning[];
  lng: string;
}) => {
  const [showMultiActions, setShowMultiActions] = useState(false);
  const handleSelectRows = ({
    selectedRows,
  }: {
    selectedRows: IAdminAccouning[];
  }) => {
    if (selectedRows.length === 0) {
      setShowMultiActions(false);
      return;
    }
    setShowMultiActions(true);
    console.log(selectedRows);
  };

  return (
    <>
      {showMultiActions && (
        <div className="flex justify-center items-center gap-2">
          <button onClick={() => alert("Edit")}>Edit</button>
          <button onClick={() => alert("Delete")}>Delete</button>
        </div>
      )}
      <Datatable
        columns={columns}
        data={data}
        onSelectedRowsChange={handleSelectRows}
        expandableRowsComponent={(props) => (
          <ExpandedComponent {...props} lng={lng} />
        )}
        conditionalRowStyles={conditionalRowStyles}
      />
    </>
  );
};

export default AccountingDatatable;
