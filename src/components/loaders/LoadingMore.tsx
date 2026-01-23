const LoadingMore = () => {
  return (
    <div className="">
      <div className="flex items-center justify-center">
        <span className="mr-2">Loading more</span>
        <div className="flex gap-2 items-center">
          <div className="animate-[ping_1.5s_0.5s_ease-in-out_infinite] bg-gray-500 h-1 w-1 rounded-full" />
          <div className="animate-[ping_1.5s_0.7s_ease-in-out_infinite] bg-gray-500 h-1 w-1 rounded-full" />
          <div className="animate-[ping_1.5s_0.9s_ease-in-out_infinite] bg-gray-500 h-1 w-1 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default LoadingMore;
