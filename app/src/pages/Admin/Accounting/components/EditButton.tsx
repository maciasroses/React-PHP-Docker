import { useState } from "react";
import { useCustomTranslation, useModal } from "@/hooks";
import { PencilIcon } from "@/assets/icons";
import { INITIAL_STATE_RESPONSE } from "@/constants";
import { AccountingForm, Modal, SubmitButton } from "@/components";
import type {
  IAccountingCreateNUpdateState,
  IAccountingForm,
  IAdminAccouning,
} from "@/interfaces";
import { AdminAccountingClient } from "@/services";

interface IAccountingFormComponent {
  accountingForm: IAccountingForm;
}

const EditButton = ({ accountings }: { accountings: IAdminAccouning[] }) => {
  const { isOpen, onOpen, onClose } = useModal();
  const { accountingForm }: IAccountingFormComponent =
    useCustomTranslation("accounting");
  const [isPending, setIsPending] = useState(false);
  const [badResponse, setBadResponse] = useState<
    IAccountingCreateNUpdateState[]
  >([INITIAL_STATE_RESPONSE]);

  const submitAction: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    setIsPending(true);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await AdminAccountingClient.massiveUpdate(formData);
    if (response && response[0].success) {
      alert(response);
    } else {
      setBadResponse([response[0] as IAccountingCreateNUpdateState]);
    }
    setIsPending(false);
  };

  return (
    <>
      <button
        onClick={onOpen}
        className="rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-blue-300 text-blue-700 bg-blue-100 dark:bg-blue-700 border border-blue-700 dark:border-blue-300"
      >
        <PencilIcon />
      </button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <h1>Editing</h1>
        {/* {badResponse.message && (
          <p className="text-red-600">{badResponse.message}</p>
        )} */}
        <form onSubmit={submitAction}>
          <fieldset disabled={isPending}>
            {accountings.map((accounting, index) => (
              <AccountingForm
                key={accounting.id}
                accounting={accounting}
                accountingForm={accountingForm}
                badResponse={badResponse[index]}
              />
            ))}
            <div className="h-1/4 flex justify-center items-center gap-2 mt-4">
              <SubmitButton title="Edit" color="green" pending={isPending} />
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-500"
              >
                No
              </button>
            </div>
          </fieldset>
        </form>
      </Modal>
    </>
  );
};

export default EditButton;
