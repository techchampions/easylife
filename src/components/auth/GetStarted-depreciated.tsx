import { Form, Formik } from "formik";
import { ArrowRight, LogIn } from "lucide-react";
import React from "react";
import * as Yup from "yup";
import { useModal } from "../../zustand/modal.state";
import RadioGroup from "../form/RadioGroup";
import Button from "../global/Button";
import Referral from "./GetStarted";

const validationSchema = Yup.object({
  // For string values
  isMember: Yup.string()
    .required("Please select an answer")
    .oneOf(["no", "yes"], "Invalid selection"),
});

const options = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];
const initialValues = {
  isMember: "",
};
const GetStarted: React.FC = () => {
  const modal = useModal();
  const handleSubmit = (values: typeof initialValues) => {
    if (values.isMember === "yes") {
      modal.openModal(<LogIn />);
    } else modal.openModal(<Referral />);
  };
  return (
    <div className="w-sm max-w-xs md:max-w-sm">
      <h4 className="font-bold text-2xl mt-5 text-center">
        Welcome to Easy Life
      </h4>
      <div className="w-full">
        <img src="/images/welcome.svg" className="w-[55%] mx-auto" />
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isValid, dirty }) => (
          <Form className=" space-y-8">
            <div className=" space-y-4">
              <div className="">Do you already have account?</div>
              <RadioGroup name="isMember" options={options} />
            </div>
            <div className="flex items-center justify-between gap-4">
              <Button
                label="Cancel"
                className="bg-gray-700! hover:bg-adron-black rounded-lg"
                onClick={() => modal.closeModal()}
              />
              <Button
                label="Proceed"
                disabled={!isValid || !dirty}
                rightIcon={<ArrowRight />}
                type="submit"
                className="bg-secondary! hover:bg-secondary/50 rounded-lg"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default GetStarted;
