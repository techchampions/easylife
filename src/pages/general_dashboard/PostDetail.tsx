import {
  ChevronLeft,
  //   MoreHorizontal,
  Share2,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import React from "react";
import FeedsSkeleton from "../../components/loaders/FeedSkeleton";
import { useGetMentorshipPostById } from "../../hooks/query/useMentorship";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDislikePost,
  useLikePost,
} from "../../hooks/mutattions/useMentorship";
// import Header from "../../components/global/Header";

const PostDetail: React.FC = () => {
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();
  const { data, isLoading } = useGetMentorshipPostById(Number(id));
  const { mutate: like } = useLikePost();
  const { mutate: dislike } = useDislikePost();
  const feed = data?.data;
  const images = feed?.photos ?? [];
  const imageCount = images.length;
  const displayImages = imageCount > 2 ? images.slice(0, 2) : images;
  const hasMore = imageCount > 2;

  if (isLoading) {
    return <FeedsSkeleton />;
  }

  return (
    <div>
      <div className="bg-white rounded-2xl p-5 my-2 md:my-5 w-[95%] md:w-full mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div
            onClick={() => navigate(-1)}
            className="flex items-center justify-center rounded-full p-1 cursor-pointer hover:bg-gray-100"
          >
            <ChevronLeft />
          </div>
          <div className="font-medium">
            <div className="capitalize text-2xl">{feed?.title}</div>
            <em className="text-gray-500 text-sm">Posted by @Admin</em>
          </div>
        </div>
      </div>
      <div className="px-4 md:px-0">
        <div className="bg-white rounded-2xl p-2">
          <div className="px-4 pt-4 pb-3">
            {/* <div className="flex items-start justify-between">
              <div className="">
                <div className="text-lg font-medium hover:underline underline-offset-1 cursor-pointer">
                  {feed?.title}
                </div>
                <em className="text-gray-600 text-sm">Posted by Admin</em>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full transition">
                <MoreHorizontal className="w-5 h-5 text-gray-600" />
              </button>
            </div> */}
            <p className="mt-2 text-gray-900 leading-relaxed">
              {feed?.content}
            </p>
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
                onClick={() => like(Number(feed?.id))}
                className="flex items-center gap-2 hover:text-blue-600 transition"
              >
                <ThumbsUp className="w-5 h-5" />
                <span className="text-sm">{feed?.likes} likes</span>
              </button>
              <button
                onClick={() => dislike(Number(feed?.id))}
                className="flex items-center gap-2 hover:text-blue-600 transition"
              >
                <ThumbsDown className="w-5 h-5" />
                <span className="text-sm">{feed?.dislikes} dislikes</span>
              </button>
            </div>
            <button className="hover:text-blue-600 transition">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
