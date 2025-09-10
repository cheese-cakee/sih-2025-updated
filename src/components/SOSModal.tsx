// components/SOSModal.tsx
import React from "react";

interface SOSModalProps {
  onClose: () => void;
  onSubmit: (name: string, mobile: string) => void;
}

const SOSModal: React.FC<SOSModalProps> = ({ onClose, onSubmit }) => {
  const [name, setName] = React.useState("");
  const [mobile, setMobile] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(name, mobile);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pt-40 bg-black/40 backdrop-blur-sm">
      <div className="relative w-[90%] max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 animate-fadeIn">
        
        {/* ❌ Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold text-center mb-4">
          🚨 SOS Alert
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-6">
          Please provide your details before sending an SOS alert.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-red-500 outline-none"
          />
          <input
            type="tel"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-red-500 outline-none"
          />

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold shadow-md transition"
          >
            Send SOS
          </button>
        </form>
      </div>
    </div>
  );
};

export default SOSModal;
