import SubscriptionHistory from "../../components/general_dating/SubscriptionHistory";
import UserSubCard from "../../components/general_dating/UserSubCard";
import Header from "../../components/global/Header";

const MySubscription = () => {
  return (
    <div>
      <Header name="My Subscription" />
      <div className="p-3 space-y-5">
        <UserSubCard />
        <SubscriptionHistory />
      </div>
    </div>
  );
};

export default MySubscription;
