import { Mail, MapPin, MessageCircle, UserCircle } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useGetCoonversations } from "../../hooks/query/useMessaging";
import { useUserStore } from "../../zustand/user.state";
import { ConversationListSkeleton } from "../loaders/ConversationSkeleton";
import ConversationList from "./ConversationList";
import ItemMessagePlaceholder from "./ItemMessagePaceholder";

const RightSideBar: React.FC = () => {
  const { user } = useUserStore();
  const { data, isLoading } = useGetCoonversations();

  return (
    <div className="space-y-4 p-5 hidden md:flex flex-col w-full">
      <div className="bg-white rounded-2xl p-5 w-full">
        <div className="flex items-start gap-2">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            {user?.profile_picture ? (
              <img
                src={user.profile_picture}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : (
              <UserCircle className="w-full h-full" />
            )}
          </div>

          {/* 👇 THIS is the key */}
          <div className="flex-1 min-w-0">
            <div className="font-medium">
              {user?.first_name} {user?.last_name}
            </div>

            <div className="text-sm text-zinc-500 flex items-center gap-1">
              <Mail size={15} className="shrink-0" />

              {/* 👇 truncate works now */}
              <div className="truncate">{user?.email}</div>
            </div>

            <div className="text-sm text-zinc-500 flex items-center gap-1">
              <MapPin size={15} className="shrink-0" />
              <span className="truncate">
                {user?.state}, {user?.country}
              </span>
            </div>

            <Link
              to="/dashboard/profile"
              className="block text-right text-sm cursor-pointer hover:text-shadow-md"
            >
              view profile
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl p-5 space-y-5 flex-1">
        <div className="text-xl font-bold">Messages</div>
        {isLoading ? (
          <ConversationListSkeleton />
        ) : data?.conversations && data.conversations.length > 0 ? (
          <ConversationList conversation={data?.conversations} />
        ) : (
          <ItemMessagePlaceholder
            icon={<MessageCircle />}
            title="No messages yet"
            message="You don't have any messages at the moment. "
            size="small"
          />
        )}
        {/* <div className="space-y-2 divide-y divide-zinc-200">
          {messages.map((item, index) => (
            <div
              className="flex items-center gap-2 w-full text-gray-800"
              key={index}
            >
              <UserCircle />
              <div className="flex-1">
                <div className="font-medium">{item.user}</div>
                <div className="flex items-center justify-between w-full">
                  <div className="text-sm text-zinc-500 flex-1">
                    {item.message}
                  </div>
                  <div className="text-sm text-zinc-500 text-right">
                    16:59 PM
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default RightSideBar;
