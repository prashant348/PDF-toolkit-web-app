import { createContext, useContext, useEffect, useState } from "react";
import { logInUser } from "../api/auth/login.api";
import registerUser from "../api/auth/register.api";
import type { LogInFormData } from "../schemas/LogInSchema";
import type { RegisterFormData } from "../schemas/RegisterSchema";
import { fetchMe } from "../api/auth/me.api";
import { refreshAccessToken } from "../api/auth/refresh.api";
import { type User } from "../schemas/UserSchema";
import { logOutUser } from "../api/auth/logout.api";
import { deleteUserAccount } from "../api/auth/deleteAccount.api";
import sendMail from "../api/auth/mail.api";
import type { SendMailFormData } from "../schemas/SendMailSchema";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  logInError: string | null;
  registrationError: string | null;
  isRegistering: boolean;
  isLoggingIn: boolean;
  isMailSent: boolean;
  isSending: boolean;
  sendMailError: string | null;
  registration: (data: RegisterFormData) => Promise<void>;
  logout: () => Promise<void>;
  login: (data: LogInFormData) => Promise<void>;
  deleteAccount: () => Promise<void>;
  sendVerificationMail: (data: SendMailFormData) => Promise<void>;
  setIsMailSent: (isMailSent: boolean) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [logInError, setLogInError] = useState<string | null>(null);
  const [registrationError, setRegistrationError] = useState<string | null>(null);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [isMailSent, setIsMailSent] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [sendMailError, setSendMailError] = useState<string | null>(null);
  // const [isVerified, setIsVerified] = useState<boolean>(false);

  const registration = async (
    data: RegisterFormData
  ): Promise<void> => {
    setIsRegistering(true);
    const res = await registerUser(data);

    if (typeof res === "string") {
      setIsRegistering(false);
      setRegistrationError(res);
    } else if (typeof res === "object") {
      setIsRegistering(false);
      setRegistrationError(null);
      alert("Registration successful!\nPlease check your email to verify your account before logging in.");
      console.log("navigate to login") // add logic to navigate to login
    }
  }

  const login = async (
    data: LogInFormData
  ): Promise<void> => {
    setIsLoggingIn(true);
    const res = await logInUser({
      email: data.email,
      password: data.password
    });

    if (typeof res === "string") {
      setIsLoggingIn(false);
      setLogInError(res);
      setUser(null);
      setIsAuthenticated(false);
    } else if (typeof res === "object") {
      setIsLoggingIn(false);
      setLogInError(null);
      setUser(res);
      setIsAuthenticated(true);
    }
  }

  const logout = async (): Promise<void> => {
    try {
      await logOutUser();
      setUser(null);
      setIsAuthenticated(false);
    } catch (err) {
      console.error("Logout error: ", err);
    }
  }

  const deleteAccount = async (): Promise<void> => {
    try {
      await deleteUserAccount();
      setUser(null);
      setIsAuthenticated(false);
    } catch (err) {
      console.error("Logout error: ", err);
    }
  }

  const sendVerificationMail = async (
    data: SendMailFormData
  ): Promise<void> => {
    setIsSending(true);
    const res = await sendMail(data.email);

    if (typeof res === "string") {
      setIsSending(false);
      setIsMailSent(false);
      setSendMailError(res);
    } else if (typeof res === "object") {
      setIsSending(false);
      setIsMailSent(true);
      setSendMailError(null);
    }

  }

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await fetchMe();
        if (data) {
          setUser(data);
          setIsAuthenticated(true);
          // setIsVerified(data.is_verified);
        }
      } catch (err) {
        console.log("error of fetchMe", err);
        try {
          const data = await refreshAccessToken();
          if (data) {
            setUser(data);
            setIsAuthenticated(true);
            // setIsVerified(data.is_verified);
          }
        } catch (err) {
          console.log("error of refreshAccessToken", err);
          setUser(null);
          setIsAuthenticated(false);
        }
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        logout,
        deleteAccount,
        registration,
        login,
        logInError,
        registrationError,
        isRegistering,
        isLoggingIn,
        sendVerificationMail,
        isMailSent,
        isSending,
        sendMailError,
        setIsMailSent
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

