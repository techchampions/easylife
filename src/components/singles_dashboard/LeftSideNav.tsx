import {
  Bell,
  Home,
  LogOut,
  MessageCircle,
  Search,
  Settings,
  UserCircle,
} from "lucide-react";
import NavItem from "./NavItem";

function SideNav() {
  return (
    <div className="flex flex-col p-5 gap-5 h-screen justify-between overflow-y-auto scrollbar-hide">
      <img src="/images/logo.png" alt="EasyLife" className="w-[60%] mx-auto" />

      <div className="w-full flex flex-col flex-1 py-1.5 bg-white rounded-2xl">
        <nav className="space-y-2 p-2 flex-1">
          <NavItem
            label="Home"
            icon={<Home className="w-4 h-4" />}
            path="/singles"
          />
          <NavItem
            label="Discover"
            icon={<Search className=" w-4 h-4" />}
            path="/singles/discover"
          />
          <NavItem
            label="Messages"
            icon={<MessageCircle className=" w-4 h-4" />}
            path="/singles/messages"
          />
          <NavItem
            label="Notifications"
            icon={<Bell className=" w-4 h-4" />}
            path="/singles/notifications"
          />
          <NavItem
            label="Profile"
            icon={<UserCircle className=" w-4 h-4" />}
            path="/singles/profile"
          />
          <NavItem
            label="Settings"
            icon={<Settings className=" w-4 h-4" />}
            path="/singles/settings"
          />
        </nav>
        {/* <div className="px-4 py-20">
          <NavbarAddorder />
        </div> */}
        <nav className="space-y-2 p-2">
          <button className="flex items-center w-full px-7 py-1.75 text-[12px] text-red-500 rounded-full justify-center">
            <LogOut className="mr-2  w-4 h-4" />
            Logout
          </button>
          {/* commit */}
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
