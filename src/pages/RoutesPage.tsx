import React from "react";
import { Clock, MapPin, Route as RouteIcon } from "lucide-react";
import BackButton from "../components/BackButton";
import { mockRoutes } from "../data/mockRoutes";
import type { PageType } from "../types";

interface Props {
  setCurrentPage: React.Dispatch<React.SetStateAction<PageType>>;
  addNotification: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const RoutePage: React.FC<Props> = ({ setCurrentPage, addNotification }) => {
  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-12">
          <BackButton onClick={() => setCurrentPage("home")} />
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Bus Routes
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Explore all available routes and their schedules
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {mockRoutes.map((route) => (
            <div
              key={route.id}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl rounded-3xl"></div>
              <div className="relative bg-white/40 dark:bg-white/5 backdrop-blur-2xl border border-white/30 dark:border-white/10 rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                      <span className="font-bold text-white text-lg">
                        {route.name.slice(-1)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {route.name}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Every {route.frequency}
                        </span>
                        <span>{route.distance}</span>
                      </div>
                    </div>
                  </div>
                  <RouteIcon className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-500 rounded-full mr-4 shadow"></div>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {route.from}
                    </span>
                  </div>
                  <div className="ml-2 border-l-2 border-dashed border-gray-300 dark:border-gray-600 h-8"></div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-red-500 rounded-full mr-4 shadow"></div>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {route.to}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-6">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {route.stops} stops
                  </span>
                  <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-1 rounded-full">
                    Active
                  </span>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setCurrentPage("tracking");
                      addNotification(`Viewing buses on ${route.name}`, "info");
                    }}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-xl text-sm font-semibold hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    Track Buses
                  </button>
                  <button className="flex-1 bg-white/60 dark:bg-white/10 backdrop-blur-sm border border-white/30 dark:border-white/20 text-gray-900 dark:text-white py-3 px-4 rounded-xl text-sm font-semibold hover:bg-white/80 dark:hover:bg-white/20 transition-all duration-300">
                    Schedule
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoutePage;