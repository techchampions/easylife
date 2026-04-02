import { Form, Formik } from "formik";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";
import * as Yup from "yup";
import { useModal } from "../../zustand/modal.state";
import { useOnboardingFormData } from "../../zustand/onboardingData.state";
import { useToast } from "../../zustand/toast.state";
import { useUserStore } from "../../zustand/user.state";
import LocationAutocomplete from "../form/AutoLocationInput";
import InputField from "../form/InputField";
import TagsInput from "../form/TagsInputFied";
import Button from "../global/Button";
import BasicInfo from "./BasicInfo";
import BioData from "./BioData";
import SpouseBasicInfo from "./couples/SpouseBasicInfo";

const validationSchema = Yup.object().shape({
  //   address: Yup.string().required("required"),
  location: Yup.object()
    .shape({
      address: Yup.string(),
      city: Yup.string(),
      state: Yup.string(),
      country: Yup.string(),
      lat: Yup.number(),
      lng: Yup.number(),
    })
    .required("required"),

  nationality: Yup.string().required("required"),
  race_or_tribe: Yup.string().required("required"),
  religion: Yup.string().required("required"),
  languages: Yup.array()
    .of(Yup.string().trim().min(2))
    .max(12, "Too many interests")
    .min(1, "Add at least one interest"),
});

const BasicInfo2: React.FC = () => {
  const modal = useModal();
  const toast = useToast();
  const { user } = useUserStore();
  const {
    nationality,
    address,
    state,
    city,
    country,
    religion,
    language,
    race_or_tribe,
    marital_status,
    setOnboardingFormData,
  } = useOnboardingFormData();
  const initialValues = {
    location: {
      address: address || "",
      city: city || "",
      state: state || "",
      country: country || "",
      lat: "",
      lng: "",
    },
    address: address || "",
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
              address: values.location.address,
              state: values.location.state,
              city: values.location.city,
            });
            if (marital_status) {
              if (marital_status === "married") modal.open(<SpouseBasicInfo />);
              if (marital_status === "single") modal.open(<BioData />);
            } else if (user?.plan) {
              if (user.plan.id === 1) {
                setOnboardingFormData({
                  marital_status: "single",
                });
                modal.open(<BioData />);
              }
              if (user.plan.id === 2) {
                setOnboardingFormData({
                  marital_status: "married",
                });
                modal.open(<SpouseBasicInfo />);
              }
            } else {
              toast.showToast(
                "Marital status not set... go back to set",
                "info"
              );
            }
            // console.log(marital_status);
          }}
        >
          {({ isValid, values, setFieldValue }) => {
            return (
              <Form className="flex flex-col gap-8 justify-between min-h-55">
                <div className="space-y-5">
                  <div className="space-y-1">
                    <div className="text-lg">
                      What is your residential address?
                    </div>
                    <LocationAutocomplete
                      value={values.address}
                      onChange={(value) => setFieldValue("address", value)}
                      onSelect={(locationData) => {
                        setFieldValue("location", {
                          address:
                            locationData.formattedAddress ||
                            locationData.address,
                          city: locationData.city || "",
                          state: locationData.state || "",
                          country: locationData.country || "",
                          lat: locationData.lat,
                          lng: locationData.lng,
                        });
                      }}
                      onError={(error) => {
                        console.error("Location error:", error);
                      }}
                      placeholder="Enter your address"
                      helperText="Start typing to see suggestions"
                      required
                      searchOptions={{
                        types: ["address"], // Search for addresses only
                      }}
                      debounce={400}
                      clearOnBlur={false}
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="text-lg">What is your Nationality?</div>
                    <InputField
                      name="nationality"
                      type="text"
                      placeholder="Enter you nationality"
                      className="text-2xl font-bold rounded-xl py-3"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <div className="text-lg">What is your race/tribe?</div>
                      <InputField
                        name="race_or_tribe"
                        type="text"
                        placeholder="Enter your race or tribe"
                        className="text-2xl font-bold rounded-xl py-3"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="text-lg">What is your religion?</div>
                      <InputField
                        name="religion"
                        type="text"
                        placeholder="Eg. Christainity, Islam"
                        className="text-2xl font-bold rounded-xl py-3"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-lg">Languages spoken?</div>
                    <TagsInput
                      name="languages"
                      placeholder="E.g. English... (press enter)"
                      className="font-bold rounded-xl"
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
