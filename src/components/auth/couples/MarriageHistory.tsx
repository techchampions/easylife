import { Formik, Form } from "formik";
import * as Yup from "yup";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";
import { useModal } from "../../../zustand/modal.state";
import { useOnboardingFormData } from "../../../zustand/onboardingData.state";
import RadioGroup from "../../form/RadioGroup";
import Button from "../../global/Button";
import CouplesInfo1 from "../couples/CouplesInfo1";
import { useToast } from "../../../zustand/toast.state";
import SpouseBasicInfo2 from "./SpouseBasicInfo2";

const validationSchema = Yup.object().shape({
  previouslyMarried: Yup.string().required("required"),
  prevMarriageChildren: Yup.string().when("previouslyMarried", {
    is: "yes",
    then: (schema) => schema.required("required"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

const MarriageHistory: React.FC = () => {
  const modal = useModal();
  const { showToast } = useToast();
  const {
    setOnboardingFormData,
    previouslyMarried,
    maritalStatus,
    prevMarriageChildren,
  } = useOnboardingFormData();
  const prevMarriageOption = [
    { label: "yes", value: "yes" },
    { label: "no", value: "no" },
  ];
  const initialValues = {
    previouslyMarried: previouslyMarried || "",
    prevMarriageChildren: prevMarriageChildren || "",
  };
  const goBack = () => {
    modal.openModal(<SpouseBasicInfo2 />);
  };

  const handleProceed = async (values: typeof initialValues) => {
    setOnboardingFormData({
      previouslyMarried: values.previouslyMarried,
      prevMarriageChildren:
        values.previouslyMarried === "yes" ? values.prevMarriageChildren : "",
    });
    if (!maritalStatus)
      showToast("Marital status not selected... pls review form", "info");
    // if (maritalStatus === "single") modal.openModal(<BioData />);
    modal.openModal(<CouplesInfo1 />);
  };
  return (
    <div className="flex flex-col w-md max-w-xs md:max-w-md">
      <div
        className="flex items-center gap-2 cursor-pointer absolute top-4 left-4"
        onClick={goBack}
      >
        <ArrowLeft /> Back
      </div>

      {/* <div className="flex flex-col mt-5">
        <div className="text-2xl font-bold">Easy Life Academy</div>
      </div> */}
      <div className="flex flex-col justify-between mt-4">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnMount
          onSubmit={handleProceed}
        >
          {({ isValid, values }) => (
            <Form className="flex flex-col justify-between">
              <div className="space-y-8 my-5">
                <div className="space-y-4">
                  <div className="text-2xl font-bold">
                    Have you been previously married?
                  </div>
                  <RadioGroup
                    options={prevMarriageOption}
                    name="previouslyMarried"
                    orientation="horizontal"
                    optionClassName="min-w-[calc(50%-8px)]"
                  />
                </div>
                {values.previouslyMarried === "yes" && (
                  <div className="space-y-4">
                    <div className="text-2xl font-bold">
                      Do you have children from your previous marriage?
                    </div>
                    <RadioGroup
                      options={prevMarriageOption}
                      name="prevMarriageChildren"
                      orientation="horizontal"
                      optionClassName="min-w-[calc(50%-8px)]"
                    />
                  </div>
                )}
              </div>
              <div className="flex justify-center w-full gap-4 mt-4">
                <Button
                  label="Proceed"
                  className="bg-secondary rounded-lg"
                  type="submit"
                  disabled={!isValid}
                  rightIcon={<ArrowRight />}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default MarriageHistory;
