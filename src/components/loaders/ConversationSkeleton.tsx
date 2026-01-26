interface ConversationListSkeletonProps {
  count?: number;
}

export const ConversationListSkeleton: React.FC<
  ConversationListSkeletonProps
> = ({ count = 6 }) => {
  return (
    <div className="bg-white rounded-3xl p-8 min-h-[78vh]">
      <div className="divide-y divide-zinc-200">
        {Array.from({ length: count }).map((_, index) => (
          <ConversationSkeletonItem key={index} />
        ))}
      </div>
    </div>
  );
};

export const ConversationSkeletonItem = () => {
  return (
    <div className="flex items-center gap-2 py-2 animate-pulse">
      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-gray-200" />

      <div className="flex-1 space-y-2">
        {/* Name */}
        <div className="h-4 w-32 bg-gray-200 rounded" />

        <div className="flex items-center justify-between">
          {/* Message */}
          <div className="h-3 w-48 bg-gray-200 rounded" />

          {/* Time */}
          <div className="h-3 w-12 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
};
