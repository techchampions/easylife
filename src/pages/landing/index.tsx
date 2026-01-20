import React from "react";
import { useUserStore } from "../../zustand/user.state";

const LandingPageIndex: React.FC = () => {
  const { user } = useUserStore();
  return (
    <div className="flex justify-center items-center">
      <div className="bg-white rounded-lg w-[80%] h-screen p-24 text-black">
        <h1 className="text-4xl font-bold text-center">
          Landing Page {user?.role}
        </h1>
      </div>
    </div>
  );
};

export default LandingPageIndex;
