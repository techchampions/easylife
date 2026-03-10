import { ArrowRight, CheckCircle2 } from "lucide-react";
import React from "react";
import { useModal } from "../../zustand/modal.state";
import Subscription from "../general_dating/Subscription";
import Button from "../global/Button";

const Congrats: React.FC = () => {
  const modal = useModal();
  return (
    <div className="w-sm max-w-xs md:max-w-sm">
      <div className="p-5">
        <div className="w-1/2 mx-auto">
          <img src="/images/relationship.svg" alt="" className="w-full" />
        </div>
        <div className="flex flex-col items-center text-center">
          <CheckCircle2 size={60} className="text-secondary" />
          <div className="text-2xl font-bold">Congratulations!</div>
          <div className="text-gray-700">
            You have successfully signed up on Easylife Marriage Academy. Please
            click the button to make payment for your subscription{" "}
          </div>
          <Button
            label="Proceed"
            rightIcon={<ArrowRight />}
            onClick={() => {
              modal.openStrong(<Subscription />);
            }}
            className="mt-5 bg-secondary"
          />
        </div>
      </div>
    </div>
  );
};

export default Congrats;
