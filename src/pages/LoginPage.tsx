import React, { useState } from "react";
import { Bus, Eye, EyeOff } from "lucide-react";
import type { PageType } from "../types";

interface Props {
  setCurrentPage: React.Dispatch<React.SetStateAction<PageType>>;
  setIsLoggedIn: (v: boolean) => void;
  addNotification: (
    message: string,
    type?: "success" | "error" | "info"
  ) => void;
}

const LoginPage: React.FC<Props> = ({
  setCurrentPage,
  setIsLoggedIn,
  addNotification,
}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "passenger",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // reset error on new attempt

    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        setIsLoggedIn(true);
        setCurrentPage("home");
        addNotification("Welcome back! You're now logged in.", "success");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("⚠️ Server not reachable");
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="relative">
          {/* background blur effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 blur-2xl"></div>
          <div className="relative bg-white/40 dark:bg-white/5 backdrop-blur-2xl border border-white/30 dark:border-white/10 rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Bus className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Sign in to continue your journey
              </p>
            </div>

            {/* 🔹 Show error if any */}
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/10 text-red-600 text-sm text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-800 dark:text-white text-sm font-semibold mb-3">
                  User Type
                </label>
                <select
                  value={formData.userType}
                  onChange={(e) =>
                    setFormData({ ...formData, userType: e.target.value })
                  }
                  className="
  w-full px-6 py-4 rounded-2xl 
  bg-white/20 dark:bg-gray-800/30 
  backdrop-blur-md 
  border border-white/30 dark:border-white/20 
  text-gray-900 dark:text-white 
  shadow-lg 
  hover:bg-white/30 dark:hover:bg-gray-800/50 
  hover:scale-105 
  focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent 
  transition-all duration-300 ease-in-out
"

                >
                  <option value="passenger">Passenger</option>
                  <option value="operator">Bus Operator</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="flex flex-col w-full">
  <label htmlFor="email" className="mb-2 text-gray-900 dark:text-white">
    Email Address
  </label>
  <input
    id="email"
    type="email"
    placeholder="Enter your email"
    value={formData.email}
    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
    required
    className="
  w-full px-6 py-4 rounded-2xl 
  bg-white/20 dark:bg-gray-800/30 
  backdrop-blur-md 
  border border-white/30 dark:border-white/20 
  text-gray-900 dark:text-white 
  shadow-lg 
  hover:bg-white/30 dark:hover:bg-gray-800/50 
  hover:scale-105 
  focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent 
  transition-all duration-300 ease-in-out
    "
  />
</div>


              <div>
                <label className="block text-gray-800 dark:text-white text-sm font-semibold mb-3">
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
                    className="
  w-full px-6 py-4 rounded-2xl 
  bg-white/20 dark:bg-gray-800/30 
  backdrop-blur-md 
  border border-white/30 dark:border-white/20 
  text-gray-900 dark:text-white 
  shadow-lg 
  hover:bg-white/30 dark:hover:bg-gray-800/50 
  hover:scale-105 
  focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent 
  transition-all duration-300 ease-in-out
"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
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
                className="w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white py-4 px-8 rounded-2xl font-semibold hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
              >
                Sign In
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Don&apos;t have an account?{" "}
                <button
                  onClick={() => setCurrentPage("signup")}
                  className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300 font-semibold transition-colors"
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
