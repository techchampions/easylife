"use client";

import {
  Heart,
  Image,
  Images,
  Info,
  Loader2,
  MapPin,
  MessageCircle,
  Star,
} from "lucide-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import ItemMessagePlaceholder from "../../components/general_dating/ItemMessagePaceholder";
import Header from "../../components/global/Header";
import ProfileLoadingSkeleton from "../../components/loaders/ProfileSkeleton";
import { useSendMessage } from "../../hooks/mutattions/useMessaging";
import { useGetUserByID } from "../../hooks/query/useGetAllUsers";
import { calculateAge } from "../../utils/calculate_age";

const MatchProfileScreen: React.FC = () => {
  const { mutate: startChat, isPending } = useSendMessage();
  const params = useParams();
  const id = params.id;
  const { data, isLoading, isError } = useGetUserByID(id || "");
  const user = data?.user_profile;
  const photos = user?.photos || [];
  const navigate = useNavigate();
  const handleChatUser = () => {
    if (user) {
      const payload = {
        receiver: user.id,
      };
      startChat(payload, {
        onSuccess(data) {
          navigate(
            `/dashboard/messages/${user.id}/chat/${data.compose.conversation}`
          );
        },
      });
    }
  };
  if (isError) {
    return (
      <ItemMessagePlaceholder
        title="Failed to get User"
        icon={<Info />}
        message="Sorry failed to get user object from server."
      />
    );
  }
  return (
    <>
      <Header name="Profile" />
      {isLoading ? (
        <ProfileLoadingSkeleton />
      ) : (
        <div className="overflow-hidden p-3">
          <div className="space-y-10">
            {/* Header with Profile Picture */}
            <div className="relative rounded-2xl overflow-hidden">
              {user?.profile_picture ? (
                <img
                  src={user?.profile_picture || ""}
                  alt={user?.last_name || ""}
                  className="w-full h-96 object-cover"
                />
              ) : (
                <Image className="w-full h-96" />
              )}
              <div className="absolute inset-0 backdrop-blur-3xl"></div>

              <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black to-transparent p-6 pt-10">
                <div className="flex gap-4">
                  <div className="h-25 md:h-40 w-25 md:w-40 rounded-full overflow-hidden border-4 border-white bg-gray-200">
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
                            ? `${user.first_name} ${user.last_name}`
                            : "Upadte your profile"}
                          , {calculateAge(user?.date_of_birth || "")} Yrs
                        </h1>
                        <p className="text-white flex items-center gap-2">
                          <MapPin className="w-5 h-5 text-green-400" />
                          {user?.state}, {user?.country}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-end text-white py-2">
                      <div className="flex-1 text-sm md:text-base line-clamp-4 md:line-clamp-6">
                        {user?.short_bio || "..."}
                      </div>
                    </div>

                    <div className="text-white mt-0 flex items-center gap-5">
                      <div className="bg-yellow-500/50 rounded-full cursor-pointer text-yellow-400 p-2">
                        <Star />
                      </div>
                      <div className="bg-red-500/50 rounded-full cursor-pointer text-red-400 p-2">
                        <Heart />
                      </div>
                      <div
                        onClick={handleChatUser}
                        className="bg-primary/50 rounded-full cursor-pointer text-blue-400 p-2"
                      >
                        {isPending ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          <MessageCircle />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* About Section */}
            <div className="p-8 bg-white rounded-2xl mt-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                About
              </h2>
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
                    {user?.marital_status}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Place of birth:</p>
                  <p className="font-medium">{user?.place_of_birth}</p>
                </div>
                <div>
                  <p className="text-gray-500">Gender:</p>
                  <p className="font-medium capitalize">
                    {user?.gender || "..."}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Work as:</p>
                  <p className="font-medium">{user?.occupation}</p>
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
                  <p className="text-gray-500">Languages:</p>
                  <p className="font-medium capitalize">{user?.language}</p>
                </div>
              </div>
            </div>

            {/* PHOTO GALLERY */}
            <div className="p-8 bg-white rounded-2xl mt-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Gallery
              </h2>
              {photos.length > 0 ? (
                <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide w-full">
                  {photos.map((photo, i) => (
                    <div
                      key={i}
                      className="w-40 h-40 shrink-0 overflow-hidden rounded-md"
                    >
                      <img
                        src={photo}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <ItemMessagePlaceholder
                  title="No Photos"
                  message="No photo added to gallery"
                  icon={<Images />}
                  size="small"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default MatchProfileScreen;
