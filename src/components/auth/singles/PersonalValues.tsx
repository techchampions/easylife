import { Form, Formik } from "formik";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";
import * as Yup from "yup";
import { useModal } from "../../../zustand/modal.state";
import { useOnboardingFormData } from "../../../zustand/onboardingData.state";
import InputField from "../../form/InputField";
import RadioGroup from "../../form/RadioGroup";
import Button from "../../global/Button";
import BioData from "../BioData";
import PersonalValues1 from "./PersonalValues1";

const validationSchema = Yup.object().shape({
  occupation: Yup.string().required("required"),
  living_alone: Yup.string().required("required"),
  career_growth: Yup.string().required("required"),
});

const PersonalValues: React.FC = () => {
  const modal = useModal();
  const { occupation, career_growth, living_alone, setOnboardingFormData } =
    useOnboardingFormData();
  const livingAloneOptions = [
    { label: "yes", value: "yes" },
    { label: "no", value: "no" },
  ];
  const initialValues = {
    occupation: occupation || "",
    career_growth: career_growth || "",
    living_alone: living_alone || "",
  };
  const goBack = () => {
    modal.open(<BioData />);
  };
  return (
    <div className="flex flex-col w-md max-w-xs md:max-w-md max-h-[75vh] overflow-y-scroll scrollbar-hide">
      <div
        className="flex items-center gap-2 cursor-pointer absolute top-4 left-4"
        onClick={goBack}
      >
        <ArrowLeft /> Back
      </div>

      <div className="flex flex-col mt-5">
        <div className="text-2xl font-bold">Applicant's Personal values</div>
      </div>
      <div className="flex flex-col justify-between mt-7">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnMount
          onSubmit={(values) => {
            setOnboardingFormData({
              occupation: values.occupation,
              career_growth: values.career_growth,
              living_alone: values.living_alone,
            });
            modal.open(<PersonalValues1 />);
          }}
        >
          {({ isValid }) => {
            return (
              <Form className="flex flex-col gap-8 justify-between min-h-55">
                <div className="space-y-5">
                  <div className="space-y-1">
                    <div className="text-lg">Are you living alone?</div>
                    <RadioGroup
                      options={livingAloneOptions}
                      name="living_alone"
                      orientation="horizontal"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="text-lg">What do you do for a living? </div>
                    <InputField
                      name="occupation"
                      type="text"
                      placeholder="Please indictate if any."
                      className="text-2xl font-bold rounded-xl py-3"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="text-lg">
                      In your job, business, career, ministry, etc, where do you
                      see yourself in the next 5 years?
                    </div>
                    <InputField
                      name="career_growth"
                      type="textarea"
                      placeholder="Please indictate if any."
                      className="text-2xl font-bold rounded-xl py-3"
                    />
                  </div>
                </div>
                <div className="flex justify-center w-full gap-4 mt-4">
                  <Button
                    label="Proceed"
                    className="bg-secondary"
                    type="submit"
                    loadingText="Loading..."
                    disabled={!isValid}
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

export default PersonalValues;
