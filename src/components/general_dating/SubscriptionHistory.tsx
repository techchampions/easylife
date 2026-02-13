import { useUserStore } from "../../zustand/user.state";

const SubscriptionHistory = () => {
  const list = [1, 2, 3, 4, 5];
  const { user } = useUserStore();
  return (
    <div className="bg-white rounded-3xl space-y-10 p-5">
      <h2 className="font-bold text-2xl">Subscription History</h2>
      <div className="">
        <div className="grid grid-cols-3 px-4 py-2 mb-3 text-lg font-medium divide-x divide-gray-200 ">
          <div className="">Plan</div>
          <div className="pl-4">Starts</div>
          <div className="pl-4">Ends</div>
        </div>

        {list.map((i) => (
          <div
            className="grid grid-cols-3 even:bg-gray-100 rounded-lg py-2 px-4 divide-x divide-gray-200"
            key={i}
          >
            <div className="">
              {user?.marital_status === "married" ? "Couples" : "Singles"} Plan
            </div>
            <div className="pl-4">01 Feb 2026</div>
            <div className="pl-4">05 Mar 2026</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionHistory;
