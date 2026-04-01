import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import { useSendOTP, useVerifyOTP } from "../../hooks/mutattions/useAuth";
import Button from "../global/Button";

interface OTPProps {
  length?: number;
  shouldAutoSend?: boolean;
}

const VerifyEmail: React.FC<OTPProps> = ({
  length = 4,
  shouldAutoSend = false,
}) => {
  const { mutate: verify, isPending } = useVerifyOTP();
  const { mutate: resend, isPending: isResending, isSuccess } = useSendOTP();
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const [timer, setTimer] = useState<number>(59);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const autoSentRef = useRef<boolean>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>(
    new Array(length).fill(null)
  );

  // Auto-send OTP only when needed (e.g., after login)
  useEffect(() => {
    if (shouldAutoSend && !autoSentRef.current) {
      autoSentRef.current = true;
      resend();
      setTimer(59);
    }
  }, [shouldAutoSend, resend]);

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
    const enteredOtp = otp.join("");
    verify(enteredOtp);
  };

  const handleResendOTP = async () => {
    resend();
    if (isSuccess) {
      setTimer(59);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 w-sm max-w-xs md:max-w-sm">
      <h4 className="text-5xl font-bold text-primary">
        00:{timer < 10 ? `0${timer}` : timer}
      </h4>
      <p className="text-gray-500 text-sm mb-8 w-50 text-center">
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
        disabled={isDisabled || isPending}
        isLoading={isSubmitting || isPending}
      />

      <p className="text-sm text-gray-500">
        Didn’t get the code?{" "}
        {isResending ? (
          <span className="text-primary">Resending...</span>
        ) : (
          <button
            className="text-primary cursor-pointer"
            onClick={handleResendOTP}
            disabled={timer > 0}
          >
            {timer > 0 ? `Resend in ${timer}s` : "Resend code"}
          </button>
        )}
      </p>
    </div>
  );
};

export default VerifyEmail;
