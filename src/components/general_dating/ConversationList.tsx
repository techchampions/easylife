import React from "react";
import { Link } from "react-router-dom";

const ConversationList: React.FC = () => {
  const messages = [
    { user: "Frank", message: "How are you doing?" },
    { user: "Ikuku", message: "Let's get the party started" },
    { user: "Kadri", message: "Soosar is KING!" },
    { user: "Susan", message: "How are you doing?" },
  ];

  return (
    <div className="bg-white rounded-3xl p-8 min-h-[70vh]">
      <div className="space-y-2 divide-y divide-zinc-200">
        {messages.map((item, index) => (
          <Link
            to={`/dashboard/messages/${item.user}`}
            className="flex items-center gap-2 w-full text-gray-800 cursor-pointer"
            key={index}
          >
            <img
              src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e"
              alt=""
              className="w-10 h-10 object-cover rounded-full"
            />
            <div className="flex-1">
              <div className="font-medium">{item.user}</div>
              <div className="flex items-center justify-between w-full">
                <div className="text-sm text-zinc-500 flex-1">
                  {item.message}
                </div>
                <div className="text-sm text-zinc-500 text-right">16:59 PM</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ConversationList;
