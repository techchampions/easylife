const ProfileLoadingSkeleton = () => {
  return (
    <div className="overflow-hidden p-3 animate-pulse">
      <div className="space-y-10">
        {/* Header with Profile Picture Skeleton */}
        <div className="relative rounded-2xl overflow-hidden bg-gray-200">
          {/* Profile image skeleton */}
          <div className="w-full h-96 bg-gray-300"></div>

          {/* Edit button skeleton */}
          <div className="absolute top-4 right-4 bg-gray-300/50 p-2 rounded-full">
            <div className="w-5 h-5 bg-gray-400 rounded-full"></div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-gray-300/80 to-transparent p-6 pt-10">
            <div className="flex items-end justify-between">
              <div className="space-y-3">
                {/* Name and age skeleton */}
                <div className="h-8 bg-gray-400 rounded w-64"></div>
                {/* Location skeleton */}
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-gray-400 rounded-full"></div>
                  <div className="h-5 bg-gray-400 rounded w-32"></div>
                </div>
              </div>
            </div>

            {/* Action buttons skeleton */}
            <div className="flex items-center gap-5 mt-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-300 rounded-full p-2">
                  <div className="w-5 h-5 bg-gray-400 rounded-full"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* About Section Skeleton */}
        <div className="p-8 bg-white rounded-2xl mt-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            <div className="h-6 bg-gray-200 rounded w-20"></div>
          </h2>

          <div className="grid grid-cols-2 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-5 bg-gray-300 rounded w-32"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery Section Skeleton */}
        <div className="p-8 bg-white rounded-2xl mt-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            <div className="h-6 bg-gray-200 rounded w-20"></div>
          </h2>

          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide w-full">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="w-40 h-40 shrink-0 bg-gray-200 rounded-md"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLoadingSkeleton;
