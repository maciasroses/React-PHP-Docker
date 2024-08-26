import { useState } from "react";
import { useModal } from "@/hooks";
import { TrashIcon } from "@/assets/icons";
import { AdminAccountingClient } from "@/services";
import { INITIAL_STATE_RESPONSE } from "@/constants";
import { AccountingCard, Modal, SubmitButton } from "@/components";
import type { IAccountingDeleteState, IAdminAccouning } from "@/interfaces";

const DeleteButton = ({ accountings }: { accountings: IAdminAccouning[] }) => {
  const { isOpen, onOpen, onClose } = useModal();
  const [isPending, setIsPending] = useState(false);
  const [badResponse, setBadResponse] = useState<IAccountingDeleteState>(
    INITIAL_STATE_RESPONSE
  );

  const submitAction: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    setIsPending(true);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await AdminAccountingClient.massiveDelete(formData);
    if (response && response.success) {
      setBadResponse(INITIAL_STATE_RESPONSE);
      window.location.reload();
    } else {
      setBadResponse(response as IAccountingDeleteState);
    }
    setIsPending(false);
  };

  const onHandleCancel = () => {
    setBadResponse(INITIAL_STATE_RESPONSE);
    onClose();
  };

  return (
    <>
      <button
        onClick={onOpen}
        className="rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-red-300 text-red-700 bg-red-100 dark:bg-red-700 border border-red-700 dark:border-red-300"
      >
        <TrashIcon />
      </button>
      <Modal isOpen={isOpen} onClose={onHandleCancel}>
        <h1 className="text-center text-4xl">Deleting</h1>
        {badResponse.message && (
          <p className="text-red-600">{badResponse.message}</p>
        )}
        <form onSubmit={submitAction} className="overflow-x-auto">
          <fieldset disabled={isPending}>
            <div className="flex justify-center gap-8">
              {accountings.map((accounting) => (
                <div key={accounting.id}>
                  <AccountingCard data={accounting} lng="en" isAdminView />
                  <input hidden name="id" defaultValue={accounting.id} />
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-4 max-w-fit sticky left-0">
              <SubmitButton title="Delete" color="red" pending={isPending} />
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

export default DeleteButton;
