import { Formik, Form } from "formik";
import * as Yup from "yup";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";
import { useModal } from "../../../zustand/modal.state";
import { useOnboardingFormData } from "../../../zustand/onboardingData.state";
import BasicInfo2 from "./SpouseBasicInfo2";
import MarriageHistory from "./MarriageHistory";
import RadioGroup from "../../form/RadioGroup";
import InputField from "../../form/InputField";
import Button from "../../global/Button";

const validationSchema = Yup.object().shape({
  spouse_height: Yup.string().required("required"),
  spouse_size: Yup.string().required("required"),
});

const BioData: React.FC = () => {
  const modal = useModal();
  const {
    spouse_height,
    spouse_size,
    spouse_healthChallenges,
    spouse_disabilities,
    setOnboardingFormData,
  } = useOnboardingFormData();
  const heightOptions = [
    { label: "short", value: "short" },
    { label: "average", value: "average" },
    { label: "tall", value: "tall" },
    { label: "very tall", value: "very tall" },
  ];
  const sizeOptions = [
    { label: "SM", value: "SM" },
    { label: "M", value: "M" },
    { label: "L", value: "L" },
    { label: "XL", value: "XL" },
    { label: "XXL", value: "XXL" },
  ];
  const initialValues = {
    spouse_height: spouse_height || "",
    spouse_size: spouse_size || "",
    spouse_healthX: spouse_healthChallenges || "",
    spouse_diabilities: spouse_disabilities || "",
  };
  const goBack = () => {
    modal.openModal(<BasicInfo2 />);
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
        <div className="text-2xl font-bold">Spouse's Bio Data</div>
      </div>
      <div className="flex flex-col justify-between mt-7">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnMount
          onSubmit={(values) => {
            setOnboardingFormData({
              spouse_height: values.spouse_height,
              spouse_size: values.spouse_size,
              spouse_healthChallenges: values.spouse_healthX,
              spouse_disabilities: values.spouse_diabilities,
            });
            modal.openModal(<MarriageHistory />);
          }}
        >
          {({ isValid }) => {
            return (
              <Form className="flex flex-col gap-8 justify-between min-h-55">
                <div className="space-y-5">
                  <div className="space-y-1">
                    <div className="text-lg">What is your height?</div>
                    <RadioGroup
                      options={heightOptions}
                      name="spouse_height"
                      orientation="horizontal"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="text-lg">What is your size?</div>
                    <RadioGroup
                      options={sizeOptions}
                      name="spouse_size"
                      orientation="horizontal"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="text-lg">
                      Do you have any health challenges?
                    </div>
                    <InputField
                      name="spouse_healthX"
                      type="textarea"
                      placeholder="Please indictate if any."
                      className="text-2xl font-bold rounded-xl py-3"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="text-lg">
                      Do you have any physical deformities?
                    </div>
                    <InputField
                      name="spouse_disabilities"
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

export default BioData;
