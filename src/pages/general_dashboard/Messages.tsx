import { MessageCircle } from "lucide-react";
import React from "react";
import ConversationList from "../../components/general_dating/ConversationList";
import ItemMessagePlaceholder from "../../components/general_dating/ItemMessagePaceholder";
import Header from "../../components/global/Header";
import { ConversationListSkeleton } from "../../components/loaders/ConversationSkeleton";
import { useGetCoonversations } from "../../hooks/query/useMessaging";

const Messages: React.FC = () => {
  const { data, isLoading, isError } = useGetCoonversations();
  if (isError) {
    return (
      <ItemMessagePlaceholder
        icon={<MessageCircle />}
        title="No messages yet"
        message="You don't have any messages at the moment. "
      />
    );
  }
  return (
    <div>
      <Header name="Messages" />
      {isLoading ? (
        <ConversationListSkeleton />
      ) : (
        <div className="p-3 md:p-0">
          {data?.conversations && data.conversations.length > 0 ? (
            <div className="min-h-[78vh] bg-white p-8 rounded-3xl">
              <ConversationList conversation={data?.conversations} />
            </div>
          ) : (
            <ItemMessagePlaceholder
              icon={<MessageCircle />}
              title="No messages yet"
              message="You don't have any messages at the moment. "
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Messages;
