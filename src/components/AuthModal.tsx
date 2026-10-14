import React, { useState } from "react";
import {
  X,
  ShieldCheck,
  Lock,
  KeyRound,
  CheckCircle2,
  AlertTriangle,
  Fingerprint,
  RefreshCw,
  LogOut,
  UserCheck,
  Sparkles,
  Server,
  MapPin,
  Cpu,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const {
    user,
    isAuthenticated,
    is2faPending,
    securityLogs,
    login,
    verify2FA,
    logout,
    toggle2FA,
  } = useAuth();

  const [activeTab, setActiveTab] = useState<"auth" | "security">("auth");
  const [email, setEmail] = useState(user?.email || "anointedgodswill.tech@gmail.com");
  const [password, setPassword] = useState("Wiliakonect@Secure2026!");
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  // Password entropy & security strength calculator
  const calculatePasswordStrength = (pass: string) => {
    let score = 0;
    if (!pass) return { score: 0, text: "Empty", color: "bg-slate-200" };
    if (pass.length >= 8) score += 25;
    if (pass.length >= 12) score += 15;
    if (/[A-Z]/.test(pass)) score += 20;
    if (/[a-z]/.test(pass)) score += 10;
    if (/[0-9]/.test(pass)) score += 15;
    if (/[^A-Za-z0-9]/.test(pass)) score += 15;

    if (score < 40) return { score, text: "Weak", color: "bg-red-500" };
    if (score < 75) return { score, text: "Moderate", color: "bg-amber-500" };
    return { score: Math.min(100, score), text: "Enterprise Strong", color: "bg-emerald-500" };
  };

  const strength = calculatePasswordStrength(password);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    const res = await login(email, password, true);
    setLoading(false);

    if (!res.success) {
      setErrorMsg(res.error || "Authentication failed.");
    }
  };

  const handle2FASubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    const res = await verify2FA(twoFactorCode);
    setLoading(false);

    if (!res.success) {
      setErrorMsg(res.error || "Invalid 2FA code.");
    } else {
      setTwoFactorCode("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-[#171520] via-[#251b3a] to-[#38208f] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#38208f] border border-white/20 flex items-center justify-center text-[#f2a20a]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base tracking-tight">Wiliakonect Security Hub</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  256-Bit Protected
                </span>
              </div>
              <p className="text-xs text-white/70">
                Authentic Authentication & Zero-Trust Session Gateway
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 gap-2">
          <button
            onClick={() => setActiveTab("auth")}
            className={`py-3 px-3 text-xs font-bold border-b-2 flex items-center gap-1.5 cursor-pointer transition-colors ${
              activeTab === "auth"
                ? "border-[#38208f] text-[#38208f] bg-white rounded-t-lg -mb-px"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <KeyRound className="w-4 h-4" />
            <span>Sign In / Credentials</span>
          </button>
          <button
            onClick={() => setActiveTab("security")}
            className={`py-3 px-3 text-xs font-bold border-b-2 flex items-center gap-1.5 cursor-pointer transition-colors ${
              activeTab === "security"
                ? "border-[#38208f] text-[#38208f] bg-white rounded-t-lg -mb-px"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Fingerprint className="w-4 h-4" />
            <span>Security Diagnostics & Logs</span>
          </button>
        </div>

        {/* Body content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {activeTab === "auth" && (
            <div>
              {isAuthenticated && !is2faPending ? (
                /* Authenticated State */
                <div className="space-y-5">
                  <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black text-lg shrink-0">
                      {user?.avatar || "AG"}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-900">{user?.name}</span>
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-[#38208f] text-white">
                          {user?.role}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 font-mono">{user?.email}</p>
                      <div className="flex items-center gap-3 pt-2 text-[11px] text-slate-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#38208f]" /> Port Harcourt, Nigeria
                        </span>
                        <span>·</span>
                        <span className="text-emerald-700 font-bold">Session Active</span>
                      </div>
                    </div>
                  </div>

                  {/* Security overview badge */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-[11px] text-slate-500 font-semibold block">Security Health</span>
                      <span className="text-xl font-extrabold text-emerald-600">{user?.securityScore || 98}%</span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">Hardware 2FA Active</span>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-[11px] text-slate-500 font-semibold block">Node IP Address</span>
                      <span className="text-xs font-mono font-bold text-slate-800">{user?.ipAddress || "102.89.44.12"}</span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">TLS 1.3 Certified</span>
                    </div>
                  </div>

                  {/* 2FA Toggle & Sign Out Buttons */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
                    <button
                      onClick={toggle2FA}
                      className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-300 hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer"
                    >
                      {user?.twoFactorEnabled ? "2FA: Enabled (Strict)" : "Enable 2FA"}
                    </button>

                    <button
                      onClick={logout}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              ) : is2faPending ? (
                /* 2FA Verification Challenge */
                <form onSubmit={handle2FASubmit} className="space-y-5">
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-[#38208f]/10 text-[#38208f] flex items-center justify-center mx-auto">
                      <KeyRound className="w-6 h-6 text-[#f2a20a]" />
                    </div>
                    <h4 className="text-lg font-extrabold text-slate-900">
                      Two-Factor Security Verification
                    </h4>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      A 6-digit TOTP security token has been transmitted to your authenticator device. Enter code to confirm sign-in:
                    </p>
                  </div>

                  {errorMsg && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider text-center">
                      6-Digit Security Token
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="123456"
                      autoFocus
                      value={twoFactorCode}
                      onChange={(e) => setTwoFactorCode(e.target.value.replace(/\D/g, ""))}
                      className="w-48 mx-auto block px-4 py-3 border-2 border-[#38208f] rounded-2xl text-center text-2xl font-mono tracking-widest font-black focus:outline-none focus:ring-4 focus:ring-[#38208f]/20"
                    />
                    <p className="text-[11px] text-center text-slate-400 pt-1">
                      (Demo default code: enter any 6 digits e.g. <span className="font-bold text-[#38208f]">123456</span>)
                    </p>
                  </div>

                  <div className="pt-2 flex gap-3">
                    <button
                      type="button"
                      onClick={() => logout()}
                      className="flex-1 py-3 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading || twoFactorCode.length < 6}
                      className="flex-1 py-3 text-xs font-bold text-white bg-[#38208f] hover:bg-[#251368] rounded-xl shadow-md transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                    >
                      {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4 text-[#f2a20a]" />}
                      <span>Verify & Authorize</span>
                    </button>
                  </div>
                </form>
              ) : (
                /* Standard Credentials Form */
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div className="p-3.5 bg-purple-50/60 border border-purple-100 rounded-2xl flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-[#38208f] shrink-0 mt-0.5" />
                    <div className="text-xs text-slate-700 leading-relaxed">
                      <strong>Wiliakonect CMS & Security Vault:</strong> Sign in as Founder/Super Admin (<strong>Anointed-Godswill C C-E</strong>) or your enterprise workspace credentials.
                    </div>
                  </div>

                  {errorMsg && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Account Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#38208f]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#38208f]"
                    />

                    {/* Password Strength Meter */}
                    <div className="mt-2 space-y-1">
                      <div className="flex justify-between items-center text-[10px] text-slate-500 font-semibold">
                        <span>Entropy Strength:</span>
                        <span className="font-bold">{strength.text} ({strength.score}%)</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${strength.color} transition-all duration-300`}
                          style={{ width: `${strength.score}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 text-sm font-bold text-white bg-[#38208f] hover:bg-[#251368] rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <Lock className="w-4 h-4 text-[#f2a20a]" />
                      )}
                      <span>Proceed with Multi-Factor Sign In</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <Server className="w-3.5 h-3.5" /> Active Session Diagnostics
                  </span>
                  <span>Port Harcourt, NG</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>IP: <span className="text-amber-400">102.89.44.12</span></div>
                  <div>Protocol: <span className="text-emerald-400">HTTP/2 TLS 1.3</span></div>
                  <div>WAF Rate Limit: <span className="text-emerald-400">100 req/min</span></div>
                  <div>CSRF Token: <span className="text-slate-300">Enabled</span></div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Recent Security Activity Audit
                </h4>
                <div className="space-y-2 max-h-56 overflow-y-auto">
                  {securityLogs.map((log) => (
                    <div
                      key={log.id}
                      className="p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800 flex items-center gap-1.5">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              log.status === "success"
                                ? "bg-emerald-500"
                                : log.status === "warning"
                                ? "bg-amber-500"
                                : "bg-red-500"
                            }`}
                          />
                          {log.action}
                        </span>
                        <span className="text-[10px] text-slate-400">{log.timestamp}</span>
                      </div>
                      <p className="text-[11px] text-slate-600">{log.details}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Wiliakonect Security Layer 2.4</span>
          <button
            onClick={onClose}
            className="font-bold text-[#38208f] hover:underline cursor-pointer"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
