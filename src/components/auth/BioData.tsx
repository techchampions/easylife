import { Form, Formik } from "formik";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";
import * as Yup from "yup";
import { heightOptions, sizeOptions } from "../../const/data";
import { useModal } from "../../zustand/modal.state";
import { useOnboardingFormData } from "../../zustand/onboardingData.state";
import InputField from "../form/InputField";
import RadioGroup from "../form/RadioGroup";
import Button from "../global/Button";
import BasicInfo2 from "./BasicInfo2";
import PersonalValues from "./singles/PersonalValues";

const validationSchema = Yup.object().shape({
  height: Yup.string().required("required"),
  size: Yup.string().required("required"),
  //   healthX: Yup.string().required("required"),
  //   diabilities: Yup.string().required("required"),
});

const BioData: React.FC = () => {
  const modal = useModal();
  const {
    height,
    size,
    health_challenges,
    disabilities,
    setOnboardingFormData,
  } = useOnboardingFormData();
  const initialValues = {
    height: height || "",
    size: size || "",
    healthX: health_challenges || "",
    diabilities: disabilities || "",
  };
  const goBack = () => {
    modal.open(<BasicInfo2 />);
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
        <div className="text-2xl font-bold">Applicant's Bio Data</div>
      </div>
      <div className="flex flex-col justify-between mt-7">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnMount
          onSubmit={(values) => {
            setOnboardingFormData({
              height: values.height,
              size: values.size,
              health_challenges: values.healthX,
              disabilities: values.diabilities,
            });
            modal.open(<PersonalValues />);
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
                      name="height"
                      orientation="horizontal"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="text-lg">What is your size?</div>
                    <RadioGroup
                      options={sizeOptions}
                      name="size"
                      orientation="horizontal"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="text-lg">
                      Do you have any health challenges?
                    </div>
                    <InputField
                      name="healthX"
                      type="textarea"
                      placeholder="Please indicate if any."
                      className="text-2xl font-bold rounded-xl py-3"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="text-lg">
                      Do you have any physical deformities?
                    </div>
                    <InputField
                      name="disabilities"
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

export default BioData;
