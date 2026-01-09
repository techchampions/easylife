import { MessageSquare, MoreHorizontal, Share2, ThumbsUp } from "lucide-react";
import React from "react";
const FEEDS = [
  {
    profile_photo:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
    username: "@codyF12",
    fullname: "Cody Foreman",
    content:
      "Hey guys, happy to share my shot that were taken my short trips all over europe. Of course, i tried both black and white film with bright 100 iso film. How do you like it?",
    hashtags: ["#love", "#MarriageVacation", "#summervibes"],
    images: [
      "https://cdn.shopify.com/s/files/1/0089/6221/1900/files/bigstock-Beach-Chairs-With-Umbrella-And-129286676_1024x1024.jpg?v=1578502192",
      "https://cdn.shopify.com/s/files/1/0089/6221/1900/files/bigstock-Beach-Chairs-With-Umbrella-And-129286676_1024x1024.jpg?v=1578502192",
      "https://cdn.shopify.com/s/files/1/0089/6221/1900/files/bigstock-Beach-Chairs-With-Umbrella-And-129286676_1024x1024.jpg?v=1578502192",
      "https://cdn.shopify.com/s/files/1/0089/6221/1900/files/bigstock-Beach-Chairs-With-Umbrella-And-129286676_1024x1024.jpg?v=1578502192",
    ],
    likes: 156,
    comments: 67,
    views: 302,
  },
  {
    profile_photo:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
    username: "@codyF12",
    fullname: "Cody Foreman",
    content:
      "Hey guys, happy to share my shot that were taken my short trips all over europe. Of course, i tried both black and white film with bright 100 iso film. How do you like it?",
    hashtags: ["#love", "#MarriageVacation", "#summervibes"],
    images: [
      "https://cdn.shopify.com/s/files/1/0089/6221/1900/files/bigstock-Beach-Chairs-With-Umbrella-And-129286676_1024x1024.jpg?v=1578502192",
    ],
    likes: 156,
    comments: 67,
    views: 302,
  },
  {
    profile_photo:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
    username: "@codyF12",
    fullname: "Cody Foreman",
    content:
      "Hey guys, happy to share my shot that were taken my short trips all over europe. Of course, i tried both black and white film with bright 100 iso film. How do you like it?",
    hashtags: ["#love", "#MarriageVacation", "#summervibes"],
    images: [
      "https://cdn.shopify.com/s/files/1/0089/6221/1900/files/bigstock-Beach-Chairs-With-Umbrella-And-129286676_1024x1024.jpg?v=1578502192",
      "https://cdn.shopify.com/s/files/1/0089/6221/1900/files/bigstock-Beach-Chairs-With-Umbrella-And-129286676_1024x1024.jpg?v=1578502192",
      "https://cdn.shopify.com/s/files/1/0089/6221/1900/files/bigstock-Beach-Chairs-With-Umbrella-And-129286676_1024x1024.jpg?v=1578502192",
    ],
    likes: 156,
    comments: 67,
    views: 302,
  },
];
const FeedsList: React.FC = () => {
  return (
    <div className="space-y-8">
      {FEEDS.map((feed, index) => {
        const images = feed.images;
        const imageCount = images.length;
        const displayImages = imageCount > 2 ? images.slice(0, 2) : images;
        const hasMore = imageCount > 2;
        return (
          <div className="bg-white rounded-2xl p-2" key={index}>
            <div className="px-4 pt-4 pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={feed.profile_photo}
                    alt="Cody Fisher"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="flex items-center gap-1">
                      <h3 className="font-semibold text-gray-900">
                        {feed.fullname}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-500">{feed.username}</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-full transition">
                  <MoreHorizontal className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <p className="mt-4 text-gray-900 leading-relaxed">
                {feed.content}
              </p>

              <div className="flex gap-1 mt-3 -ml-1">
                {feed.hashtags.map((hashtag, index) => (
                  <span
                    key={index}
                    className="text-sm text-blue-600 hover:underline cursor-pointer"
                  >
                    {hashtag}
                  </span>
                ))}
              </div>
            </div>

            {/* Photo Grid - 4 photos */}
            <div
              className={`grid ${
                feed.images.length > 1 && "grid-cols-2"
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

            {/* Engagement Bar */}
            <div className="px-4 py-3 flex items-center justify-between text-gray-500">
              <button className="flex items-center gap-2 hover:text-blue-600 transition">
                <ThumbsUp className="w-5 h-5" />
                <span className="text-sm">{feed.likes} likes</span>
              </button>
              <button className="flex items-center gap-2 hover:text-blue-600 transition">
                <MessageSquare className="w-5 h-5" />
                <span className="text-sm">{feed.comments} comments</span>
              </button>
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
