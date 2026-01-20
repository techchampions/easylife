import React from "react";
import Header from "../../components/global/Header";
import MatchCardList from "../../components/general_dating/MatchCardList";

const CouplesIndex: React.FC = () => {
  return (
    <div>
      <Header name="Homes" />
      <div className="p-4">
        <MatchCardList />
      </div>
    </div>
  );
};

export default CouplesIndex;
