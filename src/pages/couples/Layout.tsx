import React from "react";
import { Outlet } from "react-router-dom";
import SideNav from "../../components/couples_dashboard/LeftSideNav";
import RightSideBar from "../../components/couples_dashboard/RightSideBar";
import MobileBottomNav from "../../components/couples_dashboard/MobileBottomNav";

const CouplesLayout: React.FC = () => {
  return (
    <div className="w-full bg-secondary/5 min-h-screen overflow-hidden grid md:grid-cols-4">
      <SideNav />
      <main className="md:col-span-2">
        <div className="mb-17 md:mb-0">
          <Outlet />
        </div>
        <div className="p-4">
          <MobileBottomNav />
        </div>
      </main>
      <RightSideBar />
    </div>
  );
};

export default CouplesLayout;
