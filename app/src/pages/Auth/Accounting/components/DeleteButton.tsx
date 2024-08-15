import { useState } from "react";
import { useModal } from "../../../../hooks";
import { AccountingClient } from "../../../../services";
import { Modal, SubmitButton } from "../../../../components";
import { INITIAL_STATE_RESPONSE } from "../../../../constants";
import type {
  IAccounting,
  IAccountingDeleteState,
} from "../../../../interfaces";

const DeleteButton = ({ accounting }: { accounting: IAccounting }) => {
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
    const response = await AccountingClient.delete(accounting.id);
    if (response && response.success) {
      window.location.href = "/auth/accounting";
    } else {
      setBadResponse(response as IAccountingDeleteState);
    }
    onClose();
    setIsPending(false);
  };

  return (
    <>
      <button
        onClick={onOpen}
        className="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-red-300 text-red-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </button>
      {badResponse.message && (
        <p className="text-red-600">{badResponse.message}</p>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="h-2/3 overflow-auto">
          <h1 className="text-base md:text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Are you sure you want to delete the accounting with the{" "}
            <span className=" text-green-600">{accounting.description}</span>{" "}
            description?
          </h1>
        </div>
        <div className="flex justify-center items-center gap-2 mt-4 h-1/3">
          <form onSubmit={submitAction}>
            <fieldset disabled={isPending}>
              <SubmitButton title="Yes" color="red" pending={isPending} />
            </fieldset>
          </form>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-500"
          >
            No
          </button>
        </div>
      </Modal>
    </>
  );
};

export default DeleteButton;
