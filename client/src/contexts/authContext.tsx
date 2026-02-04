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
import { sendEmail } from "../api/auth/sendEmail.api";
import type { SendEmailFormData } from "../schemas/SendEmailSchema";
import { verifyEmail } from "../api/auth/verifyEmail.api";
import type { VerifyEmailFormData } from "../schemas/VerifyEmailSchema";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  logInError: string | null;
  isLoggingIn: boolean;
  isAuthenticated: boolean;
  registrationError: string | null;
  isRegistering: boolean;
  isSending: boolean;
  emailSendingError: string | null;
  isEmailSent: boolean;
  isVerifying: boolean;
  emailVerificationError: string | null;
  emailVerificationSuccess: boolean;
  register: (data: RegisterFormData) => Promise<void>;
  logout: () => Promise<void>;
  login: (data: LogInFormData) => Promise<void>;
  deleteAccount: () => Promise<void>;
  sendEmailVerificationLink: (data: SendEmailFormData) => Promise<void>;
  verifyUserEmail: (data: VerifyEmailFormData) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // user
  const [user, setUser] = useState<User | null>(null); // it is problamatic state might be
  // auth loader
  const [loading, setLoading] = useState(true); // not a problamatic state
  // login
  const [logInError, setLogInError] = useState<string | null>(null); // not a problamatic state
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false); // not a problamatic state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);  // not a problamatic state
  // registration
  const [registrationError, setRegistrationError] = useState<string | null>(null); // not a problamatic state
  const [isRegistering, setIsRegistering] = useState<boolean>(false); // not a problamatic state
  // email sending and verification
  const [isSending, setIsSending] = useState<boolean>(false); // not a problamatic state
  const [emailSendingError, setEmailSendingError] = useState<string | null>(null); // not a problamatic state
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false); // not a problamatic state

  const [isVerifying, setIsVerifying] = useState<boolean>(false); // not a problamatic state
  const [emailVerificationError, setEmailVerificationError] = useState<string | null>(null); // not a problamatic state
  const [emailVerificationSuccess, setEmailVerificationSuccess] = useState<boolean>(false); // not a problamatic state
  
  const register = async (
    data: RegisterFormData
  ): Promise<void> => {
    setRegistrationError(null);
    setIsRegistering(true);
    const res = await registerUser(data);

    if (typeof res === "string") {
      setIsRegistering(false);
      setRegistrationError(res);
      setUser(null);
    } else if (typeof res === "object") {
      setIsRegistering(false);
      setRegistrationError(null);
      setUser(res);
      console.log("navigate to login") // add logic to navigate to login
      const encodedEmail = encodeURIComponent(data.email);
      window.location.href = `/verify-email?email=${encodedEmail}`
    }
  }

  const login = async (
    data: LogInFormData
  ): Promise<void> => {
    setLogInError(null);
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
      console.error("deleteAccount error: ", err);
    }
  }

  const sendEmailVerificationLink = async (
    data: SendEmailFormData
  ): Promise<void> => {
    setEmailSendingError(null);
    setIsEmailSent(false);
    setIsSending(true);
    const res = await sendEmail(data.email);

    if (typeof res === "string") {
      setIsSending(false);
      setIsEmailSent(false);
      setEmailSendingError(res);
    } else if (typeof res === "object") {
      setIsSending(false);
      setIsEmailSent(true);
      setEmailSendingError(null);
    }

  }

  const verifyUserEmail = async (
    data: VerifyEmailFormData
  ): Promise<void> => {
    setEmailVerificationError(null);
    setEmailVerificationSuccess(false);
    setIsVerifying(true);

    const res = await verifyEmail(data.token);

    if (typeof res === "string") {
      setIsVerifying(false);
      setEmailVerificationError(res);  
      setEmailVerificationSuccess(false);
    } else if (typeof res === "object") {
      setIsVerifying(false);
      setEmailVerificationError(null);
      setEmailVerificationSuccess(true);
    }
  }

  useEffect(() => {
    const initAuth = async () => {
      try {
        const data = await fetchMe();
        if (data) {
          setUser(data);
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.log("error of fetchMe", err);
        try {
          const data = await refreshAccessToken();
          if (data) {
            setUser(data);
            setIsAuthenticated(true);
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

    initAuth();
  }, []); // dont know which dependencies should i give here?

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        logout,
        deleteAccount,
        register,
        login,
        logInError,
        registrationError,
        isRegistering,
        isLoggingIn,
        sendEmailVerificationLink,
        isEmailSent,
        isSending,
        emailSendingError,
        verifyUserEmail,
        isVerifying,
        emailVerificationError,
        emailVerificationSuccess,
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

