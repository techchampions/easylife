import React from "react";
import { useModal } from "../../zustand/modal.state";
import { Info } from "lucide-react";
import Button from "../global/Button";

const DeleteAccount: React.FC = () => {
  const modal = useModal();
  return (
    <div className="w-xs max-w-xs space-y-7">
      <div className="">
        <p className="font-medium text-lg text-center">
          Are you sure you want to delete your account?
        </p>
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <Info size={15} />
          <span>Please note that this action is not reversible. </span>
        </div>

        <div className="flex items-center gap-2">
          <Button label="No, cancel" onClick={modal.close} />
          <Button
            label="Yes, Delete"
            className="bg-red-500"
            onClick={modal.close}
          />
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;
