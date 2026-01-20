import React from "react";
import Header from "../../components/global/Header";
import MatchCardList from "../../components/general_dating/MatchCardList";
import { useGetAllUsers } from "../../hooks/query/useGetAllUsers";

const Index: React.FC = () => {
  const { data, isLoading, isError } = useGetAllUsers(1);
  const users = data?.users.data || [];
  return (
    <div>
      <Header name="Home" />
      <div className="p-4">
        <MatchCardList users={users} isError={isError} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Index;
