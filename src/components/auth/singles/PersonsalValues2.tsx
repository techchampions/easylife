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
  SingleUsertypeOfSpouse: Yup.string().required("required"),
  singleUserTolerance: Yup.string().required("required"),
});

const PersonalValues2: React.FC = () => {
  const modal = useModal();
  const { setOnboardingFormData, SingleUsertypeOfSpouse, singleUserTolerance } =
    useOnboardingFormData();
  const initialValues = {
    SingleUsertypeOfSpouse: SingleUsertypeOfSpouse || "",
    singleUserTolerance: singleUserTolerance || "",
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
              SingleUsertypeOfSpouse: values.SingleUsertypeOfSpouse,
              singleUserTolerance: values.singleUserTolerance,
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
                      name="singleUserTolerance"
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
                      name="SingleUsertypeOfSpouse"
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
