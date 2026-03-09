import { ArrowUpRightFromSquare, CheckCircle } from "lucide-react";
import React from "react";
import LinkButton from "../global/LinkButton";
interface Props {
  content: ContentType;
}
const ContentCard: React.FC<Props> = ({ content }) => {
  return (
    <div className="bg-white cursor-pointer hover:bg-custom-pink text-black w-full rounded-xl p-4 flex flex-col">
      <div className="p-4 space-y-1">
        <div className="flex items-center justify-center bg-secondary/20 h-20 w-20 2xl:h-30 2xl:w-30 mx-auto rounded-full">
          {content.icon}
        </div>
        <div className="text-center font-bold text-3xl 2xl:text-5xl">
          {content.title}
        </div>
      </div>
      {content.desc && (
        <p className="p-2 text-center flex-1 text-sm 2xl:text-xl">
          {content.desc}
        </p>
      )}
      {content.list && (
        <ul className="space-y-3 p-2">
          {content.list.map((list, idx) => (
            <li key={idx} className="flex items-center-safe gap-2">
              {" "}
              <CheckCircle size={15} />
              <div className="flex-1 text-sm">{list}</div>
            </li>
          ))}
        </ul>
      )}
      <LinkButton
        label="LEARN MORE"
        className="bg-linear-to-r from-gray-100 to-secondary-light/20 hover:bg-linear-to-tr text-gray-800! mt-4 w-fit! mx-auto px-5 2xl:text-xl"
        rightIcon={
          <ArrowUpRightFromSquare className="text-gray-800" size={15} />
        }
      />
    </div>
  );
};

export default ContentCard;
