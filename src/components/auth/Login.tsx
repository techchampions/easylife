import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
// import { useLogin } from "../../hooks/Auth";
import Button from "../global/Button";
import { useModal } from "../../zustand/modal.state";
import { Eye, EyeOff } from "lucide-react";
import InputField from "../form/InputField";
import Signup from "./Signup";
import { useUserStore } from "../../zustand/user.state";
import { useToast } from "../../zustand/toast.state";

const Login = () => {
  const { openModal, closeModal } = useModal();
  const [showPassword, setShowPassword] = useState(false);
  const { setIsLoggedIn, setUser } = useUserStore();
  const { showToast } = useToast();
  //   const { mutate: login, isPending } = useLogin();
  // Password visibility toggle logic
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const initialValues = {
    username: "",
    password: "",
  };
  const validationSchema = Yup.object({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });
  const handleSubmit = (
    values: typeof initialValues,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    setSubmitting(false);
    setIsLoggedIn(true);
    setUser({
      role: 0,
      id: 0,
      email: "string",
      phone_number: "string",
      referral_code: "string",
      first_name: "string",
      last_name: "string",
      country: "string",
      state: "string",
      lga: "string",
      otp_verified_at: "string",
      email_verified_at: "string",
      profile_picture: "string",
      gender: "string",
      address: "string",
      created_at: "string",
      updated_at: "string",
    });
    showToast("user loggedin successfully", "success");
    closeModal();
    // login(values);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      // onSubmit={handleSubmit}
      onSubmit={(values, { setSubmitting }) =>
        handleSubmit(values, setSubmitting)
      }
    >
      {() => (
        <Form className="space-y-3 flex flex-col px-4 w-fit max-w-sm md:max-w-md">
          <div className="">
            <img src="/images/logo.png" alt="" className="w-[45%] " />
            <div className="pb-4">
              <h1 className="font-medium text-3xl text-black">Welcome back!</h1>
              <p className="text-sm text-gray-500">
                Please enter your valid email address and password
              </p>
            </div>
          </div>
          {/* Render based on state */}
          <InputField name="username" placeholder="Username" />
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
          {/* Forgot Password Link */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 text-xs px-6">
              <input
                type="checkbox"
                id="remember"
                className="text-adron-green"
              />
              <label htmlFor="remember">Remember me</label>
            </div>
            <span className="text-[#FF4A1B] text-xs cursor-pointer">
              Forgot password?
            </span>
          </div>
          <Button
            type="submit"
            // isLoading={isSubmitting || isPending}
            // disabled={isSubmitting || !isValid}
            label="Log In"
            loadingText="Logging In"
            className="w-full py-2 rounded-full mt-10"
          />
          {/* Link to switch between forms */}
          <p className="text-sm flex gap-1 items-center text-center justify-center">
            <>
              Are you new?{" "}
              <Button
                label="Create an Account"
                className=" ml-1 bg-transparent! text-secondary! font-medium w-fit! underline"
                onClick={() => openModal(<Signup />)}
              />
            </>
          </p>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
