import React from "react";
import { CheckCircle2, Shield, Users2, Sparkles } from "lucide-react";

export const TrustStrip: React.FC = () => {
  return (
    <section className="border-y border-[#38208f]/10 bg-white/60 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs font-extrabold tracking-widest text-[#38208f] uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#f2a20a]" />
            <span>GOOD TECH SHOULD FEEL LIKE</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#171520]">
              <div className="w-2.5 h-2.5 rounded-full bg-[#38208f]" />
              <span>Clear, not complicated</span>
            </div>

            <div className="flex items-center gap-2 text-sm font-semibold text-[#171520]">
              <div className="w-2.5 h-2.5 rounded-full bg-[#f2a20a]" />
              <span>Built around people</span>
            </div>

            <div className="flex items-center gap-2 text-sm font-semibold text-[#171520]">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>Ready for what’s next</span>
            </div>

            <div className="flex items-center gap-2 text-sm font-semibold text-[#171520]">
              <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
              <span>Direct WhatsApp support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
