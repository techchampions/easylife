import { subscriptions } from "../../const/data";
import { useUserStore } from "../../zustand/user.state";
import PlanCard from "./PlanCard";

const Subscription = () => {
  const { user } = useUserStore();
  const plan = subscriptions.find((item) => item.type === user?.marital_status);
  return (
    <div className="max-w-xs md:max-w-md max-h-[75vh] overflow-y-auto scrollbar-hide space-y-5">
      <div className="text-center space-y-2">
        <h2 className="text-lg md:text-2xl font-black">
          EasyLife Marriage Academy Subscription
        </h2>
        <p className="text-xs md:text-sm">
          Subscribe to{" "}
          <span className="capitalize font-bold">
            {user?.marital_status} EasyLife marriage academy{" "}
          </span>{" "}
          to have unlimited access to the platforms features and benefits.
        </p>
      </div>
      <div className="">{plan && <PlanCard item={plan} />}</div>
    </div>
  );
};

export default Subscription;
