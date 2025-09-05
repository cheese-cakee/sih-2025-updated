import React, { useState } from "react";
import { Bus } from "lucide-react";
import TextInput from "../components/TextInput";
import type { PageType } from "../types";

interface Props {
  setCurrentPage: React.Dispatch<React.SetStateAction<PageType>>;

  setIsLoggedIn: (v: boolean) => void;
}

const SignupPage: React.FC<Props> = ({ setCurrentPage, setIsLoggedIn }) => {
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
      <div className="w-full max-w-md bg-white/70 dark:bg-white/5 border rounded-3xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <Bus className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Join SmartBus</h2>
          <p className="text-gray-700 dark:text-white/70">Create your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-800 dark:text-white/80 text-sm font-medium mb-2">
              User Type
            </label>
            <select
              value={formData.userType}
              onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white border border-black/10 dark:bg-white/10 dark:text-white"
            >
              <option value="passenger">Passenger</option>
              <option value="operator">Bus Operator</option>
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
            onChange={(v) => setFormData({ ...formData, confirmPassword: v })}
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 py-3 px-6 rounded-xl font-semibold hover:from-yellow-500 hover:to-yellow-600 transition shadow-lg mt-2"
          >
            Create Account
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-700 dark:text-white/70">
            Already have an account?{" "}
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
  );
};

export default SignupPage;
