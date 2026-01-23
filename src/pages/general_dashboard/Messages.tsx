import React from "react";
import Header from "../../components/global/Header";
import ItemMessagePlaceholder from "../../components/general_dating/ItemMessagePaceholder";
import { MessageCircle } from "lucide-react";
import ConversationList from "../../components/general_dating/ConversationList";

const Messages: React.FC = () => {
  return (
    <div>
      <Header name="Messages" />
      <div className="">
        <ConversationList />
        <ItemMessagePlaceholder
          icon={<MessageCircle />}
          title="No messages yet"
          message="You don't have any messages at the moment. "
        />
      </div>
    </div>
  );
};

export default Messages;
