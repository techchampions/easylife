import { Mail, MapPin, UserCircle } from "lucide-react";
import React from "react";

const RightSideBar: React.FC = () => {
  const messages = [
    { user: "Frank", message: "How are you doing?" },
    { user: "Ikuku", message: "Let's get the party started" },
    { user: "Kadri", message: "Soosar is KING!" },
    { user: "Susan", message: "How are you doing?" },
  ];
  return (
    <div className="space-y-4 p-5 hidden md:flex flex-col">
      <div className="bg-white rounded-2xl p-5">
        <div className="flex items-start gap-2">
          <div className="">
            <UserCircle size={40} />
          </div>
          <div className="flex-1">
            <div className="font-medium">Django Soosar</div>
            <div className="text-sm text-zinc-500 flex items-center gap-1">
              <Mail size={15} />
              example@email.com
            </div>
            <div className="text-sm text-zinc-500 flex items-center gap-1">
              <MapPin size={15} />
              Lagos, Nigeria
            </div>
            <div className="text-right text-sm cursor-pointer hover:text-shadow-md">
              view profile
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl p-5 space-y-5 flex-1">
        <div className="text-xl font-bold">Messages</div>
        <div className="space-y-2 divide-y divide-zinc-200">
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
        </div>
      </div>
    </div>
  );
};

export default RightSideBar;
