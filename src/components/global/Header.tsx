import { Bell, Settings, UserCircle } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
interface Props {
  name: string;
}
const Header: React.FC<Props> = ({ name }) => {
  return (
    <div className="bg-white rounded-2xl p-5 my-5 w-[95%] md:w-full mx-auto flex items-center justify-between">
      <div className="capitalize text-2xl md:text-4xl font-bold">{name}</div>
      <div className="flex md:hidden items-center gap-5">
        <Link to={"/couples/notifications"}>
          <Bell />
        </Link>
        <Link to={"/couples/settings"}>
          <Settings />
        </Link>
        <Link to={"/couples/profile"}>
          <UserCircle />
        </Link>
      </div>
    </div>
  );
};

export default Header;
