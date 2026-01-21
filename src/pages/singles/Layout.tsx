import React from "react";
import { Outlet } from "react-router-dom";
// import SideNav from "../../components/singles_dashboard/LeftSideNav";
// import RightSideBar from "../../components/general_dating/RightSideBar";
import MobileBottomNav from "../../components/couples_dashboard/MobileBottomNav";
import SideNav from "../../components/couples_dashboard/LeftSideNav";
import RightSideBar from "../../components/couples_dashboard/RightSideBar";
// import MobileBottomNav from "../../components/singles_dashboard/MobileBottomNav";

const Layout: React.FC = () => {
  return (
    <div className="w-full bg-secondary/5 min-h-screen max-h-screen overflow-hidden grid md:grid-cols-4">
      <div className="hidden md:block">
        <SideNav />
      </div>

      <main className="md:col-span-2 min-h-screen max-h-screen overflow-y-scroll scrollbar-hide">
        <div className="flex-1 overflow-y-auto pb-20 md:pb-0">
          {/* This div takes all available height and scrolls independently */}
          <Outlet />
        </div>
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background z-50">
          <MobileBottomNav />
        </div>
      </main>
      <div className="hidden md:block">
        <RightSideBar />
      </div>
    </div>
  );
};

export default Layout;
