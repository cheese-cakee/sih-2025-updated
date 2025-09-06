import React, { useState } from "react";
import { Bus } from "lucide-react";
import TextInput from "../components/TextInput";
import type { PageType } from "../types";

interface Props {
  setCurrentPage: React.Dispatch<React.SetStateAction<PageType>>;
  setIsLoggedIn: (value: boolean) => void;
  addNotification: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const SignupPage: React.FC<Props> = ({ setCurrentPage, setIsLoggedIn, addNotification }) => {
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
      addNotification("Passwords do not match", "error");
      return;
    }
    setIsLoggedIn(true);
    setCurrentPage("home");
    addNotification("Account created successfully! Welcome to SmartBus.", "success");
  };

  return (
    <div className="min-h-screen px-4 py-8 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-500/20 blur-2xl"></div>
          <div className="relative bg-white/40 dark:bg-white/5 backdrop-blur-2xl border border-white/30 dark:border-white/10 rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Bus className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Join BusTrack
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Create your account and start tracking
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-gray-800 dark:text-white text-sm font-semibold mb-3">
                  Account Type
                </label>
                <select
                  value={formData.userType}
                  onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
                  className="w-full px-6 py-4 rounded-2xl bg-white/60 dark:bg-white/10 backdrop-blur-sm border border-white/30 dark:border-white/20 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                >
                  <option value="passenger" className="bg-white dark:bg-gray-800">
                    Passenger
                  </option>
                  <option value="operator" className="bg-white dark:bg-gray-800">
                    Bus Operator
                  </option>
                </select>
              </div>

              <TextInput
                label="Full Name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(v) => setFormData({ ...formData, name: v })}
                required
              />

              <TextInput
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(v) => setFormData({ ...formData, email: v })}
                required
              />

              <TextInput
                label="Phone Number"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={(v) => setFormData({ ...formData, phone: v })}
                required
              />

              <TextInput
                label="Password"
                type="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={(v) => setFormData({ ...formData, password: v })}
                required
              />

              <TextInput
                label="Confirm Password"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(v) => setFormData({ ...formData, confirmPassword: v })}
                required
              />

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-8 rounded-2xl font-semibold hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 mt-6"
              >
                Create Account
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <button
                  onClick={() => setCurrentPage("login")}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors"
                >
                  Sign in
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;