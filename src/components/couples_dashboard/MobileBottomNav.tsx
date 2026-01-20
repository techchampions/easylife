import React from "react";
import MobileNavItem from "./MobileNavItem";
import { CirclePile, Home, MessageCircle, Search } from "lucide-react";
import { useUserStore } from "../../zustand/user.state";
const MobileBottomNav: React.FC = () => {
  const { user } = useUserStore();
  const NAVITEMS = [
    {
      label: "Home",
      icon: <Home size={25} />,
      path: `/${user?.marital_status === "married" ? "couples" : "singles"}`,
    },
    {
      label: "Discover",
      icon: <Search size={25} />,
      path: `/${
        user?.marital_status === "married" ? "couples" : "singles"
      }/discover`,
    },
    {
      label: "Mentorship",
      icon: <CirclePile size={25} />,
      path: `/${
        user?.marital_status === "married" ? "couples" : "singles"
      }/mentorship`,
    },
    {
      label: "Messages",
      icon: <MessageCircle size={25} />,
      path: `/${
        user?.marital_status === "married" ? "couples" : "singles"
      }/messages`,
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
