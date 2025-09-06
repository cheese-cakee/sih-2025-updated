import React from "react";
import { ArrowLeft } from "lucide-react";

interface Props {
  onClick: () => void;
}

const BackButton: React.FC<Props> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="mr-6 p-3 text-gray-900 hover:text-yellow-600 transition-all duration-300 hover:bg-white/20 dark:hover:bg-white/10 rounded-2xl backdrop-blur-sm dark:text-white dark:hover:text-yellow-400"
    aria-label="Go back to home"
  >
    <ArrowLeft className="w-6 h-6" />
  </button>
);

export default BackButton;