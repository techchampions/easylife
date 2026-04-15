import { Form, Formik } from "formik";
import { Save } from "lucide-react";
import * as Yup from "yup";
import { useOnboarding } from "../../hooks/mutattions/useOnboarding";
import { useUserStore } from "../../zustand/user.state";
import MultiImageInput from "../form/MultipleImageInput";
import Button from "../global/Button";

const PhotoGallery = () => {
  const { user } = useUserStore();
  const photos = user?.photos || [];
  const validationSchema = Yup.object().shape({
    photos: Yup.mixed().required("required"),
  });
  const initialValues = { photos: photos };
  const { mutate, isPending } = useOnboarding();

  return (
    <div className="p-8 mb-10 bg-white rounded-2xl mt-4">
      {/* PHOTO GALLERY */}
      <div className="">
        <Formik
          initialValues={initialValues}
          validateOnMount
          validationSchema={validationSchema}
          onSubmit={(values) => {
            const payload = new FormData();
            if (values.photos) {
              values.photos.forEach((photo) => {
                payload.append("photos", photo);
              });
            }
            mutate(payload);
          }}
        >
          {({ isValid }) => {
            return (
              <Form>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Gallery
                  </h2>
                  <Button
                    icon={<Save size={15} />}
                    type="submit"
                    label="Save photos"
                    className="w-fit! px-4 text-sm"
                    disabled={isPending || !isValid}
                    isLoading={isPending}
                  />
                </div>
                <MultiImageInput name="photos" />
              </Form>
            );
          }}
        </Formik>

        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide w-full">
          {photos.map((photo, i) => (
            <div
              key={i}
              className="w-40 h-40 shrink-0 overflow-hidden rounded-md"
            >
              <img src={photo} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotoGallery;
