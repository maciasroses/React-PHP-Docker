import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { GenericInput, SubmitButton } from "@/components";
import { AccountingClient } from "@/services";
import { useCustomTranslation } from "@/hooks";
import { INITIAL_STATE_RESPONSE } from "@/constants";
import { formatDateForDateInput } from "@/utils";
import type {
  IAccounting,
  IAccountingForm,
  IAccountingCreateNUpdateState,
} from "@/interfaces";

interface IAccountingFormComponent {
  accountingForm: IAccountingForm;
}

const AccountingForm = ({
  accounting,
  isEditing,
}: {
  accounting?: IAccounting;
  isEditing?: boolean;
}) => {
  const { accountingForm }: IAccountingFormComponent =
    useCustomTranslation("accounting");
  const [isPending, setIsPending] = useState(false);
  const [badResponse, setBadResponse] = useState<IAccountingCreateNUpdateState>(
    INITIAL_STATE_RESPONSE
  );

  const submitAction: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    setIsPending(true);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = isEditing
      ? await AccountingClient.update(formData, accounting?.id as string)
      : await AccountingClient.create(formData);
    if (response && response.success) {
      window.location.href = `/auth/accounting/${response.data}`;
    } else {
      setBadResponse(response as IAccountingCreateNUpdateState);
    }
    setIsPending(false);
  };

  return (
    <div className="flex flex-col items-center gap-4 dark:text-white mt-10">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-4xl">
          {isEditing ? accountingForm.editTitle : accountingForm.createTitle}
        </h1>
        {badResponse.message && (
          <p className="text-red-600">{badResponse.message}</p>
        )}
      </div>
      <form onSubmit={submitAction}>
        <fieldset disabled={isPending}>
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
                    accounting?.date
                      ? formatDateForDateInput(accounting.date)
                      : ""
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
          <input hidden name="accountingId" defaultValue={accounting?.id} />
          <div className="flex justify-center items-center gap-2 mt-4">
            <Link
              to={`${
                isEditing
                  ? `/auth/accounting/${accounting?.id}`
                  : `/auth/accounting`
              }`}
              className="px-4 py-2 bg-gray-300 text-gray-400 dark:bg-gray-600 dark:text-gray-400 rounded-md w-auto"
            >
              {accountingForm.cancelButton}
            </Link>
            <SubmitButton
              title={
                isEditing
                  ? accountingForm.updateButton
                  : accountingForm.createButton
              }
              pending={isPending}
            />
          </div>
        </fieldset>
      </form>
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
