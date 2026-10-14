import React, { useState } from "react";
import { ArrowUpRight, ChevronDown, Sparkles, TrendingUp, ShieldCheck, Zap } from "lucide-react";
import { CompanyConfig } from "../data/companyData";

interface HeroProps {
  config: CompanyConfig;
  onExploreServices: () => void;
  onStartProject: () => void;
  onOpenBuilder: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  config,
  onExploreServices,
  onStartProject,
  onOpenBuilder,
}) => {
  const [metricTab, setMetricTab] = useState<"speed" | "uptime" | "growth">("growth");

  return (
    <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-[#38208f]/8 via-[#f2a20a]/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Copy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#38208f]/8 border border-[#38208f]/15 text-[#38208f] text-xs font-bold tracking-wider uppercase">
              <span className="w-5 h-0.5 bg-[#f2a20a] rounded-full inline-block" />
              <span>{config.heroEyebrow}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#171520] tracking-tight leading-[1.12]">
              {config.heroTitle}{" "}
              <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38208f] via-[#5229bf] to-[#f2a20a]">
                {config.heroHighlight}
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-[#5e5973] font-normal leading-relaxed max-w-2xl">
              {config.heroSubtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onStartProject}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-[#38208f] hover:bg-[#28146e] shadow-lg shadow-[#38208f]/25 hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer group"
              >
                <span>{config.heroCtaText}</span>
                <ArrowUpRight className="w-5 h-5 text-[#f2a20a] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={onOpenBuilder}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-bold text-[#171520] bg-white border border-slate-200 hover:border-[#38208f]/40 hover:bg-[#f4f0fd]/50 transition-all cursor-pointer shadow-xs"
              >
                <Sparkles className="w-4 h-4 text-[#f2a20a]" />
                <span>Try Website Builder</span>
              </button>

              <button
                onClick={onExploreServices}
                className="inline-flex items-center gap-1.5 px-4 py-3.5 text-sm font-semibold text-[#5e5973] hover:text-[#38208f] transition-colors cursor-pointer"
              >
                <ChevronDown className="w-4 h-4" />
                <span>Explore what we do</span>
              </button>
            </div>

            {/* Sub-note */}
            <div className="flex items-center gap-2 text-xs font-semibold text-[#5e5973] pt-2">
              <span className="text-[#f2a20a] text-base">✳</span>
              <span>Thoughtful solutions. Tangible progress. Full client care.</span>
            </div>
          </div>

          {/* Right Column: High-fidelity interactive growth visual */}
          <div className="lg:col-span-5 relative">
            {/* Background floating orbits & sparkles */}
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full border border-dashed border-[#f2a20a]/40 animate-spin-slow pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full border border-[#38208f]/20 pointer-events-none" />

            {/* Behind card */}
            <div className="absolute top-4 -right-2 sm:right-2 w-full h-full bg-[#ede8fb] rounded-3xl -rotate-2 -z-10 shadow-sm border border-[#38208f]/10" />

            {/* Main Interactive Showcase Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xl border border-slate-100 relative">
              {/* Card top bar */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-[#171520] uppercase tracking-wider">
                    Moving forward
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setMetricTab("growth")}
                    className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-colors cursor-pointer ${
                      metricTab === "growth"
                        ? "bg-[#38208f] text-white"
                        : "text-slate-500 hover:bg-slate-100"
                    }`}
                  >
                    Growth
                  </button>
                  <button
                    onClick={() => setMetricTab("speed")}
                    className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-colors cursor-pointer ${
                      metricTab === "speed"
                        ? "bg-[#38208f] text-white"
                        : "text-slate-500 hover:bg-slate-100"
                    }`}
                  >
                    Speed
                  </button>
                  <button
                    onClick={() => setMetricTab("uptime")}
                    className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-colors cursor-pointer ${
                      metricTab === "uptime"
                        ? "bg-[#38208f] text-white"
                        : "text-slate-500 hover:bg-slate-100"
                    }`}
                  >
                    Uptime
                  </button>
                </div>
              </div>

              {/* Dynamic headline for stat */}
              <div className="mb-4">
                <div className="text-sm font-semibold text-slate-500">
                  {metricTab === "growth" && "Client Revenue & Engagement"}
                  {metricTab === "speed" && "Core Web Vitals & Load Performance"}
                  {metricTab === "uptime" && "Hosting Infrastructure Reliability"}
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#38208f] flex items-center gap-2 mt-0.5">
                  {metricTab === "growth" && "A little better, every day"}
                  {metricTab === "speed" && "99/100 Lighthouse"}
                  {metricTab === "uptime" && "99.98% High Availability"}
                  <span className="text-[#f2a20a] text-xl font-bold">↗</span>
                </div>
              </div>

              {/* Upward Growth SVG Chart (from wiliakonect identity) */}
              <div className="relative bg-[#faf9fc] rounded-2xl p-4 border border-slate-100">
                <svg
                  className="w-full h-32 sm:h-36 overflow-visible"
                  viewBox="0 0 300 132"
                  role="img"
                  aria-label="An upward-trending growth line"
                >
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f2a20a" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#38208f" stopOpacity="0.02" />
                    </linearGradient>
                  </defs>
                  {/* Grid lines */}
                  <path className="stroke-slate-200" strokeDasharray="3 3" d="M0 30H300M0 68H300M0 106H300" />
                  {/* Fill area */}
                  <path
                    fill="url(#chartGradient)"
                    d={
                      metricTab === "growth"
                        ? "M0 109 L47 89 L86 97 L127 60 L167 72 L212 35 L250 47 L300 12 V132 H0 Z"
                        : metricTab === "speed"
                        ? "M0 115 L50 90 L100 80 L150 40 L200 35 L250 20 L300 10 V132 H0 Z"
                        : "M0 35 L50 32 L100 34 L150 30 L200 31 L250 28 L300 25 V132 H0 Z"
                    }
                  />
                  {/* Line */}
                  <path
                    className="stroke-[#38208f]"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    d={
                      metricTab === "growth"
                        ? "M0 109 L47 89 L86 97 L127 60 L167 72 L212 35 L250 47 L300 12"
                        : metricTab === "speed"
                        ? "M0 115 L50 90 L100 80 L150 40 L200 35 L250 20 L300 10"
                        : "M0 35 L50 32 L100 34 L150 30 L200 31 L250 28 L300 25"
                    }
                  />
                  {/* Peak glowing dot */}
                  <circle
                    cx="300"
                    cy={metricTab === "growth" ? 12 : metricTab === "speed" ? 10 : 25}
                    r="6"
                    fill="#f2a20a"
                    stroke="#ffffff"
                    strokeWidth="2.5"
                  />
                </svg>

                <div className="flex items-center justify-between pt-3 text-xs font-semibold text-slate-500">
                  <span className="flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-[#f2a20a]" /> Clear thinking
                  </span>
                  <span className="flex items-center gap-1 text-[#38208f]">
                    <TrendingUp className="w-3.5 h-3.5 text-[#38208f]" /> Real progress
                  </span>
                </div>
              </div>

              {/* Floating stamp: MAKE IT MATTER */}
              <div className="absolute -bottom-4 -right-4 sm:-bottom-5 sm:-right-5 bg-gradient-to-br from-[#38208f] to-[#251368] text-white p-3.5 rounded-2xl shadow-xl flex items-center gap-3 border-2 border-white">
                <div className="w-8 h-8 rounded-lg bg-[#f2a20a] flex items-center justify-center text-[#171520] font-black text-sm">
                  ↗
                </div>
                <div className="text-[11px] font-black tracking-wider leading-tight text-left">
                  MAKE<br />
                  <span className="text-[#f2a20a]">IT MATTER</span>
                </div>
              </div>
            </div>

            {/* Bottom caption */}
            <div className="flex items-center justify-center gap-2 mt-6 text-xs text-[#5e5973] font-medium">
              <span className="w-2 h-2 rounded-full bg-[#f2a20a]" />
              <span>Ideas connected to what’s next · Wiliakonect</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
