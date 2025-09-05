import React, { useState } from "react";
import { Search, Bus, Clock, Bell } from "lucide-react";
import { mockRoutes } from "../data/mockRoutes";
import type { RouteItem } from "../types";
import type { PageType } from "../types";

interface Props {
  setCurrentPage: React.Dispatch<React.SetStateAction<PageType>>;
}

const HomePage: React.FC<Props> = ({ setCurrentPage }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [busNumber, setBusNumber] = useState("");
  const [searchResults, setSearchResults] = useState<RouteItem[]>([]);

  const handleSearch = () => {
    const results = mockRoutes.filter(
      (r) =>
        (!from || r.from.toLowerCase().includes(from.toLowerCase())) &&
        (!to || r.to.toLowerCase().includes(to.toLowerCase()))
    );
    setSearchResults(results);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="px-4 py-8 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              Track Your Bus in <span className="text-yellow-500">Real-Time</span>
            </h2>
            <p className="text-lg text-gray-700 dark:text-white/80 mb-6 max-w-2xl">
              Never miss your bus again! Search by route or track specific buses with live updates and accurate ETAs.
            </p>
            <button
              onClick={() => setCurrentPage("signup")}
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-8 py-3 rounded-xl font-semibold hover:from-yellow-500 hover:to-yellow-600 transition-all shadow-lg"
            >
              Get Started Free
            </button>
          </div>

          <div className="flex-1 w-full max-w-md lg:max-w-none">
            <div className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 dark:from-blue-500/10 dark:to-purple-600/10 border border-black/10 dark:border-white/10 rounded-3xl p-8 shadow-2xl">
              <div className="text-center">
                <Bus className="w-24 h-24 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Live Bus Tracking
                </h3>
                <p className="text-gray-700 dark:text-white/70">Real-time location updates</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="px-4 py-8 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white/70 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Find Your Bus
          </h2>

          {/* Search by Route */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Search className="w-5 h-5" /> Search by Route
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              <input
                type="text"
                placeholder="From (e.g., Central Station)"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-black/10 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-white/10 dark:text-white"
              />
              <input
                type="text"
                placeholder="To (e.g., Airport)"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border border-black/10 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-white/10 dark:text-white"
              />
            </div>
            <button
              type="button"
              onClick={handleSearch}
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 py-3 px-6 rounded-xl font-semibold hover:from-yellow-500 hover:to-yellow-600 transition-all shadow-lg"
            >
              Search Available Buses
            </button>

            {/* Results */}
            <div className="mt-6 space-y-4">
              {searchResults.length > 0 ? (
                searchResults.map((route) => (
                  <div key={route.id} className="bg-white/70 dark:bg-white/5 border rounded-xl p-4 shadow">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{route.name}</h4>
                    <p className="text-sm text-gray-700 dark:text-white/70">
                      {route.from} → {route.to} • Every {route.frequency}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 dark:text-white/60 text-sm">No routes found. Try different locations.</p>
              )}
            </div>
          </div>

          <div className="text-center text-gray-600 dark:text-white/60 font-semibold py-2">OR</div>

          {/* Track by Bus Number */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Track by Bus Number</h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Enter Bus Number (e.g., B101)"
                value={busNumber}
                onChange={(e) => setBusNumber(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl bg-white border border-black/10 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-white/10 dark:text-white"
              />
              <button
                type="button"
                onClick={() => busNumber.trim() && setCurrentPage("tracking")}
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black py-3 px-8 rounded-xl font-semibold hover:from-yellow-500 hover:to-yellow-600 transition-all shadow-lg"
              >
                Track Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-12 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Why Choose SmartBus?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Search className="w-8 h-8" />, title: "Smart Search", description: "Find buses by route or number instantly" },
              { icon: <Clock className="w-8 h-8" />, title: "Real-Time Tracking", description: "Live location and ETA updates" },
              { icon: <Bell className="w-8 h-8" />, title: "Smart Alerts", description: "Never miss your bus again" },
            ].map((feature, index) => (
              <div key={index} className="bg-white/70 dark:bg-white/5 border rounded-2xl p-6 shadow-xl hover:bg-white/80 dark:hover:bg-white/10 transition">
                <div className="text-yellow-500 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-700 dark:text-white/80">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
