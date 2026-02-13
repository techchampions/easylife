import React from "react";
import Header from "../../components/global/Header";
import ItemMessagePlaceholder from "../../components/general_dating/ItemMessagePaceholder";
import { MessageCircle } from "lucide-react";
import ConversationList from "../../components/general_dating/ConversationList";
import { useGetCoonversations } from "../../hooks/query/useMessaging";
import { ConversationListSkeleton } from "../../components/loaders/ConversationSkeleton";

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
          {data?.conversations ? (
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
