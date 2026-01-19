import { Formik, Form } from "formik";
import * as Yup from "yup";
import { ArrowLeft, ArrowRight, Info } from "lucide-react";
import React from "react";
import { useModal } from "../../../zustand/modal.state";
import { useOnboardingFormData } from "../../../zustand/onboardingData.state";
import InputField from "../../form/InputField";
import Button from "../../global/Button";
import MarriageHistory from "./MarriageHistory";
import WifeAssessment from "./WifeAssessment";

const validationSchema = Yup.object().shape({
  marriage_issues: Yup.string().required("required"),
  aboutSpousePositive: Yup.string().required("required"),
});
const HusbandAssessment: React.FC = () => {
  const modal = useModal();
  const {
    about_wife_negative,
    about_wife_positive,
    marriage_issues,
    changes_to_wife,
    setOnboardingFormData,
  } = useOnboardingFormData();
  const initialValues = {
    marriage_issues: marriage_issues || "",
    aboutSpousePositive: about_wife_positive || "",
    aboutSpouseNegative: about_wife_negative || "",
    changesToSpouse: changes_to_wife || "",
  };
  const goBack = () => {
    modal.openModal(<MarriageHistory />);
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
        <div className="text-2xl font-bold">Husband's Assessment of Wife</div>
        <div className="flex items-center gap-1 text-gray-500 text-xs">
          <Info size={14} />{" "}
          <span>
            To Be Filled By The Husband, if Husband Is Not Available please
            ignore.
          </span>
        </div>
      </div>
      <div className="flex flex-col justify-between mt-7">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnMount
          onSubmit={(values) => {
            setOnboardingFormData({
              marriage_issues: values.marriage_issues,

              about_wife_positive: values.aboutSpousePositive,
              about_wife_negative: values.aboutSpouseNegative,
            });
            modal.openModal(<WifeAssessment />);
          }}
        >
          {({ isValid }) => {
            return (
              <Form className="flex flex-col gap-8 justify-between min-h-55">
                <div className="space-y-5">
                  <div className="space-y-1">
                    <div className="text-lg">
                      What are the issues of concern in the marriage that you
                      want resolved?{" "}
                    </div>
                    <InputField
                      name="marriage_issues"
                      type="textarea"
                      placeholder="Please indictate if here."
                      className="text-2xl font-bold rounded-xl py-3"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="text-lg">
                      What are the things you like about your Wife
                    </div>
                    <InputField
                      name="aboutSpousePositive"
                      type="textarea"
                      placeholder="Please indictate if here."
                      className="text-2xl font-bold rounded-xl py-3"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="text-lg">
                      What are the things you don't like about your Wife
                    </div>
                    <InputField
                      name="aboutSpouse"
                      type="textarea"
                      placeholder="Please indictate if here."
                      className="text-2xl font-bold rounded-xl py-3"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="text-lg">
                      What changes and adjustments would you like your Wife
                    </div>
                    <InputField
                      name="changesToSpouse"
                      type="textarea"
                      placeholder="Please indictate if here."
                      className="text-2xl font-bold rounded-xl py-3"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="text-lg">
                      Are there other things about the marriage you may wish the
                      counseling team to know?{" "}
                    </div>
                    <InputField
                      name="changesToSpouse"
                      type="textarea"
                      placeholder="Please indictate if here."
                      className="text-2xl font-bold rounded-xl py-3"
                    />
                  </div>
                </div>
                <div className="flex justify-center w-full gap-4 mt-4">
                  <Button
                    label="Ignore"
                    className="w-fit! px-6 bg-zinc-900 hover:bg-zinc-700"
                  />
                  <Button
                    label="Proceed"
                    className="bg-secondary flex-1"
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

export default HusbandAssessment;
