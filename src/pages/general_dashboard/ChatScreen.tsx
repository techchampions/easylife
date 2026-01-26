import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ItemMessagePlaceholder from "../../components/general_dating/ItemMessagePaceholder";
import {
  Bell,
  ChevronLeft,
  MessageCircle,
  Settings,
  UserCircle,
} from "lucide-react";
import ChatArea from "../../components/general_dating/ChatArea";
import { useGetMessages } from "../../hooks/query/useMessaging";
import { useGetUserByID } from "../../hooks/query/useGetAllUsers";

const ChatScreen: React.FC = () => {
  const params = useParams();
  const conversation_id = params.conversation_id;
  const receiver = params.receiver;
  const { data: userData } = useGetUserByID(receiver || "");
  const user = userData?.user_profile;
  useGetMessages(conversation_id || "");
  const navigate = useNavigate();
  return (
    <div className="">
      <div className="bg-white rounded-2xl p-5 my-2 md:my-5 w-[95%] md:w-full mx-auto flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <div
            onClick={() => navigate(-1)}
            className="rounded-full p-2 flex justify-center items-center hover:bg-gray-200"
          >
            <ChevronLeft />
          </div>
          <div className="flex items-center gap-2">
            <img
              src={
                user?.profile_picture ||
                "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e"
              }
              alt=""
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="text-left capitalize text-lg font-bold">
              {user?.first_name} {user?.last_name}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <Link to={`/dashboard/notifications`}>
            <Bell />
          </Link>
          <Link to={`/dashboard/settings`}>
            <Settings />
          </Link>
          <Link to={`/dashboard/profile`}>
            <UserCircle />
          </Link>
        </div>
      </div>
      <div className="px-4 md:px-0">
        {conversation_id ? (
          <ChatArea receiver={Number(receiver)} messages={[]} />
        ) : (
          <ItemMessagePlaceholder
            icon={<MessageCircle />}
            title="No messages yet"
            message="You don't have any messages at the moment. "
          />
        )}
      </div>
    </div>
  );
};

export default ChatScreen;
