import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import type { JwtPayload } from "../types/auth.types";

interface AuthContextType {
  user: JwtPayload | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<JwtPayload | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // restore auth on refresh
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) return;

    try {
      const decoded = jwtDecode<JwtPayload>(storedToken);

      if (!decoded.exp || decoded.exp * 1000 > Date.now()) {
        setUser(decoded);
        setToken(storedToken);
      } else {
        logout();
      }
    } catch {
      logout();
    }
  }, []);

  const login = (jwtToken: string) => {
    const decoded = jwtDecode<JwtPayload>(jwtToken);

    localStorage.setItem("token", jwtToken);
    setUser(decoded);
    setToken(jwtToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
