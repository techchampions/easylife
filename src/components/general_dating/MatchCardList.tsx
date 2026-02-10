import React from "react";
import MatchCard from "./MatchCard";
import ItemMessagePlaceholder from "./ItemMessagePaceholder";
import { UserRoundSearch } from "lucide-react";
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
        <ItemMessagePlaceholder
          title="No users found"
          message="Try again later."
          icon={<UserRoundSearch />}
        />
      )}
    </div>
  );
};

export default MatchCardList;
