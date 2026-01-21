import { Mail, MapPin, UserCircle } from "lucide-react";
import React from "react";
import { useUserStore } from "../../zustand/user.state";
import { Link } from "react-router-dom";

const RightSideBar: React.FC = () => {
  const messages = [
    { user: "Frank", message: "How are you doing?" },
    { user: "Ikuku", message: "Let's get the party started" },
    { user: "Kadri", message: "Soosar is KING!" },
    { user: "Susan", message: "How are you doing?" },
  ];
  const { user } = useUserStore();
  return (
    <div className="space-y-4 p-5 hidden md:flex flex-col w-full">
      <div className="bg-white rounded-2xl p-5 w-full">
        <div className="flex items-start gap-2">
          <div className="w-fit">
            <UserCircle size={40} />
          </div>

          {/* 👇 THIS is the key */}
          <div className="flex-1 min-w-0">
            <div className="font-medium">
              {user?.first_name} {user?.last_name}
            </div>

            <div className="text-sm text-zinc-500 flex items-center gap-1">
              <Mail size={15} className="shrink-0" />

              {/* 👇 truncate works now */}
              <div className="truncate">{user?.email} overflowing text</div>
            </div>

            <div className="text-sm text-zinc-500 flex items-center gap-1">
              <MapPin size={15} className="shrink-0" />
              <span className="truncate">
                {user?.state}, {user?.country}
              </span>
            </div>

            <Link
              to="/singles/profile"
              className="block text-right text-sm cursor-pointer hover:text-shadow-md"
            >
              view profile
            </Link>
          </div>
        </div>
      </div>

      {/* <div className="bg-white rounded-2xl p-5 w-full">
        <div className="flex items-start gap-2">
          <div className="w-fit bg-amber-400">
            <UserCircle size={40} />
          </div>
          <div className="bg-amber-700">
            <div className="font-medium">
              {user?.first_name} {user?.last_name}{" "}
            </div>
            <div className="text-sm text-zinc-500 flex items-center gap-1 w-full">
              <Mail size={15} />
              <div className="min-w-0 truncate bg-red-500">
                {user?.email} overflowing text
              </div>
            </div>
            <div className="text-sm text-zinc-500 flex items-center gap-1">
              <MapPin size={15} />
              {user?.state}, {user?.country}
            </div>
            <Link
              to={`/singles/profile`}
              className="text-right text-sm cursor-pointer hover:text-shadow-md"
            >
              view profile
            </Link>
          </div>
        </div>
      </div> */}
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
