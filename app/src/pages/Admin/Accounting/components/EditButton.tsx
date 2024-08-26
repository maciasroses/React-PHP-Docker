import { useEffect, useState } from "react";
import { useCustomTranslation, useModal } from "@/hooks";
import { PencilIcon } from "@/assets/icons";
import { INITIAL_STATE_RESPONSE } from "@/constants";
import { AccountingForm, Modal, SubmitButton } from "@/components";
import type {
  IAccountingCreateNUpdateState,
  IAccountingForm,
  IAdminAccouning,
  IAdminUser,
} from "@/interfaces";
import { AdminAccountingClient } from "@/services";

interface IAccountingFormComponent {
  accountingForm: IAccountingForm;
}

interface IEditButton {
  accountings: IAdminAccouning[];
  users: IAdminUser[];
}

const EditButton = ({ accountings, users }: IEditButton) => {
  const { isOpen, onOpen, onClose } = useModal();
  const { accountingForm }: IAccountingFormComponent =
    useCustomTranslation("accounting");
  const [isPending, setIsPending] = useState(false);
  const [badResponse, setBadResponse] = useState<
    IAccountingCreateNUpdateState[]
  >([INITIAL_STATE_RESPONSE]);

  useEffect(() => {
    const initialBadResponse = accountings.map(() => ({
      ...INITIAL_STATE_RESPONSE,
    }));
    setBadResponse(initialBadResponse);
  }, [accountings]);

  const submitAction: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    setIsPending(true);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await AdminAccountingClient.massiveUpdate(formData);
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
    setBadResponse(accountings.map(() => ({ ...INITIAL_STATE_RESPONSE })));
    onClose();
  };

  return (
    <>
      <button
        onClick={onOpen}
        className="rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-blue-300 text-blue-700 bg-blue-100 dark:bg-blue-700 border border-blue-700 dark:border-blue-300"
      >
        <PencilIcon />
      </button>
      <Modal isOpen={isOpen} onClose={onHandleCancel}>
        <h1 className="text-center text-4xl">Editing</h1>
        {badResponse[0].message && (
          <p className="text-red-600">{badResponse[0].message}</p>
        )}
        <form onSubmit={submitAction} className="overflow-x-auto">
          <fieldset disabled={isPending}>
            <div className="flex justify-center gap-8">
              {accountings.map((accounting, index) => (
                <AccountingForm
                  key={index}
                  accounting={accounting}
                  users={users}
                  accountingForm={accountingForm}
                  badResponse={badResponse[index]}
                />
              ))}
            </div>
            <div className="flex gap-2 mt-4 max-w-fit sticky left-0">
              <SubmitButton title="Update" color="green" pending={isPending} />
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
      </Modal>
    </>
  );
};

export default EditButton;
