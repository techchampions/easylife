import PlanCard from "./Plancard";

const subscriptions = [
  {
    title: "Singles Plan",
    price: 50,
    duration: 3,
    list: [
      "Relationship Coaching / Marriage Mentorship",
      " General Marriage Trainings",
      " Marriage Connections ",
      " Coordinated Godly Match Making ",
    ],
  },
  {
    title: "Couples Plan",
    price: 60,
    duration: 6,
    list: [
      "Relationship Coaching / Marriage Mentorship",
      " General Marriage Trainings",
      " Marriage Reconciliations ",
    ],
  },
];
const SubscriptionSection = () => {
  return (
    <div className="w-full md:w-[70%] mx-auto space-y-10">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-black">
          EasyLife Marriage Academy Subscriptions
        </h2>
        <p>
          Subscribe to EasyLife marriage academy to have unlimited access to the
          platforms features and benefits, the avialable plan are as follows:
        </p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {subscriptions.map((item, i) => (
          <PlanCard item={item} key={i} />
        ))}
      </div>
    </div>
  );
};

export default SubscriptionSection;
