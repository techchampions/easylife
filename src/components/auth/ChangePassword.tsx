import React, { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import InputField from "../form/InputField";
import Button from "../global/Button";
import { Eye, EyeOff } from "lucide-react";
import { useChangePassword } from "../../hooks/mutattions/useAuth";

const ChangePassword: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const { mutate, isPending } = useChangePassword();
  const initialValues = {
    code: "",
    password: "",
    confirm_password: "",
  };
  const validationSchema = Yup.object({
    code: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
    confirm_password: Yup.string().required("Required"),
  });

  return (
    <div className="w-fit max-w-sm">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnMount
        onSubmit={(values) => {
          const payload: PasswordPayload = {
            otp: values.code,
            password: values.password,
            password_confirmation: values.confirm_password,
          };
          mutate(payload);
        }}
      >
        {({ isValid }) => {
          return (
            <Form className="space-y-10">
              <div className="">
                <h2 className="text-3xl font-bold">Change Password</h2>
                <p className="text-gray-600">
                  Enter your OTP code sent to your email and change your
                  password.
                </p>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="">
                    <label className="text-sm" htmlFor="code">
                      OTP code
                    </label>
                    <InputField
                      name="code"
                      type="number"
                      placeholder="Enter OTP code"
                    />
                  </div>
                  <div className="">
                    <label className="text-sm" htmlFor="password">
                      New Password
                    </label>
                    <InputField
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      rightIcon={
                        showPassword ? (
                          <EyeOff
                            className="text-gray-500 w-5 h-5 cursor-pointer"
                            onClick={() => setShowPassword(false)}
                          />
                        ) : (
                          <Eye
                            className="text-gray-500 w-5 h-5 cursor-pointer"
                            onClick={() => setShowPassword(true)}
                          />
                        )
                      }
                    />
                  </div>
                  <div className="">
                    <label className="text-sm" htmlFor="confrim_password">
                      Confirm Password
                    </label>
                    <InputField
                      name="confrim_password"
                      type={showPassword2 ? "text" : "password"}
                      placeholder="Enter new password again"
                      rightIcon={
                        showPassword2 ? (
                          <EyeOff
                            className="text-gray-500 w-5 h-5 cursor-pointer"
                            onClick={() => setShowPassword2(false)}
                          />
                        ) : (
                          <Eye
                            className="text-gray-500 w-5 h-5 cursor-pointer"
                            onClick={() => setShowPassword2(true)}
                          />
                        )
                      }
                    />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Button
                    label="Cancel"
                    className="bg-gray-950! hover:bg-gray-900"
                  />
                  <Button
                    label="Save"
                    loadingText="Saving..."
                    type="submit"
                    disabled={!isValid}
                    isLoading={isPending}
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

export default ChangePassword;
