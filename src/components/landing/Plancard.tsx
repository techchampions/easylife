import { CheckCircle } from "lucide-react";
import React from "react";
import { useModal } from "../../zustand/modal.state";
import Welcome from "../auth/Welcome";
import Button from "../global/Button";

interface Props {
  item: {
    title: string;
    price: number;
    duration: number;
    list: string[];
  };
}

const PlanCard: React.FC<Props> = ({ item }) => {
  const modal = useModal();
  const getStarted = () => {
    modal.open(<Welcome />);
  };
  return (
    <div className="py-10 px-5 lg:p-20 space-y-8 rounded-4xl shadow-xl bg-white text-primary flex flex-col">
      <div className="flex-1 space-y-4 2xl:space-y-8">
        <div className="text-center 2xl:space-y-4">
          <div className="text-2xl 2xl:text-4xl font-semibold">
            {item.title}
          </div>
          <div className="">
            <span className="text-4xl 2xl:text-6xl font-bold">
              ${item.price}
            </span>
            /<span className="2xl:text-xl">{item.duration} months</span>
          </div>
        </div>
        <div className="h-1 2xl:h-2 rounded-[100%] w-1/2 mx-auto bg-gray-500" />

        <ul className="space-y-3 2xl:space-y-6 p-2 2xl:p-4">
          {item.list.map((list, idx) => (
            <li key={idx} className="flex items-start-safe gap-2">
              {" "}
              <CheckCircle className="w-3.75 2xl:w-7" />
              <div className="flex-1 text-sm 2xl:text-xl">{list}</div>
            </li>
          ))}
        </ul>
      </div>
      <Button label="Select" className="2xl:text-3xl" onClick={getStarted} />
    </div>
  );
};

export default PlanCard;
