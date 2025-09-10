import React from "react";
import type { PageType } from "../../types";

interface Props {
  setCurrentPage: React.Dispatch<React.SetStateAction<PageType>>;
  addNotification: (message: string, type?: "success" | "error" | "info") => void;
}

const Dashboard: React.FC<Props> = ({ setCurrentPage, addNotification }) => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow cursor-pointer hover:scale-105 transition-transform"
          onClick={() => setCurrentPage("manageUsers")}
        >
          <h2 className="text-xl font-semibold">Manage Users</h2>
          <p className="text-gray-500 dark:text-gray-400">
            View, approve, or block passengers and operators.
          </p>
        </div>
        <div
          className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow cursor-pointer hover:scale-105 transition-transform"
          onClick={() => setCurrentPage("manageBuses")}
        >
          <h2 className="text-xl font-semibold">Manage Buses</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Add, update, or remove bus details.
          </p>
        </div>
        <div
          className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow cursor-pointer hover:scale-105 transition-transform"
          onClick={() => setCurrentPage("viewBookings")}
        >
          <h2 className="text-xl font-semibold">View Bookings</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Monitor bookings and cancellations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
