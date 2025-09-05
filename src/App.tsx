import { useState, useEffect } from "react";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import RoutesPage from "./pages/RoutesPage";
import TrackingPage from "./pages/TrackingPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import type { PageType } from "./types";

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("smartbus-theme");
      if (saved === "dark" || saved === "light") return saved;
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("smartbus-theme", theme);
  }, [theme]);

  const containerBase =
    "min-h-screen bg-gradient-to-b from-purple-600/20 via-purple-900/20 to-black px-4 md:px-6 lg:px-8 py-8 dark:from-[#0b0b12] dark:via-[#0b0b12] dark:to-black";

  return (
    <div
      className={`${containerBase} bg-white text-gray-900 dark:bg-gray-900 dark:text-white`}
    >
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        theme={theme}
        setTheme={setTheme}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <main className="max-w-[1400px] mx-auto">
        {currentPage === "home" && <HomePage setCurrentPage={setCurrentPage} />}
        {currentPage === "routes" && (
          <RoutesPage setCurrentPage={setCurrentPage} />
        )}
        {currentPage === "tracking" && (
          <TrackingPage setCurrentPage={setCurrentPage} />
        )}
        {currentPage === "contact" && (
          <ContactPage setCurrentPage={setCurrentPage} />
        )}
        {currentPage === "login" && (
          <LoginPage
            setCurrentPage={setCurrentPage}
            setIsLoggedIn={setIsLoggedIn}
          />
        )}
        {currentPage === "signup" && (
          <SignupPage
            setCurrentPage={setCurrentPage}
            setIsLoggedIn={setIsLoggedIn}
          />
        )}
      </main>

      <footer className="mt-16 py-8 text-center text-sm text-gray-600 dark:text-white/50">
        <p>
          © {new Date().getFullYear()} SmartBus • Built with{" "}
          <span className="text-yellow-600 dark:text-yellow-400">React</span> +{" "}
          <span className="text-yellow-600 dark:text-yellow-400">Tailwind</span>
        </p>
      </footer>
    </div>
  );
}
