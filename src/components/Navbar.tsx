import React, { useState } from "react";
import { MessageSquare, Phone, SlidersHorizontal, Menu, X, ArrowUpRight, Sparkles, ShieldCheck, Lock, Crown } from "lucide-react";
import { CompanyConfig } from "../data/companyData";
import { useAuth } from "../context/AuthContext";

import { PWAInstallButton } from "./PWAInstallButton";

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  config: CompanyConfig;
  onOpenCustomizer: () => void;
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  config,
  onOpenCustomizer,
  onOpenAuth,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();

  const navItems = [
    { id: "home", label: "Home" },
    { id: "services", label: "Services" },
    { id: "about", label: "About" },
    { id: "cms", label: "Wiliakonect CMS", highlight: true, icon: Sparkles },
    { id: "dashboard", label: "Client Portal" },
    { id: "contact", label: "Let's Talk" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#faf9fc]/90 backdrop-blur-md border-b border-[#38208f]/10 transition-all duration-200">
      {/* Top micro banner for direct contact */}
      <div className="bg-[#38208f] text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="inline-block w-2 h-2 rounded-full bg-[#f2a20a] animate-ping" />
            <span className="font-medium tracking-wide">
              {config.heroEyebrow} · Port Harcourt, Nigeria · Global Remote Delivery
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-xs font-medium">
            <a
              href={`tel:${config.phonePrimary.replace(/\s+/g, "")}`}
              className="flex items-center gap-1 hover:text-[#f2a20a] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#f2a20a]" />
              {config.phonePrimary}
            </a>
            <span className="text-white/40">|</span>
            <a
              href={`https://wa.me/${config.whatsappNumber}?text=Hello%20Wiliakonect!%20I%20would%20like%20to%20inquire%20about%20your%20services.`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 hover:text-[#f2a20a] transition-colors"
            >
              <MessageSquare className="w-3 h-3 text-[#f2a20a]" />
              WhatsApp Direct
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => {
            setCurrentTab("home");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
        >
          {/* Custom SVG node icon */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#38208f] to-[#251368] p-2 flex items-center justify-center shadow-md shadow-[#38208f]/20 group-hover:scale-105 transition-transform">
            <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
              <path
                d="M6 32 L16 16 L23 26 L30 11 L35 7"
                stroke="#f2a20a"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M31 7 L35 7 L35 11"
                stroke="#f2a20a"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect x="14" y="14" width="4" height="4" fill="#f2a20a" rx="1" />
              <rect x="21" y="24" width="4" height="4" fill="#ffffff" rx="1" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-2xl text-[#38208f] tracking-tight group-hover:text-[#251368] transition-colors">
                {config.brandName}
              </span>
              <span className="w-2 h-2 rounded-full bg-[#f2a20a]" />
            </div>
            <p className="text-[11px] text-[#5e5973] font-medium tracking-wide -mt-0.5 hidden xs:block">
              {config.brandTagline}
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`relative px-3.5 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                  isActive
                    ? "text-[#38208f] bg-[#38208f]/8"
                    : "text-[#5e5973] hover:text-[#171520] hover:bg-black/5"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  {item.label}
                  {item.highlight && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-[#f2a20a]/20 text-[#c27800] border border-[#f2a20a]/30 flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" />
                      AI & CMS
                    </span>
                  )}
                </span>
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#38208f] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action controls: Security / Auth, PWA Install & Live Customizer */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* PWA Web App Install Button */}
          <PWAInstallButton variant="navbar" />

          {/* Security & Sign In Button */}
          <button
            onClick={onOpenAuth}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer border ${
              isAuthenticated
                ? "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100"
                : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
            }`}
            title="Authentic Multi-Factor Sign In & Security Vault"
          >
            <ShieldCheck className={`w-3.5 h-3.5 ${isAuthenticated ? "text-emerald-600" : "text-[#38208f]"}`} />
            <span className="hidden sm:inline">
              {isAuthenticated ? user?.name.split(" ")[0] : "Sign In"}
            </span>
          </button>

          {/* Modify site button */}
          <button
            onClick={onOpenCustomizer}
            title="Modify website content, contacts, and services"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-[#38208f] bg-[#f4f0fd] border border-[#38208f]/20 rounded-lg hover:bg-[#eae2fc] hover:border-[#38208f]/40 transition-all cursor-pointer shadow-xs"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#38208f]" />
            <span className="hidden sm:inline">Modify Site</span>
          </button>

          {/* Quick CTA */}
          <button
            onClick={() => {
              setCurrentTab("contact");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-white bg-[#38208f] hover:bg-[#2b1773] rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <span>Let’s talk</span>
            <ArrowUpRight className="w-4 h-4 text-[#f2a20a]" />
          </button>

          {/* Mobile hamburger menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#38208f] hover:bg-[#38208f]/10 rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#38208f]/15 px-4 py-5 shadow-xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`flex items-center justify-between px-4 py-3 rounded-lg text-left text-sm font-semibold transition-all ${
                  currentTab === item.id
                    ? "bg-[#38208f] text-white"
                    : "text-[#171520] hover:bg-slate-100"
                }`}
              >
                <span>{item.label}</span>
                {item.highlight && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#f2a20a] text-black">
                    Wiliakonect CMS
                  </span>
                )}
              </button>
            ))}

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  onOpenAuth();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-bold text-emerald-800 bg-emerald-50 rounded-lg border border-emerald-200"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Security Hub & Sign In</span>
              </button>

              <button
                onClick={() => {
                  onOpenCustomizer();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-bold text-[#38208f] bg-[#f4f0fd] rounded-lg border border-[#38208f]/20"
              >
                <SlidersHorizontal className="w-4 h-4 text-[#38208f]" />
                Modify Site Settings
              </button>

              <a
                href={`https://wa.me/${config.whatsappNumber}?text=Hello%20Wiliakonect!%20I%20would%20like%20to%20discuss%20a%20project.`}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-bold text-white bg-[#15803d] rounded-lg hover:bg-[#166534]"
              >
                <MessageSquare className="w-4 h-4 text-white" />
                Chat on WhatsApp (+234 911 463 8331)
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
