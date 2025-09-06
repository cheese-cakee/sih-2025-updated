import React from "react";
import { Bus, Menu, X, Moon, Sun } from "lucide-react";
import HeaderLink from "./HeaderLink";
import MobileLink from "./MobileLink";
import type { PageType } from "../types";

interface Props {
  currentPage: PageType;
  setCurrentPage: React.Dispatch<React.SetStateAction<PageType>>;
  theme: "light" | "dark";
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addNotification: (
    message: string,
    type?: "success" | "error" | "info"
  ) => void;
}

const Header: React.FC<Props> = ({
  currentPage,
  setCurrentPage,
  theme,
  setTheme,
  isLoggedIn,
  setIsLoggedIn,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  addNotification,
}) => {
  const switchTo = (page: PageType) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-2xl bg-white/80 dark:bg-gray-900/80 border-b border-white/20 dark:border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 md:px-6">
        <div className="flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setCurrentPage("home")}
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
              <Bus className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              BusTrack
            </h1>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <nav className="flex gap-8 text-sm font-medium">
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

            <div className="flex items-center gap-3">
              <button
                aria-label="Toggle theme"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 dark:border-white/10 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
                <span className="hidden lg:inline">
                  {theme === "dark" ? "Light" : "Dark"}
                </span>
              </button>

              {isLoggedIn ? (
                <button
                  onClick={() => {
                    setIsLoggedIn(false);
                    addNotification("Logged out successfully", "success");
                  }}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-5 py-2 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => setCurrentPage("login")}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white px-5 py-2 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
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
              className="p-2 rounded-xl border border-white/20 dark:border-white/10 text-gray-700 dark:text-gray-200 backdrop-blur-sm"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <button
              className="p-2 text-gray-900 dark:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
          <div className="md:hidden mt-4 pb-4 border-t border-white/20 dark:border-white/10">
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
                    addNotification("Logged out successfully", "success");
                  }}
                  className="text-left bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-xl w-fit mt-2"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => {
                    setCurrentPage("login");
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-xl font-medium w-fit mt-2"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
