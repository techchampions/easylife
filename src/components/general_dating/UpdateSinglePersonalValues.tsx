import { Form, Formik } from "formik";
import { Save, X } from "lucide-react";
import React from "react";
import * as Yup from "yup";
import { heightOptions, sizeOptions, YesNoOptions } from "../../const/data";
import { useOnboarding } from "../../hooks/mutattions/useOnboarding";
import { useModal } from "../../zustand/modal.state";
import { useUserStore } from "../../zustand/user.state";
import InputField from "../form/InputField";
import RadioGroup from "../form/RadioGroup";
import Button from "../global/Button";

const validationSchema = Yup.object().shape({
  occupation: Yup.string().required("required"),
  living_alone: Yup.string().required("required"),
  career_growth: Yup.string().required("required"),
});

const UpdateSinglePersonalValues: React.FC = () => {
  const { user } = useUserStore();
  const { close } = useModal();
  const { mutate, isPending } = useOnboarding();
  const initialValues = {
    occupation: user?.occupation || "",
    career_growth: user?.career_growth || "",
    living_alone: user?.living_alone || "",

    strenght: user?.single_user_strength || "",
    weakness: user?.single_user_weakness || "",

    single_user_type_of_spouse: user?.single_user_type_of_spouse || "",
    single_user_tolerance: user?.single_user_tolerance || "",

    why_get_married: user?.why_get_married || "",
    single_user_table_pack: user?.single_user_table_pack || "",

    genotype: user?.genotype || "",
    height: user?.height || "",
    size: user?.size || "",
    health_challenges: user?.health_challenges || "",
    diabilities: user?.disabilities || "",
  };
  const handleSubmit = (values: typeof initialValues) => {
    const payload = new FormData();
    Object.entries(values).forEach(([key, value]: [string, string]) => {
      if (value === null || value === undefined || value === "") return;
      payload.append(key, value);
    });
    mutate(payload);
  };
  return (
    <div className="flex flex-col w-md max-w-xs md:max-w-md max-h-[75vh] overflow-y-scroll scrollbar-hide">
      <div className="text-2xl font-bold flex flex-col">
        <div className=" ">Personal values</div>
      </div>
      <div className="flex flex-col justify-between mt-7">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnMount
          onSubmit={handleSubmit}
        >
          {({ isValid }) => {
            return (
              <Form className="flex flex-col gap-8 justify-between min-h-55">
                <div className="space-y-5">
                  {/* <div className="space-y-1">
                    <div className="">What is your genotype?</div>
                    <RadioGroup
                      options={genotypeOptions}
                      name="genotype"
                      optionClassName="min-w-[calc(33%-8px)]"
                      orientation="horizontal"
                    />
                  </div> */}
                  <div className="space-y-1">
                    <div className="">What is your height?</div>
                    <RadioGroup
                      options={heightOptions}
                      name="height"
                      orientation="horizontal"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="">What is your size?</div>
                    <RadioGroup
                      options={sizeOptions}
                      name="size"
                      optionClassName="min-w-[calc(33%-8px)]"
                      orientation="horizontal"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="">Health challenges</div>
                    <InputField
                      name="health_challenges"
                      type="textarea"
                      placeholder="Please indicate if any."
                      className=""
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="">Disabilities </div>
                    <InputField
                      name="disabilities"
                      type="textarea"
                      placeholder="Please indicate if any."
                      className=""
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="">What do you do for a living? </div>
                    <InputField
                      name="occupation"
                      type="text"
                      placeholder="Please indicate if any."
                      className="  "
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="">Are you living alone?</div>
                    <RadioGroup
                      options={YesNoOptions}
                      name="living_alone"
                      orientation="horizontal"
                      optionClassName="min-w-[calc(50%-8px)]"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="">
                      In your job, business, career, ministry, etc, where do you
                      see yourself in the next 5 years?
                    </div>
                    <InputField
                      name="career_growth"
                      type="textarea"
                      placeholder="Please indicate if any."
                      className="  "
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="">What are your virtues?</div>
                    <InputField
                      name="strenght"
                      type="textarea"
                      placeholder="Indicate your strenghts here"
                      className="  "
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="">What are your weakness?</div>
                    <InputField
                      name="weakness"
                      type="textarea"
                      placeholder="Indicate your weaknesses here"
                      className="  "
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="">
                      What will you never tolerate or endure from a spouse?
                    </div>
                    <InputField
                      name="single_user_tolerance"
                      type="textarea"
                      placeholder="Please inidicate here."
                      className=""
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="">
                      What kind of spouse are you looking for?
                    </div>
                    <InputField
                      name="single_user_type_of_spouse"
                      type="textarea"
                      placeholder="Please inidicate here."
                      className=""
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="">Why do you want to get married? </div>
                    <InputField
                      name="why_get_married"
                      type="textarea"
                      placeholder="Please indicate here."
                      className=""
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="">
                      What do you have that will interest this potential spouse
                      to marry you?{" "}
                    </div>
                    <InputField
                      name="single_user_table_pack"
                      type="textarea"
                      placeholder="Please indicate here."
                      className=""
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 w-full gap-4 mt-4">
                  <Button
                    label="Close"
                    icon={<X />}
                    className="bg-black!"
                    onClick={close}
                  />
                  <Button
                    label="Save"
                    className="bg-secondary col-span-2"
                    type="submit"
                    isLoading={isPending}
                    loadingText="Saving..."
                    disabled={!isValid || isPending}
                    rightIcon={<Save />}
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

export default UpdateSinglePersonalValues;
