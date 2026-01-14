import {
  useState,
  useRef,
  useEffect,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import Button from "../global/Button";
import { useModal } from "../../zustand/modal.state";
import GetStarted from "./GetStarted";

interface OTPProps {
  length?: number;
}

const VerifyEmail: React.FC<OTPProps> = ({ length = 4 }) => {
  const { openModal } = useModal();
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const [timer, setTimer] = useState<number>(59);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const inputRefs = useRef<(HTMLInputElement | null)[]>(
    new Array(length).fill(null)
  );

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  useEffect(() => {
    setIsDisabled(otp.includes(""));
  }, [otp]);

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (otp[index] !== "") {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    openModal(<GetStarted />);
    // const enteredOtp = otp.join("");
    // try {
    //   const response = await apiClient.post("/verify-otp", {
    //     otp: enteredOtp,
    //   });
    //   setIsSubmitting(true);
    //   if (response.data.success) {
    //     showToast("OTP verified successfully!", "success");
    //     if (token) {
    //       setStep("onboarding complete");
    //       setHasCompletedOnboarding(true);
    //       setIsLoggedIn(true);
    //     }
    //     setStep("signup completed");
    //   }
    // } catch (error) {
    //   showToast("OTP verification failed. Please try again.", "error");
    //   console.error("OTP verification failed:", error);
    // }
    // setIsSubmitting(false);
  };

  const handleResendOTP = async () => {
    // try {
    //   const response = await apiClient.post("/resend-otp");
    //   if (response.data.success) {
    //     showToast("OTP resent successfully!", "success");
    //     setTimer(59);
    //   } else {
    //     throw new Error("Failed to resend OTP");
    //   }
    // } catch (error) {
    //   showToast("Failed to resend OTP. Please try again.", "error");
    //   console.log(error);
    // }
  };

  return (
    <div className="flex flex-col items-center space-y-4 w-sm max-w-xs md:max-w-sm">
      <h4 className="text-5xl font-bold text-primary">
        00:{timer < 10 ? `0${timer}` : timer}
      </h4>
      <p className="text-gray-500 text-sm mb-8 w-[200px] text-center">
        Type the verification code sent to your email
      </p>

      <div className="grid grid-cols-4 gap-2">
        {otp.map((value, index) => (
          <input
            key={index}
            // ref={(el) => (inputRefs.current[index] = el)}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            value={value}
            maxLength={1}
            placeholder="0"
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className={`h-19 w-18 border-2 text-center text-2xl text-primary font-bold rounded-[15px] focus:outline-none transition-all mb-20 focus:border-secondary active:text-secondary ${
              value
                ? "bg-secondary text-white border-secondary"
                : "border-gray-300"
            }`}
          />
        ))}
      </div>

      <Button
        label="Proceed"
        className={`w-[80%]! py-2 font-medium text-lg transition bg-secondary ${
          isDisabled ? "cursor-not-allowed" : "hover:bg-secondary/80 text-white"
        }`}
        onClick={handleSubmit}
        disabled={isDisabled}
        isLoading={isSubmitting}
      />

      <p className="text-sm text-gray-500">
        Didn’t get the code?{" "}
        <button
          className="text-adron-green"
          onClick={handleResendOTP}
          disabled={timer > 0}
        >
          {timer > 0 ? `Resend in ${timer}s` : "Resend code"}
        </button>
      </p>
    </div>
  );
};

export default VerifyEmail;
