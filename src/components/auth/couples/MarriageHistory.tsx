import { Form, Formik } from "formik";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";
import * as Yup from "yup";
import { YesNoOptions } from "../../../const/data";
import { useModal } from "../../../zustand/modal.state";
import { useOnboardingFormData } from "../../../zustand/onboardingData.state";
import NumberInput from "../../form/NumberInput";
import RadioGroup from "../../form/RadioGroup";
import Button from "../../global/Button";
import CouplesInfo1 from "../couples/CouplesInfo1";
import SpouseBasicInfo2 from "./SpouseBasicInfo2";

const validationSchema = Yup.object().shape({
  previously_married: Yup.string().required("required"),
  prev_marriage_children: Yup.string().when("previously_married", {
    is: "yes",
    then: (schema) => schema.required("required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  number_of_children_prev_marriage: Yup.string().when(
    "prev_marriage_children",
    {
      is: "yes",
      then: (schema) => schema.required("required"),
      otherwise: (schema) => schema.notRequired(),
    }
  ),
});

const MarriageHistory: React.FC = () => {
  const modal = useModal();
  const {
    setOnboardingFormData,
    previously_married,
    prev_marriage_children,
    number_of_children_prev_marriage,
  } = useOnboardingFormData();
  const initialValues = {
    previously_married: previously_married || "",
    prev_marriage_children: prev_marriage_children || "",
    number_of_children_prev_marriage: number_of_children_prev_marriage || 0,
  };
  const goBack = () => {
    modal.open(<SpouseBasicInfo2 />);
  };

  const handleProceed = async (values: typeof initialValues) => {
    setOnboardingFormData({
      previously_married: values.previously_married,
      prev_marriage_children:
        values.previously_married === "yes"
          ? values.prev_marriage_children
          : "",
    });
    modal.open(<CouplesInfo1 />);
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
                    options={YesNoOptions}
                    name="previously_married"
                    orientation="horizontal"
                    optionClassName="min-w-[calc(50%-8px)]"
                  />
                </div>
                {values.previously_married === "yes" && (
                  <>
                    <div className="space-y-4">
                      <div className="text-2xl font-bold">
                        Do you have children from your previous marriage?
                      </div>
                      <RadioGroup
                        options={YesNoOptions}
                        name="prev_marriage_children"
                        orientation="horizontal"
                        optionClassName="min-w-[calc(50%-8px)]"
                      />
                    </div>
                    {values.prev_marriage_children === "yes" && (
                      <div className="space-y-1">
                        <div className="text-2xl font-bold">
                          Number of children in previous marriage
                        </div>
                        <NumberInput
                          name="number_of_children_prev_marriage"
                          placeholder="Number of children."
                          min={0}
                          className=""
                        />
                      </div>
                    )}
                  </>
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
