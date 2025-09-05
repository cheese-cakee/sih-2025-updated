import React from "react";

const HeaderLink: React.FC<{ active?: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`transition-colors ${active ? "text-yellow-600 dark:text-yellow-400" : "text-gray-800 hover:text-yellow-600 dark:text-white dark:hover:text-yellow-400"}`}
  >
    {children}
  </button>
);

export default HeaderLink;
