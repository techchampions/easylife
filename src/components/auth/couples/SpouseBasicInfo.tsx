import { Formik, Form } from "formik";
import * as Yup from "yup";
import { ArrowLeft, ArrowRight, Info } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useModal } from "../../../zustand/modal.state";
import { useOnboardingFormData } from "../../../zustand/onboardingData.state";
import InputField from "../../form/InputField";
import DatePickerInput from "../../form/DatePickerInput";
import Button from "../../global/Button";
import BasicInfo2 from "../BasicInfo2";
import SpouseBasicInfo2 from "./SpouseBasicInfo2";

const validationSchema = Yup.object().shape({
  spouse_firstName: Yup.string().required("required"),
  spouse_lastName: Yup.string().required("required"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9+\-\s()]+$/, "Invalid phone number")
    .min(10, "Phone number too short"),
  spouse_dateOfBirth: Yup.string().required("required"),
  spouse_placeOfBirth: Yup.string().required("required"),
});

const SpouseBasicInfo: React.FC = () => {
  const modal = useModal();
  const [emailToCheck, setEmailToCheck] = useState("");
  const {
    setOnboardingFormData,
    spouse_firstName,
    spouse_lastName,
    spousePhone,
    spouse_dateOfBirth,
    spouse_placeOfBirth,
  } = useOnboardingFormData();
  const initialValues = {
    spouse_firstName: spouse_firstName || "",
    spouse_lastName: spouse_lastName || "",
    phone: spousePhone || "",
    spouse_dateOfBirth: spouse_dateOfBirth || "",
    spouse_placeOfBirth: spouse_placeOfBirth || "",
  };
  const goBack = () => {
    modal.openModal(<BasicInfo2 />);
  };
  const CheckEmail = ({ email }: { email: string }) => {
    useEffect(() => {
      if (email && email !== emailToCheck) {
        setEmailToCheck(email);
      }
    }, [email]);

    return null;
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
              spouse_firstName: values.spouse_firstName,
              spouse_lastName: values.spouse_lastName,
              spousePhone: values.phone,
              spouse_dateOfBirth: values.spouse_dateOfBirth,
              spouse_placeOfBirth: values.spouse_placeOfBirth,
            });
            modal.openModal(<SpouseBasicInfo2 />);
          }}
        >
          {({ isValid, values }) => {
            return (
              <Form className="flex flex-col gap-8 justify-between min-h-55">
                <CheckEmail email={values.phone} />
                <div className="space-y-5">
                  <div className="space-y-1">
                    <div className="text-lg">What is your name?</div>
                    <div className="grid md:grid-cols-2 gap-2">
                      <InputField
                        name="spouse_firstName"
                        type="text"
                        placeholder="First Name"
                        className="text-2xl font-bold rounded-xl py-3"
                      />
                      <InputField
                        name="spouse_lastName"
                        type="text"
                        placeholder="Last Name"
                        className="text-2xl font-bold rounded-xl py-3"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-lg">What is your Phone No.?</div>
                    <InputField
                      name="phone"
                      type="text"
                      placeholder="Phone Number"
                      className="text-2xl font-bold rounded-xl py-3"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="text-lg">What is your date of birth?</div>
                    <DatePickerInput
                      name="spouse_dateOfBirth"
                      placeholder={`DD-MM-YYYY`}
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="text-lg">Where is your place of birth?</div>
                    <InputField
                      name="spouse_placeOfBirth"
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
