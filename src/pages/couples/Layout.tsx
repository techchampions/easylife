import React, { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import SideNav from "../../components/couples_dashboard/LeftSideNav";
import MobileBottomNav from "../../components/couples_dashboard/MobileBottomNav";
import RightSideBar from "../../components/general_dating/RightSideBar";
import Subscription from "../../components/general_dating/Subscription";
import { useModal } from "../../zustand/modal.state";
import { useUserStore } from "../../zustand/user.state";

const CouplesLayout: React.FC = () => {
  const modal = useModal();
  const { user } = useUserStore();
  const hasSubscribed = !!user?.plan;
  const openedRef = useRef(false);

  useEffect(() => {
    if (hasSubscribed && !openedRef.current) {
      openedRef.current = true;
      if (modal.isOpen) {
        return;
      }
      modal.openStrong(<Subscription />);
    }
  }, [hasSubscribed, modal]);

  return (
    <div className="bg-secondary/5 min-h-screen w-screen min-w-screen max-w-screen max-h-screen overflow-hidden grid md:grid-cols-4">
      <div className="hidden md:block">
        <SideNav />
      </div>

      <main className="md:col-span-2 min-h-screen max-h-screen overflow-y-scroll scrollbar-hide">
        <div className="flex-1 overflow-y-auto scrollbar-hide pb-20 md:pb-0">
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

export default CouplesLayout;

// import React from "react";
// import { Outlet } from "react-router-dom";
// import SideNav from "../../components/couples_dashboard/LeftSideNav";
// import RightSideBar from "../../components/couples_dashboard/RightSideBar";
// import MobileBottomNav from "../../components/couples_dashboard/MobileBottomNav";

// const CouplesLayout: React.FC = () => {
//   return (
//     <div className="w-full bg-secondary/5 min-h-screen flex grow">
//       {/* Left Sidebar - Fixed */}
//       <aside className="hidden md:block fixed inset-y-0 left-0 w-1/4 overflow-y-auto">
//         <SideNav />
//       </aside>

//       {/* Center Main Content - Scrollable */}
//       <main className="w-full md:w-105 lg:w-145 xl:w-170 md:mx-auto flex flex-col min-h-screen">
//         <div className="flex-1 overflow-y-auto pb-20 md:pb-0">
//           {/* This div takes all available height and scrolls independently */}
//           <Outlet />
//         </div>

//         {/* Mobile Bottom Nav - Fixed at bottom on mobile */}
//         <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background z-50">
//           <MobileBottomNav />
//         </div>
//       </main>

//       {/* Right Sidebar - Fixed */}
//       <aside className="hidden md:block fixed inset-y-0 right-0 w-1/4 overflow-y-auto ">
//         <RightSideBar />
//       </aside>

//       {/* Mobile: Show SideNav as overlay or handle separately if needed */}
//     </div>
//   );
// };

// export default CouplesLayout;
