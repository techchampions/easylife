import { Form, Formik } from "formik";
import RadioGroup from "../form/RadioGroup";
import Button from "../global/Button";
import { useOnboarding } from "../../hooks/mutattions/useOnboarding";
import { useUserStore } from "../../zustand/user.state";
import InputField from "../form/InputField";
import DatePickerInput from "../form/DatePickerInput";
import { useModal } from "../../zustand/modal.state";
import ImageInput from "../form/ImageInput";

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
  const { user } = useUserStore();
  const initialValues = {
    gender: user?.gender || "",
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    phone: user?.single_user_phone || "",
    date_of_birth: user?.date_of_birth || "",
    profile_picture: user?.profile_picture || null,
    state: user?.state || "",
    country: user?.country || "",
    marital_status: user?.marital_status || "",
  };
  const { mutate, isPending } = useOnboarding();
  const modal = useModal();
  return (
    <div className="bg-white rounded-2xl w-md max-w-sm md:max-w-md max-h-[75vh] overflow-y-auto scrollbar-hide">
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          const payload = new FormData();
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          Object.entries(values).forEach(([key, value]: any) => {
            if (value === null || value === undefined || value === "") return;

            if (key === "profile_picture") {
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
          <Form className="space-y-4">
            <div className="">
              <ImageInput
                name="profile_picture"
                label="Profile Photo"
                infoText="Upload a clear photo of face"
                width={175}
                height={200}
                className="w-fit!"
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
              <DatePickerInput
                name="date_of_birth"
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
