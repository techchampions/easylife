// import { Form, Formik } from "formik";
// import { Eye, EyeOff } from "lucide-react";
// import { useState } from "react";
// import * as Yup from "yup";
// import { useModal } from "../../zustand/modal.state";
// import InputField from "../form/InputField";
// import Button from "../global/Button";
// import Login from "./Login";
// // import VerifyEmail from "./VerifyEmail";
// import {
//   useRegister,
//   useVerifyReferalCode,
// } from "../../hooks/mutattions/useAuth";
// import CheckboxField from "../form/CheckboxField";
// import InputFieldQuery from "../form/InputFieldQuery";

// const Signup = () => {
//   const modal = useModal();
//   const [showPassword, setShowPassword] = useState(false);
//   const [success, setsuccess] = useState(false);
//   const { mutate: register, isPending } = useRegister();
//   const { mutateAsync: verify, isPending: isVerifying } =
//     useVerifyReferalCode();

//   // Password visibility toggle logic
//   const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
//   const initialValues = {
//     email: "",
//     password: "",
//     agree: "",
//     referral_id: "",
//   };
//   const validationSchema = Yup.object({
//     email: Yup.string().required("Required"),
//     password: Yup.string().required("Required"),
//     referral_id: Yup.string().required("Required"),
//     agree: Yup.boolean()
//       .required("Required")
//       .oneOf([true], "You must agree to the terms"),
//   });
//   const handleSubmit = (
//     values: typeof initialValues,
//     setSubmitting: (isSubmitting: boolean) => void
//   ) => {
//     setSubmitting(false);
//     register(values);
//   };
//   const handleVerify = async (values: typeof initialValues) => {
//     try {
//       const response = await verify(values.referral_id);
//       if (response.is_exist) {
//         setsuccess(response.is_exist);
//       }
//     } catch {
//       setsuccess(false);
//     }
//   };

//   return (
//     <Formik
//       initialValues={initialValues}
//       validationSchema={validationSchema}
//       validateOnMount
//       validateOnChange
//       validateOnBlur
//       onSubmit={(values, { setSubmitting }) =>
//         handleSubmit(values, setSubmitting)
//       }
//     >
//       {({ isSubmitting, isValid, values }) => (
//         <Form className="space-y-3 flex flex-col px-4 w-fit max-w-sm md:max-w-md">
//           <div className="mb-8">
//             <h1 className="font-medium text-3xl text-black">
//               Signup with Email
//             </h1>
//             <p className="text-sm">
//               Please enter your email address. We will send you a 4-digit code
//               to verify your account.
//             </p>
//           </div>
//           {/* Render based on state */}
//           <InputField name="email" placeholder="Email address" />
//           <InputField
//             name="password"
//             type={showPassword ? "text" : "password"}
//             placeholder="Password"
//             rightIcon={
//               showPassword ? (
//                 <EyeOff
//                   className="text-gray-500 w-5 h-5 cursor-pointer"
//                   onClick={togglePasswordVisibility}
//                 />
//               ) : (
//                 <Eye
//                   className="text-gray-500 w-5 h-5 cursor-pointer"
//                   onClick={togglePasswordVisibility}
//                 />
//               )
//             }
//           />
//           <InputFieldQuery
//             name="referral_id"
//             placeholder="Referral code"
//             isLoading={isVerifying}
//             success={success}
//             onVerify={() => handleVerify(values)}
//           />

//           {/* Forgot Password Link */}
//           <div className="flex items-center text-xs px-2">
//             <CheckboxField
//               name="agree"
//               link="terms"
//               linkText="Terms of service"
//               label="By creating an account, you agree with our"
//             />
//           </div>
//           <Button
//             type="submit"
//             isLoading={isSubmitting || isPending}
//             disabled={isSubmitting || !isValid}
//             label="Sign up"
//             loadingText="Loading..."
//             className="w-full py-2 rounded-full mt-10 bg-secondary"
//           />
//           {/* Link to switch between forms */}
//           <p className="text-sm flex gap-1 items-center text-center justify-center">
//             <>
//               Already have an account?{" "}
//               <Button
//                 label="Login"
//                 className=" ml-1 bg-transparent! text-secondary! font-medium w-fit! underline"
//                 onClick={() => modal.open(<Login />)}
//               />
//             </>
//           </p>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default Signup;

import { Form, Formik } from "formik";
import { Eye, EyeOff } from "lucide-react";
import { useCallback, useState } from "react";
import * as Yup from "yup";
import {
  useRegister,
  useVerifyReferalCode,
} from "../../hooks/mutattions/useAuth";
import { useModal } from "../../zustand/modal.state";
import CheckboxField from "../form/CheckboxField";
import InputField from "../form/InputField";
import InputFieldQuery from "../form/InputFieldQuery";
import Button from "../global/Button";
import Login from "./Login";

const Signup = () => {
  const modal = useModal();
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [currentReferralCode, setCurrentReferralCode] = useState("");
  const { mutate: register, isPending } = useRegister();
  const { mutateAsync: verify, isPending: isVerifying } =
    useVerifyReferalCode();

  // Password visibility toggle logic
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const initialValues = {
    email: "",
    password: "",
    agree: false,
    referral_id: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
    referral_id: Yup.string().required("Required"),
    agree: Yup.boolean()
      .required("Required")
      .oneOf([true], "You must agree to the terms"),
  });

  const handleSubmit = (values: typeof initialValues) => {
    register(values);
  };

  const handleVerify = useCallback(
    async (code: string) => {
      // Don't verify empty or same code again
      if (!code || !code.trim()) {
        setSuccess(false);
        return;
      }

      // Prevent duplicate verification of same code
      if (code === currentReferralCode && success) {
        return;
      }

      setCurrentReferralCode(code);

      try {
        const response = await verify(code);
        if (response.is_exist) {
          setSuccess(true);
        } else {
          setSuccess(false);
        }
      } catch (error) {
        console.error("Verification error:", error);
        setSuccess(false);
      }
    },
    [verify, currentReferralCode, success]
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnMount
      validateOnChange
      validateOnBlur
      onSubmit={handleSubmit}
    >
      {({ isValid, values }) => (
        <Form className="space-y-3 flex flex-col px-4 w-fit max-w-sm md:max-w-md">
          <div className="mb-8">
            <h1 className="font-medium text-3xl text-black">
              Signup with Email
            </h1>
            <p className="text-sm">
              Please enter your email address. We will send you a 4-digit code
              to verify your account.
            </p>
          </div>

          <InputField name="email" placeholder="Email address" />

          <InputField
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            rightIcon={
              showPassword ? (
                <EyeOff
                  className="text-gray-500 w-5 h-5 cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <Eye
                  className="text-gray-500 w-5 h-5 cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              )
            }
          />

          <InputFieldQuery
            name="referral_id"
            placeholder="Referral code"
            isLoading={isVerifying}
            success={success}
            onVerify={handleVerify}
            debounceDelay={600}
          />

          <div className="flex items-center text-xs px-2">
            <CheckboxField
              name="agree"
              link="terms"
              linkText="Terms of service"
              label="By creating an account, you agree with our"
            />
          </div>

          <Button
            type="submit"
            isLoading={isPending}
            disabled={
              isVerifying || !isValid || (!!values.referral_id && !success)
            }
            label="Sign up"
            loadingText="Loading..."
            className="w-full py-2 rounded-full mt-10 bg-secondary"
          />

          <p className="text-sm flex gap-1 items-center text-center justify-center">
            <>
              Already have an account?{" "}
              <Button
                label="Login"
                className="ml-1 bg-transparent! text-secondary! font-medium w-fit! underline"
                onClick={() => modal.open(<Login />)}
              />
            </>
          </p>
        </Form>
      )}
    </Formik>
  );
};

export default Signup;
