import React from "react";
import { Link } from "react-router-dom";
import { formatTimeAgo } from "../../utils/formatter";
import { useUserStore } from "../../zustand/user.state";
interface Props {
  conversation: Conversation[];
}
const ConversationList: React.FC<Props> = ({ conversation }) => {
  const { user } = useUserStore();
  return (
    <div className="bg-white rounded-3xl ">
      <div className="divide-y divide-zinc-200">
        {conversation.map((item, index) => {
          const receiverID =
            item.receiver.id === user?.id ? item.sender.id : item.receiver.id;
          const profilePicture =
            item.receiver.id === user?.id
              ? item.sender.profile_picture
              : item.receiver.profile_picture;

          const fullName =
            item.receiver.id === user?.id
              ? `${item.sender.first_name} ${item.sender.last_name}`
              : `${item.receiver.first_name} ${item.receiver.last_name}`;
          return (
            <Link
              to={`/dashboard/messages/${receiverID}/chat/${item.conversation}`}
              className="flex items-center gap-2 py-2 w-full hover:bg-gray-50 text-gray-800 cursor-pointer"
              key={index}
            >
              <img
                src={
                  profilePicture ||
                  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e"
                }
                alt=""
                className="w-10 h-10 object-cover rounded-full"
              />
              <div className="flex-1">
                <div className="font-medium">
                  {fullName}
                  {/* {item.receiver.first_name} {item.receiver.last_name} */}
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
          );
        })}
      </div>
    </div>
  );
};

export default ConversationList;
