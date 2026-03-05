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
    <div className="grid md:grid-cols-2 gap-8">
      <div className="h-full w-full rounded-2xl overflow-hidden">
        <img
          src="/images/couple (7).jpg"
          alt=""
          className="object-cover h-full w-full"
        />
      </div>
      <div className="bg-linear-to-tr from-transparent to-transparent p-10 text-black rounded-2xl">
        <div className="space-y-4 2xl:space-y-4 mb-10">
          <h2 className="text-5xl font-black">{CONTENT.title}</h2>
          <p className="2xl:text-xl">{CONTENT.desc}</p>
        </div>
        <ul className="list-disc list-outside space-y-4 2xl:text-xl">
          {CONTENT.list.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WhoWeAre;
