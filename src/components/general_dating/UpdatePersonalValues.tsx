import { Formik } from "formik";
import { Save } from "lucide-react";
import { heightOptions, sizeOptions, YesNoOptions } from "../../const/data";
import { useOnboarding } from "../../hooks/mutattions/useOnboarding";
import { useUserStore } from "../../zustand/user.state";
import InputField from "../form/InputField";
import RadioGroup from "../form/RadioGroup";
import Button from "../global/Button";

const UpdatePersonalValues = () => {
  const { user } = useUserStore();
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
    <Formik
      initialValues={initialValues}
      validateOnMount
      onSubmit={handleSubmit}
    >
      <div className="p-4 md:p-8 bg-white rounded-2xl mt-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl flex-1 font-semibold text-gray-800">
            Personal Values
          </h2>
          <Button
            label="Save changes"
            loadingText="Saving..."
            icon={<Save size={15} />}
            type="submit"
            isLoading={isPending}
            disabled={isPending}
            className="w-fit! px-5 text-sm"
          />
        </div>
        <div className="space-y-5 grid md:grid-cols-2 gap-x-3">
          <RadioGroup
            label="Body size"
            options={sizeOptions}
            name="size"
            optionClassName="min-w-[calc(33%-8px)]"
            orientation="horizontal"
          />
          <RadioGroup
            label="My height"
            options={heightOptions}
            name="height"
            optionClassName="min-w-[calc(30%-8px)]"
            orientation="horizontal"
          />

          <InputField
            label="My Strengths:"
            name="strenght"
            type="textarea"
            className=""
            rows={2}
          />
          <InputField
            label="My Weaknesses"
            name="weakness"
            type="textarea"
            className=""
            rows={2}
          />
          <InputField
            label="Health chanllenges:"
            name="health_challenges"
            type="textarea"
            className=""
            rows={2}
          />
          <InputField
            label="Disabilities"
            name="disabilities"
            type="textarea"
            className=""
            rows={2}
          />
          <InputField
            label="What i dislikes in a partner:"
            name="single_user_tolerance"
            type="textarea"
            className=""
            rows={2}
          />
          <InputField
            label="My type of partner:"
            name="single_user_type_of_spouse"
            type="textarea"
            className=""
            rows={2}
          />
          <InputField
            label="What i bring to the table"
            name="single_user_table_pack"
            type="textarea"
            className=""
            rows={2}
          />
          <InputField
            label="Why i want to get married:"
            name="why_get_married"
            type="textarea"
            className=""
            rows={2}
          />
          <RadioGroup
            label="Living alone"
            options={YesNoOptions}
            name="living_alone"
            optionClassName="min-w-[calc(50%-8px)]"
            orientation="horizontal"
          />
        </div>
      </div>
    </Formik>
  );
};

export default UpdatePersonalValues;
