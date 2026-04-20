"use client";

import { Edit, FileEdit, Image, MapPin } from "lucide-react";
import React from "react";
import PhotoGallery from "../../components/general_dating/PhotoGallery";
import UpdateCouplesValues from "../../components/general_dating/UpdateCouplesValues";
import UpdateProfile from "../../components/general_dating/UpdateProfile";
import UpdateSinglePersonalValues from "../../components/general_dating/UpdateSinglePersonalValues";
import Header from "../../components/global/Header";
import { calculateAge } from "../../utils/calculate_age";
import { formatDate } from "../../utils/formatter";
import { useModal } from "../../zustand/modal.state";
import { useUserStore } from "../../zustand/user.state";

const ProfileScreen: React.FC = () => {
  const { user } = useUserStore();
  const modal = useModal();
  const handleUpdatePRofile = () => modal.open(<UpdateProfile />);
  const handleUpdateValues = () => {
    if (user?.marital_status === "married") {
      modal.open(<UpdateCouplesValues />);
    } else {
      modal.open(<UpdateSinglePersonalValues />);
    }
  };
  return (
    <>
      <Header name="Profile" />
      <div className="overflow-hidden p-3 md:p-0">
        <div className="space-y-10">
          {/* Header with Profile Picture */}
          <div className="relative rounded-2xl overflow-hidden">
            {user?.profile_picture ? (
              <img
                src={
                  user?.profile_picture
                  // "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e"
                }
                alt="Dasha Daria"
                className="w-full h-96 object-center"
              />
            ) : (
              <Image className="w-full h-96" />
            )}
            <div
              onClick={handleUpdatePRofile}
              className="cursor-pointer absolute top-4 right-4 bg-secondary/50 p-2 rounded-full text-white"
            >
              {" "}
              <Edit />
            </div>
            <div className="absolute inset-0 backdrop-blur-3xl"></div>
            <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-primary to-transparent p-6">
              <div className="md:flex gap-4">
                <div className="h-30 md:h-40 w-30 md:w-40 rounded-full overflow-hidden border-4 border-white bg-gray-200">
                  {user?.profile_picture ? (
                    <img
                      src={user?.profile_picture || ""}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Image className="w-full h-full" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-end justify-between">
                    <div>
                      <h1 className="text-3xl font-bold text-white">
                        {user?.first_name && user.last_name
                          ? user?.first_name + " " + user.last_name
                          : "Upadte your profile"}
                        , {calculateAge(user?.date_of_birth || "")} Yrs
                      </h1>
                      <p className="text-white flex items-center gap-2">
                        <MapPin className="text-green-400" size={14} />
                        {user?.state}, {user?.country}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-end text-white py-2">
                    <div className="flex-1 line-clamp-4 md:line-clamp-6 text-sm md:text-base">
                      {user?.short_bio || "..."}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-sm">
                    <div
                      onClick={handleUpdatePRofile}
                      className="cursor-pointer flex items-center gap-2 text-white bg-secondary/50 hover:bg-secondary/95 py-2 px-4 rounded-xl"
                    >
                      <Edit size={15} />
                      <div className="">Edit Profile</div>
                    </div>
                    <div
                      onClick={handleUpdateValues}
                      className="cursor-pointer flex items-center gap-2 text-white bg-yellow-500/50 hover:bg-yellow-500/80 py-2 px-4 rounded-xl"
                    >
                      <FileEdit size={15} />
                      <div className="">Edit Values</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <p className="text-white mt-4 text-lg">
                So long as you have food in your mouth, you have solved all
                questions for the time being.
              </p> */}
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
                <p className="font-medium capitalize">
                  {user?.marital_status || "..."}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Gender:</p>
                <p className="font-medium capitalize">
                  {user?.gender || "..."}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Phone No.:</p>
                <p className="font-medium capitalize">
                  {user?.single_user_phone || "..."}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Place of birth:</p>
                <p className="font-medium">{user?.place_of_birth || "..."}</p>
              </div>
              <div>
                <p className="text-gray-500">No. of children:</p>
                <p className="font-medium">
                  {user?.number_of_children || "..."}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Work as:</p>
                <p className="font-medium">{user?.occupation || "..."}</p>
              </div>
              <div>
                <p className="text-gray-500">Religion:</p>
                <p className="font-medium">{user?.religion || "..."}</p>
              </div>
              <div>
                <p className="text-gray-500">Race/Tribe:</p>
                <p className="font-medium">{user?.race_or_tribe || "..."}</p>
              </div>
              <div>
                <p className="text-gray-500">Denomination:</p>
                <p className="font-medium">{user?.denomination || "..."}</p>
              </div>
              <div>
                <p className="text-gray-500">Languages:</p>
                <p className="font-medium capitalize">
                  {user?.language || "..."}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Date of Birth:</p>
                <p className="font-medium">
                  {formatDate(user?.date_of_birth || "...")}
                </p>
              </div>
            </div>
          </div>
          <PhotoGallery />
        </div>
      </div>
    </>
  );
};
export default ProfileScreen;
