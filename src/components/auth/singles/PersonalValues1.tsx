import { Form, Formik } from "formik";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";
import * as Yup from "yup";
import { useModal } from "../../../zustand/modal.state";
import { useOnboardingFormData } from "../../../zustand/onboardingData.state";
import InputField from "../../form/InputField";
import Button from "../../global/Button";
import PersonalValues from "./PersonalValues";
import PersonalValues2 from "./PersonsalValues2";

const validationSchema = Yup.object().shape({
  strenght: Yup.string().required("required"),
  weakness: Yup.string().required("required"),
});

const PersonalValues1: React.FC = () => {
  const modal = useModal();
  const { setOnboardingFormData, single_user_strength, single_user_weakness } =
    useOnboardingFormData();
  const initialValues = {
    strenght: single_user_strength || "",
    weakness: single_user_weakness || "",
  };
  const goBack = () => {
    modal.open(<PersonalValues />);
  };
  return (
    <div className="flex flex-col w-md max-w-xs md:max-w-md mx-h-[65vh]">
      <div
        className="flex items-center gap-2 cursor-pointer absolute top-4 left-4"
        onClick={goBack}
      >
        <ArrowLeft /> Back
      </div>

      <div className="flex flex-col mt-5">
        {/* <div className="text-2xl font-bold">Personal Values</div> */}
      </div>
      <div className="flex flex-col justify-between mt-7">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnMount
          onSubmit={(values) => {
            setOnboardingFormData({
              single_user_strength: values.strenght,
              single_user_weakness: values.weakness,
            });
            modal.open(<PersonalValues2 />);
          }}
        >
          {({ isValid }) => {
            return (
              <Form className="flex flex-col gap-8 justify-between min-h-55">
                <div className="space-y-5">
                  <div className="space-y-1">
                    <div className="text-xl font-bold">
                      What are your virtues?
                    </div>
                    <InputField
                      name="strenght"
                      type="textarea"
                      placeholder="Indicate your strenghts here"
                      className="text-2xl font-bold rounded-xl py-3"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="text-xl font-bold">
                      What are your weakness?
                    </div>
                    <InputField
                      name="weakness"
                      type="textarea"
                      placeholder="Indicate your weaknesses here"
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

export default PersonalValues1;
