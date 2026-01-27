import { Heart, Loader2, MessageCircle, Star } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useUserStore } from "../../zustand/user.state";
import { useSendMessage } from "../../hooks/mutattions/useMessaging";
interface Props {
  user: UserListItem;
}
const MatchCard: React.FC<Props> = ({ user }) => {
  // const { user: userState } = useUserStore();
  const { mutate: startChat, isPending } = useSendMessage();
  const navigate = useNavigate();
  const handleChatUser = () => {
    const payload = {
      receiver: user.id,
    };
    // const payload = new FormData();
    // payload.append("reciever", String(user.id));
    startChat(payload, {
      onSuccess(data) {
        navigate(
          `/dashboard/messages/${user.id}/chat/${data.compose.conversation}`
        );
      },
    });
  };
  return (
    <div className="flex flex-col h-70 gap-2 ">
      <Link
        to={`matchprofile/${user.id}`}
        className="flex-1 overflow-hidden rounded-2xl relative"
      >
        <img
          src={
            user.profile_picture ||
            "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e"
          }
          alt=""
          className="object-cover h-full w-full"
        />
        <div className="absolute bottom-0 bg-linear-to-t from-black to-transparent text-white px-2 py-4 w-full">
          <div className="flex items-center gap-2">
            <img
              src={
                user.profile_picture ||
                "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e"
              }
              alt=""
              className="h-7 w-7 rounded-full bg-amber-300 object-cover"
            />

            <div className="">
              {user.first_name} {user.last_name}
            </div>
          </div>
          <div className="text-xs text-gray-300">
            {user.state}, {user.country}
          </div>
        </div>
      </Link>
      <div className="flex items-center justify-center gap-4">
        <div className="bg-yellow-500/10 rounded-full text-yellow-500 p-2 cursor-pointer">
          <Star />
        </div>
        <div className="bg-red-500/10 rounded-full text-red-500 p-2 cursor-pointer">
          <Heart />
        </div>
        <div
          onClick={handleChatUser}
          className="bg-primary/10 rounded-full text-primary p-2 cursor-pointer"
        >
          {isPending ? <Loader2 className="animate-spin" /> : <MessageCircle />}
        </div>
      </div>
    </div>
  );
};

export default MatchCard;
