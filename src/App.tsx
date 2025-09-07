import { useState, useEffect, useMemo, useCallback } from "react";
import { AlertCircle, CheckCircle, Bus } from "lucide-react";

// Types
import type { BusItem, SearchFilters, PageType } from "./types";

// Components
import Header from "./components/Header";

// Pages (use the same filenames as in your project tree)
import HomePage from "./pages/HomePage";
import RoutesPage from "./pages/RoutesPage";
import TrackingPage from "./pages/TrackingPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

// Data
import { mockBuses } from "./data/mockBuses";

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    from: "",
    to: "",
    busNumber: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBus, setSelectedBus] = useState<BusItem | null>(null);
  const [notifications, setNotifications] = useState<
    Array<{ id: number; message: string; type: "success" | "error" | "info" }>
  >([]);

  // 🔹 Backend data + error states
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("smartbus-theme");
      if (saved === "dark" || saved === "light")
        return saved as "dark" | "light";
      const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
      return prefers ? "dark" : "light";
    }
    return "dark";
  });

  // 🔹 Fetch data from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/mockroutes")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => setError(err.message));
  }, []);

  // 🔹 Theme sync
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("smartbus-theme", theme);
  }, [theme]);

  // Derived data
  const filteredBuses = useMemo(() => {
    return mockBuses.filter((bus) => {
      const matchesNumber =
        !searchFilters.busNumber ||
        bus.number
          .toLowerCase()
          .includes(searchFilters.busNumber.toLowerCase());
      const matchesFrom =
        !searchFilters.from ||
        bus.route.toLowerCase().includes(searchFilters.from.toLowerCase());
      const matchesTo =
        !searchFilters.to ||
        bus.route.toLowerCase().includes(searchFilters.to.toLowerCase());
      return matchesNumber && matchesFrom && matchesTo;
    });
  }, [searchFilters]);

  // Notifications
  const addNotification = useCallback(
    (message: string, type: "success" | "error" | "info" = "info") => {
      const id = Date.now();
      setNotifications((prev) => [...prev, { id, message, type }]);
      setTimeout(
        () => setNotifications((prev) => prev.filter((n) => n.id !== id)),
        5000
      );
    },
    []
  );

  // Search handlers
  const handleBusSearch = useCallback(async () => {
    if (!searchFilters.from && !searchFilters.to && !searchFilters.busNumber) {
      addNotification("Please enter search criteria", "error");
      return;
    }
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsLoading(false);
    if (filteredBuses.length) {
      addNotification(
        `Found ${filteredBuses.length} bus(es) matching your criteria`,
        "success"
      );
      setCurrentPage("tracking");
    } else {
      addNotification("No buses found matching your criteria", "error");
    }
  }, [searchFilters, filteredBuses, addNotification]);

  const handleTrackByNumber = useCallback(async () => {
    if (!searchFilters.busNumber.trim()) {
      addNotification("Please enter a bus number", "error");
      return;
    }
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    const bus = mockBuses.find(
      (b) => b.number.toLowerCase() === searchFilters.busNumber.toLowerCase()
    );
    setIsLoading(false);
    if (bus) {
      setSelectedBus(bus);
      addNotification(`Now tracking Bus ${bus.number}`, "success");
      setCurrentPage("tracking");
    } else {
      addNotification(`Bus ${searchFilters.busNumber} not found`, "error");
    }
  }, [searchFilters.busNumber, addNotification]);

  // Local UI bits
  const NotificationContainer = () => (
    <div className="fixed top-20 right-4 z-50 space-y-2">
      {notifications.map((n) => (
        <div
          key={n.id}
          className={`p-4 rounded-xl backdrop-blur-xl border shadow-lg transition-all ${
            n.type === "success"
              ? "bg-green-500/20 border-green-400/30 text-green-800 dark:text-green-300"
              : n.type === "error"
              ? "bg-red-500/20 border-red-400/30 text-red-800 dark:text-red-300"
              : "bg-blue-500/20 border-blue-400/30 text-blue-800 dark:text-blue-300"
          }`}
        >
          <div className="flex items-center gap-2">
            {n.type === "success" && <CheckCircle className="w-4 h-4" />}
            {n.type === "error" && <AlertCircle className="w-4 h-4" />}
            <span className="text-sm font-medium">{n.message}</span>
          </div>
        </div>
      ))}
    </div>
  );

  const LoadingSpinner = () => (
    <div className="flex items-center justify-center gap-2">
      <div className="w-4 h-4 bg-yellow-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
      <div className="w-4 h-4 bg-yellow-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
      <div className="w-4 h-4 bg-yellow-400 rounded-full animate-bounce" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-black text-gray-900 dark:text-white">
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        theme={theme}
        setTheme={setTheme}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        addNotification={addNotification}
      />

      <NotificationContainer />

      <main className="max-w-[1600px] mx-auto">
        {currentPage === "home" && (
          <HomePage
            setCurrentPage={setCurrentPage}
            searchFilters={searchFilters}
            setSearchFilters={setSearchFilters}
            handleBusSearch={handleBusSearch}
            handleTrackByNumber={handleTrackByNumber}
            isLoading={isLoading}
            LoadingSpinner={LoadingSpinner}
            addNotification={addNotification}
          />
        )}
        {currentPage === "routes" && (
          <RoutesPage
            setCurrentPage={setCurrentPage}
            addNotification={addNotification}
          />
        )}
        {currentPage === "tracking" && (
          <TrackingPage
            setCurrentPage={setCurrentPage}
            filteredBuses={filteredBuses}
            selectedBus={selectedBus}
            setSelectedBus={setSelectedBus}
            addNotification={addNotification}
          />
        )}
        {currentPage === "contact" && (
          <ContactPage
            setCurrentPage={setCurrentPage}
            addNotification={addNotification}
          />
        )}
        {currentPage === "login" && (
          <LoginPage
            setCurrentPage={setCurrentPage}
            setIsLoggedIn={setIsLoggedIn}
            addNotification={addNotification}
          />
        )}
        {currentPage === "signup" && (
          <SignupPage
            setCurrentPage={setCurrentPage}
            setIsLoggedIn={setIsLoggedIn}
            addNotification={addNotification}
          />
        )}
      </main>

      <footer className="mt-20 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/40 dark:bg-white/5 backdrop-blur-2xl border border-white/30 dark:border-white/10 rounded-3xl p-8 text-center shadow-2xl">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                <Bus className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold">SmartBus</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Making public transportation smarter, faster, and more reliable
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              © {new Date().getFullYear()} SmartBus • Built with{" "}
              <span className="text-yellow-600 dark:text-yellow-400 font-semibold">
                React
              </span>{" "}
              +{" "}
              <span className="text-yellow-600 dark:text-yellow-400 font-semibold">
                Tailwind CSS
              </span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
