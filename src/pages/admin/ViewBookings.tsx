import React from "react";
import type { PageType } from "../../types";

interface Props {
  setCurrentPage: React.Dispatch<React.SetStateAction<PageType>>;
  addNotification: (message: string, type?: "success" | "error" | "info") => void;
}

const ViewBookings: React.FC<Props> = ({ setCurrentPage, addNotification }) => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">View Bookings</h1>
      <p className="mb-4 text-gray-600 dark:text-gray-400">
        Monitor all bookings, cancellations, and passenger details.
      </p>
      <button
        onClick={() => {
          addNotification("Navigating back to Dashboard", "info");
          setCurrentPage("adminDashboard");
        }}
        className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all"
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default ViewBookings;
