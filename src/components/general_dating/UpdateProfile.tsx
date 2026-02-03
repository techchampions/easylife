import { Form, Formik } from "formik";
import RadioGroup from "../form/RadioGroup";
import Button from "../global/Button";
import { useOnboarding } from "../../hooks/mutattions/useOnboarding";
import { useUserStore } from "../../zustand/user.state";
import InputField from "../form/InputField";
import DatePickerInput from "../form/DatePickerInput";
import { useModal } from "../../zustand/modal.state";
import ImageInput from "../form/ImageInput";
import { useState } from "react";

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
const maritalStatusOPtions = [
  {
    label: "married",
    value: "married",
  },
  {
    label: "single",
    value: "single",
  },
];
const UpdateProfile = () => {
  const { user } = useUserStore();
  const initialValues = {
    gender: user?.gender || "",
    first_name: user?.first_name || "",
    spouse_first_name: user?.spouse_first_name || "",
    last_name: user?.last_name || "",
    spouse_last_name: user?.spouse_last_name || "",
    phone: user?.single_user_phone || "",
    date_of_birth: user?.date_of_birth || "",
    spouse_date_of_birth: user?.spouse_date_of_birth || "",
    profile_picture: user?.profile_picture || null,
    spouse_profile_picture: user?.spouse_profile_picture || null,
    tribe: user?.race_or_tribe || "",
    spouse_tribe: user?.spouse_race_or_tribe || "",
    religion: user?.religion || "",
    spouse_religion: user?.spouse_religion || "",
    state: user?.state || "",
    country: user?.country || "",
    marital_status: user?.marital_status || "",
  };
  const { mutate, isPending } = useOnboarding();
  const modal = useModal();
  const tabs = ["user", "spouse"];
  const [tab, settab] = useState("user");
  return (
    <div className="w-md max-w-xs md:max-w-md max-h-[75vh] overflow-y-auto scrollbar-hide">
      <div className="relative grid grid-cols-2 gap-2 bg-gray-100 rounded-lg h-11.25 mb-5">
        <div
          className={`absolute w-[calc(50%-5px)] h-8.75 bg-white top-1.25 flex items-center justify-center z-10 shadow-sm rounded-md transition-all duration-200 ease-out ${
            tab === "user" ? "left-1.25" : "left-[calc(50%)]"
          }`}
        />
        {tabs.map((t, i) => (
          <div
            className={`w-full flex items-center justify-center text-center capitalize cursor-pointer relative z-40 ${
              tab === t ? "text-gray-700" : "text-gray-400"
            }`}
            key={i}
            onClick={() => settab(t)}
          >
            {t} profile
          </div>
        ))}
      </div>

      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          const payload = new FormData();
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          Object.entries(values).forEach(([key, value]: any) => {
            if (value === null || value === undefined || value === "") return;

            if (key === "profile_picture" || key === "spouse_profile_picture") {
              if (value instanceof File) {
                payload.append(key, value);
              }
            } else {
              payload.append(key, String(value));
            }
          });
          mutate(payload);
        }}
      >
        {() => (
          <Form className="space-y-8">
            {tab === "user" ? <UserForm /> : <SpouseForm />}
            <div className="grid grid-cols-3 gap-2">
              <Button
                label="Cancel"
                className="bg-red-800!"
                onClick={() => modal.close()}
              />

              <Button
                type="submit"
                label="Save changes"
                loadingText="Saving..."
                className="col-span-2"
                disabled={isPending}
                isLoading={isPending}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateProfile;

const UserForm = () => {
  return (
    <div className="space-y-4">
      <div className="">
        <ImageInput
          name="profile_picture"
          label="Profile Photo"
          infoText="Upload a clear photo of face"
          width={175}
          height={200}
          className="w-fit! mx-auto"
        />
      </div>
      <div className="space-y-0">
        <div className="">Full Name</div>
        <div className="grid md:grid-cols-2 gap-2">
          <InputField
            name="first_name"
            type="text"
            placeholder="First Name"
            className=""
          />
          <InputField
            name="last_name"
            type="text"
            placeholder="Last Name"
            className=""
          />
        </div>
      </div>{" "}
      <div className="space-y-0">
        <div className="">Date of birth</div>
        <DatePickerInput name="date_of_birth" placeholder={`DD-MM-YYYY`} />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-0">
          <div className="">State/Region</div>
          <InputField
            name="state"
            type="text"
            placeholder="State"
            className=""
          />
        </div>
        <div className="space-y-0">
          <div className="">Country</div>
          <InputField
            name="country"
            type="text"
            placeholder="Country"
            className=""
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-2">
        <div className="space-y-0">
          <label htmlFor="gender">Gender</label>
          <RadioGroup
            options={genderOPtions}
            name="gender"
            orientation="horizontal"
            optionClassName="min-w-[calc(50%-8px)] md:min-w-[calc(25%-8px)]"
          />
        </div>
        <div className="space-y-0">
          <label htmlFor="gender">Marital Status</label>
          <RadioGroup
            options={maritalStatusOPtions}
            name="marital_status"
            orientation="horizontal"
            optionClassName="min-w-[calc(50%-8px)] md:min-w-[calc(25%-8px)]"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-0">
          <div className="">Tribe/Race</div>
          <InputField
            name="tribe"
            type="text"
            placeholder="Tribe or Race"
            className=""
          />
        </div>
        <div className="space-y-0">
          <div className="">Religion</div>
          <InputField
            name="religion"
            type="text"
            placeholder="Religion"
            className=""
          />
        </div>
      </div>
    </div>
  );
};

const SpouseForm = () => {
  return (
    <div className="space-y-4">
      <div className="">
        <ImageInput
          name="spouse_profile_picture"
          label="Profile Photo"
          infoText="Upload a clear photo of face"
          width={175}
          height={200}
          className="w-fit! mx-auto"
        />
      </div>
      <div className="space-y-0">
        <div className="">Full Name</div>
        <div className="grid md:grid-cols-2 gap-2">
          <InputField
            name="spouse_first_name"
            type="text"
            placeholder="First Name"
            className=""
          />
          <InputField
            name="spouse_last_name"
            type="text"
            placeholder="Last Name"
            className=""
          />
        </div>
      </div>{" "}
      <div className="space-y-0">
        <div className="">Date of birth</div>
        <DatePickerInput
          name="spouse_date_of_birth"
          placeholder={`DD-MM-YYYY`}
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-0">
          <div className="">State/Region</div>
          <InputField
            name="state"
            type="text"
            placeholder="State"
            className=""
          />
        </div>
        <div className="space-y-0">
          <div className="">Country</div>
          <InputField
            name="country"
            type="text"
            placeholder="Country"
            className=""
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-0">
          <div className="">Tribe/Race</div>
          <InputField
            name="spouse_tribe"
            type="text"
            placeholder="Tribe or Race"
            className=""
          />
        </div>
        <div className="space-y-0">
          <div className="">Religion</div>
          <InputField
            name="spouse_religion"
            type="text"
            placeholder="Religion"
            className=""
          />
        </div>
      </div>
    </div>
  );
};
