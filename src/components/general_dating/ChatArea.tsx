import React from "react";
import { Formik, Form } from "formik";
// import * as Yup from "yup";
import InputField from "../form/InputField";
import { Loader2, SendHorizontal } from "lucide-react";
import { useSendMessage } from "../../hooks/mutattions/useMessaging";
import { useUserStore } from "../../zustand/user.state";
import { formatTime } from "../../utils/formatter";
import InlineLoader from "../loaders/InlineLoader";
interface Props {
  messages: Message[];
  receiver: number;
  isLoading: boolean;
}
const ChatArea: React.FC<Props> = ({ receiver, messages, isLoading }) => {
  const initialValues = {
    message: "",
  };
  const { mutate, isPending } = useSendMessage();
  const { user } = useUserStore();
  return (
    <div className="flex relative flex-col gap-2 md:gap-4 h-[72vh] md:h-[78vh] max-h-[72vh] md:max-h-[80vh] scrollbar-hide">
      <div className="flex-1 bg-white rounded-3xl max-h-full px-8 pt-8 pb-0 scrollbar-hide flex flex-col">
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="flex items-center gap-2 justify-center">
              <span className="animate-pulse text-gray-700">
                Getting messages
              </span>
              <InlineLoader className="w-5! h-5!" />
            </div>
          </div>
        ) : (
          <div className="overflow-y-auto scrollbar-hide flex-1">
            {messages.map((item, index) => (
              <div
                className={`flex w-full ${
                  item.user.id === user?.id && "justify-end"
                }`}
                key={index}
              >
                <div className={`flex flex-col max-w-2/3`}>
                  <div
                    className={`text-sm px-3 py-1 rounded-lg ${
                      item.user.id === user?.id
                        ? "bg-secondary text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    {item.message}
                  </div>
                  <div
                    className={`${
                      item.user.id === user?.id
                        ? "text-right mr-2"
                        : "text-left ml-2"
                    } text-xs text-gray-400`}
                  >
                    {formatTime(item.updated_at)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="rounded-3xl w-full py-2">
          <Formik
            initialValues={initialValues}
            onSubmit={(values, { resetForm }) => {
              const payload = {
                receiver: receiver,
                message: values.message,
              };

              mutate(payload, {
                onSuccess() {
                  resetForm();
                },
              });
            }}
          >
            <Form>
              <div className="flex items-center gap-4 bg-secondary/20 p-2 rounded-2xl flex-1">
                <InputField
                  name="message"
                  className="bg-white "
                  placeholder="Enter your message..."
                />
                <button
                  type={isPending ? "button" : "submit"}
                  disabled={isPending || isLoading}
                  className="flex items-center cursor-pointer justify-center bg-secondary/50 hover:bg-secondary text-white rounded-full p-2 w-fit h-fit"
                >
                  {isPending || isLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <SendHorizontal />
                  )}
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
