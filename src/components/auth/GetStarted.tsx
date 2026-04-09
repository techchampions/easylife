import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";
import { useGetUser } from "../../hooks/query/useUser";
import { useModal } from "../../zustand/modal.state";
import Button from "../global/Button";
import MaritalStatus from "./MaritalStatus";

// const validationSchema = Yup.object().shape({
//   isReferred: Yup.string().required("required"),
//   referral_id: Yup.string().when("isReferred", {
//     is: "yes",
//     then: (schema) => schema.required("required"),
//     otherwise: (schema) => schema.notRequired(),
//   }),
// });

const GetStarted: React.FC = () => {
  useGetUser();
  const modal = useModal();
  // const { mutateAsync: verify, isPending } = useVerifyReferalCode();
  // const { referral_id, setOnboardingFormData } = useOnboardingFormData();
  // const isReferredOption = [
  //   { label: "yes", value: "yes" },
  //   { label: "no", value: "no" },
  // ];
  // const initialValues = { referral_id: referral_id || "", isReferred: "yes" };
  const goBack = () => {
    modal.open(<GetStarted />);
  };

  const handleProceed = () => {
    // setOnboardingFormData({
    //   referral_id: values.referral_id,
    // });

    // if (values.isReferred === "yes") {
    //   try {
    //     const response = await verify(values.referral_id);

    //     if (response?.is_exist) {
    //       toast.showToast("Referral code is valid", "success");
    //       modal.open(<MaritalStatus />);
    //     } else {
    //       toast.showToast("Invalid referral code", "error");
    //     }
    //   } catch {
    //     toast.showToast("Something went wrong", "error");
    //   }
    // } else {
    //   modal.open(<MaritalStatus />);
    // }
    modal.open(<MaritalStatus />);
  };
  return (
    <div className="flex flex-col w-lg max-w-xs md:max-w-lg max-h-[75vh] overflow-y-scroll scrollbar-hide">
      <div
        className="flex items-center gap-2 cursor-pointer absolute top-4 left-4"
        onClick={goBack}
      >
        <ArrowLeft /> Back
      </div>

      <div className="flex flex-col mt-5">
        <div className="text-2xl font-bold text-center">
          Welcome to <br /> EasyLife Marriage Academy
        </div>
        {/* <div className="w-full">
          <img src="/images/welcome.svg" className="w-[60%] mx-auto" />
        </div> */}
      </div>
      <div className="flex flex-col md:flex-row items-center mt-4">
        {/* <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnMount
          onSubmit={handleProceed}
        >
          {({ isValid, values }) => (
            <Form className="flex flex-col justify-between">
              <div className="space-y-4">
                {values.isReferred === "yes" && (
                  <div className="flex flex-col gap-4">
                    <InputField
                      name="referral_id"
                      type="text"
                      placeholder=" Enter referral code"
                      className="text-2xl font-bold rounded-xl py-3"
                    />
                    <p className="text-xs text-gray-400 w-full">
                      Please enter the Referral ID to proceed with
                      registeration. This is required to ensure that the payment
                      is correctly attributed to the right marketer. If you do
                      not have a Marketer ID, please contact your marketer for
                      assistance.
                    </p>
                  </div>
                )}
              </div>
              <div className="flex justify-center w-full gap-4 mt-4">
                <Button
                  label={`${
                    values.isReferred === "yes" ? "Verify" : "Proceed"
                  }`}
                  className="bg-secondary rounded-lg"
                  type="submit"
                  isLoading={isPending}
                  loadingText="Verifying..."
                  disabled={!isValid || isPending}
                />
              </div>
            </Form>
          )}
        </Formik> */}
        <div className="md:w-1/2">
          <img src="/images/welcome.svg" className="w-full h-full" />
        </div>
        <div className="md:w-1/2 space-y-3 text-gray-600">
          <div className="">
            This platform is for those who are married, who wish to get married,
            who wish to stay married, and who wish to enjoy their marriages to
            the full.
          </div>
          <Button
            label="Proceed"
            className="bg-secondary rounded-lg"
            rightIcon={<ArrowRight />}
            onClick={handleProceed}
          />
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
