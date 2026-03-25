import { CreditCard, Wallet2 } from "lucide-react";
import React, { useState } from "react";
import {
  useInitialPayment,
  useWalletPayment,
} from "../../hooks/mutattions/useSubscription";
import { useGetWalletBalance } from "../../hooks/query/useUser";
import { formatPrice } from "../../utils/formatter";
import Button from "../global/Button";
interface Prop {
  item: {
    id: number;
    title: string;
    price: number;
    duration: number;
    list?: string[];
    type: string;
  };
}
const SelectPaymentMethod: React.FC<Prop> = ({ item }) => {
  const { data } = useGetWalletBalance();
  const { mutate: initiatePayment, isPending } = useInitialPayment();
  const { mutate: payWithWallet, isPending: loadingWallet } =
    useWalletPayment();
  const paymentMethods = ["wallet", "flutterwave"];
  const [selectedMethod, setselectedMethod] = useState("");
  const makePayment = () => {
    const payload: InitializePaymentPayload = {
      plan_id: item.id,
      payment_type: "mentorship",
    };
    if (selectedMethod === "flutterwave") {
      initiatePayment(payload);
    }
    if (selectedMethod === "wallet") {
      payWithWallet(payload);
    }
  };
  const WalletBalance = () => {
    return (
      <div className="flex gap-4 justify-between items-center">
        <span className="text-xs">Balance:</span>
        <span className="text-right text-green-500 font-bold">
          {formatPrice(data?.balance || 0)}
        </span>
      </div>
    );
  };
  const FlutterIcons = () => {
    return (
      <div className="flex items-center gap-1">
        <img src="/images/Mastercard.png" className=" h-5" />
        <img src="/images/Visa.png" className=" h-5" />
        <img src="/images/verve.svg" className=" h-5" />
      </div>
    );
  };
  return (
    <div className="w-xs md:w-sm space-y-2">
      <div className="text-2xl font-bold">Select Payment Method:</div>
      {/* <hr className="w-4/5 text-gray-200 my-2" /> */}
      <div className="space-y-2">
        <div className="space-x-1 flex">
          {paymentMethods.map((method) => (
            <div
              onClick={() => setselectedMethod(method)}
              key={method}
              className={`w-2/3 cursor-pointer px-4 py-2 rounded-xl flex gap-2 font-bold border border-gray-200 ${
                selectedMethod === method ? "bg-secondary text-white" : ""
              }`}
            >
              {method === "flutterwave" && <CreditCard size={30} />}
              {method === "wallet" && <Wallet2 size={30} />}
              <div className="flex-1">
                <div className="capitalize">{method}</div>
                {method === "flutterwave" && <FlutterIcons />}
                {method === "wallet" && <WalletBalance />}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border border-gray-200 rounded-2xl flex flex-col">
          <h3 className="font-semibold text-lg mb-3">Payment Summary</h3>
          <div className="flex-1">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Amount</span>
                <span className="font-medium">{formatPrice(item.price)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Plan</span>
                <span className="font-medium">{item.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration</span>
                <span className="font-medium">{item.duration} months</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{formatPrice(item.price)}</span>
              </div>
              <div className="flex justify-between text-base font-semibold">
                <span>Total payable</span>
                <span className="text-green-600">
                  {formatPrice(item.price)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="">
        <Button
          label="Make Payment"
          disabled={!selectedMethod || isPending || loadingWallet}
          isLoading={isPending || loadingWallet}
          onClick={makePayment}
        />
      </div>
    </div>
  );
};

export default SelectPaymentMethod;
