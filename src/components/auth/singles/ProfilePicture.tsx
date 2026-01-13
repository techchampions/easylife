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
import { useUserStore } from "../../../zustand/user.state";

const ProfilePicture: React.FC = () => {
  const modal = useModal();
  const { setIsLoggedIn, setUser } = useUserStore();

  const {
    profilePicture,
    spouseProfilePicture,
    maritalStatus,
    setOnboardingFormData,
  } = useOnboardingFormData();
  const initialValues = {
    profilePicture: profilePicture || null,
    spouseProfilePicture: spouseProfilePicture || null,
    // phoneNumber: "",
    // spousephoneNumber: "",
  };
  const validationSchema = Yup.object().shape({
    profilePicture: Yup.mixed().required("required"),
    // phoneNumber: Yup.string()
    //   .required("Phone number is required")
    //   .matches(/^[0-9+\-\s()]+$/, "Invalid phone number")
    //   .min(10, "Phone number too short"),
    // ...(maritalStatus === "married" && {
    //   spousephoneNumber: Yup.string()
    //     .required("Phone number is required")
    //     .matches(/^[0-9+\-\s()]+$/, "Invalid phone number")
    //     .min(10, "Phone number too short"),
    // }),
    ...(maritalStatus === "married" && {
      spouseProfilePicture: Yup.mixed().required(
        "Spouse's picture is required"
      ),
    }),
  });
  const goBack = () => {
    modal.openModal(<PersonalValues3 />);
  };
  return (
    <div
      className={`flex flex-col w-lg   max-w-xs ${
        maritalStatus === "married" ? " md:max-w-lg" : "md:max-w-sm"
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
              profilePicture: values.profilePicture,
              spouseProfilePicture: values.spouseProfilePicture,
            });
            setIsLoggedIn(true);
            setUser({
              role: maritalStatus === "married" ? 0 : 1,
              id: 0,
              email: "string",
              phone_number: "string",
              referral_code: "string",
              first_name: "string",
              last_name: "string",
              country: "string",
              state: "string",
              lga: "string",
              otp_verified_at: "string",
              email_verified_at: "string",
              profile_picture: "string",
              gender: "string",
              address: "string",
              created_at: "string",
              updated_at: "string",
            });

            modal.openModal(<Congrats />);
          }}
        >
          {({ isValid }) => (
            <Form className="flex flex-col gap-8 justify-between min-h-55">
              <div className="space-y-7">
                <div
                  className={
                    maritalStatus === "married"
                      ? "space-y-1 grid md:grid-cols-2 gap-2"
                      : "flex justify-center"
                  }
                >
                  {/* <div className="text-lg">What`s your email address?</div> */}
                  <ImageInput
                    name="profilePicture"
                    label="Profile Photo"
                    infoText="Upload a clear photo of face"
                    width={maritalStatus === "married" ? 175 : 200}
                    height={200}
                    className="w-fit!"
                  />
                  {maritalStatus === "married" && (
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
                    maritalStatus === "married" && "md:grid-cols-2"
                  } gap-2`}
                >
                  <div className="space-y-1">
                    <div className="text-base">What`s your phone No.?</div>
                    <InputField name="phoneNumber" placeholder="Phone number" />
                  </div>
                  {maritalStatus === "married" && (
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
                  disabled={!isValid}
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
