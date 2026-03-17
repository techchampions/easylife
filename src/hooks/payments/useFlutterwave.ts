/* eslint-disable @typescript-eslint/no-explicit-any */

type FlutterwaveProps = {
  email: string;
  amount: number; // amount in Naira
  reference: string;
  onSuccess: (response: any) => void;
  onClose: () => void;
  customerName?: string;
  phoneNumber?: string;
  meta?: Record<string, any>;
};

export const useFlutterWave = () => {
  // Flutterwave payment initialization
  const initializeFlutterwave = async ({
    email,
    amount,
    reference,
    onSuccess,
    onClose,
    customerName = "",
    phoneNumber = "",
    meta = {},
  }: FlutterwaveProps) => {
    try {
      const config = {
        public_key: "FLWPUBK_TEST-xxxxxxxxxxxxxxxxxxxxx", // 🔁 Replace with your Flutterwave public key
        tx_ref: reference,
        amount: amount,
        currency: "NGN",
        payment_options: "card, mobilemoney, ussd",
        redirect_url: window.location.origin, // optional redirect URL
        meta,
        customer: {
          email,
          name: customerName,
          phonenumber: phoneNumber,
        },
        customizations: {
          title: "Subscription", // 🔁 Update with your app name
          description: "Payment for services", // 🔁 Update as needed
          logo: "/images/logo.png", // 🔁 Add your logo URL
        },
        callback: (response: any) => {
          // This will be called after successful payment
          onSuccess(response);
        },
        onclose: () => {
          onClose();
        },
      };

      const flutterwave = (window as any).FlutterwaveCheckout(config);
      console.log(flutterwave);
    } catch (error) {
      console.error("Failed to load Flutterwave:", error);
      // Optionally show an error message to the user
    }
  };

  return initializeFlutterwave;
};
