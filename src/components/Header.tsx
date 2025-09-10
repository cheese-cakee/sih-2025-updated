import React from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import HeaderLink from "./HeaderLink";
import MobileLink from "./MobileLink";
import SOSModal from "./SOSModal"; // ✅ Import
import type { PageType } from "../types";

interface Props {
  currentPage: PageType;
  setCurrentPage: React.Dispatch<React.SetStateAction<PageType>>;
  theme: "light" | "dark";
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;
  isLoggedIn: boolean;
  isAdmin: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addNotification: (
    message: string,
    type?: "success" | "error" | "info"
  ) => void;
  handleSOS: () => void;
  userEmail: string | null;
  setUserEmail: React.Dispatch<React.SetStateAction<string | null>>;
}

const Header: React.FC<Props> = ({
  currentPage,
  setCurrentPage,
  theme,
  setTheme,
  isLoggedIn,
  isAdmin,
  setIsLoggedIn,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  addNotification,
  handleSOS,
  userEmail,
  setUserEmail,
}) => {
  const [showSOSModal, setShowSOSModal] = React.useState(false);

  const switchTo = (page: PageType) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 🚨 Handle SOS button click
  const handleSOSClick = () => {
    if (!isLoggedIn) {
      setShowSOSModal(true);
    } else {
      handleSOS(); // existing SOS logic
    }
  };

  // 🚨 When user submits details from modal
  const handleSOSSubmit = (name: string, mobile: string) => {
    console.log("SOS details:", { name, mobile });
    // 🔗 TODO: send to backend if needed
    setShowSOSModal(false);
    handleSOS();
  };

  return (
    <header
      className="sticky top-0 z-50 
    bg-white/10 dark:bg-black/20 
    backdrop-blur-xl 
    border-b border-white/20 dark:border-white/10 
    shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => switchTo("home")}
        >
          <img
            src="/sihlogo.jpg"
            alt="BusTrack"
            className="h-10 w-10 rounded-full shadow-lg"
          />
          <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            BusTrack
          </h1>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex gap-6 text-sm font-medium">
            <HeaderLink
              onClick={() => switchTo("home")}
              active={currentPage === "home"}
            >
              Home
            </HeaderLink>
            <HeaderLink
              onClick={() => switchTo("routes")}
              active={currentPage === "routes"}
            >
              Routes
            </HeaderLink>
            <HeaderLink
              onClick={() => switchTo("tracking")}
              active={currentPage === "tracking"}
            >
              Track
            </HeaderLink>
            <HeaderLink
              onClick={() => switchTo("contact")}
              active={currentPage === "contact"}
            >
              Contact
            </HeaderLink>

            {isAdmin && (
              <>
                <HeaderLink
                  onClick={() => switchTo("adminDashboard")}
                  active={currentPage === "adminDashboard"}
                >
                  Dashboard
                </HeaderLink>
                <HeaderLink
                  onClick={() => switchTo("manageUsers")}
                  active={currentPage === "manageUsers"}
                >
                  Users
                </HeaderLink>
                <HeaderLink
                  onClick={() => switchTo("manageBuses")}
                  active={currentPage === "manageBuses"}
                >
                  Buses
                </HeaderLink>
                <HeaderLink
                  onClick={() => switchTo("manageRoutes")}
                  active={currentPage === "manageRoutes"}
                >
                  Routes
                </HeaderLink>
                <HeaderLink
                  onClick={() => switchTo("viewBookings")}
                  active={currentPage === "viewBookings"}
                >
                  Bookings
                </HeaderLink>
              </>
            )}
          </nav>

          {/* Right Buttons */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-xl bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-md"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* SOS Button */}
            <button
              onClick={handleSOSClick}
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold rounded-xl shadow-md hover:scale-105 transition"
            >
              🚨 SOS
            </button>

            {/* Login/Logout */}
            {isLoggedIn ? (
              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  addNotification("Logged out successfully", "success");
                }}
                className="px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-800 text-white rounded-xl shadow-md hover:scale-105 transition"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => switchTo("login")}
                className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-xl shadow-md hover:scale-105 transition"
              >
                Login
              </button>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-xl bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-md"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden mt-2 pb-6 border-t border-white/20 dark:border-white/10 px-4 
        bg-white/10 dark:bg-black/20 backdrop-blur-lg rounded-b-2xl shadow-lg"
        >
          {/* Navigation Links */}
          <nav className="flex flex-col gap-3 pt-4">
            <MobileLink label="Home" onClick={() => switchTo("home")} />
            <MobileLink label="Routes" onClick={() => switchTo("routes")} />
            <MobileLink label="Track" onClick={() => switchTo("tracking")} />
            <MobileLink label="Contact" onClick={() => switchTo("contact")} />

            {isAdmin && (
              <>
                <MobileLink
                  label="Dashboard"
                  onClick={() => switchTo("adminDashboard")}
                />
                <MobileLink
                  label="Users"
                  onClick={() => switchTo("manageUsers")}
                />
                <MobileLink
                  label="Buses"
                  onClick={() => switchTo("manageBuses")}
                />
                <MobileLink
                  label="Routes"
                  onClick={() => switchTo("manageRoutes")}
                />
                <MobileLink
                  label="Bookings"
                  onClick={() => switchTo("viewBookings")}
                />
              </>
            )}
          </nav>

          {/* Divider */}
          <div className="my-4 border-t border-white/20 dark:border-white/10"></div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleSOSClick}
              className="w-full py-3 bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold rounded-xl shadow-md hover:scale-105 transition"
            >
              🚨 SOS
            </button>

            {isLoggedIn ? (
              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  addNotification("Logged out successfully", "success");
                }}
                className="w-full py-3 bg-gradient-to-r from-gray-600 to-gray-800 text-white rounded-xl shadow-md hover:scale-105 transition"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => switchTo("login")}
                className="w-full py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-xl shadow-md hover:scale-105 transition"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}

      {/* 🚨 SOS Modal */}
      {showSOSModal && (
        <SOSModal
          onClose={() => setShowSOSModal(false)}
          onSubmit={handleSOSSubmit}
        />
      )}
    </header>
  );
};

export default Header;
