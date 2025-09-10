// src/pages/admin/ManageMessages.tsx
import React, { useEffect, useState } from "react";
import type { PageType, ContactMessage } from "../../types";

interface Props {
  setCurrentPage: React.Dispatch<React.SetStateAction<PageType>>;
  addNotification: (message: string, type?: "success" | "error" | "info") => void;
}

const ManageMessages: React.FC<Props> = ({ setCurrentPage, addNotification }) => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const API = import.meta.env.VITE_APP_API_URL || "";

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/contact`);
      const data = await res.json();
      if (res.ok) setMessages(data.data || []);
      else addNotification(data.message || "Failed to load messages", "error");
    } catch (err) {
      console.error(err);
      addNotification("Network error while loading messages", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const markRead = async (id: string) => {
    try {
      const res = await fetch(`${API}/api/contact/${id}/read`, { method: "PATCH" });
      const data = await res.json();
      if (res.ok) {
        setMessages((prev) => prev.map((m) => (m._id === id ? { ...m, read: true } : m)));
        addNotification("Marked as read", "success");
      } else addNotification(data.message || "Failed", "error");
    } catch (err) {
      console.error(err);
      addNotification("Server error", "error");
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    try {
      const res = await fetch(`${API}/api/contact/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m._id !== id));
        addNotification("Deleted", "success");
      } else addNotification(data.message || "Failed", "error");
    } catch (err) {
      console.error(err);
      addNotification("Server error", "error");
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Contact Messages</h2>
        <div>
          <button onClick={() => setCurrentPage("adminDashboard")} className="px-4 py-2 bg-gray-100 rounded-lg">Back</button>
        </div>
      </div>

      {loading ? (
        <div>Loading messages...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white/50 dark:bg-gray-800 rounded-lg">
            <thead>
              <tr className="text-left">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Subject</th>
                <th className="px-4 py-2">Message</th>
                <th className="px-4 py-2">When</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-gray-500">No messages</td>
                </tr>
              )}
              {messages.map((m) => (
                <tr key={m._id} className={`${m.read ? "opacity-60" : ""} border-t`}>
                  <td className="px-4 py-3">{m.name}</td>
                  <td className="px-4 py-3">{m.email}</td>
                  <td className="px-4 py-3">{m.subject}</td>
                  <td className="px-4 py-3 max-w-xl break-words">{m.message}</td>
                  <td className="px-4 py-3">{new Date(m.createdAt || "").toLocaleString()}</td>
                  <td className="px-4 py-3 flex gap-2">
                    {!m.read && (
                      <button onClick={() => markRead(m._id!)} className="px-2 py-1 bg-green-500 text-white rounded">Mark read</button>
                    )}
                    <button onClick={() => deleteMessage(m._id!)} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageMessages;
