import { Form, Formik } from "formik";
import { useState } from "react";
import { countries } from "../../const/data";
import { useOnboarding } from "../../hooks/mutattions/useOnboarding";
import { useModal } from "../../zustand/modal.state";
import { useUserStore } from "../../zustand/user.state";
import DatePickerInput from "../form/DatePickerInput";
import ImageInput from "../form/ImageInput";
import ImageInputAndCrop from "../form/ImageInputAndCrop";
import InputField from "../form/InputField";
import SelectField from "../form/SelectField";
import Button from "../global/Button";

// const genderOPtions = [
//   {
//     label: "male",
//     value: "male",
//   },
//   {
//     label: "female",
//     value: "female",
//   },
// ];
// const maritalStatusOPtions = [
//   {
//     label: "married",
//     value: "married",
//   },
//   {
//     label: "single",
//     value: "single",
//   },
// ];
const UpdateProfile = () => {
  const { user } = useUserStore();
  const initialValues = {
    gender: user?.gender || "",
    first_name: user?.first_name || "",
    spouse_first_name: user?.spouse_first_name || "",
    last_name: user?.last_name || "",
    spouse_last_name: user?.spouse_last_name || "",
    spouse_other_names: user?.spouse_other_names || "",
    other_names: user?.other_names || "",
    phone: user?.single_user_phone || "",
    spouse_phone_number: user?.spouse_phone_number || "",
    date_of_birth: user?.date_of_birth || "",
    place_of_birth: user?.place_of_birth || "",
    spouse_place_of_birth: user?.spouse_place_of_birth || "",
    spouse_date_of_birth: user?.spouse_date_of_birth || "",
    profile_picture: user?.profile_picture || null,
    spouse_profile_picture: user?.spouse_profile_picture || null,
    tribe: user?.race_or_tribe || "",
    language: user?.language || "",
    spouse_language: user?.spouse_language || "",
    spouse_tribe: user?.spouse_race_or_tribe || "",
    religion: user?.religion || "",
    spouse_religion: user?.spouse_religion || "",
    state: user?.state || "",
    country: user?.country || "",
    address: user?.address || "",
    spouse_state: user?.spouse_state || "",
    spouse_country: user?.spouse_country || "",
    spouse_address: user?.spouse_address || "",
    marital_status: user?.marital_status || "",
    denomination: user?.denomination || "",
    occupation: user?.occupation || "",
    spouse_denomination: user?.spouse_denomination || "",
    spouse_occupation: user?.spouse_occupation || "",
    short_bio: user?.short_bio || "",
  };
  const { mutate, isPending } = useOnboarding();
  const modal = useModal();
  const tabs = ["user", "spouse"];
  const [tab, settab] = useState("user");
  return (
    <div className="w-md max-w-xs md:max-w-md max-h-[75vh] overflow-y-auto scrollbar-hide">
      {user?.marital_status === "married" ? (
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
      ) : (
        <div className="font-bold text-lg mb-5 text-center bg-gray-100 p-1 rounded-lg">
          <div className="bg-white rounded-md p-1">Update your Profile</div>
        </div>
      )}

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
        <ImageInputAndCrop
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
            name="last_name"
            type="text"
            placeholder="Surname"
            className=""
          />
          <InputField
            name="first_name"
            type="text"
            placeholder="First Name"
            className=""
          />
          <div className="md:col-span-2">
            <InputField
              name="other_names"
              type="text"
              placeholder="Other Names"
              className=""
            />
          </div>
        </div>
      </div>{" "}
      <div className="grid md:grid-cols-2 gap-2">
        <div className="space-y-0">
          <div className="">Date of birth</div>
          <DatePickerInput name="date_of_birth" placeholder={`DD-MM-YYYY`} />
        </div>
        <div className="space-y-0">
          <div className="">Place of birth</div>
          <InputField name="place_of_birth" placeholder="Place of birth" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-0">
          <div className="">Phone Number</div>
          <InputField
            name="phone"
            type="text"
            placeholder="Phone Number"
            className=""
          />
        </div>
        <div className="space-y-0">
          <div className="">Language</div>
          <InputField
            name="language"
            type="text"
            placeholder='E.g.("English, Yoruba, Igbo")'
            className=""
          />
        </div>
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
          <SelectField
            options={countries}
            name="country"
            placeholder="Country"
            className=""
          />
        </div>
        <div className="space-y-0 col-span-2">
          <div className="">Address</div>
          <InputField
            name="address"
            type="text"
            placeholder="Address"
            className=""
          />
        </div>
      </div>
      {/* <div className="grid md:grid-cols-2 gap-2">
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
      </div> */}
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
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-0">
          <div className="">Denomination</div>
          <InputField
            name="denomination"
            type="text"
            placeholder="Denomination"
            className=""
          />
        </div>
        <div className="space-y-0">
          <div className="">Occupation</div>
          <InputField
            name="occupation"
            type="text"
            placeholder="Occupation"
            className=""
          />
        </div>
      </div>
      <div className="space-y-0">
        <div className="">Short bio </div>
        <InputField
          name="short_bio"
          type="textarea"
          placeholder="Please enter a short bio here."
          className=""
        />
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
            name="spouse_last_name"
            type="text"
            placeholder="Surname"
            className=""
          />
          <InputField
            name="spouse_first_name"
            type="text"
            placeholder="First Name"
            className=""
          />
          <div className="md:col-span-2">
            <InputField
              name="spouse_other_names"
              type="text"
              placeholder="Other Names"
              className=""
            />
          </div>
        </div>
      </div>{" "}
      <div className="grid md:grid-cols-2 gap-2">
        <div className="space-y-0">
          <div className="">Date of birth</div>
          <DatePickerInput
            name="spouse_date_of_birth"
            placeholder={`DD-MM-YYYY`}
          />
        </div>
        <div className="space-y-0">
          <div className="">Place of birth</div>
          <InputField
            name="spouse_place_of_birth"
            placeholder="Place of birth"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-0">
          <div className="">Phone Number</div>
          <InputField
            name="spouse_phone_number"
            type="text"
            placeholder="Phone Number"
            className=""
          />
        </div>
        <div className="space-y-0">
          <div className="">Language</div>
          <InputField
            name="spouse_language"
            type="text"
            placeholder='E.g.("English, Yoruba, Igbo")'
            className=""
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-0">
          <div className="">State/Region</div>
          <InputField
            name="spouse_state"
            type="text"
            placeholder="State"
            className=""
          />
        </div>
        <div className="space-y-0">
          <div className="">Country</div>
          <SelectField
            options={countries}
            name="spouse_country"
            placeholder="Country"
            className=""
          />
        </div>
        <div className="space-y-0 col-span-2">
          <div className="">Address</div>
          <InputField
            name="spouse_address"
            type="text"
            placeholder="Address"
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
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-0">
          <div className="">Denomination</div>
          <InputField
            name="spouse_denomination"
            type="text"
            placeholder="Denomination"
            className=""
          />
        </div>
        <div className="space-y-0">
          <div className="">Occupation</div>
          <InputField
            name="spouse_occupation"
            type="text"
            placeholder="Occupation"
            className=""
          />
        </div>
      </div>
    </div>
  );
};
