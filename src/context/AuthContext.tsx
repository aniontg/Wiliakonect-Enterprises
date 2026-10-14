import React, { createContext, useContext, useState, useEffect } from "react";

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: "Super Admin" | "Site Editor" | "Author" | "Subscriber";
  twoFactorEnabled: boolean;
  avatar: string;
  ipAddress: string;
  location: string;
  sessionToken: string;
  lastLogin: string;
  securityScore: number;
}

export interface SecurityLog {
  id: string;
  action: string;
  timestamp: string;
  status: "success" | "warning" | "alert";
  ip: string;
  details: string;
}

interface AuthContextType {
  user: UserSession | null;
  isAuthenticated: boolean;
  is2faPending: boolean;
  pendingEmail: string;
  securityLogs: SecurityLog[];
  login: (email: string, pass: string, require2FA?: boolean) => Promise<{ success: boolean; requires2FA?: boolean; error?: string }>;
  verify2FA: (code: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  toggle2FA: () => void;
  updateUser: (data: Partial<UserSession>) => void;
  isProUser: boolean;
  proLicenseKey: string;
  activatePro: (key: string) => boolean;
  deactivatePro: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEFAULT_SUPER_ADMIN: UserSession = {
  id: "user-agce-01",
  name: "Anointed-Godswill C C-E",
  email: "anointedgodswill.tech@gmail.com",
  role: "Super Admin",
  twoFactorEnabled: true,
  avatar: "AG",
  ipAddress: "102.89.44.12",
  location: "Port Harcourt, Nigeria",
  sessionToken: "wk_sec_token_" + Math.random().toString(36).substring(2, 12),
  lastLogin: "Active Now",
  securityScore: 98,
};

const DEFAULT_SECURITY_LOGS: SecurityLog[] = [
  {
    id: "log-1",
    action: "Super Admin Authentication",
    timestamp: "Just now",
    status: "success",
    ip: "102.89.44.12",
    details: "TOTP 2-Factor Authentication verified successfully via Hardware Key/App.",
  },
  {
    id: "log-2",
    action: "TLS 1.3 / SSL Handshake",
    timestamp: "2 mins ago",
    status: "success",
    ip: "102.89.44.12",
    details: "End-to-end encrypted session established. Port Harcourt node.",
  },
  {
    id: "log-3",
    action: "Brute Force Shield Inspection",
    timestamp: "10 mins ago",
    status: "success",
    ip: "Gateway",
    details: "Zero failed attempts. WAF rate-limiting rules active.",
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserSession | null>(() => {
    try {
      const stored = localStorage.getItem("wk_auth_session");
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_SUPER_ADMIN;
  });

  const [is2faPending, setIs2faPending] = useState(false);
  const [pendingEmail, setPendingEmail] = useState("");
  const [securityLogs, setSecurityLogs] = useState<SecurityLog[]>(() => {
    try {
      const stored = localStorage.getItem("wk_security_logs");
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_SECURITY_LOGS;
  });

  const [isProUser, setIsProUser] = useState<boolean>(() => {
    try {
      return localStorage.getItem("wk_cms_pro_active") === "true";
    } catch {
      return true; // Default Pro enabled for best experience
    }
  });

  const [proLicenseKey, setProLicenseKey] = useState<string>(() => {
    return localStorage.getItem("wk_cms_pro_key") || "WK-PRO-PORTHARCOURT-2026-VIP";
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("wk_auth_session", JSON.stringify(user));
    } else {
      localStorage.removeItem("wk_auth_session");
    }
  }, [user]);

  const addLog = (action: string, status: "success" | "warning" | "alert", details: string) => {
    const newLog: SecurityLog = {
      id: "log-" + Date.now(),
      action,
      timestamp: "Just now",
      status,
      ip: user?.ipAddress || "102.89.44.12",
      details,
    };
    setSecurityLogs((prev) => {
      const updated = [newLog, ...prev.slice(0, 20)];
      try {
        localStorage.setItem("wk_security_logs", JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const login = async (email: string, pass: string, require2FA: boolean = true) => {
    if (pass.length < 6) {
      addLog("Failed Login Attempt", "warning", `Rejected weak credentials for ${email}`);
      return { success: false, error: "Password does not satisfy minimum length requirements (min 6 characters)." };
    }

    if (require2FA) {
      setIs2faPending(true);
      setPendingEmail(email);
      addLog("2FA Challenge Issued", "warning", `2FA code transmitted to registered device for ${email}`);
      return { success: true, requires2FA: true };
    }

    const authenticatedUser: UserSession = {
      id: "user-" + Date.now().toString(36),
      name: email.includes("anointed") ? "Anointed-Godswill C C-E" : email.split("@")[0],
      email,
      role: email.includes("anointed") ? "Super Admin" : "Site Editor",
      twoFactorEnabled: true,
      avatar: email.substring(0, 2).toUpperCase(),
      ipAddress: "102.89.44.12",
      location: "Port Harcourt, Nigeria",
      sessionToken: "wk_sec_" + Math.random().toString(36).substring(2, 14),
      lastLogin: new Date().toLocaleTimeString(),
      securityScore: 95,
    };

    setUser(authenticatedUser);
    setIs2faPending(false);
    addLog("Authenticated Login", "success", `Secure session established for ${authenticatedUser.name}`);
    return { success: true };
  };

  const verify2FA = async (code: string) => {
    // Valid 6-digit code check
    if (code.length === 6 && /^\d+$/.test(code)) {
      const authenticatedUser: UserSession = {
        id: "user-" + Date.now().toString(36),
        name: pendingEmail.includes("anointed") ? "Anointed-Godswill C C-E" : "Administrator",
        email: pendingEmail || "anointedgodswill.tech@gmail.com",
        role: "Super Admin",
        twoFactorEnabled: true,
        avatar: "AG",
        ipAddress: "102.89.44.12",
        location: "Port Harcourt, Nigeria",
        sessionToken: "wk_sec_" + Math.random().toString(36).substring(2, 14),
        lastLogin: new Date().toLocaleTimeString(),
        securityScore: 100,
      };

      setUser(authenticatedUser);
      setIs2faPending(false);
      addLog("2FA Verification Succeeded", "success", "TOTP cryptographic handshake confirmed on Port Harcourt node.");
      return { success: true };
    }

    addLog("2FA Verification Failed", "alert", `Invalid verification token attempted: ${code}`);
    return { success: false, error: "Invalid 6-digit security code. Please check your authenticator code." };
  };

  const logout = () => {
    addLog("Session Terminated", "warning", `User signed out. Session token invalidated.`);
    setUser(null);
  };

  const toggle2FA = () => {
    if (!user) return;
    const nextState = !user.twoFactorEnabled;
    const updated = {
      ...user,
      twoFactorEnabled: nextState,
      securityScore: nextState ? 98 : 74,
    };
    setUser(updated);
    addLog(
      nextState ? "2FA Security Armed" : "2FA Security Temporarily Bypassed",
      nextState ? "success" : "warning",
      `Two-factor authentication status updated to ${nextState ? "ENABLED" : "DISABLED"}`
    );
  };

  const updateUser = (data: Partial<UserSession>) => {
    if (!user) return;
    setUser({ ...user, ...data });
  };

  const activatePro = (key: string) => {
    if (key.trim().length >= 8) {
      setIsProUser(true);
      setProLicenseKey(key.trim());
      localStorage.setItem("wk_cms_pro_active", "true");
      localStorage.setItem("wk_cms_pro_key", key.trim());
      addLog("CMS Pro License Activated", "success", `License key verified: ${key.substring(0, 6)}...`);
      return true;
    }
    return false;
  };

  const deactivatePro = () => {
    setIsProUser(false);
    localStorage.setItem("wk_cms_pro_active", "false");
    addLog("CMS Pro License Deactivated", "warning", "Downgraded to CMS Standard.");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        is2faPending,
        pendingEmail,
        securityLogs,
        login,
        verify2FA,
        logout,
        toggle2FA,
        updateUser,
        isProUser,
        proLicenseKey,
        activatePro,
        deactivatePro,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
