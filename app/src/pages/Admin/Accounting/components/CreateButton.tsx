import clsx from "clsx";
import { useState } from "react";
import { AdminAccountingClient } from "@/services";
import { INITIAL_STATE_RESPONSE } from "@/constants";
import { MinusCircle, PlusCircle, Upload } from "@/assets/icons";
import { useCustomTranslation, useModal } from "@/hooks";
import { AccountingForm, Modal, SubmitButton } from "@/components";
import {
  IAdminUser,
  IAccountingForm,
  IAccountingCreateNUpdateState,
} from "@/interfaces";

interface IAccountingFormComponent {
  accountingForm: IAccountingForm;
}

const CreateButton = ({ users }: { users: IAdminUser[] }) => {
  const { isOpen, onOpen, onClose } = useModal();
  const [accountingCount, setAccountingCount] = useState(1);
  const [formView, setFormView] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const { accountingForm }: IAccountingFormComponent =
    useCustomTranslation("accounting");
  const [isPending, setIsPending] = useState(false);
  const [badResponse, setBadResponse] = useState<
    IAccountingCreateNUpdateState[]
  >([INITIAL_STATE_RESPONSE]);

  const handleIncreaseNSubstractAccountingCount = (action: string) => {
    if (action === "increase") {
      setBadResponse([...badResponse, INITIAL_STATE_RESPONSE]);
      setAccountingCount(accountingCount + 1);
    } else {
      setBadResponse(badResponse.slice(0, -1));
      setAccountingCount(accountingCount - 1);
    }
  };

  const submitAction: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    setIsPending(true);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await AdminAccountingClient.massiveCreate(formData);
    if (response && response[0]?.success) {
      setBadResponse(badResponse.map(() => ({ ...INITIAL_STATE_RESPONSE })));
      window.location.reload();
    } else {
      setBadResponse((prevBadResponse) =>
        prevBadResponse.map((_prevResponse, index) => {
          const errorForIndex = response[index];

          if (errorForIndex) {
            return {
              success: errorForIndex.success,
              message: errorForIndex.message,
              errors: errorForIndex.errors,
            };
          }

          // return prevResponse;
          return { ...INITIAL_STATE_RESPONSE };
        })
      );
    }
    setIsPending(false);
  };

  const onHandleCancel = () => {
    setBadResponse(badResponse.map(() => ({ ...INITIAL_STATE_RESPONSE })));
    setAccountingCount(1);
    setFormView(true);
    setFile(null);
    onClose();
  };

  return (
    <>
      <button
        onClick={onOpen}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Create
      </button>
      <Modal isOpen={isOpen} onClose={onHandleCancel}>
        <h1 className="text-center text-4xl">Creating</h1>
        {badResponse[0].message && (
          <p className="text-red-600">{badResponse[0].message}</p>
        )}
        <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
          <ul className="flex flex-wrap">
            <li className="w-1/2">
              <button
                onClick={() => setFormView(true)}
                className={clsx(
                  "w-full inline-block p-4 rounded-t-lg border-b-2",
                  formView
                    ? "border-blue-600 text-blue-600 dark:text-blue-500 dark:border-blue-500"
                    : "border-gray-200 dark:border-gray-700"
                )}
              >
                Form
              </button>
            </li>
            <li className="w-1/2">
              <button
                onClick={() => setFormView(false)}
                className={clsx(
                  "w-full inline-block p-4 rounded-t-lg border-b-2",
                  !formView
                    ? "border-blue-600 text-blue-600 dark:text-blue-500 dark:border-blue-500"
                    : "border-gray-200 dark:border-gray-700"
                )}
              >
                File
              </button>
            </li>
          </ul>
        </div>
        {formView ? (
          <>
            <div className="flex gap-2 items-center justify-end mt-2">
              <button
                type="button"
                onClick={() =>
                  handleIncreaseNSubstractAccountingCount("increase")
                }
              >
                <PlusCircle />
              </button>
              {accountingCount > 1 && (
                <button
                  type="button"
                  onClick={() =>
                    handleIncreaseNSubstractAccountingCount("substract")
                  }
                >
                  <MinusCircle />
                </button>
              )}
              <span>{accountingCount > 1 && `(${accountingCount} total)`}</span>
            </div>
            <form onSubmit={submitAction} className="overflow-x-auto text-left">
              <fieldset disabled={isPending}>
                <div className="flex justify-center gap-8">
                  {[...Array(accountingCount)].map((_, index) => (
                    <AccountingForm
                      key={index}
                      users={users}
                      accountingForm={accountingForm}
                      badResponse={badResponse[index]}
                    />
                  ))}
                </div>
                <div className="flex gap-2 mt-4 max-w-fit sticky left-0">
                  <SubmitButton
                    title="Create"
                    color="green"
                    pending={isPending}
                  />
                  <button
                    type="button"
                    onClick={onHandleCancel}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-500"
                  >
                    Cancel
                  </button>
                </div>
              </fieldset>
            </form>
          </>
        ) : (
          <form onSubmit={submitAction} encType="multipart/form-data">
            <fieldset disabled={isPending}>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="accountings"
                  className={clsx(
                    "flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer",
                    file
                      ? "bg-green-50 dark:bg-green-700 dark:border-green-600 border-green-500"
                      : "bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
                  )}
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload color={file ? "green" : ""} />
                    <p
                      className={clsx(
                        "mb-2 text-sm",
                        file
                          ? "text-green-500 dark:text-green-400"
                          : "text-gray-500 dark:text-gray-400"
                      )}
                    >
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                  </div>
                  <input
                    id="accountings"
                    name="accountings"
                    type="file"
                    className="hidden"
                    onChange={(event) => {
                      setFile(event.target.files?.[0] || null);
                    }}
                  />
                </label>
              </div>
              <div className="flex gap-2 mt-4">
                {file && (
                  <SubmitButton
                    title="Create"
                    color="green"
                    pending={isPending}
                  />
                )}
                <button
                  type="button"
                  onClick={onHandleCancel}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-500"
                >
                  Cancel
                </button>
              </div>
            </fieldset>
          </form>
        )}
      </Modal>
    </>
  );
};

export default CreateButton;
