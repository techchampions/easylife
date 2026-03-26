import SubscriptionHistory from "../../components/general_dating/SubscriptionHistory";
import UserSubCard from "../../components/general_dating/UserSubCard";
import Header from "../../components/global/Header";
import { useFetchSubscription } from "../../hooks/query/useGetPlans";

const MySubscription = () => {
  const { data, isError, isLoading } = useFetchSubscription();
  const subs = data?.subscriptionHistories || [];
  const activeSub = subs.find((i) => i.status === "active");
  return (
    <div>
      <Header name="My Subscription" />
      <div className="p-3 space-y-5">
        <UserSubCard
          activeSub={activeSub}
          isLoading={isLoading}
          isError={isError || !activeSub}
        />
        <SubscriptionHistory
          items={subs}
          isError={isError}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default MySubscription;
