import { List } from "lucide-react";
import { formatDate } from "../../utils/formatter";
import { useUserStore } from "../../zustand/user.state";
import ItemMessagePlaceholder from "./ItemMessagePaceholder";
interface Props {
  items: SubscriptionHistory[];
  isLoading: boolean;
  isError: boolean;
}

const SubscriptionHistorySkeleton = () => {
  return (
    <div className="bg-white rounded-3xl space-y-10 p-5 animate-pulse">
      <h2 className="font-bold text-2xl bg-gray-200 w-48 h-8 rounded"></h2>
      <div className="">
        {/* Header skeleton */}
        <div className="grid grid-cols-3 px-4 py-2 mb-3 text-lg font-medium divide-x divide-gray-200">
          <div className="h-6 bg-gray-200 rounded w-16"></div>
          <div className="h-6 bg-gray-200 rounded w-16 pl-4"></div>
          <div className="h-6 bg-gray-200 rounded w-16 pl-4"></div>
        </div>

        {/* List items skeleton */}
        {[1, 2, 3].map((i) => (
          <div
            className="grid grid-cols-3 even:bg-gray-100 rounded-lg py-2 px-4 divide-x divide-gray-200"
            key={i}
          >
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-4 bg-gray-200 rounded w-28 pl-4"></div>
            <div className="h-4 bg-gray-200 rounded w-28 pl-4"></div>
          </div>
        ))}
      </div>
    </div>
  );
};
const SubscriptionHistory: React.FC<Props> = ({
  items,
  isError,
  isLoading,
}) => {
  const { user } = useUserStore();
  if (isLoading) {
    return <SubscriptionHistorySkeleton />;
  }
  if (isError) {
    return (
      <ItemMessagePlaceholder
        icon={<List />}
        title="Not Found"
        message="Unable to retrieve subscription history."
      />
    );
  }
  return (
    <div className="bg-white rounded-3xl space-y-10 p-5">
      <h2 className="font-bold text-2xl">Subscription History</h2>
      <div className="">
        <div className="grid grid-cols-3 px-4 py-2 mb-3 text-lg font-medium divide-x divide-gray-200 ">
          <div className="">Plan</div>
          <div className="pl-4">Starts</div>
          <div className="pl-4">Ends</div>
        </div>

        {items.map((item, i) => (
          <div
            className="grid grid-cols-3 text-xs md:text-base even:bg-gray-100 rounded-lg py-2 px-4 divide-x divide-gray-200"
            key={i}
          >
            <div className="">
              {user?.marital_status === "married" ? "Couples" : "Singles"} Plan
            </div>
            <div className="pl-4">{formatDate(item.start_date, true)}</div>
            <div className="pl-4">{formatDate(item.expiry_date, true)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionHistory;
