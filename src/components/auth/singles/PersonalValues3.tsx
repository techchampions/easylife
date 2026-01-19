import { Formik, Form } from "formik";
import * as Yup from "yup";
import { ArrowLeft, ArrowRight, Info } from "lucide-react";
import React from "react";
import { useModal } from "../../../zustand/modal.state";
import { useOnboardingFormData } from "../../../zustand/onboardingData.state";
import InputField from "../../form/InputField";
import Button from "../../global/Button";
import PersonalValues2 from "./PersonsalValues2";
import ProfilePicture from "./ProfilePicture";

const validationSchema = Yup.object().shape({
  single_user_selling_point: Yup.string().required("required"),
  single_user_table_pack: Yup.string().required("required"),
});

const PersonalValues3: React.FC = () => {
  const modal = useModal();
  const {
    setOnboardingFormData,
    single_user_selling_point,
    single_user_table_pack,
  } = useOnboardingFormData();
  const initialValues = {
    single_user_selling_point: single_user_selling_point || "",
    single_user_table_pack: single_user_table_pack || "",
  };
  const goBack = () => {
    modal.openModal(<PersonalValues2 />);
  };
  return (
    <div className="flex flex-col w-md max-w-xs md:max-w-md mx-h-[65vh]">
      <div
        className="flex items-center gap-2 cursor-pointer absolute top-4 left-4"
        onClick={goBack}
      >
        <ArrowLeft /> Back
      </div>

      <div className="flex flex-col mt-5"></div>
      <div className="flex flex-col justify-between mt-7">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnMount
          onSubmit={(values) => {
            setOnboardingFormData({
              single_user_selling_point: values.single_user_selling_point,
              single_user_table_pack: values.single_user_table_pack,
            });
            modal.openModal(<ProfilePicture />);
          }}
        >
          {({ isValid }) => {
            return (
              <Form className="flex flex-col gap-8 justify-between min-h-55">
                <div className="space-y-5">
                  <div className="space-y-1">
                    <div className="text-xl font-bold">
                      Why should your spouse to be marry you?{" "}
                    </div>
                    <InputField
                      name="single_user_selling_point"
                      type="textarea"
                      placeholder="Please inidicate here."
                      className="text-2xl font-bold rounded-xl py-3"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="text-xl font-bold">
                      What are you bringing to the table into this marriage to
                      make it successful and enjoyable?{" "}
                    </div>
                    <InputField
                      name="single_user_table_pack"
                      type="textarea"
                      placeholder="Please inidicate here."
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

export default PersonalValues3;
