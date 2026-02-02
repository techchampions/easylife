import { Form, Formik } from "formik";
import * as Yup from "yup";
import InputField from "../form/InputField";
import SelectField from "../form/SelectField";
import Button from "../global/Button";
import { SendHorizonal } from "lucide-react";

const ContactForm = () => {
  const initialValues = {
    fullname: "",
    email: "",
    subject: "",
    message: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().required("Required"),
    fullname: Yup.string().required("Required"),
    subject: Yup.string().required("Required"),
    message: Yup.string().required("Required"),
  });
  const subjectOptions = [
    { label: "General Inquiry", value: "G" },
    { label: "Subscriptions", value: "S" },
    { label: "Refunds", value: "R" },
    { label: "Account", value: "A" },
  ];
  return (
    <div className="p-4">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnMount
        onSubmit={() => {}}
      >
        {() => {
          return (
            <Form className="space-y-7">
              <div className="grid grid-cols-2 gap-3">
                <div className="">
                  <label htmlFor="fullname">Fullname</label>
                  <InputField name="fullname" placeholder="Enter fullname" />
                </div>

                <div className="">
                  <label htmlFor="email">Email</label>
                  <InputField name="email" placeholder="Enter email address" />
                </div>
                <div className="col-span-2">
                  <label htmlFor="subject">Subject</label>
                  <SelectField
                    options={subjectOptions}
                    name="subject"
                    placeholder="Select subject matter"
                  />
                </div>
                <div className="col-span-2">
                  <label htmlFor="message">Message</label>
                  <InputField
                    name="message"
                    placeholder="Enter message"
                    type="textarea"
                  />
                </div>
              </div>
              <Button
                label="Send message"
                rightIcon={<SendHorizonal size={18} />}
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ContactForm;
