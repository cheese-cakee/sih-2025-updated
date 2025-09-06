import React from "react";

interface Props {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}

const TextInput: React.FC<Props> = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}) => (
  <div className="group">
    <label className="block text-sm font-semibold text-gray-800 dark:text-white mb-3 group-focus-within:text-yellow-600 dark:group-focus-within:text-yellow-400 transition-colors duration-300">
      {label}
    </label>
    <input
      type={type}
      required={required}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-6 py-4 rounded-2xl bg-white/60 dark:bg-white/10 backdrop-blur-sm border border-white/30 dark:border-white/20 text-gray-900 dark:text-white placeholder-gray-600 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 hover:bg-white/80 dark:hover:bg-white/15 focus:scale-[1.02] hover:shadow-lg"
    />
  </div>
);

export default TextInput;
