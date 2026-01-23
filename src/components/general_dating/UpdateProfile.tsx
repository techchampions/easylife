import { Form, Formik } from "formik";
import React from "react";
import RadioGroup from "../form/RadioGroup";
import Button from "../global/Button";
import { useOnboarding } from "../../hooks/mutattions/useOnboarding";

const UpdateProfile = () => {
  const genderOPtions = [
    {
      label: "male",
      value: "male",
    },
    {
      label: "female",
      value: "female",
    },
  ];
  const initialValues = {
    gender: "",
  };
  const { mutate, isPending } = useOnboarding();
  return (
    <div className="bg-white rounded-2xl w-md max-w-sm md:max-w-md">
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          const payload = new FormData();
          payload.append("gender", values.gender);
          mutate(payload);
        }}
      >
        {({}) => (
          <Form>
            <RadioGroup options={genderOPtions} name="gender" />
            <Button
              type="submit"
              label="Update"
              disabled={isPending}
              isLoading={isPending}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateProfile;
