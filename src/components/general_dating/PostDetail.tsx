import { MoreHorizontal, Share2, ThumbsDown, ThumbsUp } from "lucide-react";
import React from "react";

const PostDetail: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-2">
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-start justify-between">
          <div className="">
            <div className="text-lg font-medium hover:underline underline-offset-1 cursor-pointer">
              {feed.title}
            </div>
            <em className="text-gray-600 text-sm">Posted by Admin</em>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full transition">
            <MoreHorizontal className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <p className="mt-2 text-gray-900 leading-relaxed line-clamp-4">
          {feed.content}
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
            <div className="relative rounded-2xl overflow-hidden" key={index}>
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
};

export default PostDetail;
