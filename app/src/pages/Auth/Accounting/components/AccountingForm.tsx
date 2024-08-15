import { useState } from "react";
import { Link } from "react-router-dom";
import { SubmitButton } from "../../../../components";
import { AccountingClient } from "../../../../services";
import { useCustomTranslation } from "../../../../hooks";
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
  const { accountingForm } = useCustomTranslation("accounting");
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
          {isEditing ? accountingForm.editTitle : accountingForm.createTitle}
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
                <label htmlFor="amount">{accountingForm.amount}</label>
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  placeholder="200"
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
                <label htmlFor="currency">{accountingForm.currency}</label>
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
                  <option value="">{accountingForm.selectCurrency}</option>
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
                <label htmlFor="date">{accountingForm.date}</label>
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
                <label htmlFor="type">{accountingForm.type.title}</label>
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
                  <option value="">{accountingForm.type.select}</option>
                  <option value="Income">
                    {accountingForm.type.options.income}
                  </option>
                  <option value="Expense">
                    {accountingForm.type.options.expense}
                  </option>
                  <option value="Transfer">
                    {accountingForm.type.options.transfer}
                  </option>
                </select>
                {badResponse.errors.type && (
                  <small className="text-red-600">
                    {badResponse.errors.type}
                  </small>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="description">{accountingForm.description}</label>
              <textarea
                name="description"
                id="description"
                placeholder={accountingForm.descriptionPlaceholder}
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
