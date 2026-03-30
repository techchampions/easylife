import { CheckCircle, CircleOff, RefreshCw } from "lucide-react";
import type React from "react";
import Button from "../../components/global/Button";
import { formatDate, formatPrice } from "../../utils/formatter";
import { useModal } from "../../zustand/modal.state";
import { useUserStore } from "../../zustand/user.state";
import SelectPaymentMethod from "./SelectPaymentMethod";
interface Props {
  activeSub?: SubscriptionHistory;
  isLoading: boolean;
  isError: boolean;
}
const UserSubCardSkeleton = () => {
  return (
    <div className="bg-linear-to-tr from-primary to-black p-7 rounded-3xl animate-pulse">
      <div className="space-y-8 text-white flex flex-col">
        <div className="flex-1 space-y-4 md:flex md:items-center md:justify-between">
          <div className="flex-1">
            <div className="text-center md:text-left">
              <div className="flex gap-4 justify-center md:justify-start">
                {/* Plan type skeleton */}
                <div className="h-8 w-32 bg-white/20 rounded-lg" />
                {/* Status badge skeleton */}
                <div className="h-8 w-20 bg-green-500/30 rounded-lg" />
              </div>
              <div className="mt-3 space-y-2">
                {/* Expiry date skeleton */}
                <div className="h-4 w-40 bg-white/20 rounded" />
                {/* Date range skeleton */}
                <div className="h-4 w-48 bg-white/20 rounded" />
              </div>
            </div>
            <div className="h-1 rounded-[100%] w-1/2 mx-auto bg-white/30 md:hidden mt-3" />
          </div>

          {/* Benefits list skeleton */}
          <ul className="space-y-3 p-2 flex-1">
            {[1, 2, 3, 4].map((idx) => (
              <li key={idx} className="flex items-center-safe gap-2">
                <div className="w-4 h-4 bg-white/20 rounded-full" />
                <div className="flex-1 h-4 bg-white/20 rounded" />
              </li>
            ))}
          </ul>
        </div>

        {/* Buttons skeleton */}
        <div className="w-full flex justify-end">
          <div className="grid grid-cols-3 gap-4 w-full md:w-2/3">
            <div className="h-10 bg-red-500/50 rounded-lg" />
            <div className="h-10 bg-white/20 rounded-lg col-span-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

const UserSubCard: React.FC<Props> = ({ isLoading, isError, activeSub }) => {
  const { user } = useUserStore();
  const modal = useModal();
  const list = [
    "Relationship Coaching / Marriage Mentorship",
    " General Marriage Trainings",
    " Marriage Connections ",
    " Coordinated Godly Match Making ",
  ];
  if (isLoading || isError) {
    return <UserSubCardSkeleton />;
  }
  const clickRenew = () => {
    if (activeSub) {
      const item = {
        id: activeSub.plan_id,
        name: activeSub.subscription_type,
        price: Number(activeSub.amount_paid),
        duration: 0,
        type: activeSub.subscription_type,
      };
      modal.open(<SelectPaymentMethod item={item} />);
    }
  };

  return (
    <div className="bg-linear-to-tr from-primary to-black p-7 rounded-3xl">
      <div className="space-y-8 text-white flex flex-col">
        <div className="flex-1 space-y-4 md:flex md:items-center md:justify-between">
          <div className="">
            <div className="text-center md:text-left">
              <div className="flex gap-4 justify-center">
                <div className="text-2xl font-semibold">
                  {user?.marital_status === "married" ? "Couples" : "Singles"}{" "}
                  Plan
                </div>
                <div className="bg-linear-to-r to-green-600/50 flex items-center justify-center text-green-500 px-4 text-sm rounded-lg">
                  Active
                </div>
              </div>
              <div className="">
                <div className="">
                  Started: {formatDate(activeSub?.start_date || "", true)}
                </div>
                <div className="">
                  Expires: {formatDate(activeSub?.expiry_date || "", true)}
                </div>
              </div>
            </div>
            <div className="h-1 rounded-[100%] w-1/2 mx-auto bg-white/70 md:hidden mt-3" />
          </div>

          <ul className="space-y-3 p-2">
            {list.map((list, idx) => (
              <li key={idx} className="flex items-center-safe gap-2">
                {" "}
                <CheckCircle size={15} />
                <div className="flex-1 text-sm">{list}</div>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full flex justify-end">
          <div className="grid grid-cols-3 gap-4 w-full md:w-2/3">
            <Button
              label="Cancel"
              className="bg-red-500"
              icon={<CircleOff size={15} />}
            />
            <Button
              label={`Renew at ${formatPrice(activeSub?.amount_paid || "")}`}
              className="bg-white text-primary! col-span-2"
              icon={<RefreshCw size={15} />}
              onClick={clickRenew}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSubCard;
