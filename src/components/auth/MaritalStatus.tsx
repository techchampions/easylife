import { Form, Formik } from "formik";
import { ArrowLeft, ArrowRight, PartyPopper } from "lucide-react";
import React from "react";
import * as Yup from "yup";
import { useModal } from "../../zustand/modal.state";
import { useOnboardingFormData } from "../../zustand/onboardingData.state";
import { useUserStore } from "../../zustand/user.state";
import RadioGroup from "../form/RadioGroup";
import Subscription from "../general_dating/Subscription";
import Button from "../global/Button";
import BasicInfo from "./BasicInfo";
import GetStarted from "./GetStarted";

const validationSchema = Yup.object().shape({
  marital_status: Yup.string().required("required"),
});

const MaritalStatus: React.FC = () => {
  const modal = useModal();
  const { user } = useUserStore();
  const { setOnboardingFormData, marital_status } = useOnboardingFormData();
  const statusOption = [
    { label: "single", value: "single" },
    { label: "married", value: "married" },
  ];
  let plan_marital_status = "";
  if (user?.plan) {
    if (user.plan.id === 1) {
      plan_marital_status = "single";
    } else if (user.plan.id === 2) {
      plan_marital_status = "married";
    }
  } else if (marital_status) {
    plan_marital_status = marital_status;
  }
  const initialValues = { marital_status: plan_marital_status || "" };
  const goBack = () => {
    modal.open(<GetStarted />);
  };

  const handleProceed = async (values: typeof initialValues) => {
    if (user?.plan) {
      modal.open(<BasicInfo />);
    } else {
      setOnboardingFormData({
        marital_status: values.marital_status,
      });
      modal.open(<Subscription />);
    }
  };
  return (
    <div className="flex flex-col w-md max-w-xs md:max-w-md">
      <div
        className="flex items-center gap-2 cursor-pointer absolute top-4 left-4"
        onClick={goBack}
      >
        <ArrowLeft /> Back
      </div>

      {/* <div className="flex flex-col mt-5">
        <div className="text-2xl font-bold">Easy Life Academy</div>
      </div> */}
      <div className="flex flex-col justify-between mt-4">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnMount
          onSubmit={handleProceed}
        >
          {({ isValid }) => (
            <Form className="flex flex-col justify-between">
              <div className="w-[65%] mx-auto">
                <img
                  src="/images/relationship.svg"
                  className="w-full h-full "
                />
              </div>
              {user?.plan ? (
                <div className="flex gap-2 items-center">
                  <div className="bg-secondary/20 flex items-center justify-center h-13 w-13 text-secondary rounded-full">
                    <PartyPopper />
                  </div>
                  <div className="flex-1 md:text-2xl">
                    Your have already subscribed to <b>{user.plan.name}</b>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 my-5">
                  <div className="space-y-4">
                    <div className="text-2xl font-bold">
                      What is your marital status?
                    </div>
                    <RadioGroup
                      options={statusOption}
                      name="marital_status"
                      orientation="horizontal"
                      optionClassName="min-w-[calc(50%-8px)]"
                    />
                  </div>
                </div>
              )}
              <div className="flex justify-center w-full gap-4 mt-4">
                <Button
                  label="Proceed"
                  className="bg-secondary rounded-lg"
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

export default MaritalStatus;
