import { ChevronDown } from "lucide-react";
import { type JSX, useState } from "react";
import { NavLink } from "react-router-dom";

interface NavItemProps {
  label: string;
  badge?: number;
  icon: JSX.Element;
  path?: string;
  children?: { label: string; path: string }[];
  onSlideBack?: (mobileOpen: boolean) => void;
}

const NavItem: React.FC<NavItemProps> = ({
  label,
  icon,
  path,
  children,
  badge,
  onSlideBack,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeNav = () => {
    if (onSlideBack) {
      onSlideBack(false);
    }
  };

  return (
    <div className="w-full">
      {/* Parent Item */}
      {path ? (
        <NavLink
          to={path}
          end={true}
          className={({ isActive }) =>
            `flex items-center justify-between px-7 py-1.75 rounded-lg transition ${
              isActive
                ? "bg-secondary/5 text-secondary"
                : "text-gray-800 hover:bg-secondary/5"
            }`
          }
        >
          <div className="flex items-center space-x-2" onClick={closeNav}>
            {icon}
            <span className=" text-base">{label}</span>
            {(badge || 0) > 0 && badge != undefined && (
              <div className="w-4 h-4 rounded-full bg-red-600 text-white text-[9px] flex items-center justify-center text-center">
                {badge}
              </div>
            )}
          </div>
        </NavLink>
      ) : (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full px-3 py-1.75 text-adron-gray-400 rounded-md hover:bg-brand-400"
        >
          <div className="flex items-center text-[12px] space-x-2">
            {icon}
            <span>{label}</span>
          </div>
          <ChevronDown
            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      )}

      {/* Nested Items */}
      {isOpen && children && (
        <div className="ml-6 mt-2 space-y-2">
          {children.map((child, index) => (
            <NavLink
              key={index}
              to={child.path}
              end={true}
              className={({ isActive }) =>
                `block py-1.75 px-2 rounded-md transition text-left text-[12px] ${
                  isActive
                    ? "bg-brand-400 text-adron-gray-400"
                    : "text-adron-gray-400 hover:bg-brand-400"
                }`
              }
            >
              {child.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavItem;
