import {
  Bell,
  CirclePile,
  Home,
  LogOut,
  MessageCircle,
  Search,
  Settings,
  UserCircle,
} from "lucide-react";
import NavItem from "./NavItem";
import { useUserStore } from "../../zustand/user.state";
import { useToast } from "../../zustand/toast.state";

function SideNav() {
  const { reset } = useUserStore();
  const { showToast } = useToast();
  const navItems = [
    { label: "Home", icon: <Home className="w-4 h-4" />, path: "/couples" },
    {
      label: "Discover",
      icon: <Search className="w-4 h-4" />,
      path: "/couples/discover",
    },
    {
      label: "Meassages",
      icon: <MessageCircle className="w-4 h-4" />,
      path: "/couples/messages",
    },
    {
      label: "Mentorship",
      icon: <CirclePile className="w-4 h-4" />,
      path: "/couples/mentorship",
    },
    {
      label: "Notifications",
      icon: <Bell className="w-4 h-4" />,
      path: "/couples/notifications",
    },
    {
      label: "Profile",
      icon: <UserCircle className="w-4 h-4" />,
      path: "/couples/profile",
    },
    {
      label: "Settings",
      icon: <Settings className="w-4 h-4" />,
      path: "/couples/settings",
    },
  ];
  return (
    <div className="hidden md:flex flex-col p-5 gap-5 h-screen justify-between overflow-y-auto scrollbar-hide">
      <img src="/images/logo.png" alt="EasyLife" className="w-[60%] mx-auto" />

      <div className="w-full flex flex-col flex-1 py-1.5 bg-white rounded-2xl">
        <nav className="space-y-2 p-2 flex-1">
          {navItems.map((item, index) => (
            <NavItem
              key={index}
              label={item.label}
              icon={item.icon}
              path={item.path}
            />
          ))}
        </nav>
        <nav className="space-y-2 p-2">
          <button
            className="cursor-pointer flex items-center w-full px-7 py-1.75 text-[12px] text-red-500 rounded-full justify-center"
            onClick={() => {
              reset();
              showToast("user logged out successfully", "success");
            }}
          >
            <LogOut className="mr-2  w-4 h-4" />
            Logout
          </button>
          <a
            href="/"
            className="text-gray-400 text-[12px] w-full block px-7 py-1.75 text-center mx-auto"
          >
            copyright easylife@2026
          </a>
        </nav>
      </div>
    </div>
  );
}

export default SideNav;
