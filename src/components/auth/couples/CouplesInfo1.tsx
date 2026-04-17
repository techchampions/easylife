import { Form, Formik } from "formik";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";
import * as Yup from "yup";
import { useModal } from "../../../zustand/modal.state";
import { useOnboardingFormData } from "../../../zustand/onboardingData.state";
import InputField from "../../form/InputField";
import Button from "../../global/Button";
import MarriageHistory from "../couples/MarriageHistory";
import HusbandAssessment from "./HusbandAssessment";

const validationSchema = Yup.object().shape({
  marriageLength: Yup.string().required("required"),
  why_signup: Yup.string().required("required"),
});

const CouplesInfo1: React.FC = () => {
  const modal = useModal();
  const {
    why_signup,
    marriage_length,
    number_of_children,
    setOnboardingFormData,
  } = useOnboardingFormData();
  const initialValues = {
    marriageLength: marriage_length || "",
    number_of_children: number_of_children || "",
    why_signup: why_signup || "",
  };
  const goBack = () => {
    modal.open(<MarriageHistory />);
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
        <div className="text-2xl font-bold">EasyLife Marriage Academy</div>
      </div>
      <div className="flex flex-col justify-between mt-7">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnMount
          onSubmit={(values) => {
            setOnboardingFormData({
              marriage_length: values.marriageLength,
              why_signup: values.why_signup,
            });
            modal.open(<HusbandAssessment />);
          }}
        >
          {({ isValid }) => {
            return (
              <Form className="flex flex-col gap-8 justify-between min-h-55">
                <div className="space-y-5">
                  <div className="space-y-1">
                    <div className="text-lg">
                      How long have you been married?
                    </div>
                    <InputField
                      name="marriageLength"
                      type="text"
                      placeholder="number of years married"
                      className="text-2xl font-bold rounded-xl py-3"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="text-lg">
                      Number of children in current marriage
                    </div>
                    <InputField
                      name="number_of_children"
                      type="text"
                      placeholder="number of children"
                      className="text-2xl font-bold rounded-xl py-3"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="text-lg">
                      Why do you wish to subscribe to Easylife Marriage Academy
                      training and mentorship?{" "}
                    </div>
                    <InputField
                      name="why_signup"
                      type="textarea"
                      placeholder="Please indicate if any."
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

export default CouplesInfo1;
