import React from "react";

const HeaderLink: React.FC<{
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ active, onClick, children }) => (
  <button
      onClick={onClick}
      className={`
        relative text-sm font-medium text-white transition-colors
        after:absolute after:left-0 after:-bottom-1 after:h-[2px]
        after:w-0 after:bg-yellow-500 after:transition-all after:duration-300
        hover:after:w-full
        ${active ? "after:w-full text-yellow-400" : ""}
      `}
    >
      {children}
    </button>
);

export default HeaderLink;
