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
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white/70 dark:bg-white/5 backdrop-blur-xl border-b border-black/10 dark:border-white/10 px-4 py-3 md:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-yellow-400 flex items-center justify-center shadow">
            <Bus className="w-5 h-5 text-gray-900" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">SmartBus</h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex gap-6 text-sm font-medium">
            <HeaderLink onClick={() => setCurrentPage("home")} active={currentPage === "home"}>Home</HeaderLink>
            <HeaderLink onClick={() => setCurrentPage("routes")} active={currentPage === "routes"}>Routes</HeaderLink>
            <HeaderLink onClick={() => setCurrentPage("tracking")} active={currentPage === "tracking"}>Track</HeaderLink>
            <HeaderLink onClick={() => setCurrentPage("contact")} active={currentPage === "contact"}>Contact</HeaderLink>
          </nav>

          <div className="flex items-center gap-2">
            <button
              aria-label="Toggle theme"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="inline-flex items-center gap-2 rounded-lg border border-black/10 dark:border-white/10 px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/10 transition"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              <span className="hidden lg:inline">{theme === "dark" ? "Light" : "Dark"} mode</span>
            </button>

            {isLoggedIn ? (
              <button onClick={() => setIsLoggedIn(false)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition">Logout</button>
            ) : (
              <button onClick={() => setCurrentPage("login")} className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg font-medium transition">Login</button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-2">
          <button
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg border border-black/10 dark:border-white/10 text-gray-700 dark:text-gray-200"
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button
            className="p-2 text-gray-900 dark:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 pb-4 border-t border-black/10 dark:border-white/10">
          <div className="flex flex-col gap-2 mt-4">
            <MobileLink label="Home" onClick={() => setCurrentPage("home")} />
            <MobileLink label="Routes" onClick={() => setCurrentPage("routes")} />
            <MobileLink label="Track" onClick={() => setCurrentPage("tracking")} />
            <MobileLink label="Contact" onClick={() => setCurrentPage("contact")} />
            {isLoggedIn ? (
              <button onClick={() => setIsLoggedIn(false)} className="text-left bg-red-500 text-white px-4 py-2 rounded-lg w-fit mt-2">Logout</button>
            ) : (
              <button onClick={() => setCurrentPage("login")} className="text-left bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg font-medium w-fit mt-2">Login</button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
