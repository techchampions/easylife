import React from "react";
import { Outlet } from "react-router-dom";
import SideNav from "../../components/singles_dashboard/LeftSideNav";
import RightSideBar from "../../components/singles_dashboard/RightSideBar";

const Layout: React.FC = () => {
  return (
    <div className="w-full bg-secondary/5 min-h-screen overflow-x-hidden grid md:grid-cols-4">
      <SideNav />
      <main className="md:col-span-2">
        <Outlet />
      </main>
      <RightSideBar />
    </div>
  );
};

export default Layout;
