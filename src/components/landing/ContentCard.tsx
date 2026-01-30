import { CheckCircle } from "lucide-react";
import React from "react";
interface Props {
  content: ContentType;
}
const ContentCard: React.FC<Props> = ({ content }) => {
  return (
    <div className="bg-secondary/20 cursor-pointer hover:bg-linear-to-tr from-primary to-secondary text-black/70 hover:text-white/70 w-full rounded-xl p-4">
      <div className="p-4 space-y-1">
        <div className="flex items-center justify-center">{content.icon}</div>
        <div className="text-center font-bold text-2xl">{content.title}</div>
      </div>
      {content.desc && <p className="p-2 text-left">{content.desc}</p>}
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
    </div>
  );
};

export default ContentCard;
