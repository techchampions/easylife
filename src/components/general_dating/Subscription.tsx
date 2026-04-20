import { ArrowLeft } from "lucide-react";
import { subscriptions } from "../../const/data";
import { useModal } from "../../zustand/modal.state";
import { useUserStore } from "../../zustand/user.state";
import MaritalStatus from "../auth/MaritalStatus";
import PlanCard from "./PlanCard";

const Subscription = () => {
  const { user } = useUserStore();
  const modal = useModal();
  const marital_status = user?.marital_status || "single";
  const plan = subscriptions.find((item) => item.type === marital_status);
  const goBack = () => {
    modal.open(<MaritalStatus />);
  };

  return (
    <div className="max-w-xs md:max-w-md max-h-[75vh] overflow-y-auto scrollbar-hide space-y-5">
      <div
        className="flex items-center gap-2 cursor-pointer absolute top-4 left-4"
        onClick={goBack}
      >
        <ArrowLeft /> Back
      </div>

      <div className="text-center space-y-2">
        <h2 className="text-lg md:text-2xl font-black">
          EasyLife Marriage Academy Subscription
        </h2>
        <p className="text-xs md:text-sm">
          Subscribe to{" "}
          <span className="capitalize font-bold">
            {marital_status} EasyLife marriage academy{" "}
          </span>{" "}
          to have unlimited access to the platforms features and benefits.
        </p>
      </div>
      <div className="">{plan && <PlanCard item={plan} />}</div>
    </div>
  );
};

export default Subscription;
