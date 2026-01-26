import React from "react";
import { Link } from "react-router-dom";
import { formatTimeAgo } from "../../utils/formatter";
interface Props {
  conversation: Conversation[];
}
const ConversationList: React.FC<Props> = ({ conversation }) => {
  return (
    <div className="bg-white rounded-3xl ">
      <div className="divide-y divide-zinc-200">
        {conversation.map((item, index) => (
          <Link
            to={`/dashboard/messages/${item.receiver.id}/chat/${item.conversation}`}
            className="flex items-center gap-2 py-2 w-full hover:bg-gray-50 text-gray-800 cursor-pointer"
            key={index}
          >
            <img
              src={
                item.receiver.profile_picture ||
                "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e"
              }
              alt=""
              className="w-10 h-10 object-cover rounded-full"
            />
            <div className="flex-1">
              <div className="font-medium">
                {item.receiver.first_name} {item.receiver.last_name}
              </div>
              <div className="flex items-center justify-between w-full">
                <div className="text-sm text-zinc-500 flex-1">
                  {item.last_message || "Start chatting"}
                </div>
                <div className="text-sm text-zinc-500 text-right">
                  {formatTimeAgo(item.updated_at)}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ConversationList;
