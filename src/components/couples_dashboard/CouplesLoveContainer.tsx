import { Heart, UserCircle } from "lucide-react";
import React from "react";
import { calculateAge } from "../../utils/calculate_age";
import { useUserStore } from "../../zustand/user.state";

const CouplesLoveContainer: React.FC = () => {
  const { user } = useUserStore();
  return (
    <div className="relative">
      <div className="flex items-center justify-center absolute inset-0 z-50">
        <Heart fill="red" size={100} stroke="#f9f4f7" />
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div className="col-span-1">
          <div className="space-y-2">
            <div className="h-82 w-full rounded-2xl overflow-hidden">
              {user?.profile_picture ? (
                <img
                  src={user?.profile_picture}
                  alt=""
                  className="w-full h-full object-cover brightness-75"
                />
              ) : (
                <UserCircle />
              )}
            </div>
            <div className="bg-white rounded-2xl px-4 py-2">
              <div className="">
                <span>Name: </span>
                <span>
                  {user?.first_name} {user?.last_name}
                </span>
              </div>
              <div className="">
                <span>Age: </span>
                <span>{calculateAge(user?.date_of_birth || "")} yrs</span>
              </div>
              <div className="">
                <span>Location: </span>
                <span>
                  {user?.state}, {user?.country}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="space-y-2">
            <div className="h-82 w-full rounded-2xl overflow-hidden bg-gray-500 flex items-center justify-center">
              {user?.spouse_profile_picture ? (
                <img
                  src={user?.spouse_profile_picture || ""}
                  alt=""
                  className="w-full h-full object-cover brightness-75"
                />
              ) : (
                <UserCircle className="text-gray-200 w-20 h-20" />
              )}
            </div>
            <div className="bg-white rounded-2xl px-4 py-2">
              <div className="">
                <span>Name: </span>
                <span>
                  {user?.spouse_first_name} {user?.spouse_last_name}
                </span>
              </div>
              <div className="">
                <span>Age: </span>
                <span>
                  {calculateAge(user?.spouse_date_of_birth || "")} yrs
                </span>
              </div>
              <div className="">
                <span>Location: </span>
                <span>
                  {user?.state}, {user?.country}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouplesLoveContainer;
