import { Binoculars, Gem, Goal } from "lucide-react";
import React from "react";
import ContentCard from "./ContentCard";

const CONTENTS: ContentType[] = [
  // {
  //   icon: <Sparkle size={45} />,
  //   title: "Our Features",
  //   // desc: null,
  //   list: [
  //     "Relationship Couching / Marriage Mentorship (Singles & Couples)",
  //     " General Marriage Trainings (Singles & Couples)",
  //     " Marriage Connections ( Singles Only)",
  //     " Marriage Reconciliations (Couples Only)",
  //     " Coordinated Godly Match Making (Singles Only)",
  //   ],
  // },
  {
    icon: <Binoculars className="w-20 h-20 2xl:w-30 2xl:h-30 text-black" />,
    title: "Vision",
    desc: "To Make Marriage Wisdom Easily Accessible To All Those Interest.",
    // list: null,
  },
  {
    icon: <Goal className="w-20 h-20 2xl:w-30 2xl:h-30 text-black" />,
    title: "Mission",
    desc: "To Facilitate Marriage Connections For Singles, Marriage Bonding / Reconciliation For Couples, And Long Lasting, Durable And Enjoyable Marriage For All Those Interested.",
    // list: null,
  },
  {
    icon: <Gem className="w-20 h-20 2xl:w-30 2xl:h-30 text-black" />,
    title: "Core Values",
    desc: "Our Core Values Are Integrity, Sincerity, Spirituality, Openness And Godliness.",
    // list: null,
  },
];
const MissionVision: React.FC = () => {
  return (
    <div className="w-full md:w-[75%] mx-auto">
      <div className="grid lg:grid-cols-3 gap-4 p-4 md:p-8">
        {CONTENTS.map((content, index) => (
          <ContentCard key={index} content={content} />
        ))}
      </div>
    </div>
  );
};

export default MissionVision;
