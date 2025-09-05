import React from "react";
import { ArrowLeft } from "lucide-react";

const BackButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="mr-4 p-2 text-gray-900 hover:text-yellow-600 transition-colors dark:text-white dark:hover:text-yellow-400"
    aria-label="Go back"
  >
    <ArrowLeft className="w-6 h-6" />
  </button>
);

export default BackButton;
