import React from "react";
import {
  Search,
  Bus,
  Navigation,
  Zap,
  Clock,
  Bell,
  Shield,
  Users,
  ChevronRight,
} from "lucide-react";
import type { PageType, SearchFilters } from "../types";

interface HomePageProps {
  setCurrentPage: React.Dispatch<React.SetStateAction<PageType>>;
  searchFilters: SearchFilters;
  setSearchFilters: React.Dispatch<React.SetStateAction<SearchFilters>>;
  handleBusSearch: () => void;
  handleTrackByNumber: () => void;
  isLoading: boolean;
  LoadingSpinner: React.FC;
  addNotification: (
    message: string,
    type?: "success" | "error" | "info"
  ) => void;
}

const HomePage: React.FC<HomePageProps> = ({
  setCurrentPage,
  searchFilters,
  setSearchFilters,
  handleBusSearch,
  handleTrackByNumber,
  isLoading,
  LoadingSpinner,
}) => {
  const [buses, setBuses] = React.useState<any[]>([]);
  const [loadingBuses, setLoadingBuses] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);


  React.useEffect(() => {
    const fetchBuses = async () => {
      try {
        setLoadingBuses(true);
        setError(null);

        const res = await fetch("http://localhost:5000/buses"); 
        if (!res.ok) throw new Error("Failed to fetch buses");

        const data = await res.json();
        setBuses(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoadingBuses(false);
      }
    };

    fetchBuses();
  }, []);
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="px-4 py-12 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-yellow-400/20 dark:bg-yellow-400/10 text-yellow-800 dark:text-yellow-300 px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-yellow-400/30">
                <Zap className="w-4 h-4" />
                Real-time tracking available
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent">
                  Track Your Bus in
                </span>
                <br />
                <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                  Real-Time
                </span>
              </h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl leading-relaxed">
                Never miss your bus again! Search by route or track specific
                buses with live updates, accurate ETAs, and smart notifications.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setCurrentPage("signup")}
                  className="group bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Get Started Free
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => setCurrentPage("tracking")}
                  className="group bg-white/20 dark:bg-white/10 backdrop-blur-sm border border-white/30 dark:border-white/20 text-gray-900 dark:text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white/30 dark:hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Navigation className="w-5 h-5" />
                  Try Live Tracking
                </button>
              </div>
            </div>

            <div className="flex-1 w-full max-w-lg lg:max-w-none">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 blur-3xl"></div>
                <div className="relative bg-white/30 dark:bg-white/5 backdrop-blur-2xl border border-white/30 dark:border-white/10 rounded-3xl p-8 shadow-2xl">
                  <div className="text-center">
                    <div className="relative inline-block mb-6">
                      <div className="relative inline-block mb-6">
                      <div className="relative inline-block mb-3">  {/* was mb-6 */}
                      <img
                      src="/sihlogo.jpg"
                      alt="BusTrack"
                      width={96}         // hint for CLS
                      height={96}
                      className="w-24 h-24 sm:w-28 sm:h-28 object-contain drop-shadow"  />
  <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 bg-green-400 rounded-full animate-pulse border-2 border-white" />
</div>

  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-pulse border-2 border-white"></div>
</div>

                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-pulse border-2 border-white"></div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      Live Bus Tracking
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Real-time location updates with precision GPS tracking
                    </p>
                    <div className="flex items-center justify-center gap-4 text-sm">
                      <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        12 buses online
                      </div>
                      <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                        <Users className="w-4 h-4" />
                        1.2k+ users
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="px-4 py-12 md:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-600/10 blur-2xl"></div>
            <div className="relative bg-white/40 dark:bg-white/5 backdrop-blur-2xl border border-white/30 dark:border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
                <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Find Your Bus
                </span>
              </h2>

              {/* Search by Route */}
              <div className="mb-10">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <div className="p-2 bg-yellow-400/20 rounded-xl">
                    <Search className="w-5 h-5 text-yellow-600" />
                  </div>
                  Search by Route
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input
                    type="text"
                    placeholder="From (e.g., Central Station)"
                    value={searchFilters.from}
                    onChange={(e) =>
                      setSearchFilters((prev) => ({
                        ...prev,
                        from: e.target.value,
                      }))
                    }
                    className="w-full px-6 py-4 rounded-2xl bg-white/60 dark:bg-white/10 backdrop-blur-sm border border-white/30 dark:border-white/20 text-gray-900 dark:text-white placeholder-gray-600 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                  />
                  <input
                    type="text"
                    placeholder="To (e.g., Airport)"
                    value={searchFilters.to}
                    onChange={(e) =>
                      setSearchFilters((prev) => ({
                        ...prev,
                        to: e.target.value,
                      }))
                    }
                    className="w-full px-6 py-4 rounded-2xl bg-white/60 dark:bg-white/10 backdrop-blur-sm border border-white/30 dark:border-white/20 text-gray-900 dark:text-white placeholder-gray-600 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <button
                  onClick={handleBusSearch}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white py-4 px-8 rounded-2xl font-semibold hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <LoadingSpinner />
                  ) : (
                    <>
                      <Search className="w-5 h-5" />
                      Search Available Buses
                    </>
                  )}
                </button>
              </div>

              {/* OR Divider */}
              <div className="my-8 flex items-center">
                <div className="h-px flex-1 bg-white/20 dark:bg-white/10" />
                <span className="mx-4 bg-white/40 dark:bg-white/5 backdrop-blur-sm px-6 py-2 text-gray-600 dark:text-gray-400 font-semibold rounded-full border border-white/30 dark:border-white/20 shrink-0">
                  OR
                </span>
                <div className="h-px flex-1 bg-white/20 dark:bg-white/10" />
              </div>

              {/* Track by Bus Number */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <div className="p-2 bg-blue-400/20 rounded-xl">
                    <Bus className="w-5 h-5 text-blue-600" />
                  </div>
                  Track by Bus Number
                </h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="text"
                    placeholder="Enter Bus Number (e.g., B101)"
                    value={searchFilters.busNumber}
                    onChange={(e) =>
                      setSearchFilters((prev) => ({
                        ...prev,
                        busNumber: e.target.value,
                      }))
                    }
                    className="flex-1 px-6 py-4 rounded-2xl bg-white/60 dark:bg-white/10 backdrop-blur-sm border border-white/30 dark:border-white/20 text-gray-900 dark:text-white placeholder-gray-600 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleTrackByNumber()
                    }
                  />
                  <button
                    onClick={handleTrackByNumber}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 px-8 rounded-2xl font-semibold hover:from-blue-600 hover:to-blue-700 hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[140px]"
                  >
                    {isLoading ? (
                      <LoadingSpinner />
                    ) : (
                      <>
                        <Navigation className="w-5 h-5" />
                        Track Now
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Available Buses Section */}
      <section className="px-4 py-8 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gray-900/50 border border-gray-700 rounded-2xl shadow-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-white mb-4">
              Available Buses
            </h2>

            {loadingBuses && (
              <p className="text-gray-300 animate-pulse">Loading buses...</p>
            )}

            {error && <p className="text-red-400 font-medium">{error}</p>}

            {!loadingBuses && !error && buses.length > 0 && (
              <ul className="mt-6 space-y-4 text-left">
                {buses.map((bus) => (
                  <li
                    key={bus._id}
                    className="bg-white/60 dark:bg-white/10 backdrop-blur-md border border-white/30 dark:border-white/20 rounded-2xl p-4 shadow-md"
                  >
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Bus No: {bus.number}
                    </span>
                    <br />
                    <span className="text-gray-600 dark:text-gray-400 text-sm">
                      Route: {bus.route}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {!loadingBuses && !error && buses.length === 0 && (
              <p className="text-gray-400">No buses available.</p>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Why Choose BusTrack?
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Experience the future of public transportation with our
              cutting-edge tracking technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Search className="w-8 h-8" />,
                title: "Smart Search",
                description:
                  "Find buses by route or number with intelligent filtering and suggestions",
                color: "from-yellow-400 to-orange-500",
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: "Real-Time Tracking",
                description:
                  "Live location updates with GPS precision and accurate ETA calculations",
                color: "from-blue-400 to-blue-600",
              },
              {
                icon: <Bell className="w-8 h-8" />,
                title: "Smart Alerts",
                description:
                  "Personalized notifications to ensure you never miss your bus",
                color: "from-green-400 to-green-600",
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Reliable Service",
                description:
                  "99.9% uptime with enterprise-grade infrastructure and monitoring",
                color: "from-purple-400 to-purple-600",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Community Driven",
                description:
                  "Real-time updates from drivers and passengers for better accuracy",
                color: "from-pink-400 to-pink-600",
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Lightning Fast",
                description:
                  "Optimized performance with instant search results and updates",
                color: "from-indigo-400 to-indigo-600",
              },
            ].map((feature, index) => (
              <div key={index} className="group relative">
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl rounded-2xl bg-gradient-to-r ${feature.color}`}
                ></div>
                <div className="relative bg-white/30 dark:bg-white/5 backdrop-blur-2xl border border-white/30 dark:border-white/10 rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                  <div
                    className={`inline-flex p-3 rounded-2xl bg-gradient-to-r ${feature.color} text-white mb-6 shadow-lg`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
