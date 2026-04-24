import React from "react";
// import Header from "../../components/global/Header";
// import MatchCardList from "../../components/general_dating/MatchCardList";
import { useGetAllUsersInfinite } from "../../hooks/query/useGetAllUsers";
// import InfiniteScroll from "react-infinite-scroll-component";
// import LoadingMore from "../../components/loaders/LoadingMore";
import { Link } from "react-router-dom";
import CouplesLoveContainer from "../../components/couples_dashboard/CouplesLoveContainer";
import Header from "../../components/global/Header";

const Index: React.FC = () => {
  // const { data, fetchNextPage, hasNextPage, isLoading, isError } =
  useGetAllUsersInfinite();
  // const users = data?.pages.flatMap((page) => page.users) || [];
  const pills = [
    { name: "messages", link: "messages" },
    { name: "counselling", link: "counselling" },
    { name: "subscribe", link: "my-subscription" },
  ];

  return (
    <div>
      <Header name="Home" />
      <div className="p-5 bg-white rounded-2xl w-[95%] md:w-full mx-auto">
        <div className="bg-white rounded-2xl my-2 md:my-5 w-full mx-auto flex items-end justify-between">
          <div className="font-bold">
            <div className="text-gray-500">Welcome to</div>
            <div className="capitalize text-2xl md:text-4xl ">
              EasyLife Couples Portal
            </div>
          </div>
        </div>
        <div className="mb-4 space-y-2">
          <p className="text-left">
            Create lasting bond and enjoy exciting marriage with your partner in
            EasyLife Marriage Academy.
          </p>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-2 text-center">
            {pills.map((pill) => (
              <Link
                to={`/dashboard/${pill.link}`}
                className="capitalize text-sm md:text-base truncate border-2 border-secondary text-secondary hover:bg-secondary hover:text-white px-4 py-2 rounded-lg"
                key={pill.link}
              >
                {pill.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-5 mb-10 px-4 md:px-0">
        <CouplesLoveContainer />
      </div>
      {/* <div className="py-4 px-4 md:px-0 text-2xl font-medium">Singles</div>
      <InfiniteScroll
        className="p-4 md:p-0 overflow-x-hidden!"
        dataLength={users.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<LoadingMore />}
        endMessage={
          <p className="text-center py-8 text-gray-500">No more Users</p>
        }
      >
        <MatchCardList users={users} isError={isError} isLoading={isLoading} />
      </InfiniteScroll> */}
    </div>
  );
};

export default Index;
