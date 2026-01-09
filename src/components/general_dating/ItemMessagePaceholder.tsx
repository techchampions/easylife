import { Search } from "lucide-react";
import React from "react";

interface ItemMessagePlaceholderProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode; // This allows you to pass any React element as an icon
}

const ItemMessagePlaceholder: React.FC<ItemMessagePlaceholderProps> = ({
  title,
  message,
  icon,
}) => {
  return (
    <div className="flex flex-col items-center justify-center mt-40 text-center">
      <div className="bg-secondary/20 rounded-full p-4">
        {icon || <Search />}
      </div>
      <h2 className="mt-4 text-xl font-semibold text-gray-800">{title}</h2>
      <p className="mt-2 text-gray-500 lg:px-48 px-5">{message}</p>
    </div>
  );
};

export default ItemMessagePlaceholder;
