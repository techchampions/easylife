import React from "react";

const CONTENT = {
  title: "WHO WE ARE",
  desc: "This platform is for those who are married, who wish to get married, who wish to stay married, and who wish to enjoy their marriages to the full.",
  list: [
    " We run both online and offline trainings as marriage mentorship, for both singles and married couples.",
    " We run physical marriage connection camp meetings for singles.",
    " We run physical marriage bonding / reconciliation camp meetings for married couples.",
    " We run online match making sessions for singles.",
    " We run online marriage bonding / reconciliation sessions for married couples.",
  ],
};
const WhoWeAre: React.FC = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8 md:gap-0">
      <div className="space-y-4">
        <h2 className="text-4xl font-bold">{CONTENT.title}</h2>
        <p>{CONTENT.desc}</p>
      </div>
      <div className="bg-linear-to-tr from-black to-secondary p-10 text-white rounded-2xl">
        <ul className="list-disc list-outside space-y-4">
          {CONTENT.list.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WhoWeAre;
