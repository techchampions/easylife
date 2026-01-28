import React, { useEffect, useRef } from "react";
import { Formik, Form } from "formik";
import InputField from "../form/InputField";
import { Loader2, SendHorizontal } from "lucide-react";
import { useSendMessage } from "../../hooks/mutattions/useMessaging";
import { useUserStore } from "../../zustand/user.state";
import { formatTime, formatDate } from "../../utils/formatter"; // Make sure formatDate is available
import InlineLoader from "../loaders/InlineLoader";
import { useToast } from "../../zustand/toast.state";

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
  const { showToast } = useToast();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // Group messages by date
  const groupMessagesByDate = (messages: Message[]) => {
    const groups: { [date: string]: Message[] } = {};

    messages.forEach((message) => {
      // Extract just the date part (YYYY-MM-DD) from the ISO string
      const dateKey = message.created_at.split("T")[0];

      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }

      groups[dateKey].push(message);
    });

    return groups;
  };

  // Optional: Sort dates chronologically
  const getSortedDateGroups = (messages: Message[]) => {
    const grouped = groupMessagesByDate(messages);
    const sortedDates = Object.keys(grouped).sort();

    return sortedDates.map((date) => ({
      date,
      messages: grouped[date],
    }));
  };

  const renderMessageGroups = () => {
    if (messages.length === 0) {
      return (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-gray-500 text-center">
            <p>No messages yet</p>
            <p className="text-sm">Start a conversation!</p>
          </div>
        </div>
      );
    }

    const groupedMessages = getSortedDateGroups(messages);

    return (
      <div className="overflow-y-auto scrollbar-hide flex-1">
        {groupedMessages.map(({ date, messages: dateMessages }) => (
          <div key={date} className="mb-4">
            {/* Date Header */}
            <div className="flex justify-center my-4">
              <div className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
                {formatDate(date, true)} {/* Format the date nicely */}
              </div>
            </div>

            {/* Messages for this date */}
            {dateMessages.map((item) => (
              <div
                className={`flex w-full ${
                  item.user.id === user?.id && "justify-end"
                } mb-3`}
                key={item.id}
              >
                <div className={`flex flex-col max-w-2/3`}>
                  <div
                    className={`text-sm px-3 py-2 rounded-lg ${
                      item.user.id === user?.id
                        ? "bg-secondary text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    {item.message}
                  </div>
                  <div
                    className={`${
                      item.user.id === user?.id ? "text-right" : "text-left"
                    } text-xs text-gray-400 mt-0`}
                  >
                    {formatTime(item.updated_at)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    );
  };

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
          renderMessageGroups()
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
                  showToast("message sent!", "message");
                  resetForm();
                },
              });
            }}
          >
            <Form>
              <div className="flex items-center gap-4 bg-secondary/20 p-2 rounded-2xl flex-1">
                <InputField
                  name="message"
                  className="bg-white"
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
