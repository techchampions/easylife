import { Formik, Form } from "formik";
import * as Yup from "yup";
import { ArrowLeft, ArrowRight, Info } from "lucide-react";
import React from "react";
import { useModal } from "../../../zustand/modal.state";
import { useOnboardingFormData } from "../../../zustand/onboardingData.state";
import InputField from "../../form/InputField";
import Button from "../../global/Button";
import PersonalValues from "./PersonalValues";
import PersonalValues3 from "./PersonalValues3";

const validationSchema = Yup.object().shape({
  single_user_type_of_spouse: Yup.string().required("required"),
  single_user_tolerance: Yup.string().required("required"),
});

const PersonalValues2: React.FC = () => {
  const modal = useModal();
  const {
    setOnboardingFormData,
    single_user_type_of_spouse,
    single_user_tolerance,
  } = useOnboardingFormData();
  const initialValues = {
    single_user_type_of_spouse: single_user_type_of_spouse || "",
    single_user_tolerance: single_user_tolerance || "",
  };
  const goBack = () => {
    modal.openModal(<PersonalValues />);
  };
  return (
    <div className="flex flex-col w-md max-w-xs md:max-w-md mx-h-[65vh]">
      <div
        className="flex items-center gap-2 cursor-pointer absolute top-4 left-4"
        onClick={goBack}
      >
        <ArrowLeft /> Back
      </div>

      <div className="flex flex-col mt-5"></div>
      <div className="flex flex-col justify-between mt-7">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnMount
          onSubmit={(values) => {
            setOnboardingFormData({
              single_user_type_of_spouse: values.single_user_type_of_spouse,
              single_user_tolerance: values.single_user_tolerance,
            });
            modal.openModal(<PersonalValues3 />);
          }}
        >
          {({ isValid }) => {
            return (
              <Form className="flex flex-col gap-8 justify-between min-h-55">
                <div className="space-y-5">
                  <div className="space-y-1">
                    <div className="text-xl font-bold">
                      What will you never tolerate or endure from a spouse?
                    </div>
                    <InputField
                      name="single_user_tolerance"
                      type="textarea"
                      placeholder="Please inidicate here."
                      className="text-2xl font-bold rounded-xl py-3"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="text-xl font-bold">
                      What kind of spouse are you looking for?
                    </div>
                    <InputField
                      name="single_user_type_of_spouse"
                      type="textarea"
                      placeholder="Please inidicate here."
                      className="text-2xl font-bold rounded-xl py-3"
                    />
                  </div>
                </div>
                <div className="flex justify-center w-full gap-4 mt-4">
                  <Button
                    label="Proceed"
                    className="bg-secondary"
                    type="submit"
                    loadingText="Checking email..."
                    disabled={!isValid}
                    icon={!isValid ? <Info /> : null}
                    rightIcon={<ArrowRight />}
                  />
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default PersonalValues2;
