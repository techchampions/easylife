import { MoreHorizontal, Share2, ThumbsDown, ThumbsUp } from "lucide-react";
import React from "react";
import { useGetMentorshipPost } from "../../hooks/query/useMentorship";
import {
  useDislikePost,
  useLikePost,
} from "../../hooks/mutattions/useMentorship";
import FeedsSkeleton from "../loaders/FeedSkeleton";
import { Link } from "react-router-dom";
const FeedsList: React.FC = () => {
  // const navigate = useNavigate();
  const { data, isLoading } = useGetMentorshipPost();
  const { mutate: like } = useLikePost();
  const { mutate: dislike } = useDislikePost();
  const feeds = data?.data.data ?? [];
  if (isLoading) {
    return <FeedsSkeleton />;
  }
  return (
    <div className="space-y-8">
      {feeds.map((feed, index) => {
        const images = feed.photos ?? [];
        const imageCount = images.length;
        const displayImages = imageCount > 2 ? images.slice(0, 2) : images;
        const hasMore = imageCount > 2;
        return (
          <div className="bg-white rounded-2xl p-2" key={index}>
            <div className="px-4 pt-4 pb-3">
              <div className="flex items-start justify-between">
                <div className="flex flex-col">
                  <Link
                    to={`/dashboard/mentorship/post/${feed.id}`}
                    className="text-lg font-medium hover:underline underline-offset-1 cursor-pointer"
                  >
                    {feed.title}
                  </Link>
                  <em className="text-gray-600 text-sm">Posted by Admin</em>
                </div>
                {/* <div className="flex items-center gap-3">
                  <img
                    src={FEEDS[0].profile_photo}
                    alt="Cody Fisher"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="flex items-center gap-1">
                      <h3 className="font-semibold text-gray-900">
                        {feed.user?.first_name}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-500">{feed.user?.email}</p>
                  </div>
                </div> */}
                <button className="p-2 hover:bg-gray-100 rounded-full transition">
                  <MoreHorizontal className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <p className="mt-2 text-gray-900 leading-relaxed line-clamp-4">
                {feed.content}
              </p>

              {/* <div className="flex gap-1 mt-3 -ml-1">
                {feed.hashtags.map((hashtag, index) => (
                  <span
                    key={index}
                    className="text-sm text-blue-600 hover:underline cursor-pointer"
                  >
                    {hashtag}
                  </span>
                ))}
              </div> */}
            </div>
            {/* Photo Grid - 4 photos */}
            {images.length > 0 && (
              <div
                className={`grid px-4 ${
                  images.length > 1 && "grid-cols-2"
                } gap-2 h-48 max-h-48 `}
              >
                {displayImages.map((image, index) => (
                  <div
                    className="relative rounded-2xl overflow-hidden"
                    key={index}
                  >
                    <img
                      src={image}
                      alt="Palm trees on beach"
                      className={`w-full h-full object-cover absolute`}
                    />
                    {hasMore && index === 1 && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="text-white text-3xl font-bold">
                          +{imageCount - 2}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Engagement Bar */}
            <div className="px-4 py-3 flex items-center justify-between text-gray-500">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => like(feed.id)}
                  className="flex items-center gap-2 hover:text-blue-600 transition"
                >
                  <ThumbsUp className="w-5 h-5" />
                  <span className="text-sm">{feed.likes} likes</span>
                </button>
                <button
                  onClick={() => dislike(feed.id)}
                  className="flex items-center gap-2 hover:text-blue-600 transition"
                >
                  <ThumbsDown className="w-5 h-5" />
                  <span className="text-sm">{feed.dislikes} dislikes</span>
                </button>
              </div>
              <button className="hover:text-blue-600 transition">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FeedsList;
