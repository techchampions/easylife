const NotificationsSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl p-8 space-y-3 animate-pulse">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="flex items-start border border-gray-200 p-2 rounded-2xl"
        >
          {/* Left content */}
          <div className="flex items-center gap-2 flex-1 w-[80%]">
            {/* Icon circle */}
            <div className="h-10 w-10 rounded-full bg-gray-200" />

            {/* Text */}
            <div className="w-full space-y-2">
              <div className="h-4 bg-gray-200 rounded w-2/3" />
              <div className="h-3 bg-gray-200 rounded w-full" />
            </div>
          </div>

          {/* Time */}
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 bg-gray-200 rounded-full" />
            <div className="h-3 w-14 bg-gray-200 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationsSkeleton;
