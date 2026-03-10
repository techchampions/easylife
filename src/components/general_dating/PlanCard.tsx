import { CheckCircle } from "lucide-react";
import React from "react";
import { useModal } from "../../zustand/modal.state";
import Button from "../global/Button";
import SelectPaymentMethod from "./SelectPaymentMethod";

interface Props {
  item: {
    title: string;
    price: number;
    duration: number;
    list: string[];
    type: string;
  };
}

const PlanCard: React.FC<Props> = ({ item }) => {
  const modal = useModal();
  return (
    <div className="space-y-8 text-primary flex flex-col">
      <div className="flex-1 space-y-4">
        <div className="text-center">
          <div className="text-2xl font-semibold">{item.title}</div>
          <div className="">
            <span className="text-4xl font-bold">${item.price}</span>/
            <span className="">{item.duration} months</span>
          </div>
        </div>
        <div className="h-1 rounded-[100%] w-1/2 mx-auto bg-gray-500" />

        <ul className="space-y-3 p-2">
          {item.list.map((list, idx) => (
            <li key={idx} className="flex items-center-safe gap-2">
              {" "}
              <CheckCircle size={15} />
              <div className="flex-1 text-sm">{list}</div>
            </li>
          ))}
        </ul>
      </div>
      <Button
        label="Subscribe"
        onClick={() => {
          modal.openStrong(<SelectPaymentMethod />);
        }}
      />
    </div>
  );
};

export default PlanCard;
