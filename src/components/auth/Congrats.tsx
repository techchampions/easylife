import { CheckCircle2 } from "lucide-react";
import React from "react";

const Congrats: React.FC = () => {
  return (
    <div className="w-sm max-w-xs md:max-w-sm">
      <div className="p-5">
        <div className="w-1/2 mx-auto">
          <img src="/images/relationship.svg" alt="" className="w-full" />
        </div>
        <div className="flex flex-col items-center text-center">
          <CheckCircle2 size={60} className="text-secondary" />
          <div className="text-2xl font-bold">Congratulations!</div>
          <div className="text-gray-700">
            you have successfully signup for EasyLife mentorship programme.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Congrats;
