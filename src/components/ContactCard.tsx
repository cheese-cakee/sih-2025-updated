import React from "react";

interface Props {
  icon: React.ReactNode;
  title: string;
  lines: string[];
  color?: string;
}

const ContactCard: React.FC<Props> = ({ icon, title, lines, color = "from-yellow-400 to-orange-500" }) => (
  <div className="relative group">
    <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl rounded-2xl bg-gradient-to-r ${color}`}></div>
    <div className="relative bg-white/40 dark:bg-white/5 backdrop-blur-2xl border border-white/30 dark:border-white/10 rounded-2xl p-6 shadow-xl group-hover:shadow-2xl transform group-hover:scale-105 transition-all duration-300">
      <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-r ${color} text-white mb-4 shadow-lg`}>
        {icon}
      </div>
      <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-3">{title}</h3>
      <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
        {lines.map((line, i) => (
          <p key={i} className="leading-relaxed">{line}</p>
        ))}
      </div>
    </div>
  </div>
);

export default ContactCard;