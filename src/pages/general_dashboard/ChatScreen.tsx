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
import { useUserStore } from "../../zustand/user.state";
import ChatArea from "../../components/general_dating/ChatArea";

const ChatScreen: React.FC = () => {
  const { user } = useUserStore();
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();
  return (
    <div className="">
      <div className="bg-white rounded-2xl p-5 my-5 w-[95%] md:w-full mx-auto flex items-center justify-between">
        <div className="w-1/3 flex gap-2 items-center">
          <div
            onClick={() => navigate(-1)}
            className="rounded-full p-2 flex justify-center items-center hover:bg-gray-200"
          >
            <ChevronLeft />
          </div>
          <div className="flex items-center gap-1">
            <img
              src="/images/logo.png"
              alt=""
              className="w-7 h-7 rounded-full bg-amber-400"
            />
            <div className="text-left capitalize text-lg font-bold">Alfred</div>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <Link
            to={`/${
              user?.marital_status === "married" ? "couples" : "singles"
            }/notifications`}
          >
            <Bell />
          </Link>
          <Link
            to={`/${
              user?.marital_status === "married" ? "couples" : "singles"
            }/settings`}
          >
            <Settings />
          </Link>
          <Link
            to={`/${
              user?.marital_status === "married" ? "couples" : "singles"
            }/profile`}
          >
            <UserCircle />
          </Link>
        </div>
      </div>
      <div className="px-4 md:px-0">
        {id ? (
          <ChatArea />
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
