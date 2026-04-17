import { Form, Formik } from "formik";
import { Save, X } from "lucide-react";
import React, { useState } from "react";
import * as Yup from "yup";
import { YesNoOptions } from "../../const/data";
import { useOnboarding } from "../../hooks/mutattions/useOnboarding";
import { useUserStore } from "../../zustand/user.state";
import InputField from "../form/InputField";
import RadioGroup from "../form/RadioGroup";
import Button from "../global/Button";
import HusbandForm from "./HusbandForm";
import WifeForm from "./WifeForm";

const validationSchema = Yup.object().shape({
  previously_married: Yup.string().required("required"),
  number_of_children: Yup.string().when("previously_married", {
    is: "yes",
    then: (schema) => schema.required("required"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

const UpdateCouplesValues: React.FC = () => {
  const { user } = useUserStore();
  const { mutate, isPending } = useOnboarding();

  const initialValues = {
    previously_married: user?.previously_married || "",
    number_of_children: user?.number_of_children || "",
    marriageLength: user?.marriage_length || "",

    about_wife_positive: user?.about_wife_positive || "",
    about_wife_negative: user?.about_wife_negative || "",
    changes_to_wife: user?.changes_to_wife || "",
    other_issues: user?.other_issues || "",

    about_husband_positive: user?.about_husband_positive || "",
    about_husband_negative: user?.about_husband_negative || "",
    changes_to_husband: user?.changes_to_husband || "",
  };
  const tabs = ["male", "female"];
  const [tab, settab] = useState(user?.gender);

  const handleProceed = async (values: typeof initialValues) => {
    const payload = new FormData();
    Object.entries(values).forEach(
      ([key, value]: [string, string | number]) => {
        if (value === null || value === undefined || value === "") return;
        payload.append(key, String(value));
      }
    );
    mutate(payload);
  };
  return (
    <div className="flex flex-col w-md max-w-xs md:max-w-md max-h-[75vh] overflow-y-scroll scrollbar-hide">
      <div className="flex flex-col mb-5 ">
        <div className="text-2xl font-bold">Update Couple's Assessment</div>
        <hr className="w-4/5 text-gray-300" />
      </div>
      <div className="flex flex-col justify-between mt-0">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnMount
          onSubmit={handleProceed}
        >
          {({ isValid, values }) => (
            <Form className="flex flex-col justify-between">
              <div className="space-y-8 my-5">
                <div className="space-y-1">
                  <div className="">Have you been previously married?</div>
                  <RadioGroup
                    options={YesNoOptions}
                    name="previously_married"
                    orientation="horizontal"
                    optionClassName="min-w-[calc(50%-8px)]"
                  />
                </div>
                {values.previously_married === "yes" && (
                  <div className="space-y-1">
                    <div className="">
                      Number of children in previous marriage
                    </div>
                    <InputField
                      name="number_of_children"
                      placeholder="Number of children."
                      className=""
                    />
                  </div>
                )}
                <div className="space-y-1">
                  <div className="">How long have you been married?</div>
                  <InputField
                    name="marriageLength"
                    type="text"
                    placeholder="Number of years married"
                    className=""
                  />
                </div>

                <div className="space-y-1">
                  <div className="">Number of children in current marriage</div>
                  <InputField
                    name="number_of_children"
                    placeholder="Number of children."
                    className=""
                  />
                </div>
                <div className="sticky top-0 z-40 p-0 bg-white">
                  <div className="relative grid grid-cols-2 gap-2 bg-gray-100 rounded-lg h-11.25 mb-5">
                    <div
                      className={`absolute w-[calc(50%-5px)] h-8.75 bg-white top-1.25 flex items-center justify-center z-10 shadow-sm rounded-md transition-all duration-200 ease-out ${
                        tab === "male" ? "left-1.25" : "left-[calc(50%)]"
                      }`}
                    />
                    {tabs.map((t, i) => (
                      <div
                        className={`w-full flex items-center font-bold justify-center text-center capitalize cursor-pointer relative z-40 ${
                          tab === t ? "text-gray-700" : "text-gray-400"
                        }`}
                        key={i}
                        onClick={() => settab(t)}
                      >
                        {t == "male" ? "Husband" : "Wife"}
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`${tab == "male" ? "block" : "hidden"}`}>
                  <HusbandForm />
                </div>
                <div className={`${tab == "female" ? "block" : "hidden"}`}>
                  <WifeForm />
                </div>
              </div>
              <div className="grid grid-cols-2 w-full gap-4 mt-4">
                <Button
                  label="Cancel"
                  icon={<X />}
                  className="bg-black! rounded-lg"
                  disabled={isPending}
                />
                <Button
                  label="Save"
                  icon={<Save />}
                  className="bg-secondary rounded-lg"
                  type="submit"
                  isLoading={isPending}
                  disabled={!isValid || isPending}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UpdateCouplesValues;
