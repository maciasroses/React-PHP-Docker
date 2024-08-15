import { useState } from "react";
import { TrashIcon } from "../../../../assets/icons";
import { AccountingClient } from "../../../../services";
import { Modal, SubmitButton } from "../../../../components";
import { useCustomTranslation, useModal } from "../../../../hooks";
import { INITIAL_STATE_RESPONSE } from "../../../../constants";
import type {
  IAccounting,
  IAccountingDeleteState,
} from "../../../../interfaces";

const DeleteButton = ({ accounting }: { accounting: IAccounting }) => {
  const { deleteButton } = useCustomTranslation("accounting");
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
        <TrashIcon />
      </button>
      {badResponse.message && (
        <p className="text-red-600">{badResponse.message}</p>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="h-2/3 overflow-auto">
          <h1 className="text-base md:text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {deleteButton.alert}{" "}
            <span className=" text-green-600">{accounting.description}</span>
            {" ?"}
          </h1>
        </div>
        <div className="flex justify-center items-center gap-2 mt-4 h-1/3">
          <form onSubmit={submitAction}>
            <fieldset disabled={isPending}>
              <SubmitButton
                title={deleteButton.confirm}
                color="red"
                pending={isPending}
              />
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
