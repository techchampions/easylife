import { Formik, Form } from "formik";
import * as Yup from "yup";
import { ArrowLeft, ArrowRight, Info } from "lucide-react";
import React from "react";
import { useModal } from "../../../zustand/modal.state";
import { useOnboardingFormData } from "../../../zustand/onboardingData.state";
import LocationAutocomplete from "../../form/AutoLocationInput";
import InputField from "../../form/InputField";
import Button from "../../global/Button";
import SpouseBasicInfo from "./SpouseBasicInfo";
import MarriageHistory from "./MarriageHistory";
import TagsInput from "../../form/TagsInputFied";

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

  spouse_nationality: Yup.string().required("required"),
  spouse_race_or_tribe: Yup.string().required("required"),
  spouse_religion: Yup.string().required("required"),
  spouse_languages: Yup.array()
    .of(Yup.string().trim().min(2))
    .max(12, "Too many interests")
    .min(1, "Add at least one interest"),
});

const SpouseBasicInfo2: React.FC = () => {
  const modal = useModal();
  const {
    spouse_nationality,
    address,
    state,
    city,
    country,
    spouse_religion,
    spouse_language,
    spouse_race_or_tribe,
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
              address: values.location.address,
              state: values.location.state,
              city: values.location.city,
            });
            modal.open(<MarriageHistory />);
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
                    <div className="text-lg">
                      What is your spouse_Nationality?
                    </div>
                    <InputField
                      name="spouse_nationality"
                      type="text"
                      placeholder="Eg. Nigerian, Ghanian"
                      className="text-2xl font-bold rounded-xl py-3"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <div className="text-lg">What is your race/tribe?</div>
                      <InputField
                        name="spouse_race_or_tribe"
                        type="text"
                        placeholder="Eg. Yoruba, Ibo"
                        className="text-2xl font-bold rounded-xl py-3"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="text-lg">What is your religion?</div>
                      <InputField
                        name="spouse_religion"
                        type="text"
                        placeholder="Eg. Christainity, Islam"
                        className="text-2xl font-bold rounded-xl py-3"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-lg">spouse_Languages spoken?</div>
                    <TagsInput
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
