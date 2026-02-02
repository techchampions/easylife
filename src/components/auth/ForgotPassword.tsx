import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import InputField from "../form/InputField";
import Button from "../global/Button";
import { useForgotPassword } from "../../hooks/mutattions/useAuth";

const ForgotPassword: React.FC = () => {
  const initialValues = {
    email: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().required("Required"),
  });
  const { mutate, isPending } = useForgotPassword();

  return (
    <div className="w-fit max-w-sm">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnMount
        onSubmit={(values) => {
          mutate(values.email);
        }}
      >
        {({ isValid }) => {
          return (
            <Form className="space-y-10">
              <div className="">
                <h2 className="text-3xl font-bold">Forgot Password</h2>
                <p className="text-gray-600">
                  Enter your email to recieve confimation OTP code.
                </p>
              </div>
              <div className="space-y-4">
                <div className="">
                  <label htmlFor="email">Email Address</label>
                  <InputField name="email" placeholder="Enter email address" />
                </div>
                <div className="flex items-center gap-4">
                  <Button
                    label="Cancel"
                    className="bg-gray-950! hover:bg-gray-900"
                  />
                  <Button
                    label="Submit"
                    type="submit"
                    isLoading={isPending}
                    disabled={!isValid}
                    className="bg-secondary"
                  />
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ForgotPassword;
