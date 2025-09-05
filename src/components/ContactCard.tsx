import React from "react";

const ContactCard: React.FC<{ icon: React.ReactNode; title: string; lines: string[] }> = ({ icon, title, lines }) => (
  <div className="bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-2xl p-5 shadow">
    <div className="flex items-center gap-3 mb-2 text-yellow-600 dark:text-yellow-400">
      {icon}
      <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
    </div>
    <div className="text-sm text-gray-700 dark:text-white/70 space-y-1">
      {lines.map((line, i) => (
        <p key={i}>{line}</p>
      ))}
    </div>
  </div>
);

export default ContactCard;
