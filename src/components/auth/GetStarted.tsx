import { Formik, Form } from "formik";
import * as Yup from "yup";
import { ArrowLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useModal } from "../../zustand/modal.state";
// import GetStarted from "./GetStarted-depreciated";
import InputField from "../form/InputField";
import Button from "../global/Button";
import RadioGroup from "../form/RadioGroup";
import MaritalStatus from "./MaritalStatus";
import { useOnboardingFormData } from "../../zustand/onboardingData.state";
// import { useVerifyMarkerter } from "@/data/hooks";

const validationSchema = Yup.object().shape({
  isReferred: Yup.string().required("required"),
  referralID: Yup.string().when("isReferred", {
    is: "yes",
    then: (schema) => schema.required("required"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

const GetStarted: React.FC = () => {
  const modal = useModal();
  const [ID, setID] = useState("");
  const { referralID, setOnboardingFormData } = useOnboardingFormData();
  const isReferredOption = [
    { label: "yes", value: "yes" },
    { label: "no", value: "no" },
  ];
  const initialValues = { referralID: referralID || "", isReferred: "" };
  // const { data, isLoading, isError } = useVerifyMarkerter(ID || "");
  const goBack = () => {
    modal.openModal(<GetStarted />);
  };

  const ValidateReferralCode = ({ code }: { code: string }) => {
    useEffect(() => {
      if (code && code !== ID) {
        setID(code);
      }
    }, [code]);

    return null;
  };

  const handleProceed = async (values: typeof initialValues) => {
    setOnboardingFormData({
      referralID: values.referralID,
    });
    modal.openModal(<MaritalStatus />);
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
        <div className="text-2xl font-bold text-center">
          Welcome to EasyLife Marriage Academy
        </div>
        <div className="w-full">
          <img src="/images/welcome.svg" className="w-[55%] mx-auto" />
        </div>
      </div>
      <div className="flex flex-col justify-between mt-4">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnMount
          onSubmit={handleProceed}
          // onSubmit={(values) => {
          //   setID(values.marketerId);
          //   if (data?.success) {
          //     setSubscribeFormData({ marketID: values.marketerId });
          //     action.openModal(<InputPersonalInfo property={property} />);
          //   }
          // }}
        >
          {({ isValid, values }) => (
            <Form className="flex flex-col justify-between">
              <ValidateReferralCode code={values.referralID} />
              <div className="space-y-4">
                <div className="space-y-4">
                  <div className="">Were you referred by someone?</div>
                  <RadioGroup
                    options={isReferredOption}
                    name="isReferred"
                    orientation="horizontal"
                    optionClassName="w-[calc(50%-8px)]"
                  />
                </div>
                {values.isReferred === "yes" && (
                  <div className="flex flex-col gap-4">
                    <InputField
                      name="referralID"
                      type="text"
                      placeholder=" Enter referral code"
                      className="text-2xl font-bold rounded-xl py-3"
                    />
                    <p className="text-xs text-gray-400 w-full">
                      Please enter the Marketer ID to proceed with the payment.
                      This is required to ensure that the payment is correctly
                      attributed to the right marketer. If you do not have a
                      Marketer ID, please contact your marketer for assistance.
                    </p>
                  </div>
                )}
              </div>
              <div className="flex justify-center w-full gap-4 mt-4">
                <Button
                  // label={`${isError ? "Invalid Marketer code" : "Proceed"}`}
                  label="Proceed"
                  // className={`${
                  //   isError ? "bg-red-700" : "bg-adron-green"
                  // } rounded-lg`}
                  className="bg-secondary rounded-lg"
                  type="submit"
                  // loadingText={`${
                  //   isError
                  //     ? "Invalid Marketer code"
                  //     : isLoading
                  //     ? "Verifying marketer code..."
                  //     : "Loading..."
                  // }`}
                  // isLoading={isLoading}
                  disabled={!isValid}
                  // icon={isError ? <Info /> : null}
                  // rightIcon={data?.success ? <ArrowRight /> : null}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default GetStarted;
