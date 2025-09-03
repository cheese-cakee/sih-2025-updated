import React, { useEffect, useMemo, useState } from "react";

import {
  Search,
  MapPin,
  Clock,
  Bus,
  Menu,
  X,
  Route as RouteIcon,
  Bell,
  ArrowLeft,
  Phone,
  Mail,
  Eye,
  EyeOff,
  Moon,
  Sun,
} from "lucide-react";

// ------------------------------------------ Types --------------------------------------------
interface BusItem {
  id: number;
  number: string;
  route: string;
  eta: string;
  status: "On Time" | "Delayed";
}

interface RouteItem {
  id: number;
  name: string;
  from: string;
  to: string;
  frequency: string;
}

// App
export default function App() {
  const [currentPage, setCurrentPage] = useState<
    "home" | "routes" | "tracking" | "contact" | "login" | "signup"
  >("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [busNumber, setBusNumber] = useState("");


  const [theme, setTheme] = useState<"light" | "dark">(() => {
    // Respect system preference on first load
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("smartbus-theme");
      if (saved === "dark" || saved === "light") return saved;
      const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
      return prefers ? "dark" : "light";
    }
    return "dark";
  });

  useEffect(() => {
    // Apply theme to <html> for Tailwind dark classes
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("smartbus-theme", theme);
  }, [theme]);



  // Mock data could be fetched from API later
  const mockBuses: BusItem[] = useMemo(
    () => [
      {
        id: 1,
        number: "B101",
        route: "Central Station → Airport",
        eta: "5 min",
        status: "On Time",
      },
      {
        id: 2,
        number: "B205",
        route: "Mall → University",
        eta: "12 min",
        status: "Delayed",
      },
      {
        id: 3,
        number: "B308",
        route: "Hospital → Downtown",
        eta: "8 min",
        status: "On Time",
      },
    ],
    []
  );

  const mockRoutes: RouteItem[] = useMemo(
    () => [
      {
        id: 1,
        name: "Route A",
        from: "Central Station",
        to: "Airport",
        frequency: "10 min",
      },
      {
        id: 2,
        name: "Route B",
        from: "Mall",
        to: "University",
        frequency: "15 min",
      },
      {
        id: 3,
        name: "Route C",
        from: "Hospital",
        to: "Downtown",
        frequency: "12 min",
      },
    ],
    []
  );

  // ----------------------------------------- Header ------------------------------------------------
  const Header = () => (
    <header className="sticky top-0 z-50 bg-white/70 dark:bg-white/5 backdrop-blur-xl border-b border-black/10 dark:border-white/10 px-4 py-3 md:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-yellow-400 flex items-center justify-center shadow">
            <Bus className="w-5 h-5 text-gray-900" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            SmartBus
          </h1>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <nav className="flex gap-6 text-sm font-medium">
            <HeaderLink
              onClick={() => setCurrentPage("home")}
              active={currentPage === "home"}
            >
              Home
            </HeaderLink>
            <HeaderLink
              onClick={() => setCurrentPage("routes")}
              active={currentPage === "routes"}
            >
              Routes
            </HeaderLink>
            <HeaderLink
              onClick={() => setCurrentPage("tracking")}
              active={currentPage === "tracking"}
            >
              Track
            </HeaderLink>
            <HeaderLink
              onClick={() => setCurrentPage("contact")}
              active={currentPage === "contact"}
            >
              Contact
            </HeaderLink>
          </nav>

          <div className="flex items-center gap-2">
            <button
              aria-label="Toggle theme"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="inline-flex items-center gap-2 rounded-lg border border-black/10 dark:border-white/10 px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/10 transition"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
              <span className="hidden lg:inline">
                {theme === "dark" ? "Light" : "Dark"} mode
              </span>
            </button>

            {isLoggedIn ? (
              <button
                onClick={() => setIsLoggedIn(false)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => setCurrentPage("login")}
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg font-medium transition"
              >
                Login
              </button>
            )}
          </div>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <button
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg border border-black/10 dark:border-white/10 text-gray-700 dark:text-gray-200"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
          <button
            className="p-2 text-gray-900 dark:text-white"
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 pb-4 border-t border-black/10 dark:border-white/10">
          <div className="flex flex-col gap-2 mt-4">
            <MobileLink label="Home" onClick={() => switchTo("home")} />
            <MobileLink label="Routes" onClick={() => switchTo("routes")} />
            <MobileLink label="Track" onClick={() => switchTo("tracking")} />
            <MobileLink label="Contact" onClick={() => switchTo("contact")} />
            {isLoggedIn ? (
              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  setIsMobileMenuOpen(false);
                }}
                className="text-left bg-red-500 text-white px-4 py-2 rounded-lg w-fit mt-2"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => {
                  setCurrentPage("login");
                  setIsMobileMenuOpen(false);
                }}
                className="text-left bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-medium w-fit mt-2"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );

  const switchTo = (page: typeof currentPage) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const containerBase =
    "min-h-screen bg-gradient-to-b from-purple-600/20 via-purple-900/20 to-black px-4 md:px-6 lg:px-8 py-8 dark:from-[#0b0b12] dark:via-[#0b0b12] dark:to-black";

  // --- Pages -----------------------------------------------------------
  const HomePage = () => (
    <div className="min-h-screen">
      <section className="px-4 py-8 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                Track Your Bus in{" "}
                <span className="text-yellow-500">Real-Time</span>
              </h2>
              <p className="text-lg text-gray-700 dark:text-white/80 mb-6 max-w-2xl">
                Never miss your bus again! Search by route or track specific
                buses with live updates and accurate ETAs.
              </p>
              <button
                onClick={() => setCurrentPage("signup")}
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-8 py-3 rounded-xl font-semibold hover:from-yellow-500 hover:to-yellow-600 transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
              >
                Get Started Free
              </button>
            </div>

            <div className="flex-1 w-full max-w-md lg:max-w-none">
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 dark:from-blue-500/10 dark:to-purple-600/10 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-3xl p-8 shadow-2xl">
                <div className="text-center">
                  <Bus className="w-24 h-24 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Live Bus Tracking
                  </h3>
                  <p className="text-gray-700 dark:text-white/70">
                    Real-time location updates
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-8 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Find Your Bus
            </h2>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <Search className="w-5 h-5" /> Search by Route
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                <input
                  type="text"
                  placeholder="From (e.g., Central Station)"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-black/10 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-white/10 dark:text-white dark:placeholder-white/60 dark:border-white/20"
                />
                <input
                  type="text"
                  placeholder="To (e.g., Airport)"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-black/10 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-white/10 dark:text-white dark:placeholder-white/60 dark:border-white/20"
                />
              </div>
              <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 py-3 px-6 rounded-xl font-semibold hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 shadow-lg">
                Search Available Buses
              </button>
            </div>

            <div className="text-center text-gray-600 dark:text-white/60 font-semibold py-2">
              OR
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Track by Bus Number
              </h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Enter Bus Number (e.g., B101)"
                  value={busNumber}
                  onChange={(e) => setBusNumber(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl bg-white border border-black/10 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-white/10 dark:text-white dark:placeholder-white/60 dark:border-white/20"
                />
                <button
                  onClick={() => {
                    if (busNumber.trim()) {
                      setCurrentPage("tracking");
                    }
                  }}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-8 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg"
                >
                  Track Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Why Choose SmartBus?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: <Search className="w-8 h-8" />,
                title: "Smart Search",
                description: "Find buses by route or number instantly",
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: "Real-Time Tracking",
                description: "Live location and ETA updates",
              },
              {
                icon: <Bell className="w-8 h-8" />,
                title: "Smart Alerts",
                description: "Never miss your bus again",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-2xl p-6 shadow-xl hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-300"
              >
                <div className="text-yellow-500 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-700 dark:text-white/80">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const LoginPage = () => {
    const [formData, setFormData] = useState({
      email: "",
      password: "",
      userType: "passenger",
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoggedIn(true);
      setCurrentPage("home");
    };

    return (
      <div className="min-h-screen px-4 py-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <Bus className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Welcome Back
              </h2>
              <p className="text-gray-700 dark:text-white/70">
                Sign in to your account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-800 dark:text-white/80 text-sm font-medium mb-2">
                  User Type
                </label>
                <select
                  value={formData.userType}
                  onChange={(e) =>
                    setFormData({ ...formData, userType: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-white border border-black/10 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-white/10 dark:text-white dark:border-white/20"
                >
                  <option
                    value="passenger"
                    className="bg-white dark:bg-gray-900"
                  >
                    Passenger
                  </option>
                  <option
                    value="operator"
                    className="bg-white dark:bg-gray-900"
                  >
                    Bus Operator
                  </option>
                  <option value="admin" className="bg-white dark:bg-gray-900">
                    Admin
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-gray-800 dark:text-white/80 text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-white border border-black/10 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-white/10 dark:text-white dark:placeholder-white/60 dark:border-white/20"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-gray-800 dark:text-white/80 text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full px-4 py-3 pr-12 rounded-xl bg-white border border-black/10 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-white/10 dark:text-white dark:placeholder-white/60 dark:border-white/20"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-white/70 hover:opacity-80"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 py-3 px-6 rounded-xl font-semibold hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 shadow-lg"
              >
                Sign In
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-700 dark:text-white/70">
                Don't have an account? {""}
                <button
                  onClick={() => setCurrentPage("signup")}
                  className="text-yellow-500 hover:text-yellow-400 font-medium"
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const SignupPage = () => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      userType: "passenger",
      phone: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      setIsLoggedIn(true);
      setCurrentPage("home");
    };

    return (
      <div className="min-h-screen px-4 py-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <Bus className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Join SmartBus
              </h2>
              <p className="text-gray-700 dark:text-white/70">
                Create your account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-800 dark:text-white/80 text-sm font-medium mb-2">
                  User Type
                </label>
                <select
                  value={formData.userType}
                  onChange={(e) =>
                    setFormData({ ...formData, userType: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-white border border-black/10 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-white/10 dark:text-white dark:border-white/20"
                >
                  <option
                    value="passenger"
                    className="bg-white dark:bg-gray-900"
                  >
                    Passenger
                  </option>
                  <option
                    value="operator"
                    className="bg-white dark:bg-gray-900"
                  >
                    Bus Operator
                  </option>
                </select>
              </div>

              <TextInput
                label="Full Name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(v) => setFormData({ ...formData, name: v })}
              />

              <TextInput
                label="Email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(v) => setFormData({ ...formData, email: v })}
              />

              <TextInput
                label="Phone"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={(v) => setFormData({ ...formData, phone: v })}
              />

              <TextInput
                label="Password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={(v) => setFormData({ ...formData, password: v })}
              />

              <TextInput
                label="Confirm Password"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(v) =>
                  setFormData({ ...formData, confirmPassword: v })
                }
              />

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 py-3 px-6 rounded-xl font-semibold hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 shadow-lg mt-2"
              >
                Create Account
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-700 dark:text-white/70">
                Already have an account? {""}
                <button
                  onClick={() => setCurrentPage("login")}
                  className="text-yellow-500 hover:text-yellow-400 font-medium"
                >
                  Sign in
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const RoutesPage = () => (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <BackButton />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Bus Routes
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {mockRoutes.map((route) => (
            <div
              key={route.id}
              className="bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-2xl p-6 shadow-xl hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center mr-3">
                    <span className="font-bold text-gray-900">
                      {route.name.slice(-1)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {route.name}
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-white/70">
                      Every {route.frequency}
                    </p>
                  </div>
                </div>
                <RouteIcon className="w-6 h-6 text-yellow-500" />
              </div>

              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-900 dark:text-white">
                    {route.from}
                  </span>
                </div>
                <div className="ml-1.5 border-l-2 border-dashed border-black/20 dark:border-white/20 h-6"></div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                  <span className="text-gray-900 dark:text-white">
                    {route.to}
                  </span>
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

  const TrackingPage = () => {
    const [selectedBus, setSelectedBus] = useState<BusItem>(mockBuses[0]);

    return (
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-8">
            <BackButton />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Live Tracking
            </h1>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Select a Bus
            </h2>
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
                    <span className="font-bold text-gray-900 dark:text-white text-lg">
                      {bus.number}
                    </span>
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
                  <p className="text-gray-700 dark:text-white/70 text-sm mb-1">
                    {bus.route}
                  </p>
                  <p className="text-yellow-600 dark:text-yellow-400 font-medium">
                    ETA: {bus.eta}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Live Map - Bus {selectedBus.number}
            </h2>
            <div className="bg-gradient-to-br from-blue-500/20 to-green-500/20 dark:from-blue-500/10 dark:to-green-500/10 rounded-2xl p-8 min-h-[300px] flex items-center justify-center relative overflow-hidden">
              <div className="relative z-10 text-center">
                <div className="relative inline-block">
                  <Bus className="w-16 h-16 text-yellow-400 animate-pulse" />
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
                </div>
                <p className="text-gray-900 dark:text-white mt-4 font-medium">
                  Bus {selectedBus.number} is moving
                </p>
                <p className="text-gray-700 dark:text-white/70 text-sm">
                  {selectedBus.route}
                </p>
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

  const ContactPage = () => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    };

    return (
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <BackButton />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Contact Us
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-3xl p-6 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextInput
                    label="Full Name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(v) => setFormData({ ...formData, name: v })}
                  />
                  <TextInput
                    label="Email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(v) => setFormData({ ...formData, email: v })}
                  />
                </div>

                <TextInput
                  label="Subject"
                  placeholder="How can we help?"
                  value={formData.subject}
                  onChange={(v) => setFormData({ ...formData, subject: v })}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-800 dark:text-white/80 mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full min-h-[140px] px-4 py-3 rounded-xl bg-white border border-black/10 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-white/10 dark:text-white dark:placeholder-white/60 dark:border-white/20"
                    placeholder="Write your message here..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 py-3 px-6 rounded-xl font-semibold hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 shadow-lg"
                >
                  Send Message
                </button>
              </form>
            </div>

            <div className="space-y-4">
              <ContactCard
                icon={<MapPin className="w-5 h-5" />}
                title="Office"
                lines={["SmartBus HQ", "random avenue, random city"]}
              />
              <ContactCard
                icon={<Phone className="w-5 h-5" />}
                title="Phone"
                lines={["+91 7003434033", "+91 7890603276"]}
              />
              <ContactCard
                icon={<Mail className="w-5 h-5" />}
                title="Email"
                lines={["support@smartbus.app", "contact@smartbus.app"]}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Shared UI
  const BackButton = () => (
    <button
      onClick={() => setCurrentPage("home")}
      className="mr-4 p-2 text-gray-900 hover:text-yellow-600 transition-colors dark:text-white dark:hover:text-yellow-400"
      aria-label="Go back"
    >
      <ArrowLeft className="w-6 h-6" />
    </button>
  );

  const HeaderLink: React.FC<{
    active?: boolean;
    onClick: () => void;
    children: React.ReactNode;
  }> = ({ active, onClick, children }) => (
    <button
      onClick={onClick}
      className={`transition-colors ${
        active
          ? "text-yellow-600 dark:text-yellow-400"
          : "text-gray-800 hover:text-yellow-600 dark:text-white dark:hover:text-yellow-400"
      }`}
    >
      {children}
    </button>
  );

  const MobileLink: React.FC<{ label: string; onClick: () => void }> = ({
    label,
    onClick,
  }) => (
    <button
      onClick={onClick}
      className="text-left text-gray-900 dark:text-white hover:text-yellow-600 dark:hover:text-yellow-400 py-2"
    >
      {label}
    </button>
  );

  const TextInput: React.FC<{
    label: string;
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
    type?: string;
  }> = ({ label, value, onChange, placeholder, type = "text" }) => (
    <div>
      <label className="block text-sm font-medium text-gray-800 dark:text-white/80 mb-2">
        {label}
      </label>
      <input
        type={type}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl bg-white border border-black/10 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:bg-white/10 dark:text-white dark:placeholder-white/60 dark:border-white/20"
      />
    </div>
  );

  const ContactCard: React.FC<{
    icon: React.ReactNode;
    title: string;
    lines: string[];
  }> = ({ icon, title, lines }) => (
    <div className="bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-2xl p-5 shadow">
      <div className="flex items-center gap-3 mb-2 text-yellow-600 dark:text-yellow-400">
        {icon}
        <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
      </div>
      <div className="text-sm text-gray-700 dark:text-white/70 space-y-1">
        {lines.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
    </div>
  );

  // Render
  return (
    <div className={`${containerBase} bg-white text-gray-900 dark:bg-gray-900 dark:text-white`}>
      <Header />

      <main className="max-w-[1400px] mx-auto">
        {currentPage === "home" && <HomePage />}
        {currentPage === "routes" && <RoutesPage />}
        {currentPage === "tracking" && <TrackingPage />}
        {currentPage === "contact" && <ContactPage />}
        {currentPage === "login" && <LoginPage />}
        {currentPage === "signup" && <SignupPage />}
      </main>

      <footer className="mt-16 py-8 text-center text-sm text-gray-600 dark:text-white/50">
        <p>
          © {new Date().getFullYear()} SmartBus • Built with{" "}
          <span className="text-yellow-600 dark:text-yellow-400">React</span> +
          <span className="text-yellow-600 dark:text-yellow-400">
            {" "}
            Tailwind
          </span>
        </p>
      </footer>
    </div>
  );
}