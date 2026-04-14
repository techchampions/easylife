import { Form, Formik } from "formik";
import { ArrowLeft, ArrowRight, Info } from "lucide-react";
import React from "react";
import * as Yup from "yup";
import { countries } from "../../../const/data";
import { useModal } from "../../../zustand/modal.state";
import { useOnboardingFormData } from "../../../zustand/onboardingData.state";
import InputField from "../../form/InputField";
import SelectField from "../../form/SelectField";
import TagsInput from "../../form/TagsInputFied";
import Button from "../../global/Button";
import MarriageHistory from "./MarriageHistory";
import SpouseBasicInfo from "./SpouseBasicInfo";

const validationSchema = Yup.object().shape({
  spouse_address: Yup.string().required("required"),
  spouse_state: Yup.string().required("required"),
  spouse_country: Yup.string().required("required"),

  spouse_nationality: Yup.string().required("required"),
  spouse_race_or_tribe: Yup.string().required("required"),
  spouse_religion: Yup.string().required("required"),
  spouse_denomination: Yup.string().required("required"),
  spouse_languages: Yup.array()
    .of(Yup.string().trim().min(2))
    .max(12, "Too many interests")
    .min(1, "Add at least one interest"),
});

const SpouseBasicInfo2: React.FC = () => {
  const modal = useModal();
  const {
    spouse_nationality,
    spouse_address,
    spouse_state,
    spouse_denomination,
    spouse_country,
    spouse_religion,
    spouse_language,
    spouse_race_or_tribe,
    setOnboardingFormData,
  } = useOnboardingFormData();
  const initialValues = {
    spouse_address: spouse_address || "",
    spouse_denomination: spouse_denomination || "",
    spouse_state: spouse_state || "",
    spouse_country: spouse_country || "",
    spouse_nationality: spouse_nationality || "",
    spouse_race_or_tribe: spouse_race_or_tribe || "",
    spouse_religion: spouse_religion || "",
    spouse_languages: spouse_language,
  };
  const goBack = () => {
    modal.open(<SpouseBasicInfo />);
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
              spouse_race_or_tribe: values.spouse_race_or_tribe,
              spouse_religion: values.spouse_religion,
              spouse_language: values.spouse_languages,
              spouse_nationality: values.spouse_nationality,
              spouse_address: values.spouse_address,
              spouse_state: values.spouse_state,
              spouse_denomination: values.spouse_denomination,
            });
            modal.open(<MarriageHistory />);
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
                        name="spouse_country"
                        label="Country of residence"
                        placeholder="Country"
                      />

                      <InputField
                        name="spouse_state"
                        label="State"
                        placeholder="State"
                      />
                      <div className="col-span-2">
                        <InputField
                          name="spouse_address"
                          label="Current Address"
                          placeholder="Address"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    {/* <div className="text-lg">
                      What is your spouse_Nationality?
                    </div> */}
                    <InputField
                      label="Nationality"
                      name="spouse_nationality"
                      type="text"
                      placeholder="Enter your nationality"
                      className="text-2xl font-bold rounded-xl py-3"
                    />
                  </div>
                  <div className="space-y-1">
                    {/* <div className="text-lg">
                      What is your spouse_Nationality?
                    </div> */}
                    <InputField
                      label="Denomination"
                      name="spouse_denomination"
                      type="text"
                      placeholder="Enter your denomination"
                      className="text-2xl font-bold rounded-xl py-3"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-2">
                    <div className="space-y-1">
                      {/* <div className="text-lg">What is your race/tribe?</div> */}
                      <InputField
                        label="Race/Tribe"
                        name="spouse_race_or_tribe"
                        type="text"
                        placeholder="Enter your race or tribe"
                        className="text-2xl font-bold rounded-xl py-3"
                      />
                    </div>
                    <div className="space-y-1">
                      {/* <div className="text-lg">What is your religion?</div> */}
                      <InputField
                        label="Religion"
                        name="spouse_religion"
                        type="text"
                        placeholder="Eg. Christainity, Islam"
                        className="text-2xl font-bold rounded-xl py-3"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    {/* <div className="text-lg">spouse_Languages spoken?</div> */}
                    <TagsInput
                      label="Languages spoken"
                      name="spouse_languages"
                      placeholder="E.g. English... (press enter)"
                      className=" font-bold rounded-xl"
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

export default SpouseBasicInfo2;
