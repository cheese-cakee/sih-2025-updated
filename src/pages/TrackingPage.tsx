import React from "react";
import { Clock, Users, Navigation, Bus } from "lucide-react";
import BackButton from "../components/BackButton";
import { mockBuses } from "../data/mockBuses";
import type { PageType, BusItem } from "../types";

interface Props {
  setCurrentPage: React.Dispatch<React.SetStateAction<PageType>>;
  filteredBuses: BusItem[];
  selectedBus: BusItem | null;
  setSelectedBus: (bus: BusItem | null) => void;
  addNotification: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const TrackingPage: React.FC<Props> = ({ 
  setCurrentPage, 
  filteredBuses, 
  selectedBus, 
  setSelectedBus, 
  addNotification 
}) => {
  // Use available buses or fallback to mock data
  const busesToShow = filteredBuses.length > 0 ? filteredBuses : mockBuses;
  const currentBus = selectedBus || busesToShow[0] || mockBuses[0];

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-12">
          <BackButton onClick={() => setCurrentPage("home")} />
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Live Tracking
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Real-time bus locations and arrival predictions
            </p>
          </div>
        </div>

        {/* Bus Selection */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Available Buses
            </h2>
            <span className="text-sm text-gray-600 dark:text-gray-400 bg-white/40 dark:bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
              {busesToShow.length} buses found
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {busesToShow.map((bus) => (
              <div
                key={bus.id}
                onClick={() => {
                  setSelectedBus(bus);
                  addNotification(`Now tracking Bus ${bus.number}`, "info");
                }}
                className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 backdrop-blur-2xl transform hover:scale-105 ${
                  currentBus.id === bus.id
                    ? "bg-yellow-400/30 border-yellow-400 shadow-xl shadow-yellow-400/20"
                    : "bg-white/40 dark:bg-white/5 border-white/30 dark:border-white/10 hover:bg-white/60 dark:hover:bg-white/10 shadow-lg"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-bold text-gray-900 dark:text-white text-xl">
                    {bus.number}
                  </span>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      bus.status === "On Time"
                        ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                        : bus.status === "Delayed"
                        ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                        : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                    }`}
                  >
                    {bus.status}
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 text-sm mb-2 font-medium">
                  {bus.route}
                </p>

                {bus.currentLocation && (
                  <p className="text-gray-600 dark:text-gray-400 text-xs mb-2">
                    Current: {bus.currentLocation}
                  </p>
                )}

                <div className="flex items-center justify-between">
                  <p className="text-yellow-600 dark:text-yellow-400 font-bold">
                    ETA: {bus.eta}
                  </p>
                  {bus.capacity && (
                    <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                      <Users className="w-3 h-3" />
                      {bus.capacity}%
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Map */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-green-500/10 blur-2xl"></div>
          <div className="relative bg-white/40 dark:bg-white/5 backdrop-blur-2xl border border-white/30 dark:border-white/10 rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Live Map - Bus {currentBus.number}
              </h2>
              <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Live tracking active
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500/20 via-green-500/20 to-purple-500/20 dark:from-blue-500/10 dark:via-green-500/10 dark:to-purple-500/10 rounded-2xl p-12 min-h-[400px] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-4 left-4 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
                <div className="absolute top-12 right-8 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <div className="absolute bottom-8 left-12 w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                <div className="absolute bottom-4 right-4 w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
              </div>

              <div className="relative z-10 text-center">
                <div className="relative inline-block mb-6">
                  <Bus className="w-20 h-20 text-yellow-500 animate-pulse" />
                  <div className="absolute -top-3 -right-3 w-6 h-6 bg-green-400 rounded-full animate-ping shadow-lg">
                    <div className="absolute inset-1 bg-green-500 rounded-full"></div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Bus {currentBus.number}
                </h3>

                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  {currentBus.route}
                </p>

                {currentBus.currentLocation && (
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    Currently at: {currentBus.currentLocation}
                  </p>
                )}

                <div className="bg-white/40 dark:bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-sm mx-auto">
                  <p className="text-yellow-700 dark:text-yellow-300 font-bold text-2xl mb-2">
                    Arriving in {currentBus.eta}
                  </p>
                  {currentBus.nextStop && (
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Next stop: {currentBus.nextStop}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center p-4 bg-white/30 dark:bg-white/5 rounded-2xl backdrop-blur-sm">
                <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <p className="font-semibold text-gray-900 dark:text-white">Status</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{currentBus.status}</p>
              </div>

              <div className="text-center p-4 bg-white/30 dark:bg-white/5 rounded-2xl backdrop-blur-sm">
                <Users className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="font-semibold text-gray-900 dark:text-white">Capacity</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {currentBus.capacity || 0}% occupied
                </p>
              </div>

              <div className="text-center p-4 bg-white/30 dark:bg-white/5 rounded-2xl backdrop-blur-sm">
                <Navigation className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <p className="font-semibold text-gray-900 dark:text-white">ETA</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{currentBus.eta}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingPage;