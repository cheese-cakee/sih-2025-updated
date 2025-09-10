import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface User {
  email: string;
  role: "passenger" | "operator" | "admin";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string) => {
    // 🔥 Hardcoded admin
    if (email === "admin@system.com" && password === "admin123") {
      setUser({ email, role: "admin" });
    } else {
      setUser({ email, role: "passenger" }); // default fallback
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
