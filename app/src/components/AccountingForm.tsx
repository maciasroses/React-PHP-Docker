import {
  IAccounting,
  IAccountingCreateNUpdateState,
  IAccountingForm,
  IAdminAccouning,
} from "@/interfaces";
import { ReactNode } from "react";
import { GenericInput } from "./Form";
import { formatDateForDateInput } from "@/utils";

interface IAccountingFormThisComponent {
  accounting: IAccounting | IAdminAccouning;
  accountingForm: IAccountingForm;
  badResponse: IAccountingCreateNUpdateState;
}

const AccountingForm = ({
  accounting,
  accountingForm,
  badResponse,
}: IAccountingFormThisComponent) => {
  return (
    <div className="flex flex-col gap-4 text-xl max-w-[500px]">
      <GenericPairDiv>
        <GenericDiv>
          <GenericInput
            id="amount"
            ariaLabel={accountingForm.amount}
            type="number"
            step="0.01"
            placeholder="200"
            defaultValue={accounting?.amount.toString() ?? ""}
            error={badResponse.errors.amount}
          />
        </GenericDiv>
        <GenericDiv>
          <GenericInput
            id="currency"
            ariaLabel={accountingForm.currency.title}
            type="select"
            defaultValue={accounting?.currency ?? ""}
            placeholder={accountingForm.currency.mainOption}
            options={Object.entries(accountingForm.currency.options).map(
              ([key, value]) => ({ value: key, label: value })
            )}
            error={badResponse.errors.currency}
          />
        </GenericDiv>
      </GenericPairDiv>
      <GenericPairDiv>
        <GenericDiv>
          <GenericInput
            id="date"
            ariaLabel={accountingForm.date}
            type="date"
            defaultValue={
              accounting?.date ? formatDateForDateInput(accounting.date) : ""
            }
            error={badResponse.errors.date?.toString()}
          />
        </GenericDiv>
        <GenericDiv>
          <GenericInput
            id="type"
            ariaLabel={accountingForm.type.title}
            type="select"
            defaultValue={accounting?.type ?? ""}
            placeholder={accountingForm.type.mainOption}
            options={Object.entries(accountingForm.type.options).map(
              ([key, value]) => ({ value: key, label: value })
            )}
            error={badResponse.errors.type}
          />
        </GenericDiv>
      </GenericPairDiv>
      <div className="flex flex-col gap-2 w-full">
        <GenericInput
          id="description"
          ariaLabel={accountingForm.description}
          type="textarea"
          placeholder={accountingForm.descriptionPlaceholder}
          defaultValue={accounting?.description ?? ""}
          error={badResponse.errors.description}
        />
      </div>
    </div>
  );
};

export default AccountingForm;

const GenericPairDiv = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full">{children}</div>
  );
};

const GenericDiv = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col gap-2 w-full sm:w-1/2">{children}</div>;
};
