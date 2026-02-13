import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import Button from "../global/Button";
import { Eye, EyeOff } from "lucide-react";
import InputField from "../form/InputField";

const UpdatePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const togglePasswordVisibility2 = () => setShowPassword2((prev) => !prev);
  const initialValues = {
    password2: "",
    password: "",
  };
  const validationSchema = Yup.object({
    password2: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });
  const handleSubmit = (values: typeof initialValues) => {
    console.log(values);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => handleSubmit(values)}
    >
      {() => (
        <Form className="space-y-3 flex flex-col px-4 w-sm max-w-xs md:max-w-sm">
          <h1 className="capitalize font-medium text-2xl text-black text-center py-4">
            change your password
          </h1>
          {/* Render based on state */}
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
          <InputField
            name="password2"
            type={showPassword2 ? "text" : "password"}
            placeholder="Confirm Password"
            rightIcon={
              showPassword2 ? (
                <EyeOff
                  className="text-gray-500 w-5 h-5 cursor-pointer"
                  onClick={togglePasswordVisibility2}
                />
              ) : (
                <Eye
                  className="text-gray-500 w-5 h-5 cursor-pointer"
                  onClick={togglePasswordVisibility2}
                />
              )
            }
          />
          <Button
            type="submit"
            label="Set Password"
            loadingText="Loading..."
            className="bg-secondary mt-10"
          />
        </Form>
      )}
    </Formik>
  );
};

export default UpdatePassword;
