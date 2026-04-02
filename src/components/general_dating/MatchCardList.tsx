import { UserRoundSearch } from "lucide-react";
import React from "react";
import ItemMessagePlaceholder from "./ItemMessagePaceholder";
import MatchCard from "./MatchCard";
import { SkeletonGrid } from "./SkeletonCard";
interface Props {
  users: UserListItem[];
  isLoading: boolean;
  isError: boolean;
}
const MatchCardList: React.FC<Props> = ({ users, isError, isLoading }) => {
  if (isError) {
    return (
      <ItemMessagePlaceholder
        title="Failed to get users"
        message="Server error... unable to retrieve users at the moment."
        icon={<UserRoundSearch />}
      />
    );
  }
  if (isLoading) {
    return <SkeletonGrid count={6} />;
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 space-y-10">
      {/* {users.map((user, index) => (
        <MatchCard key={index} user={user} />
      ))} */}
      {Array.isArray(users) && users.length > 0 ? (
        users.map((user, index) => <MatchCard key={index} user={user} />)
      ) : (
        <div className="col-span-2 md:col-span-3">
          <ItemMessagePlaceholder
            title="No users found"
            message="Try again later."
            icon={<UserRoundSearch />}
          />
        </div>
      )}
    </div>
  );
};

export default MatchCardList;
