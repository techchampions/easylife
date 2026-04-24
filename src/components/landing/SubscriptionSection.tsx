import { subscriptions } from "../../const/data";
import { useGetPlans } from "../../hooks/query/useGetPlans";
import PlanCard from "./Plancard";

const SubscriptionSection = () => {
  const { data } = useGetPlans();
  const plans = data || subscriptions;
  return (
    <div className="w-full md:w-[70%] mx-auto space-y-10">
      <div className="text-center space-y-4">
        <h2 className="text-3xl 2xl:text-5xl font-black">
          EasyLife Marriage Academy Subscriptions
        </h2>
        <p className="2xl:text-xl">
          Subscribe to{" "}
          <span className="uppercase">EasyLife marriage academy</span> to have
          unlimited access to EasyLife features and benefits. The available
          plans are as follows:
        </p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {plans.map((item, i) => (
          <PlanCard item={item} key={i} />
        ))}
      </div>
    </div>
  );
};

export default SubscriptionSection;
