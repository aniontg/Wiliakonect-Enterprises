import React from "react";
import { MessageSquare, Phone, Mail, MapPin, ArrowUpRight, SlidersHorizontal, Sparkles } from "lucide-react";
import { CompanyConfig } from "../data/companyData";

interface FooterProps {
  config: CompanyConfig;
  onNavigate: (tab: string) => void;
  onOpenCustomizer: () => void;
}

export const Footer: React.FC<FooterProps> = ({ config, onNavigate, onOpenCustomizer }) => {
  return (
    <footer className="bg-[#171520] text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#38208f] to-[#251368] p-1.5 flex items-center justify-center">
                <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
                  <path
                    d="M6 32 L16 16 L23 26 L30 11 L35 7"
                    stroke="#f2a20a"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <rect x="14" y="14" width="4" height="4" fill="#f2a20a" rx="1" />
                </svg>
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">
                {config.brandName}
              </span>
            </div>

            <p className="text-xs text-white/70 leading-relaxed max-w-sm">
              We help businesses turn ambitious ideas into dependable, human-centered digital experiences—with the right technology and a real person in your corner.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={onOpenCustomizer}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-[#f2a20a] bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Live Site Customizer</span>
              </button>

              <a
                href={`https://wa.me/${config.whatsappNumber}?text=Hello%20Wiliakonect!%20I'm%20contacting%20you%20via%20the%20website.`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-[#15803d] hover:bg-[#166534] transition-colors cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#f2a20a]">
              Navigation
            </span>
            <ul className="space-y-2 text-xs text-white/80">
              <li>
                <button
                  onClick={() => onNavigate("home")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("services")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Services & Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("about")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About & Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("builder")}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>Website Builder</span>
                  <span className="px-1 text-[9px] bg-[#f2a20a] text-black font-bold rounded">Live</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("dashboard")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Client Portal
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("contact")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Let's Talk
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#f2a20a]">
              Solutions
            </span>
            <ul className="space-y-2 text-xs text-white/80">
              <li>
                <button
                  onClick={() => onNavigate("services")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Websites & Digital Experiences
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("services")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Software & Business Tools
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("services")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  IT Support & Maintenance
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("builder")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  12+ Industry Blueprints
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("services")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Custom Domain & SSL Setup
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#f2a20a]">
              Get In Touch
            </span>
            <ul className="space-y-2 text-xs text-white/80">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#f2a20a] shrink-0" />
                <a href={`tel:${config.phonePrimary.replace(/\s+/g, "")}`} className="hover:text-white">
                  {config.phonePrimary}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#f2a20a] shrink-0" />
                <a href={`tel:${config.phoneSecondary.replace(/\s+/g, "")}`} className="hover:text-white">
                  {config.phoneSecondary}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#f2a20a] shrink-0" />
                <a href={`mailto:${config.emailPrimary}`} className="hover:text-white truncate">
                  {config.emailPrimary}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#f2a20a] shrink-0" />
                <span>{config.location}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} {config.brandName}. All rights reserved. Port Harcourt, Nigeria.</p>
          <div className="flex items-center gap-4">
            <span>Clear thinking · Real progress</span>
            <span>·</span>
            <button
              onClick={onOpenCustomizer}
              className="text-[#f2a20a] hover:underline cursor-pointer"
            >
              Modify Site Details
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
