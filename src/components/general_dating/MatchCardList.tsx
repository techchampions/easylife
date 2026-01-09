import React from "react";
import MatchCard from "./MatchCard";

const MatchCardList: React.FC = () => {
  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 space-y-10">
      {list.map((item) => (
        <MatchCard key={item} />
      ))}
    </div>
  );
};

export default MatchCardList;
