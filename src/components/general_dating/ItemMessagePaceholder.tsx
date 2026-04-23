import { Search } from "lucide-react";
import React from "react";
import Button from "../global/Button";

interface ItemMessagePlaceholderProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode; // This allows you to pass any React element as an icon
  size?: "screen" | "small";
  isAction?: boolean;
  action?: () => void;
  actionText?: string;
  isLoading?: boolean;
}

const ItemMessagePlaceholder: React.FC<ItemMessagePlaceholderProps> = ({
  title,
  message,
  icon,
  size = "screen",
  isAction = false,
  isLoading = false,
  action,
  actionText,
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center ${
        size === "screen" ? "mt-40" : "mt-0"
      } `}
    >
      <div className="bg-secondary/20 rounded-full p-4">
        {icon || <Search />}
      </div>
      <h2 className="mt-4 text-xl font-semibold text-gray-800">{title}</h2>
      <p
        className={`mt-2 text-gray-500 ${
          size === "screen" ? "lg:px-48 px-5" : "px-4"
        }`}
      >
        {message}
      </p>
      {isAction && (
        <Button
          label={actionText || ""}
          onClick={action}
          isLoading={isLoading}
          className="w-fit! px-6 mt-5"
        />
      )}
    </div>
  );
};

export default ItemMessagePlaceholder;
