import {
  CirclePile,
  HeartHandshake,
  Home,
  MessageCircle,
  Search,
} from "lucide-react";
import React from "react";
import { useGetCoonversations } from "../../hooks/query/useMessaging";
import { useUserStore } from "../../zustand/user.state";
import MobileNavItem from "./MobileNavItem";
// import { useUserStore } from "../../zustand/user.state";
const MobileBottomNav: React.FC = () => {
  const { user } = useUserStore();
  const { data } = useGetCoonversations();

  const unread = data?.conversations.reduce((total, msg) => {
    return total + (msg.sender_unread || 0);
  }, 0);
  const councellingConversations = data?.conversations.find(
    (item) => item.receiver?.id === 121
  );
  const unreadCouncel = councellingConversations?.sender_unread;
  console.log(unread, unreadCouncel);
  const NAVITEMS = [
    {
      label: "Home",
      icon: <Home size={25} />,
      path: `/dashboard`,
    },
    ...(user?.marital_status === "single"
      ? [
          {
            label: "Discover",
            icon: <Search size={25} />,
            path: `/dashboard/discover`,
          },
        ]
      : [
          {
            label: "Counselling",
            icon: <HeartHandshake size={25} />,
            path: `/dashboard/counselling`,
            badgeCount: unreadCouncel,
          },
        ]),
    ...(user?.marital_status === "married"
      ? [
          {
            label: "Mentorship",
            icon: <CirclePile size={25} />,
            path: `/dashboard/mentorship`,
          },
        ]
      : [
          {
            label: "Counselling",
            icon: <HeartHandshake size={25} />,
            path: `/dashboard/counselling`,
            badgeCount: unreadCouncel,
          },
        ]),
    {
      label: "Messages",
      icon: <MessageCircle size={25} />,
      path: `/dashboard/messages`,
      badgeCount: unread,
    },
  ];
  return (
    <nav className="fixed bottom-2 left-0 right-0 w-[95%] mx-auto flex md:hidden justify-around px-2 py-1 bg-white shadow-md rounded-2xl">
      {NAVITEMS.map((item, index) => (
        <MobileNavItem
          key={index}
          label={item.label}
          icon={item.icon}
          path={item.path}
          badgeCount={item.badgeCount}
        />
      ))}
    </nav>
  );
};

export default MobileBottomNav;
