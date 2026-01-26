import { Bell, Settings, UserCircle } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
// import { useUserStore } from "../../zustand/user.state";
interface Props {
  name: string;
}
const Header: React.FC<Props> = ({ name }) => {
  // const { user } = useUserStore();
  return (
    <div className="bg-white rounded-2xl p-5 my-2 md:my-5 w-[95%] md:w-full mx-auto flex items-center justify-between">
      <div className="md:hidden w-1/3">
        <img src="/images/logo.png" alt="" className=" h-12" />
      </div>
      <div className="hidden md:block capitalize text-2xl md:text-4xl font-bold">
        {name}
      </div>
      <div className="flex md:hidden items-center gap-5">
        <Link to={`/dashboard/notifications`}>
          <Bell />
        </Link>
        <Link to={`/dashboard/settings`}>
          <Settings />
        </Link>
        <Link to={`/dashboard/profile`}>
          <UserCircle />
        </Link>
      </div>
    </div>
  );
};

export default Header;
