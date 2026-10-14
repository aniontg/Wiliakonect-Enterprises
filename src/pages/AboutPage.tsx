import React from "react";
import {
  Sparkles,
  Heart,
  ShieldCheck,
  Compass,
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
  MessageSquare,
  Award,
  Users,
} from "lucide-react";
import { CompanyConfig } from "../data/companyData";

interface AboutPageProps {
  config: CompanyConfig;
  onContactClick: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ config, onContactClick }) => {
  return (
    <div className="py-12 bg-[#faf9fc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Page Hero */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#38208f]/10 text-[#38208f] text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#f2a20a]" />
            <span>OUR STORY & PHILOSOPHY</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#171520] tracking-tight leading-tight">
            {config.aboutHeroTitle}
          </h1>
          <p className="text-lg text-[#5e5973] leading-relaxed">
            Built for business owners, founders, and creators who want technology that actually works—without endless jargon, mysterious invoices, or unreturned calls.
          </p>
        </div>

        {/* Narrative Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171520]">
              Good technology feels <span className="text-[#38208f]">human.</span>
            </h2>

            <div className="space-y-4 text-base text-slate-700 leading-relaxed">
              <p>{config.aboutStory}</p>
              <p>
                We started Wiliakonect with a straightforward mission: to eliminate the friction between having a great business idea and bringing it online. Too many entrepreneurs in Africa and across the world get bogged down by unreliable web agencies, fragile code, and zero post-launch support.
              </p>
              <p>
                Whether you need a high-converting website, an automated customer management system, or 24/7 IT peace of mind, we stand behind everything we build. When you work with Wiliakonect, you work directly with passionate engineers who care about your bottom line.
              </p>
            </div>

            {/* Quick stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-3xl font-black text-[#38208f]">150+</span>
                <p className="text-xs font-semibold text-slate-500 mt-1">Projects Shipped</p>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-3xl font-black text-[#f2a20a]">99.9%</span>
                <p className="text-xs font-semibold text-slate-500 mt-1">Uptime Reliability</p>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-3xl font-black text-emerald-600">100%</span>
                <p className="text-xs font-semibold text-slate-500 mt-1">Direct Founder Access</p>
              </div>
            </div>
          </div>

          {/* Founder Profile Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#38208f] to-[#200e57] text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#f2a20a]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-[#f2a20a] text-[#171520] font-black text-2xl flex items-center justify-center shadow-md">
                  AG
                </div>
                <div>
                  <h3 className="text-xl font-bold">{config.founderName}</h3>
                  <p className="text-xs text-[#f2a20a] font-semibold">{config.founderRole}</p>
                  <p className="text-xs text-white/70">Port Harcourt, Nigeria · Wiliakonect</p>
                </div>
              </div>

              <blockquote className="text-sm italic text-white/90 leading-relaxed border-l-2 border-[#f2a20a] pl-4">
                "Our promise is simple: we treat your business as if it were our own. We don't consider a project done until you're proud to share it with your clients and partners."
              </blockquote>

              <div className="space-y-3 pt-2 border-t border-white/10 text-xs text-white/80">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#f2a20a]" />
                  <span>{config.phonePrimary} / {config.phoneSecondary}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#f2a20a]" />
                  <span>{config.emailPrimary}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#f2a20a]" />
                  <span>{config.location}</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={`https://wa.me/${config.whatsappNumber}?text=Hello%20Wiliakonect!%20I'm%20reaching%20out%20after%20reading%20about%20your%20services.`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold text-[#171520] bg-[#f2a20a] hover:bg-[#e09404] transition-all shadow-md cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Message on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Core Principles */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold text-[#38208f] uppercase tracking-wider">
              OPERATING PRINCIPLES
            </span>
            <h2 className="text-3xl font-extrabold text-[#171520] mt-1">
              A few things we always believe.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#38208f] flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-[#171520]">Clear, not complicated</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                If software is confusing to use, it’s not solving the problem. We build intuitive, uncluttered user experiences and explain every step in plain language.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-[#171520]">Built around real people</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tools are only valuable when your customers love using them and your staff finds them effortless. We test rigorously with everyday users before launch.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-[#171520]">Ready for what’s next</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We design extensible foundations. As your enterprise scales from 10 customers to 10,000, your codebase won't need to be scrapped and rebuilt from scratch.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-lg text-center space-y-4">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#171520]">
            Good things start with a conversation.
          </h3>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Tell us about your venture, your challenges, or your digital ambitions. We'd love to explore how we can help.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <button
              onClick={onContactClick}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-[#38208f] hover:bg-[#251368] transition-all shadow-md cursor-pointer"
            >
              <span>Let’s connect</span>
              <ArrowUpRight className="w-4 h-4 text-[#f2a20a]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
