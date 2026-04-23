import {
  Bell,
  ChevronLeft,
  MessageCircle,
  Settings,
  UserCircle,
} from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ItemMessagePlaceholder from "../../components/general_dating/ItemMessagePaceholder";
// import ChatArea from "../../components/general_dating/ChatArea";
import ChatArea from "../../components/general_dating/ChatArea2";
import { useStartCounsellingSession } from "../../hooks/mutattions/useMessaging";
import { useGetUserByID } from "../../hooks/query/useGetAllUsers";
import {
  useGetCoonversations,
  useGetMessages,
} from "../../hooks/query/useMessaging";

const CounselingPage: React.FC = () => {
  const { mutate: startChat, isPending: isStartingChat } =
    useStartCounsellingSession();
  const { data: conversationData } = useGetCoonversations();
  const counsellor = conversationData?.conversations.find(
    (item) => item.receiver?.id === 121
  );
  const [counselID, setcounselID] = useState<string>(
    counsellor?.conversation || ""
  );
  const [receiver, setReceiver] = useState<number>(121);
  const { data: userData } = useGetUserByID(receiver || "");
  const user = userData?.user_profile;
  const { data, isLoading } = useGetMessages(counselID || "");
  const navigate = useNavigate();
  const handleStartCounceling = () => {
    startChat(undefined, {
      onSuccess(data) {
        setcounselID(data.chatid);
        setReceiver(data.admin.id);
      },
    });
  };
  return (
    <div className="">
      <div className="bg-white rounded-2xl p-5 my-2 md:my-5 w-[95%] md:w-full mx-auto flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <div
            onClick={() => navigate(-1)}
            className="rounded-full cursor-pointer p-2 flex justify-center items-center hover:bg-gray-200"
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
            <div className="text-left capitalize text-lg font-bold line-clamp-1">
              Counselling Session
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
        {counselID ? (
          <ChatArea
            receiver={Number(receiver)}
            messages={data?.messages || []}
            isLoading={isLoading || isStartingChat}
          />
        ) : (
          <ItemMessagePlaceholder
            icon={<MessageCircle />}
            title="Start Counselling with Admin"
            message="You don't have any messages at the moment. "
            isAction
            isLoading={isStartingChat}
            actionText="Start Counseling Session"
            action={handleStartCounceling}
          />
        )}
      </div>
    </div>
  );
};

export default CounselingPage;
