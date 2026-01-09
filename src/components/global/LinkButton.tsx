"use client";

import React from "react";

interface LinkButtonProps {
  label: string;
  link?: string;
  className?: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const LinkButton: React.FC<LinkButtonProps> = ({
  label,
  link = "/",
  className = "",
  icon,
  rightIcon,
}) => {
  return (
    <a
      href={link}
      className={`w-full bg-soosar flex items-center justify-center py-2 rounded-xl transition duration-300 text-white hover:underline underline-offset-2 ${className}
        `}
    >
      <div className="flex items-center justify-center w-full">
        {icon && <span className="mr-2">{icon}</span>}
        {label}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </div>
    </a>
  );
};

export default LinkButton;
