const FeedsSkeleton = () => {
  return (
    <div className="space-y-8 animate-pulse">
      {Array.from({ length: 6 }).map((_, index) => (
        <div className="bg-white rounded-2xl p-2" key={index}>
          {/* Header */}
          <div className="px-4 pt-4 pb-3">
            <div className="flex items-start justify-between">
              <div className="space-y-2 w-full">
                <div className="h-5 bg-gray-200 rounded w-2/3" />
                <div className="h-3 bg-gray-200 rounded w-1/3" />
              </div>

              <div className="w-8 h-8 bg-gray-200 rounded-full" />
            </div>

            {/* Content lines */}
            <div className="mt-4 space-y-2">
              <div className="h-3 bg-gray-200 rounded w-full" />
              <div className="h-3 bg-gray-200 rounded w-full" />
              <div className="h-3 bg-gray-200 rounded w-4/5" />
            </div>
          </div>

          {/* Image placeholder */}
          <div className="px-4">
            <div className="grid grid-cols-2 gap-2 h-48">
              <div className="bg-gray-200 rounded-2xl" />
              <div className="bg-gray-200 rounded-2xl" />
            </div>
          </div>

          {/* Engagement bar */}
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-4 w-20 bg-gray-200 rounded" />
              <div className="h-4 w-24 bg-gray-200 rounded" />
            </div>
            <div className="w-6 h-6 bg-gray-200 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeedsSkeleton;
