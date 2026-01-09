import React from "react";
import MobileNavItem from "./MobileNavItem";
import { CirclePile, Home, MessageCircle, Search } from "lucide-react";
const NAVITEMS = [
  { label: "Home", icon: <Home size={25} />, path: "/couples" },
  { label: "Discover", icon: <Search size={25} />, path: "/couples/discover" },
  {
    label: "Mentorship",
    icon: <CirclePile size={25} />,
    path: "/couples/mentorship",
  },
  {
    label: "Messages",
    icon: <MessageCircle size={25} />,
    path: "/couples/messages",
  },
];
const MobileBottomNav: React.FC = () => {
  return (
    <nav className="fixed bottom-2 left-0 right-0 w-[95%] mx-auto flex md:hidden justify-around px-2 py-4 bg-white rounded-2xl">
      {NAVITEMS.map((item, index) => (
        <MobileNavItem
          key={index}
          label={item.label}
          icon={item.icon}
          path={item.path}
        />
      ))}
    </nav>
  );
};

export default MobileBottomNav;
