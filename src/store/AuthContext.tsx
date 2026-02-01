// import { createContext, useContext, useEffect, useState } from "react";
// import { jwtDecode } from "jwt-decode";
// import type { JwtPayload } from "../types/auth.types";

// interface AuthContextType {
//   user: JwtPayload | null;
//   token: string | null;
//   isAuthenticated: boolean;
//   login: (token: string) => void;
//   logout: () => void;
  
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<JwtPayload | null>(null);
//   const [token, setToken] = useState<string | null>(null);

//   // restore auth on refresh
//   useEffect(() => {
//     const storedToken = localStorage.getItem("token");
//     if (!storedToken) return;

//     try {
//       const decoded = jwtDecode<JwtPayload>(storedToken);

//       if (!decoded.exp || decoded.exp * 1000 > Date.now()) {
//         setUser(decoded);
//         setToken(storedToken);
//       } else {
//         logout();
//       }
//     } catch {
//       logout();
//     }
//   }, []);

//   const login = (jwtToken: string) => {
//     const decoded = jwtDecode<JwtPayload>(jwtToken);

//     localStorage.setItem("token", jwtToken);
//     setUser(decoded);
//     setToken(jwtToken);
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//     setToken(null);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         token,
//         isAuthenticated: !!user,
//         login,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = (): AuthContextType => {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
//   return ctx;
// };
import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const SYSTEM_TENANT_ID = "000000000000000000000001";

interface DecodedToken {
  userId: string;
  tenantId: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
  org?: {
    name: string;
    display_name: string;
    status: string;
  };
  roles: {
    tenantId: string;
    name: string;
    description?: string;
  };
  exp: number;
  iat: number;
}

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;

  userId: string | null;
  username: string | null;
  email: string | null;
  role: string | null;
  tenantId: string | null;
  orgName: string | null;

  isSystemAdmin: boolean;
  isOrgAdmin: boolean;
  isEmployee: boolean;

  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [decoded, setDecoded] = useState<DecodedToken | null>(null);

  /* ---------- Restore auth on refresh ---------- */
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) return;

    try {
      const decodedToken = jwtDecode<DecodedToken>(storedToken);

      if (decodedToken.exp * 1000 > Date.now()) {
        setToken(storedToken);
        setDecoded(decodedToken);
      } else {
        logout();
      }
    } catch {
      logout();
    }
  }, []);

  /* ---------- Login ---------- */
  const login = (jwtToken: string) => {
    const decodedToken = jwtDecode<DecodedToken>(jwtToken);

    localStorage.setItem("token", jwtToken);
    setToken(jwtToken);
    setDecoded(decodedToken);
  };

  /* ---------- Logout ---------- */
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setDecoded(null);
  };

  /* ---------- Derived values (🔥 important) ---------- */
  const role = decoded?.roles?.name ?? null;
  const tenantId = decoded?.tenantId ?? null;

  const isSystemAdmin =
    tenantId === SYSTEM_TENANT_ID && role === "SYSTEM_ADMIN";

  const isOrgAdmin =
    tenantId !== SYSTEM_TENANT_ID && role === "org_admin";

  const isEmployee =
    !!role && !isSystemAdmin && !isOrgAdmin;

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated: !!decoded,

        userId: decoded?.userId ?? null,
        username: decoded?.user?.username ?? null,
        email: decoded?.user?.email ?? null,
        role,
        tenantId,
        orgName: decoded?.org?.display_name ?? null,

        isSystemAdmin,
        isOrgAdmin,
        isEmployee,

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
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};
