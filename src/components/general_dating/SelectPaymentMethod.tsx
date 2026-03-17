import { CreditCard, Wallet2 } from "lucide-react";
import React, { useState } from "react";
import { useInitialPayment } from "../../hooks/mutattions/useSubscription";
import { formatPrice } from "../../utils/formatter";
import Button from "../global/Button";
interface Prop {
  item: {
    id: number;
    title: string;
    price: number;
    duration: number;
    list: string[];
    type: string;
  };
}
const SelectPaymentMethod: React.FC<Prop> = ({ item }) => {
  const { mutate: initiatePayment, isPending } = useInitialPayment();
  const paymentMethods = ["flutterwave", "wallet"];
  const [selectedMethod, setselectedMethod] = useState("");
  const makePayment = () => {
    if (selectedMethod === "flutterwave") {
      const payload: InitializePaymentPayload = {
        plan_id: item.id,
        payment_type: "mentorship",
      };
      initiatePayment(payload);
    }
  };
  return (
    <div className="w-sm space-y-2">
      <div className="text-2xl font-bold">Select Payment Method:</div>
      {/* <hr className="w-4/5 text-gray-200 my-2" /> */}
      <div className="space-y-2">
        <div className="space-x-1 flex">
          {paymentMethods.map((method) => (
            <div
              onClick={() => setselectedMethod(method)}
              key={method}
              className={`w-2/3 cursor-pointer p-4 rounded-xl flex gap-2 items-center font-bold border border-gray-200 ${
                selectedMethod === method ? "bg-secondary text-white" : ""
              }`}
            >
              {method === "flutterwave" && <CreditCard />}
              {method === "wallet" && <Wallet2 />}
              <div className="capitalize">{method}</div>
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
          disabled={!selectedMethod || isPending}
          isLoading={isPending}
          onClick={makePayment}
        />
      </div>
    </div>
  );
};

export default SelectPaymentMethod;
