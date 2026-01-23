import React from "react";
import Header from "../../components/global/Header";
import MatchCardList from "../../components/general_dating/MatchCardList";
import {
  // useGetAllUsers,
  useGetAllUsersInfinite,
} from "../../hooks/query/useGetAllUsers";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingMore from "../../components/loaders/LoadingMore";

const Index: React.FC = () => {
  // const { data, isLoading, isError } = useGetAllUsers(1);
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useGetAllUsersInfinite();
  const users = data?.pages.flatMap((page) => page.users) || [];
  console.log(data);
  return (
    <div>
      <Header name="Home" />
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
      </InfiniteScroll>
    </div>
  );
};

export default Index;
