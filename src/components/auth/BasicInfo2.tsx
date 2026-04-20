import { Form, Formik } from "formik";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";
import * as Yup from "yup";
import { countries } from "../../const/data";
import { useModal } from "../../zustand/modal.state";
import { useOnboardingFormData } from "../../zustand/onboardingData.state";
import { useToast } from "../../zustand/toast.state";
import { useUserStore } from "../../zustand/user.state";
import InputField from "../form/InputField";
import SelectField from "../form/SelectField";
import Button from "../global/Button";
import BasicInfo from "./BasicInfo";
import BioData from "./BioData";
import SpouseBasicInfo from "./couples/SpouseBasicInfo";
import MaritalStatus from "./MaritalStatus";

const validationSchema = Yup.object().shape({
  address: Yup.string().required("required"),
  state: Yup.string().required("required"),
  country: Yup.string().required("required"),
  nationality: Yup.string().required("required"),
  race_or_tribe: Yup.string().required("required"),
  religion: Yup.string().required("required"),
  languages: Yup.string().required("required"),
  // languages: Yup.array()
  //   .of(Yup.string().trim().min(2))
  //   .max(12, "Too many interests")
  //   .min(1, "Add at least one interest"),
});

const BasicInfo2: React.FC = () => {
  const modal = useModal();
  const toast = useToast();
  const { user } = useUserStore();
  const {
    nationality,
    address,
    state,
    country,
    religion,
    denomination,
    language,
    race_or_tribe,
    setOnboardingFormData,
  } = useOnboardingFormData();
  const initialValues = {
    address: address || "",
    state: state || "",
    country: country || "",
    denomination: denomination || "",
    nationality: nationality || "",
    race_or_tribe: race_or_tribe || "",
    religion: religion || "",
    languages: language,
  };
  const goBack = () => {
    modal.open(<BasicInfo />);
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
              race_or_tribe: values.race_or_tribe,
              religion: values.religion,
              language: values.languages,
              nationality: values.nationality,
              denomination: values.denomination,
              address: values.address,
              state: values.state,
              country: values.country,
            });
            if (user?.marital_status) {
              if (user.marital_status === "married")
                modal.open(<SpouseBasicInfo />);
              if (user.marital_status === "single") modal.open(<BioData />);
            } else if (user?.plan) {
              if (user.plan.id === 1) {
                modal.open(<BioData />);
              }
              if (user.plan.id === 2) {
                modal.open(<SpouseBasicInfo />);
              }
            } else {
              toast.showToast(
                "Marital status not set... go back to set",
                "info"
              );
              modal.open(<MaritalStatus />);
            }
            // console.log(marital_status);
          }}
        >
          {({ isValid }) => {
            return (
              <Form className="flex flex-col gap-8 justify-between min-h-55">
                <div className="space-y-5">
                  <div className="space-y-1">
                    <div className="grid grid-cols-2 gap-2">
                      <SelectField
                        options={countries}
                        name="country"
                        label="Country of residence"
                        placeholder="Country"
                      />
                      <InputField
                        name="state"
                        label="State"
                        placeholder="State"
                      />
                      <div className="col-span-2">
                        <InputField
                          name="address"
                          label="Current Address"
                          placeholder="Address"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    {/* <div className="text-lg">What is your Nationality?</div> */}
                    <InputField
                      name="nationality"
                      label="Nationality"
                      type="text"
                      placeholder="Enter your nationality"
                      className="text-2xl font-bold rounded-xl py-3"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-2">
                    <div className="space-y-1">
                      {/* <div className="text-lg">What is your race/tribe?</div> */}
                      <InputField
                        name="race_or_tribe"
                        label="Race/Tribe"
                        type="text"
                        placeholder="Enter your race or tribe"
                        className="text-2xl font-bold rounded-xl py-3"
                      />
                    </div>
                    <div className="space-y-1">
                      {/* <div className="text-lg">What is your religion?</div> */}
                      <InputField
                        name="religion"
                        label="Religion"
                        type="text"
                        placeholder="Eg. Christainity, Islam"
                        className="text-2xl font-bold rounded-xl py-3"
                      />
                    </div>
                    <div className="space-y-1 md:col-span-2">
                      {/* <div className="text-lg">What is your religion?</div> */}
                      <InputField
                        name="denomination"
                        label="Denomination"
                        type="text"
                        placeholder="Denomination"
                        className="text-2xl font-bold rounded-xl py-3"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    {/* <div className="text-lg">Languages spoken?</div> */}
                    <InputField
                      label="Languages spoken"
                      name="languages"
                      placeholder="E.g. English... (press enter)"
                      className="font-bold rounded-xl text-2xl"
                    />
                  </div>
                </div>
                <div className="flex justify-center w-full gap-4 mt-3">
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

export default BasicInfo2;
