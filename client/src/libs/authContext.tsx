import { createContext, useContext, useEffect, useState } from "react";
import { fetchMe, refreshAccessToken } from "./auth";
import { apiPost, apiDel } from "./api";

type User = {
  id: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  refetchUser: () => Promise<void>;
  logout: () => Promise<void>;
  deleteAccount: () => Promise<void>;
};


const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const refetchUser = async () => {
    try {
      const data = await fetchMe();
      setUser(data);
      setIsAuthenticated(true);
    } catch (err) {
      console.error("Refetch user error: ", err);
      setUser(null);
      setIsAuthenticated(false);
      throw err;
    }
  }

  const logout = async () => {
    try {
      await apiPost("/auth/logout");
      setUser(null);
      setIsAuthenticated(false);
      window.location.href = "/login"
    } catch (err) {
      console.error("Logout error: ", err);
      setUser(null);
      setIsAuthenticated(false);
      window.location.href = "/login"
    }
  }

  const deleteAccount = async () => {
    try {
      await apiDel("/auth/delete-account");
      setUser(null);
      setIsAuthenticated(false);
      window.location.href = "/register"
    } catch (err) {
      console.error("Logout error: ", err);
      setUser(null);
      setIsAuthenticated(false);
      window.location.href = "/register"
    }
  }

  useEffect(() => {
    fetchMe()
      .then((data: User | any) => {
        setUser(data)
        setIsAuthenticated(true);
      })
      .catch(() => {
        setUser(null)
        setIsAuthenticated(false);
        refreshAccessToken()
          .then((data) => {
            console.log("data: ", data)
            setUser(data.user)
            setIsAuthenticated(true);
          })
          .catch((err) => {
            console.log("error", err)
            setUser(null)
            setIsAuthenticated(false);
          })
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        refetchUser,
        logout,
        deleteAccount
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

