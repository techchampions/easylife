// import { Form, Formik } from "formik";
// import * as Yup from "yup";
// import { useState } from "react";
// import Button from "../global/Button";
// import { useModal } from "../../zustand/modal.state";
// import { Eye, EyeOff } from "lucide-react";
// import InputField from "../form/InputField";
// import { useUserStore } from "../../zustand/user.state";
// import { useOnboardingFormData } from "../../zustand/onboardingData.state";
// import Congrats from "./Congrats";

// const SetPassword = () => {
//   const modal = useModal();
//   const { setIsLoggedIn, setUser } = useUserStore();
//   const { marital_status } = useOnboardingFormData();
//   const [showPassword, setShowPassword] = useState(false);
//   const [showPassword2, setShowPassword2] = useState(false);
//   const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
//   const togglePasswordVisibility2 = () => setShowPassword2((prev) => !prev);
//   const initialValues = {
//     password2: "",
//     password: "",
//   };
//   const validationSchema = Yup.object({
//     password2: Yup.string().required("Required"),
//     password: Yup.string().required("Required"),
//   });
//   const handleSubmit = (
//     values: typeof initialValues,
//     setSubmitting: (isSubmitting: boolean) => void
//   ) => {
//     setSubmitting(false);
//     setIsLoggedIn(true);
//     setUser({
//       marital_status: marital_status === "married" ? "married" : "single",
//       id: 0,
//       email: values.password,
//       single_user_phone: "string",
//       // re: "string",
//       first_name: "string",
//       last_name: "string",
//       country: "string",
//       state: "string",
//       lga: "string",
//       otp_verified_at: "string",
//       email_verified_at: "string",
//       profile_picture: "string",
//       gender: "string",
//       address: "string",
//       created_at: "string",
//       updated_at: "string",
//     });
//     modal.open(<Congrats />);
//     // login(values);
//   };
//   return (
//     <Formik
//       initialValues={initialValues}
//       validationSchema={validationSchema}
//       // onSubmit={handleSubmit}
//       onSubmit={(values, { setSubmitting }) =>
//         handleSubmit(values, setSubmitting)
//       }
//     >
//       {() => (
//         <Form className="space-y-3 flex flex-col px-4 w-sm max-w-xs md:max-w-md">
//           <h1 className="font-medium text-3xl text-black text-center py-4">
//             Set your password
//           </h1>
//           {/* Render based on state */}
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
//           <InputField
//             name="password2"
//             type={showPassword2 ? "text" : "password"}
//             placeholder="Confirm Password"
//             rightIcon={
//               showPassword2 ? (
//                 <EyeOff
//                   className="text-gray-500 w-5 h-5 cursor-pointer"
//                   onClick={togglePasswordVisibility2}
//                 />
//               ) : (
//                 <Eye
//                   className="text-gray-500 w-5 h-5 cursor-pointer"
//                   onClick={togglePasswordVisibility2}
//                 />
//               )
//             }
//           />
//           <Button
//             type="submit"
//             label="Set Password"
//             loadingText="Loading..."
//             className="bg-secondary mt-10"
//           />
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default SetPassword;
