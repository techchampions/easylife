import { useGetPlans } from "../../hooks/query/useGetPlans";
import PlanCard from "./Plancard";

const subscriptions: Plan[] = [
  {
    id: 1,
    name: "Singles Plan",
    price: 50,
    duration: 6,
    features: [
      "Relationship Coaching / Marriage Mentorship",
      " General Marriage Trainings",
      " Marriage Connections ",
      " Coordinated Godly Match Making ",
      "Singles Group Picnics For Relationship Connections And Intending Spouse Discovery",
      // "Intending Couples Discovery (Get Aways) Vacations",
      "Online / Offline Marriage Counseling",
    ],
    created_at: "",
    updated_at: "",
  },
  {
    id: 2,
    name: "Couples Plan",
    price: 60,
    duration: 12,
    features: [
      "Relationship Coaching / Marriage Mentorship",
      " General Marriage Trainings",
      " Marriage Reconciliations ",
      "Couples Group Relaxation Vacations For Marital Love Renewal",
      // "Couples Relaxation (Get Aways) Vacations",
      "Online / Offline Marriage Counseling",
    ],
    created_at: "",
    updated_at: "",
  },
];
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
          unlimited access to the platforms features and benefits, the available
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
