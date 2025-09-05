import React from "react";
import { Route as RouteIcon } from "lucide-react";
import { mockRoutes } from "../data/mockRoutes";
import BackButton from "../components/BackButton";
import type { PageType } from "../types";

interface Props {
  setCurrentPage: React.Dispatch<React.SetStateAction<PageType>>;

}

const RoutesPage: React.FC<Props> = ({ setCurrentPage }) => {
  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <BackButton onClick={() => setCurrentPage("home")} />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Bus Routes</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {mockRoutes.map((route) => (
            <div
              key={route.id}
              className="bg-white/70 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-6 shadow-xl hover:bg-white/80 dark:hover:bg-white/10 transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center mr-3">
                    <span className="font-bold text-gray-900">{route.name.slice(-1)}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{route.name}</h3>
                    <p className="text-sm text-gray-700 dark:text-white/70">Every {route.frequency}</p>
                  </div>
                </div>
                <RouteIcon className="w-6 h-6 text-yellow-500" />
              </div>

              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-900 dark:text-white">{route.from}</span>
                </div>
                <div className="ml-1.5 border-l-2 border-dashed border-black/20 dark:border-white/20 h-6"></div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                  <span className="text-gray-900 dark:text-white">{route.to}</span>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setCurrentPage("tracking")}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:from-blue-600 hover:to-blue-700 transition"
                >
                  Track Buses
                </button>
                <button className="flex-1 bg-white border border-black/10 text-gray-900 py-2 px-4 rounded-lg text-sm font-medium hover:bg-black/5 transition dark:bg-white/5 dark:border-white/20 dark:text-white dark:hover:bg-white/10">
                  View Schedule
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoutesPage;
