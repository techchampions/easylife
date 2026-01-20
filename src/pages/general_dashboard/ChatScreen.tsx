import React from "react";
import Header from "../../components/global/Header";
import { useParams } from "react-router-dom";
import ItemMessagePlaceholder from "../../components/general_dating/ItemMessagePaceholder";
import { MessageCircle } from "lucide-react";

const ChatScreen: React.FC = () => {
  const params = useParams();
  const id = params.id;
  return (
    <div>
      <Header name={id || ""} />
      <div className="">
        <ItemMessagePlaceholder
          icon={<MessageCircle />}
          title="No messages yet"
          message="You don't have any messages at the moment. "
        />
      </div>
    </div>
  );
};

export default ChatScreen;
