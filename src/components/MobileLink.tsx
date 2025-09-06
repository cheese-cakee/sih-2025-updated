import React from "react";

interface Props {
  label: string;
  onClick: () => void;
}

const MobileLink: React.FC<Props> = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="text-left text-gray-900 dark:text-white hover:text-yellow-600 dark:hover:text-yellow-400 py-3 px-4 rounded-xl hover:bg-white/10 dark:hover:bg-white/5 transition-all duration-300 font-medium"
  >
    {label}
  </button>
);

export default MobileLink;