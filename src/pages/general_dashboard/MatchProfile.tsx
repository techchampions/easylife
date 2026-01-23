"use client";

import React from "react";
import {
  Edit,
  Heart,
  Loader2,
  MapPin,
  MessageCircle,
  Star,
} from "lucide-react";
import Header from "../../components/global/Header";
import { calculateAge } from "../../utils/calculate_age";
import { useSendMessage } from "../../hooks/mutattions/useMessaging";
import { useNavigate, useParams } from "react-router-dom";
import { useGetUserByID } from "../../hooks/query/useGetAllUsers";

const MatchProfileScreen: React.FC = () => {
  const { mutate: startChat, isPending } = useSendMessage();
  const params = useParams();
  const id = params.id;
  const { data, isLoading, isError } = useGetUserByID(id || "");
  const navigate = useNavigate();
  const handleChatUser = () => {
    const payload = new FormData();
    payload.append("reciever", String(user?.id));
    startChat(payload, {
      onSuccess() {
        navigate(`/couples/messages/${user?.id}`);
      },
    });
  };
  const user = data?.user;

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
            <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-6 pt-10">
              <div className="flex items-end justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-white">
                    {user?.first_name && user.last_name
                      ? "John Doe"
                      : "Upadte your profile"}
                    , {calculateAge(user?.date_of_birth || "")} Yrs
                  </h1>
                  <p className="text-white flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-green-400" />
                    {user?.state}, {user?.country}
                  </p>
                </div>
              </div>
              <div className="text-white mt-4 flex items-center gap-5">
                <div className="bg-yellow-500/50 rounded-full text-yellow-400 p-2">
                  <Star />
                </div>
                <div className="bg-red-500/50 rounded-full text-red-400 p-2">
                  <Heart />
                </div>
                <div
                  onClick={handleChatUser}
                  className="bg-primary/50 rounded-full text-blue-400 p-2"
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
                <p className="text-gray-500">Languages:</p>
                <p className="font-medium capitalize">
                  {user?.language}, Russian
                </p>
              </div>
            </div>
          </div>

          {/* PHOTO GALLERY */}
          <div className="p-8 bg-white rounded-2xl mt-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Gallery
            </h2>

            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide w-full">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="w-40 h-40 shrink-0 overflow-hidden rounded-md"
                >
                  <img
                    src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MatchProfileScreen;
