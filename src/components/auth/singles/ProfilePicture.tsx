import { Formik, Form } from "formik";
import * as Yup from "yup";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";
import { useModal } from "../../../zustand/modal.state";
import PersonalValues3 from "./PersonalValues3";
import ImageInput from "../../form/ImageInput";
import Button from "../../global/Button";
import { useOnboardingFormData } from "../../../zustand/onboardingData.state";
import Congrats from "../Congrats";
import { useOnboarding } from "../../../hooks/mutattions/useOnboarding";

const ProfilePicture: React.FC = () => {
  const modal = useModal();
  const { mutate: proceed, isPending } = useOnboarding();
  const {
    referral_id,
    first_name,
    last_name,
    single_user_phone,
    address,
    city,
    state,
    country,
    nationality,
    place_of_birth,
    date_of_birth,
    race_or_tribe,
    religion,
    language,
    height,
    size,
    gender,
    health_challenges,
    disabilities,
    previously_married,
    prev_marriage_children,
    marriage_length,
    spouse_first_name,
    spouse_last_name,
    spouse_date_of_birth,
    spouse_place_of_birth,
    spouse_nationality,
    spouse_race_or_tribe,
    spouse_religion,
    spouse_language,
    spouse_height,
    spouse_size,
    single_user_strength,
    single_user_weakness,
    single_user_tolerance,
    single_user_type_of_spouse,
    single_user_selling_point,
    single_user_table_pack,
    why_signup,
    marriage_issues,
    about_husband_negative,
    about_husband_positive,
    about_wife_negative,
    about_wife_positive,
    changes_to_husband,
    changes_to_wife,
    other_issues,
    profile_picture,
    spouse_profile_picture,
    marital_status,
    setOnboardingFormData,
  } = useOnboardingFormData();
  const initialValues = {
    profile_picture: profile_picture || null,
    spouse_profile_picture: spouse_profile_picture || null,
    // phoneNumber: "",
    // spousephoneNumber: "",
  };
  const validationSchema = Yup.object().shape({
    profilePicture: Yup.mixed().required("required"),
    // phoneNumber: Yup.string()
    //   .required("Phone number is required")
    //   .matches(/^[0-9+\-\s()]+$/, "Invalid phone number")
    //   .min(10, "Phone number too short"),
    // ...(marital_status === "married" && {
    //   spousephoneNumber: Yup.string()
    //     .required("Phone number is required")
    //     .matches(/^[0-9+\-\s()]+$/, "Invalid phone number")
    //     .min(10, "Phone number too short"),
    // }),
    ...(marital_status === "married" && {
      spouseProfilePicture: Yup.mixed().required(
        "Spouse's picture is required"
      ),
    }),
  });
  const goBack = () => {
    modal.open(<PersonalValues3 />);
  };
  return (
    <div
      className={`flex flex-col w-lg   max-w-xs ${
        marital_status === "married" ? " md:max-w-lg" : "md:max-w-sm"
      } max-h-[75vh] overflow-y-scroll scrollbar-hide`}
    >
      <div
        className="flex items-center gap-2 cursor-pointer absolute top-4 left-4"
        onClick={goBack}
      >
        <ArrowLeft /> Back
      </div>

      <div className="flex flex-col mt-5">
        <div className="text-2xl font-bold">
          Provide clear picture of yourself
        </div>
      </div>
      <div className="flex flex-col justify-between mt-7">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnMount
          onSubmit={(values) => {
            setOnboardingFormData({
              profile_picture: values.profile_picture,
              spouse_profile_picture: values.spouse_profile_picture,
            });
            const payload = new FormData();
            if (referral_id) {
              payload.append("referral_id", referral_id);
            }
            if (first_name) {
              payload.append("first_name", first_name);
            }
            if (last_name) {
              payload.append("last_name", last_name);
            }
            if (single_user_phone) {
              payload.append("single_user_phone", single_user_phone);
            }
            if (gender) {
              payload.append("gender", gender);
            }
            if (address) {
              payload.append("address", address);
            }
            if (city) {
              payload.append("city", city);
            }
            if (state) {
              payload.append("state", state);
            }
            if (country) {
              payload.append("country", country);
            }
            if (nationality) {
              payload.append("nationality", nationality);
            }
            if (place_of_birth) {
              payload.append("place_of_birth", place_of_birth);
            }
            if (date_of_birth) {
              payload.append("date_of_birth", date_of_birth);
            }
            if (race_or_tribe) {
              payload.append("race_or_tribe", race_or_tribe);
            }
            if (religion) {
              payload.append("religion", religion);
            }
            if (language) {
              payload.append("language", language[0]);
            }
            if (height) {
              payload.append("height", height);
            }
            if (size) {
              payload.append("size", size);
            }
            if (health_challenges) {
              payload.append("health_challenges", health_challenges);
            }
            if (disabilities) {
              payload.append("disabilities", disabilities);
            }
            if (marital_status) {
              payload.append("marital_status", marital_status);
            }
            if (previously_married) {
              payload.append("previously_married", previously_married);
            }
            if (prev_marriage_children) {
              payload.append("prev_marriage_children", prev_marriage_children);
            }
            if (marriage_length) {
              payload.append("marriage_length", marriage_length);
            }
            if (spouse_first_name) {
              payload.append("spouse_first_name", spouse_first_name);
            }
            if (spouse_last_name) {
              payload.append("spouse_last_name", spouse_last_name);
            }
            if (spouse_date_of_birth) {
              payload.append("spouse_date_of_birth", spouse_date_of_birth);
            }
            if (spouse_place_of_birth) {
              payload.append("spouse_place_of_birth", spouse_place_of_birth);
            }
            if (spouse_nationality) {
              payload.append("spouse_nationality", spouse_nationality);
            }
            if (spouse_race_or_tribe) {
              payload.append("spouse_race_or_tribe", spouse_race_or_tribe);
            }
            if (spouse_religion) {
              payload.append("spouse_religion", spouse_religion);
            }
            if (spouse_language) {
              payload.append("spouse_language", spouse_language[0]);
            }
            if (spouse_height) {
              payload.append("spouse_height", spouse_height);
            }
            if (spouse_size) {
              payload.append("spouse_size", spouse_size);
            }
            if (single_user_strength) {
              payload.append("single_user_strength", single_user_strength);
            }
            if (single_user_weakness) {
              payload.append("single_user_weakness", single_user_weakness);
            }
            if (single_user_tolerance) {
              payload.append("single_user_tolerance", single_user_tolerance);
            }
            if (single_user_type_of_spouse) {
              payload.append(
                "single_user_type_of_spouse",
                single_user_type_of_spouse
              );
            }
            if (single_user_selling_point) {
              payload.append(
                "single_user_selling_point",
                single_user_selling_point
              );
            }
            if (single_user_table_pack) {
              payload.append("single_user_table_pack", single_user_table_pack);
            }
            if (why_signup) {
              payload.append("why_signup", why_signup);
            }
            if (about_husband_negative) {
              payload.append("about_husband_negative", about_husband_negative);
            }
            if (about_husband_positive) {
              payload.append("about_husband_positive", about_husband_positive);
            }
            if (about_wife_positive) {
              payload.append("about_wife_positive", about_wife_positive);
            }
            if (about_wife_negative) {
              payload.append("about_wife_negative", about_wife_negative);
            }
            if (changes_to_husband) {
              payload.append("changes_to_husband", changes_to_husband);
            }
            if (changes_to_wife) {
              payload.append("changes_to_wife", changes_to_wife);
            }
            if (marriage_issues) {
              payload.append("marriage_issues", marriage_issues);
            }
            if (other_issues) {
              payload.append("other_issues", other_issues);
            }
            if (values.profile_picture) {
              payload.append("profile_picture", values.profile_picture);
            }
            if (values.spouse_profile_picture) {
              payload.append(
                "spouse_profile_picture",
                values.spouse_profile_picture
              );
            }

            proceed(payload, {
              onSuccess() {
                modal.open(<Congrats />);
              },
            });
          }}
        >
          {({ isValid }) => (
            <Form className="flex flex-col gap-8 justify-between min-h-55">
              <div className="space-y-7">
                <div
                  className={
                    marital_status === "married"
                      ? "space-y-1 grid md:grid-cols-2 gap-2"
                      : "flex justify-center"
                  }
                >
                  {/* <div className="text-lg">What`s your email address?</div> */}
                  <ImageInput
                    name="profilePicture"
                    label="Profile Photo"
                    infoText="Upload a clear photo of face"
                    width={marital_status === "married" ? 175 : 200}
                    height={200}
                    className="w-fit!"
                  />
                  {marital_status === "married" && (
                    <ImageInput
                      name="spouseProfilePicture"
                      label="Spouse's Photo"
                      infoText="Upload a clear photo of face"
                      width={175}
                      height={200}
                      className="w-fit!"
                    />
                  )}
                </div>
                {/* <div
                  className={`grid ${
                    marital_status === "married" && "md:grid-cols-2"
                  } gap-2`}
                >
                  <div className="space-y-1">
                    <div className="text-base">What`s your phone No.?</div>
                    <InputField name="phoneNumber" placeholder="Phone number" />
                  </div>
                  {marital_status === "married" && (
                    <div className="space-y-1">
                      <div className="text-base">
                        What`s your Spouse phone No.?
                      </div>
                      <InputField
                        name="spousephoneNumber"
                        placeholder="Phone number"
                      />
                    </div>
                  )}
                </div> */}
              </div>
              <div className="flex justify-center w-full gap-4 mt-4">
                <Button
                  label="Proceed"
                  className="bg-secondary"
                  type="submit"
                  isLoading={isPending}
                  disabled={!isValid || isPending}
                  rightIcon={<ArrowRight />}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ProfilePicture;
