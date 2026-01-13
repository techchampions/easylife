import { Formik, Form } from "formik";
import * as Yup from "yup";
import { ArrowLeft, ArrowRight, Info } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useModal } from "../../zustand/modal.state";
import MaritalStatus from "./MaritalStatus";
import InputField from "../form/InputField";
import Button from "../global/Button";
import DatePickerInput from "../form/DatePickerInput";
import BasicInfo2 from "./BasicInfo2";
import { useOnboardingFormData } from "../../zustand/onboardingData.state";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("required"),
  lastName: Yup.string().required("required"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9+\-\s()]+$/, "Invalid phone number")
    .min(10, "Phone number too short"),
  dateOfBirth: Yup.string().required("required"),
  placeOfBirth: Yup.string().required("required"),
});

const BasicInfo: React.FC = () => {
  const modal = useModal();
  const [emailToCheck, setEmailToCheck] = useState("");
  const {
    setOnboardingFormData,
    firstName,
    lastName,
    singleUserPhone,
    dateOfBirth,
    placeOfBirth,
  } = useOnboardingFormData();
  const initialValues = {
    firstName: firstName || "",
    lastName: lastName || "",
    phone: singleUserPhone || "",
    dateOfBirth: dateOfBirth || "",
    placeOfBirth: placeOfBirth || "",
    langs: [],
  };
  const goBack = () => {
    modal.openModal(<MaritalStatus />);
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
              firstName: values.firstName,
              lastName: values.lastName,
              singleUserPhone: values.phone,
              dateOfBirth: values.dateOfBirth,
              placeOfBirth: values.placeOfBirth,
            });
            modal.openModal(<BasicInfo2 />);
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
                        name="firstName"
                        type="text"
                        placeholder="First Name"
                        className="text-2xl font-bold rounded-xl py-3"
                      />
                      <InputField
                        name="lastName"
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
                      name="dateOfBirth"
                      placeholder={`DD-MM-YYYY`}
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="text-lg">Where is your place of birth?</div>
                    <InputField
                      name="placeOfBirth"
                      type="text"
                      placeholder="Place of birth"
                      className="text-2xl font-bold rounded-xl py-3"
                    />
                  </div>
                </div>
                <div className="flex justify-center w-full gap-4 mt-4">
                  <Button
                    label="Proceed"
                    // label={`${
                    //   data?.success
                    //     ? "User with email already exist"
                    //     : "Proceed"
                    // }`}
                    // className={`${
                    //   data?.success ? "bg-red-700" : "bg-adron-green"
                    // } rounded-lg`}
                    className="bg-secondary"
                    type="submit"
                    // isLoading={isLoading}
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

export default BasicInfo;
