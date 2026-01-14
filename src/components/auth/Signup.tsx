import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
// import { useSignup } from "../../hooks/Auth";
import Button from "../global/Button";
import { useModal } from "../../zustand/modal.state";
import { Eye, EyeOff } from "lucide-react";
import InputField from "../form/InputField";
import Login from "./Login";
import { Link } from "react-router-dom";
import VerifyEmail from "./VerifyEmail";

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
    console.log(values);
    openModal(<VerifyEmail />);
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
          <div className="mb-8">
            <h1 className="font-medium text-3xl text-black">
              Signup with Email
            </h1>
            <p className="text-sm">
              Please enter your email address. We will send you a 4-digit code
              to verify your account.
            </p>
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
          <div className="flex items-center space-x-2 text-xs px-2">
            <input
              type="checkbox"
              id="agree"
              className="text-primary bg-white"
            />
            <label htmlFor="agree">
              By creating an account, you agree with our{" "}
              <Link to={`/terms`} className="underline text-primary">
                Terms of Service
              </Link>
            </label>
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
