import React, { type JSX } from "react";
import { NavLink } from "react-router-dom";

interface NavItemProps {
  label: string;
  icon: JSX.Element;
  path: string;
  badgeCount?: number;
}

const MobileNavItem: React.FC<NavItemProps> = ({
  label,
  icon,
  path,
  badgeCount,
}) => {
  return (
    <NavLink
      to={path}
      end={true}
      className={({ isActive }) =>
        `flex flex-col items-center p-2 rounded-xl w-18.75 ${
          isActive ? "text-secondary bg-secondary/10" : " text-gray-500"
        }`
      }
    >
      <div className={`relative `}>
        {icon}
        {badgeCount && badgeCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
            {badgeCount}
          </span>
        )}
      </div>
      <span className="text-xs">{label}</span>
    </NavLink>
  );
};

export default MobileNavItem;
