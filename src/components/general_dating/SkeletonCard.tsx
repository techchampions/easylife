export const SkeletonCard = () => {
  return (
    <div className="animate-pulse rounded-xl space-y-2">
      {/* Image */}
      <div className="h-54 w-full rounded-2xl bg-white relative">
        {/* Content */}
        <div className="mt-0 space-y-1 absolute bottom-0 left-0 p-4 w-full">
          <div className="flex items-center gap-2 pt-2">
            <div className="h-7 w-7 rounded-full bg-gray-200" />
            <div className="h-5 w-1/2 rounded bg-gray-200" />
          </div>
          <div className="h-5 w-3/4 rounded bg-gray-200" />
        </div>
      </div>
      <div className="flex justify-center items-center gap-4">
        <div className="h-10 w-10 rounded-full bg-white"></div>
        <div className="h-10 w-10 rounded-full bg-white"></div>
        <div className="h-10 w-10 rounded-full bg-white"></div>
      </div>
    </div>
  );
};

interface SkeletonGridProps {
  count?: number;
}

export const SkeletonGrid = ({ count = 6 }: SkeletonGridProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};
