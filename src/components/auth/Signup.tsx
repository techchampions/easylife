import { Form, Formik } from "formik";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import * as Yup from "yup";
import { useModal } from "../../zustand/modal.state";
import InputField from "../form/InputField";
import Button from "../global/Button";
import Login from "./Login";
// import VerifyEmail from "./VerifyEmail";
import { useRegister } from "../../hooks/mutattions/useAuth";
import CheckboxField from "../form/CheckboxField";

const Signup = () => {
  const modal = useModal();
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: register, isPending } = useRegister();
  // Password visibility toggle logic
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const initialValues = {
    email: "",
    password: "",
    agree: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
    agree: Yup.boolean()
      .required("Required")
      .oneOf([true], "You must agree to the terms"),
  });
  const handleSubmit = (
    values: typeof initialValues,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    setSubmitting(false);
    register(values);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnMount
      validateOnChange
      validateOnBlur
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
          <div className="flex items-center text-xs px-2">
            <CheckboxField
              name="agree"
              link="terms"
              linkText="Terms of service"
              label="By creating an account, you agree with our"
            />
            {/* <input
              type="checkbox"
              id="agree"
              name="agree"
              className="text-primary bg-white"
            />
            <label htmlFor="agree">
              By creating an account, you agree with our{" "}
              <Link to={`/terms`} className="underline text-primary">
                Terms of Service
              </Link>
            </label> */}
          </div>
          <Button
            type="submit"
            isLoading={isSubmitting || isPending}
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
