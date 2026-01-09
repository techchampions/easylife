import { Formik, Form } from "formik";
import * as Yup from "yup";
import { ArrowLeft, ArrowRight, Info } from "lucide-react";
import React from "react";
import { useModal } from "../../zustand/modal.state";
import InputField from "../form/InputField";
import Button from "../global/Button";
import BasicInfo from "./BasicInfo";
import SpouseBasicInfo from "./couples/SpouseBasicInfo";
import LocationAutocomplete from "../form/AutoLocationInput";
import BioData from "./BioData";
import { useOnboardingFormData } from "../../zustand/onboardingData.state";

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
  raceOrTribe: Yup.string().required("required"),
  religion: Yup.string().required("required"),
  languages: Yup.string().required("required"),
});

const BasicInfo2: React.FC = () => {
  const modal = useModal();
  const {
    nationality,
    address,
    state,
    city,
    country,
    religion,
    language,
    raceOrTribe,
    maritalStatus,
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
    raceOrTribe: raceOrTribe || "",
    religion: religion || "",
    languages: language || "",
  };
  const goBack = () => {
    modal.openModal(<BasicInfo />);
  };
  return (
    <div className="flex flex-col w-md max-w-xs md:max-w-md mx-h-[65vh]">
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
              raceOrTribe: values.raceOrTribe,
              religion: values.religion,
              language: values.languages,
              nationality: values.nationality,
              address: values.location.address,
              state: values.location.state,
              city: values.location.city,
            });
            if (maritalStatus === "married")
              modal.openModal(<SpouseBasicInfo />);

            if (maritalStatus === "single") modal.openModal(<BioData />);
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
                      placeholder="Eg. Nigerian, Ghanian"
                      className="text-2xl font-bold rounded-xl py-3"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <div className="text-lg">What is your race/tribe?</div>
                      <InputField
                        name="raceOrTribe"
                        type="text"
                        placeholder="Eg. Yoruba, Ibo"
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
                    <InputField
                      name="languages"
                      type="text"
                      placeholder="E.g. English, Yoruba"
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

export default BasicInfo2;
