import React from "react";
// import Header from "../../components/global/Header";
import MatchCardList from "../../components/general_dating/MatchCardList";
import { useGetAllUsers } from "../../hooks/query/useGetAllUsers";
import { Link } from "react-router-dom";

const SinglesPageIndex: React.FC = () => {
  const { data, isLoading, isError } = useGetAllUsers(1);
  const users = data?.users || [];
  const pills = ["discover", "mentorship", "messages"];
  return (
    <div>
      {/* <Header name="Welcome to EasyLife Singles Portal" /> */}
      <div className="bg-white rounded-2xl p-5 my-2 md:my-5 w-[95%] md:w-full mx-auto flex items-center justify-between">
        <div className="font-bold">
          <div className="text-gray-500">Welcome to</div>
          <div className="capitalize text-2xl md:text-4xl ">
            EasyLife Singles Portal
          </div>
        </div>
      </div>
      <div className="px-4 mb-4 space-y-2">
        <p className="text-left">
          Find the right partner today subscribe to EasyLife Marriage academy
          and enjoy unlimited access to discover you partner
        </p>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-2 text-center">
          {pills.map((pill) => (
            <Link
              to={`/dashboard/${pill}`}
              className="capitalize border-2 border-secondary text-secondary hover:bg-secondary hover:text-white px-4 py-2 rounded-lg"
              key={pill}
            >
              {pill}
            </Link>
          ))}
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-2xl font-medium mb-2">Latest Singles</h2>
        <MatchCardList users={users} isError={isError} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default SinglesPageIndex;
