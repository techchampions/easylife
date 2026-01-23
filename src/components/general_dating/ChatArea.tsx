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
      msg: " sfkfjskf skfjskfj sfkjskfjsfnj sjf skjf fskjf skjfj sjksfkjfk sfjkjfksf ksfjkjsf sfjksjfk.",
      time: "15:30",
    },
    {
      is_sender: false,
      msg: "ffdkj dgd gd gdg d gd g dgdg",
      time: "15:30",
    },
    {
      is_sender: true,
      msg: "ffdkj dgd gd gdg d gd g dgdg",
      time: "15:30",
    },
    {
      is_sender: false,
      msg: "ffdkj dgd gd gdg d gd g dgdg",
      time: "15:30",
    },
    {
      is_sender: true,
      msg: "ffdkj dgd gd gdg d gd g dgdg",
      time: "15:30",
    },
    {
      is_sender: false,
      msg: "ffdkj dgd gd gdg d gd g dgdg",
      time: "15:30",
    },
    {
      is_sender: false,
      msg: "ffdkj dgd gd gdg d gd g dgdg",
      time: "15:30",
    },
  ];
  return (
    <div className="flex flex-col gap-2 md:gap-4 h-[72vh] md:h-[78vh] max-h-[72vh] md:max-h-[80vh] scrollbar-hide">
      <div className="flex-1 bg-white rounded-3xl max-h-[80%] p-8 scrollbar-hide">
        <div className="h-full overflow-y-auto scrollbar-hide">
          {messages.map((item, index) => (
            <div
              className={`flex w-full ${item.is_sender && "justify-end"}`}
              key={index}
            >
              <div className={`flex flex-col max-w-2/3`}>
                <div
                  className={`text-sm px-3 py-1 rounded-lg ${
                    item.is_sender ? "bg-secondary text-white" : "bg-gray-100"
                  }`}
                >
                  {item.msg}
                </div>
                <div
                  className={`${
                    item.is_sender ? "text-right" : "text-left"
                  } text-xs text-gray-400`}
                >
                  {item.time}
                </div>
              </div>
            </div>
          ))}
        </div>
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
