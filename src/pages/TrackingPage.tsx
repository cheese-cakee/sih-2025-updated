import React, { useState } from "react";
import { Bus } from "lucide-react";
import { mockBuses } from "../data/mockBuses";
import type { BusItem } from "../types";
import BackButton from "../components/BackButton";
import type { PageType } from "../types";

interface Props {
  setCurrentPage: React.Dispatch<React.SetStateAction<PageType>>;

}

const TrackingPage: React.FC<Props> = ({ setCurrentPage }) => {
  const [selectedBus, setSelectedBus] = useState<BusItem>(mockBuses[0]);

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <BackButton onClick={() => setCurrentPage("home")} />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Live Tracking</h1>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Select a Bus</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockBuses.map((bus) => (
              <div
                key={bus.id}
                onClick={() => setSelectedBus(bus)}
                className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 backdrop-blur-xl ${
                  selectedBus.id === bus.id
                    ? "bg-yellow-400/20 border-yellow-400"
                    : "bg-white/70 dark:bg-white/5 border-black/10 dark:border-white/10 hover:bg-white/80 dark:hover:bg-white/10"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-gray-900 dark:text-white text-lg">{bus.number}</span>
                  <div
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      bus.status === "On Time"
                        ? "bg-green-400/20 text-green-700 dark:text-green-300"
                        : "bg-red-400/20 text-red-700 dark:text-red-300"
                    }`}
                  >
                    {bus.status}
                  </div>
                </div>
                <p className="text-gray-700 dark:text-white/70 text-sm mb-1">{bus.route}</p>
                <p className="text-yellow-600 dark:text-yellow-400 font-medium">ETA: {bus.eta}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/70 dark:bg-white/5 border rounded-3xl p-6 md:p-8 shadow-2xl">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Live Map - Bus {selectedBus.number}
          </h2>
          <div className="bg-gradient-to-br from-blue-500/20 to-green-500/20 dark:from-blue-500/10 dark:to-green-500/10 rounded-2xl p-8 min-h-[300px] flex items-center justify-center relative overflow-hidden">
            <div className="relative z-10 text-center">
              <div className="relative inline-block">
                <Bus className="w-16 h-16 text-yellow-400 animate-pulse" />
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
              </div>
              <p className="text-gray-900 dark:text-white mt-4 font-medium">Bus {selectedBus.number} is moving</p>
              <p className="text-gray-700 dark:text-white/70 text-sm">{selectedBus.route}</p>
              <p className="text-yellow-700 dark:text-yellow-400 font-bold text-lg mt-2">
                Arriving in {selectedBus.eta}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingPage;
