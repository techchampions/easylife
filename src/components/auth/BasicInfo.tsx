import { Form, Formik } from "formik";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { formatDateSimple } from "../../utils/formatter";
import { useModal } from "../../zustand/modal.state";
import { useOnboardingFormData } from "../../zustand/onboardingData.state";
import DatePickerInput from "../form/DatePickerInput";
import InputField from "../form/InputField";
import RadioGroup from "../form/RadioGroup";
import Button from "../global/Button";
import BasicInfo2 from "./BasicInfo2";
import MaritalStatus from "./MaritalStatus";

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("required"),
  last_name: Yup.string().required("required"),
  gender: Yup.string().required("required"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9+\-\s()]+$/, "Invalid phone number")
    .min(10, "Phone number too short"),
  date_of_birth: Yup.string().required("required"),
  place_of_birth: Yup.string().required("required"),
});

const BasicInfo: React.FC = () => {
  const modal = useModal();
  const [emailToCheck, setEmailToCheck] = useState("");
  const genderOption = [
    { label: "male", value: "male" },
    { label: "female", value: "female" },
  ];

  const {
    setOnboardingFormData,
    first_name,
    last_name,
    gender,
    single_user_phone,
    date_of_birth,
    place_of_birth,
  } = useOnboardingFormData();
  const initialValues = {
    first_name: first_name || "",
    last_name: last_name || "",
    gender: gender || "",
    phone: single_user_phone || "",
    date_of_birth: date_of_birth || "",
    place_of_birth: place_of_birth || "",
    langs: [],
  };
  const goBack = () => {
    modal.open(<MaritalStatus />);
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
        <div className="text-2xl font-bold">Applicant's Personal Data</div>
      </div>
      <div className="flex flex-col justify-between mt-7">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnMount
          onSubmit={(values) => {
            setOnboardingFormData({
              first_name: values.first_name,
              last_name: values.last_name,
              single_user_phone: values.phone,
              gender: values.gender,
              date_of_birth: formatDateSimple(values.date_of_birth),
              place_of_birth: values.place_of_birth,
            });
            modal.open(<BasicInfo2 />);
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
                        name="first_name"
                        type="text"
                        placeholder="First Name"
                        className="text-2xl font-bold rounded-xl py-3"
                      />
                      <InputField
                        name="last_name"
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
                    <div className="text-lg">What is your gender?</div>
                    <RadioGroup
                      options={genderOption}
                      name="gender"
                      orientation="horizontal"
                      optionClassName="min-w-[calc(50%-8px)]"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="text-lg">What is your date of birth?</div>
                    <DatePickerInput
                      name="date_of_birth"
                      placeholder={`DD-MM-YYYY`}
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="text-lg">Where is your place of birth?</div>
                    <InputField
                      name="place_of_birth"
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

export default BasicInfo;
