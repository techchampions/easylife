import React from "react";
import { Formik, Form } from "formik";
// import * as Yup from "yup";
import InputField from "../form/InputField";
import { SendHorizontal } from "lucide-react";

const ChatArea: React.FC = () => {
  const initialValues = {
    message: "",
  };
  const messages = [
    {
      is_sender: false,
      msg: "Hi",
      time: "15:30",
    },
    {
      is_sender: true,
      msg: "Hi... how are you",
      time: "15:30",
    },
    {
      is_sender: false,
      msg: "am good, and you?",
      time: "15:30",
    },
    {
      is_sender: true,
      msg: "i'm good thanks",
      time: "15:30",
    },
    {
      is_sender: false,
      msg: "Hi",
      time: "15:30",
    },
    {
      is_sender: false,
      msg: "Hi",
      time: "15:30",
    },
  ];
  return (
    <div className="flex flex-col gap-2 md:gap-4 h-[72vh] md:h-[77vh] max-h-[72vh] md:max-h-[75vh]">
      <div className="flex-1 bg-white p-8 rounded-3xl">
        {messages.map((item, index) => (
          <div
            className={`flex w-full ${item.is_sender && "justify-end"}`}
            key={index}
          >
            <div
              className={`flex flex-col rounded-lg px-2 py-1 ${
                item.is_sender ? "bg-secondary/20" : "bg-gray-50"
              }`}
            >
              <div className="">{item.msg}</div>
              <div
                className={`${
                  item.is_sender ? "text-right" : "text-left"
                } text-xs text-gray-500`}
              >
                {item.time}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-3xl p-4">
        <Formik initialValues={initialValues} onSubmit={() => {}}>
          <Form>
            <div className="flex items-center gap-4 bg-secondary/20 p-2 rounded-2xl flex-1">
              <InputField
                name="message"
                className="bg-white "
                placeholder="Enter your message..."
              />
              <button
                type="submit"
                className="flex items-center cursor-pointer justify-center bg-secondary/50 hover:bg-secondary text-white rounded-full p-2 w-fit h-fit"
              >
                <SendHorizontal />
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default ChatArea;
