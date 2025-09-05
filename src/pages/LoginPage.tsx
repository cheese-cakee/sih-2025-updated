import React, { useState } from "react";
import { Bus, Eye, EyeOff } from "lucide-react";
import type { PageType } from "../types";

interface Props {
  setCurrentPage: React.Dispatch<React.SetStateAction<PageType>>;

  setIsLoggedIn: (v: boolean) => void;
}

const LoginPage: React.FC<Props> = ({ setCurrentPage, setIsLoggedIn }) => {
  const [formData, setFormData] = useState({ email: "", password: "", userType: "passenger" });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setCurrentPage("home");
  };

  return (
    <div className="min-h-screen px-4 py-8 flex items-center justify-center">
      <div className="w-full max-w-md bg-white/70 dark:bg-white/5 border rounded-3xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <Bus className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome Back</h2>
          <p className="text-gray-700 dark:text-white/70">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-800 dark:text-white/80 text-sm font-medium mb-2">User Type</label>
            <select
              value={formData.userType}
              onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white border border-white dark:bg-black dark:text-white"
            >
              <option value="passenger">Passenger</option>
              <option value="operator">Bus Operator</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-800 dark:text-white/80 text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white border border-black/10 dark:bg-white/10 dark:text-white"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-gray-800 dark:text-white/80 text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 pr-12 rounded-xl bg-white border border-black/10 dark:bg-white/10 dark:text-white"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-white/70"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button type="submit" className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 py-3 px-6 rounded-xl font-semibold shadow-lg">
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-700 dark:text-white/70">
            Don't have an account?{" "}
            <button onClick={() => setCurrentPage("signup")} className="text-yellow-500 hover:text-yellow-400 font-medium">
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
