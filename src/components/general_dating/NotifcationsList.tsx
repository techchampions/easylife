import React from "react";
import { formatTimeAgo } from "../../utils/formatter";
import { Bell, Clock9 } from "lucide-react";
import ItemMessagePlaceholder from "./ItemMessagePaceholder";
import NotificationsSkeleton from "../loaders/NotificationSkeleton";
interface Props {
  notifications: Notification[];
  isLoading: boolean;
  isError: boolean;
}
const NotifcationsList: React.FC<Props> = ({
  notifications,
  isLoading,
  isError,
}) => {
  if (isError) {
    return (
      <ItemMessagePlaceholder
        title="No notifications found"
        message="You don't have any notifications at the moment."
        icon={<Bell />}
      />
    );
  }
  if (isLoading) {
    return <NotificationsSkeleton />;
  }
  return (
    <div className="bg-white rounded-2xl p-8 space-y-1">
      {notifications.map((item, index) => (
        <div
          className="flex border items-start border-gray-200 p-2 rounded-2xl hover:shadow-sm cursor-pointer"
          key={index}
        >
          <div className="flex items-center gap-2 flex-1 w-[80%]">
            <div className="bg-secondary/20 rounded-full flex justify-center items-center h-10 w-10">
              <Bell />
            </div>
            <div className="text-left w-full">
              <div className="font-medium text-sm truncate line-clamp-1 min-w-0">
                {item.title}
              </div>
              <div className="truncate line-clamp-1 text-gray-700">
                {item.content}
              </div>
            </div>
          </div>
          <div className="text-sm text-right flex gap-1 items-center text-gray-500">
            <Clock9 size={14} />
            {formatTimeAgo(item.created_at)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotifcationsList;
