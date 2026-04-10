import { Form, Formik } from "formik";
import { ArrowLeft, ArrowRight, Info } from "lucide-react";
import React from "react";
import * as Yup from "yup";
import { formatDateSimple } from "../../../utils/formatter";
import { useModal } from "../../../zustand/modal.state";
import { useOnboardingFormData } from "../../../zustand/onboardingData.state";
import DatePickerInput from "../../form/DatePickerInput";
import InputField from "../../form/InputField";
import Button from "../../global/Button";
import BasicInfo2 from "../BasicInfo2";
import SpouseBasicInfo2 from "./SpouseBasicInfo2";

const validationSchema = Yup.object().shape({
  spouse_first_name: Yup.string().required("required"),
  spouse_last_name: Yup.string().required("required"),
  spouse_phone: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9+\-\s()]+$/, "Invalid phone number")
    .min(10, "Phone number too short"),
  spouse_date_of_birth: Yup.string().required("required"),
  spouse_place_of_birth: Yup.string().required("required"),
});

const SpouseBasicInfo: React.FC = () => {
  const modal = useModal();
  const {
    setOnboardingFormData,
    spouse_first_name,
    spouse_last_name,
    spouse_other_names,
    spouse_phone,
    spouse_date_of_birth,
    spouse_place_of_birth,
  } = useOnboardingFormData();
  const initialValues = {
    spouse_first_name: spouse_first_name || "",
    spouse_last_name: spouse_last_name || "",
    spouse_other_names: spouse_other_names || "",
    spouse_phone: spouse_phone || "",
    spouse_date_of_birth: spouse_date_of_birth || "",
    spouse_place_of_birth: spouse_place_of_birth || "",
  };
  const goBack = () => {
    modal.open(<BasicInfo2 />);
  };
  return (
    <div className="flex flex-col w-md max-w-xs md:max-w-md mx-h-[65vh] max-h-[75vh] overflow-y-scroll scrollbar-hide">
      <div
        className="flex items-center gap-2 cursor-pointer absolute top-4 left-4"
        onClick={goBack}
      >
        <ArrowLeft /> Back
      </div>

      <div className="flex flex-col mt-5">
        <div className="text-2xl font-bold">Spouse's Personal Data</div>
      </div>
      <div className="flex flex-col justify-between mt-7">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnMount
          onSubmit={(values) => {
            setOnboardingFormData({
              spouse_first_name: values.spouse_first_name,
              spouse_last_name: values.spouse_last_name,
              spouse_other_names: values.spouse_other_names,
              spouse_phone: values.spouse_phone,
              spouse_date_of_birth: formatDateSimple(
                values.spouse_date_of_birth
              ),
              spouse_place_of_birth: values.spouse_place_of_birth,
            });
            modal.open(<SpouseBasicInfo2 />);
          }}
        >
          {({ isValid }) => {
            return (
              <Form className="flex flex-col gap-8 justify-between min-h-55">
                <div className="space-y-5">
                  <div className="space-y-1">
                    {/* <div className="text-lg">What is your name?</div> */}
                    <div className="grid md:grid-cols-2 gap-2">
                      <InputField
                        name="spouse_first_name"
                        label="First name"
                        type="text"
                        placeholder="First Name"
                        className="text-2xl font-bold rounded-xl py-3"
                      />
                      <InputField
                        name="spouse_last_name"
                        label="Last name"
                        type="text"
                        placeholder="Last Name"
                        className="text-2xl font-bold rounded-xl py-3"
                      />
                      <div className="md:col-span-2">
                        <InputField
                          name="spouse_other_names"
                          label="Other names"
                          type="text"
                          placeholder="Other Names"
                          className="text-2xl font-bold rounded-xl py-3"
                        />{" "}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    {/* <div className="text-lg">What is your Phone No.?</div> */}
                    <InputField
                      name="spouse_phone"
                      label="Phone Number"
                      type="text"
                      placeholder="Phone Number"
                      className="text-2xl font-bold rounded-xl py-3"
                    />
                  </div>
                  <div className="space-y-1">
                    {/* <div className="text-lg">What is your date of birth?</div> */}
                    <DatePickerInput
                      label="Date of Birth"
                      name="spouse_date_of_birth"
                      placeholder={`DD-MM-YYYY`}
                    />
                  </div>
                  <div className="space-y-1">
                    {/* <div className="text-lg">Where is your place of birth?</div> */}
                    <InputField
                      label="Place of Birth"
                      name="spouse_place_of_birth"
                      type="text"
                      placeholder="Place of birth"
                      className="text-2xl font-bold rounded-xl py-3"
                    />
                  </div>
                </div>
                <div className="flex justify-center w-full gap-4 mt-4">
                  <Button
                    label="Proceed"
                    className="bg-secondary"
                    type="submit"
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

export default SpouseBasicInfo;
