import React from "react";

interface Props {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const HeaderLink: React.FC<Props> = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`relative px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
      active
        ? "text-yellow-600 dark:text-yellow-400 bg-yellow-400/10"
        : "text-gray-700 hover:text-yellow-600 dark:text-gray-300 dark:hover:text-yellow-400 hover:bg-white/10 dark:hover:bg-white/5"
    }`}
  >
    {children}
    {active && (
      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-yellow-500 rounded-full"></div>
    )}
  </button>
);

export default HeaderLink;