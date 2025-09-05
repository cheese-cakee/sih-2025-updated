import React from "react";

const MobileLink: React.FC<{ label: string; onClick: () => void }> = ({ label, onClick }) => (
  <button onClick={onClick} className="text-left text-gray-900 dark:text-white hover:text-yellow-600 dark:hover:text-yellow-400 py-2">
    {label}
  </button>
);

export default MobileLink;
