import { CreditCard, Info, Wallet2 } from "lucide-react";
import React, { useState } from "react";
import {
  useInitialPayment,
  useRenewSubWithWallet,
  useWalletPayment,
} from "../../hooks/mutattions/useSubscription";
import { usePaystackPayment } from "../../hooks/payments/usePaystack";
import { useGetWalletBalance } from "../../hooks/query/useUser";
import { formatPrice } from "../../utils/formatter";
import { useModal } from "../../zustand/modal.state";
import { useUserStore } from "../../zustand/user.state";
import BasicInfo from "../auth/BasicInfo";
import Button from "../global/Button";
import CryptoWalletAddress from "../global/CopyText";
interface Prop {
  item: {
    id: number;
    name: string;
    price: number;
    duration: number;
    features?: string[];
    type: string;
  };
  isRenewal?: boolean;
}
const SelectPaymentMethod: React.FC<Prop> = ({ item, isRenewal = false }) => {
  const { user } = useUserStore();
  const modal = useModal();
  const { data } = useGetWalletBalance();
  const { mutate: initiatePayment, isPending } = useInitialPayment();
  const paystack = usePaystackPayment();
  const { mutate: payWithWallet, isPending: loadingWallet } =
    useWalletPayment();
  const { mutate: renewWithWallet, isPending: isRenewing } =
    useRenewSubWithWallet();
  const paymentMethods = ["wallet", "paystack"];
  const [selectedMethod, setselectedMethod] = useState("");
  const makePayment = () => {
    const payload: InitializePaymentPayload = {
      plan_id: item.id,
      payment_type: isRenewal ? "renewal" : "mentorship",
    };
    if (selectedMethod === "paystack") {
      initiatePayment(payload, {
        onSuccess(data) {
          paystack({
            email: user?.email || "",
            reference: data.payment.reference || "",
            amount: data.payment.naira_amount || 0,
            onSuccess() {
              if (isRenewal) {
                modal.close();
              } else {
                modal.open(<BasicInfo />);
              }
            },
            onClose() {},
          });
        },
      });
    }
    if (selectedMethod === "wallet") {
      if (isRenewal) {
        renewWithWallet(payload);
      }
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
    <div className="w-xs md:w-sm space-y-2 max-h-[85vh] overflow-y-auto scrollbar-hide">
      <div className="text-2xl font-bold">Select Payment Method:</div>
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
              {method === "paystack" && <CreditCard size={30} />}
              {method === "wallet" && <Wallet2 size={30} />}
              <div className="flex-1">
                <div className="capitalize">{method}</div>
                {method === "paystack" && <FlutterIcons />}
                {method === "wallet" && <WalletBalance />}
              </div>
            </div>
          ))}
        </div>
        <div className="bg-green-500/20 p-2 rounded-lg text-green-950 flex gap-2 w-full">
          <img src="/images/usdt.png" alt="" className="w-10 h-10" />
          <div className="flex-1 text-left text-xs">
            <div className="wrap-break-word">
              <b>USDT Funding</b> Pay ${item.price} to our USDT (TRC 20) Wallet
              shown below. After payment, send transaction receipt plus your
              email address to Easylifesupport on Whatsapp to{" "}
              <b className="wrap-break-word">+39 351 251 3290</b>. Your account
              will be funded after payment is confirmed.
            </div>
          </div>
        </div>
        <CryptoWalletAddress address="TMLTSCTQJAG5kRgmZ9oGf1aKkUet9rT2Vk" />

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
                <span className="font-medium">{item.name}</span>
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

      <div className="space-y-2">
        <Button
          label="Make Payment"
          disabled={!selectedMethod || isPending || loadingWallet || isRenewing}
          isLoading={isPending || loadingWallet || isRenewing}
          onClick={makePayment}
        />
        <div className="flex gap-2 text-xs bg-primary/20 p-2 text-left rounded-xl font-medium text-primary">
          <Info />
          <div className="flex-1 wrap-break-word">
            For wallet funding, please contact support at +39 351 251 3290
            (Whatsapp only) or send a mail to{" "}
            <a href="mailto:support@demarriageacademy.com">
              support@demarriageacademy.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectPaymentMethod;
