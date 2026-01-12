import React from "react";
import { Home, MessageCircle, Search } from "lucide-react";
import MobileNavItem from "../couples_dashboard/MobileNavItem";
const MobileBottomNav: React.FC = () => {
  const NAVITEMS = [
    { label: "Home", icon: <Home size={25} />, path: "/singles" },
    {
      label: "Discover",
      icon: <Search size={25} />,
      path: "/singles/discover",
    },
    {
      label: "Messages",
      icon: <MessageCircle size={25} />,
      path: "/singles/messages",
    },
  ];
  return (
    <nav className="fixed bottom-2 left-0 right-0 w-[95%] mx-auto flex md:hidden justify-around px-2 py-4 bg-white shadow-md rounded-2xl">
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
