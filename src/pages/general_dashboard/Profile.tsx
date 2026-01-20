"use client";

import React from "react";
import { Edit, MapPin } from "lucide-react";
import Header from "../../components/global/Header";
import { useUserStore } from "../../zustand/user.state";
import { calculateAge } from "../../utils/calculate_age";

const ProfileScreen: React.FC = () => {
  const { user } = useUserStore();
  return (
    <>
      <Header name="Profile" />
      <div className="overflow-hidden p-3">
        <div className="space-y-10">
          {/* Header with Profile Picture */}
          <div className="relative rounded-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e"
              alt="Dasha Daria"
              className="w-full h-96 object-cover"
            />
            <div className="absolute top-4 right-4 bg-secondary/50 p-2 rounded-full text-white">
              {" "}
              <Edit />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-6">
              <div className="flex items-end justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-white">
                    {user?.first_name && user.last_name
                      ? user?.first_name + " " + user.last_name
                      : "Upadte your profile"}
                    , {calculateAge(user?.date_of_birth)} Yrs
                  </h1>
                  <p className="text-white flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-green-400" />
                    {user?.state}, {user?.country}
                  </p>
                </div>
              </div>
              <p className="text-white mt-4 text-lg">
                So long as you have food in your mouth, you have solved all
                questions for the time being.
              </p>
            </div>
          </div>
          {/* About Section */}
          <div className="p-8 bg-white rounded-2xl mt-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">About</h2>
            <div className="grid grid-cols-2 gap-6 text-sm">
              <div>
                <p className="text-gray-500">Live in:</p>
                <p className="font-medium line-clamp-2 truncate">
                  {user?.address}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Relationship:</p>
                <p className="font-medium capitalize">{user?.marital_status}</p>
              </div>
              <div>
                <p className="text-gray-500">Place of birth:</p>
                <p className="font-medium">{user?.place_of_birth}</p>
              </div>
              <div>
                <p className="text-gray-500">No. of children:</p>
                <p className="font-medium">No kids</p>
              </div>
              <div>
                <p className="text-gray-500">Work as:</p>
                <p className="font-medium">Businesswoman</p>
              </div>
              <div>
                <p className="text-gray-500">Religion:</p>
                <p className="font-medium">{user?.religion}</p>
              </div>
              <div>
                <p className="text-gray-500">Race/Tribe:</p>
                <p className="font-medium">{user?.race_or_tribe}</p>
              </div>
              <div>
                <p className="text-gray-500">Drink:</p>
                <p className="font-medium">Sometimes</p>
              </div>
              <div>
                <p className="text-gray-500">Languages:</p>
                <p className="font-medium capitalize">
                  {user?.language}, Russian
                </p>
              </div>
              <div>
                <p className="text-gray-500">Marijuana:</p>
                <p className="font-medium">Yes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProfileScreen;
