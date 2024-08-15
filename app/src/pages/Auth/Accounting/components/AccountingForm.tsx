import { useState } from "react";
import { SubmitButton } from "../../../../components";
import { AccountingClient } from "../../../../services";
import formatDateForDateInput from "../../../../utils/formatDateForInput";
import { INITIAL_STATE_RESPONSE } from "../../../../constants";
import type {
  IAccounting,
  IAccountingCreateNUpdateState,
} from "../../../../interfaces";

const AccountingForm = ({
  accounting,
  isEditing,
}: {
  accounting?: IAccounting;
  isEditing?: boolean;
}) => {
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
    <div className="flex flex-col items-center gap-4 dark:text-white">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-4xl">
          {isEditing ? "Edit Accounting" : "Create an Accounting"}
        </h1>
        {badResponse.message && (
          <p className="text-red-600">{badResponse.message}</p>
        )}
      </div>
      <form onSubmit={submitAction}>
        <fieldset disabled={isPending}>
          <div className="flex flex-col gap-4 text-xl max-w-[500px]">
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <div className="flex flex-col gap-2 w-full sm:w-1/2">
                <label htmlFor="amount">Amount</label>
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  placeholder="Your amount"
                  defaultValue={accounting?.amount ?? ""}
                  className={`border block w-full p-2.5 text-sm rounded-lg dark:bg-gray-700 ${
                    badResponse.errors.amount
                      ? "bg-red-50 border-red-500 text-red-900 dark:text-red-400 placeholder-red-700 dark:placeholder-red-500 focus:ring-red-500 focus:border-red-500"
                      : "bg-gray-50 border-gray-300 text-gray-900 dark:text-white dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                />
                {badResponse.errors.amount && (
                  <small className="text-red-600">
                    {badResponse.errors.amount}
                  </small>
                )}
              </div>
              <div className="flex flex-col gap-2 w-full sm:w-1/2">
                <label htmlFor="currency">Currency</label>
                <select
                  name="currency"
                  id="currency"
                  defaultValue={accounting?.currency ?? ""}
                  className={`border block w-full p-2.5 text-sm rounded-lg dark:bg-gray-700 ${
                    badResponse.errors.currency
                      ? "bg-red-50 border-red-500 text-red-900 dark:text-red-400 placeholder-red-700 dark:placeholder-red-500 focus:ring-red-500 focus:border-red-500"
                      : "bg-gray-50 border-gray-300 text-gray-900 dark:text-white dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                >
                  <option value="">Select a currency</option>
                  <option value="USD">USD</option>
                  <option value="MXN">MXN</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>
                {badResponse.errors.currency && (
                  <small className="text-red-600">
                    {badResponse.errors.currency}
                  </small>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <div className="flex flex-col gap-2 w-full sm:w-1/2">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  placeholder="Your date"
                  defaultValue={
                    accounting?.date
                      ? formatDateForDateInput(accounting.date)
                      : ""
                  }
                  className={`border block w-full p-2.5 text-sm rounded-lg dark:bg-gray-700 ${
                    badResponse.errors.date
                      ? "bg-red-50 border-red-500 text-red-900 dark:text-red-400 placeholder-red-700 dark:placeholder-red-500 focus:ring-red-500 focus:border-red-500"
                      : "bg-gray-50 border-gray-300 text-gray-900 dark:text-white dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                />
                {badResponse.errors.date && (
                  <small className="text-red-600">
                    {badResponse.errors.date.toString()}
                  </small>
                )}
              </div>
              <div className="flex flex-col gap-2 w-full sm:w-1/2">
                <label htmlFor="type">Type</label>
                <select
                  name="type"
                  id="type"
                  defaultValue={accounting?.type ?? ""}
                  className={`border block w-full p-2.5 text-sm rounded-lg dark:bg-gray-700 ${
                    badResponse.errors.type
                      ? "bg-red-50 border-red-500 text-red-900 dark:text-red-400 placeholder-red-700 dark:placeholder-red-500 focus:ring-red-500 focus:border-red-500"
                      : "bg-gray-50 border-gray-300 text-gray-900 dark:text-white dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                >
                  <option value="">Select a type</option>
                  <option value="Income">Income</option>
                  <option value="Expense">Expense</option>
                  <option value="Transfer">Transfer</option>
                </select>
                {badResponse.errors.type && (
                  <small className="text-red-600">
                    {badResponse.errors.type}
                  </small>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                id="description"
                placeholder="Your description"
                defaultValue={accounting?.description ?? ""}
                className={`border block w-full p-2.5 text-sm rounded-lg dark:bg-gray-700 ${
                  badResponse.errors.description
                    ? "bg-red-50 border-red-500 text-red-900 dark:text-red-400 placeholder-red-700 dark:placeholder-red-500 focus:ring-red-500 focus:border-red-500"
                    : "bg-gray-50 border-gray-300 text-gray-900 dark:text-white dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                }`}
              />
              {badResponse.errors.description && (
                <small className="text-red-600">
                  {badResponse.errors.description}
                </small>
              )}
            </div>
          </div>
          <input hidden name="accountingId" defaultValue={accounting?.id} />
          <div className="flex justify-center items-center gap-2 mt-4">
            <a
              className="px-4 py-2 bg-gray-300 text-gray-400 dark:bg-gray-600 dark:text-gray-400 rounded-md w-auto"
              href={`${
                isEditing
                  ? `/auth/accounting/${accounting?.id}`
                  : `/auth/accounting`
              }`}
            >
              Cancel
            </a>
            <SubmitButton
              title={isEditing ? "Update" : "Create"}
              pending={isPending}
            />
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default AccountingForm;
