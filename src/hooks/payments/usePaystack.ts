/* eslint-disable @typescript-eslint/no-explicit-any */
type PaystackProps = {
  email: string;
  amount: number; // amount in Naira
  reference: string;
  onSuccess: (reference: any) => void;
  onClose: () => void;
};

export const usePaystackPayment = () => {
  const initializePayment = ({
    email,
    amount,
    reference,
    onSuccess,
    onClose,
  }: PaystackProps) => {
    const paystack = (window as any).PaystackPop?.setup({
      key: "pk_live_d32600ca57ada137b1805d9e7fdfb5fd2d9f3fd8", // 🔁 Replace with your Paystack public key
      email,
      ref: reference,
      amount: amount * 100, // convert to kobo
      currency: "NGN",
      callback: onSuccess,
      onClose,
    });

    paystack?.openIframe();
  };

  return initializePayment;
};
