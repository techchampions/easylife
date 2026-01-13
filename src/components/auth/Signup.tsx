import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
// import { useSignup } from "../../hooks/Auth";
import Button from "../global/Button";
import { useModal } from "../../zustand/modal.state";
import { Eye, EyeOff } from "lucide-react";
import InputField from "../form/InputField";
import Login from "./Login";
import GetStarted from "./GetStarted";

const Signup = () => {
  const { openModal } = useModal();
  const [showPassword, setShowPassword] = useState(false);
  //   const { mutate: login, isPending } = useLogin();
  // Password visibility toggle logic
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });
  const handleSubmit = (
    values: typeof initialValues,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    setSubmitting(false);
    openModal(<GetStarted />);
    // login(values);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnMount
      onSubmit={(values, { setSubmitting }) =>
        handleSubmit(values, setSubmitting)
      }
    >
      {({ isSubmitting, isValid }) => (
        <Form className="space-y-3 flex flex-col px-4 w-md max-w-sm md:max-w-md">
          <div className="">
            <img src="/images/intro.png" alt="" className="w-[40%] mx-auto" />
            <div className="pb-4 text-center">
              <h1 className="font-medium text-3xl text-black">
                Welcome to EasyLife Marriage Mentorship
              </h1>
            </div>
          </div>
          {/* Render based on state */}
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
            disabled={isSubmitting || !isValid}
            label="Sign up"
            loadingText="Loading..."
            className="w-full py-2 rounded-full mt-10 bg-secondary"
          />
          {/* Link to switch between forms */}
          <p className="text-sm flex gap-1 items-center text-center justify-center">
            <>
              Already have an account?{" "}
              <Button
                label="Login"
                className=" ml-1 bg-transparent! text-secondary! font-medium w-fit! underline"
                onClick={() => openModal(<Login />)}
              />
            </>
          </p>
        </Form>
      )}
    </Formik>
  );
};

export default Signup;
