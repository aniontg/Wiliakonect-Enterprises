import React, { useState } from "react";
import {
  Globe,
  Cpu,
  Wrench,
  Check,
  ArrowUpRight,
  Sparkles,
  MessageSquare,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Phone,
} from "lucide-react";
import { CompanyConfig, ServiceItem } from "../data/companyData";
import { PricingPackages } from "../components/PricingPackages";

interface ServicesPageProps {
  config: CompanyConfig;
  onBookService: (serviceName: string) => void;
  onOpenPayment?: (amount: string, title: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  config,
  onBookService,
  onOpenPayment,
}) => {
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(0);
  const activeService = config.services[selectedServiceIndex];

  return (
    <div className="py-12 bg-[#faf9fc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#38208f]/10 text-[#38208f] text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#f2a20a]" />
            <span>CORE SERVICES & EXPERTISE</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#171520] tracking-tight">
            Technology that moves you <span className="text-[#38208f]">forward.</span>
          </h1>
          <p className="text-lg text-[#5e5973] leading-relaxed">
            Every business is unique. We do not believe in one-size-fits-all cookie-cutter formulas. We design, engineer, and support technical solutions built specifically for your goals and day-to-day operations.
          </p>
        </div>

        {/* Interactive Service Details Navigation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Service Selector Tabs */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider px-2">
              Select Service Domain
            </div>
            {config.services.map((svc, idx) => {
              const isSelected = selectedServiceIndex === idx;
              return (
                <button
                  key={svc.id}
                  onClick={() => setSelectedServiceIndex(idx)}
                  className={`w-full text-left p-5 rounded-2xl transition-all border flex items-start justify-between cursor-pointer ${
                    isSelected
                      ? "bg-white border-[#38208f] shadow-lg shadow-[#38208f]/10 ring-2 ring-[#38208f]/10"
                      : "bg-white/60 border-slate-200 hover:bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="space-y-1 pr-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-[#f2a20a]">0{idx + 1}</span>
                      <h3 className={`font-bold text-base ${isSelected ? "text-[#38208f]" : "text-[#171520]"}`}>
                        {svc.title}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2">{svc.subtitle}</p>
                    <div className="text-xs font-bold text-[#38208f] pt-1">{svc.startingPrice}</div>
                  </div>
                  <ChevronRight
                    className={`w-5 h-5 shrink-0 transition-transform ${
                      isSelected ? "text-[#38208f] translate-x-1" : "text-slate-300"
                    }`}
                  />
                </button>
              );
            })}

            {/* Quick Contact Box */}
            <div className="bg-gradient-to-br from-[#38208f] to-[#251368] text-white p-6 rounded-2xl shadow-md space-y-3 mt-6">
              <h4 className="font-bold text-sm">Need a specialized scope?</h4>
              <p className="text-xs text-white/80 leading-relaxed">
                Have an existing code base to refactor or migrate? We offer tailored consultations and direct audits.
              </p>
              <a
                href={`https://wa.me/${config.whatsappNumber}?text=Hello%20Wiliakonect!%20I%20have%20a%20custom%20technical%20project%20and%20need%20your%20advice.`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#f2a20a] hover:underline"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat directly on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Active Service Deep-Dive */}
          <div className="lg:col-span-8 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
              <div>
                <span className="text-xs font-bold text-[#f2a20a] tracking-wider uppercase">
                  Service Package 0{selectedServiceIndex + 1}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171520] mt-1">
                  {activeService.title}
                </h2>
                <p className="text-sm text-[#5e5973] mt-1">{activeService.subtitle}</p>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-xs text-slate-500 font-medium block">Starting from</span>
                <span className="text-2xl font-extrabold text-[#38208f]">
                  {activeService.startingPrice}
                </span>
              </div>
            </div>

            <p className="text-base text-slate-700 leading-relaxed">
              {activeService.description}
            </p>

            {/* Core features breakdown */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#f2a20a]" />
                <span>Key Capabilities & Technical Highlights</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeService.features.map((feat, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#38208f]/10 text-[#38208f] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span className="text-xs font-semibold text-slate-800">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Guaranteed Deliverables */}
            <div className="space-y-4 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>What You Always Receive Upon Delivery</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeService.deliverables.map((del, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-100 flex items-start gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span className="text-xs font-semibold text-emerald-950">{del}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA action bar */}
            <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <Clock className="w-4 h-4 text-[#38208f]" />
                <span>Standard turnaround: 5–14 business days with milestone updates</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href={`https://wa.me/${config.whatsappNumber}?text=Hello%20Wiliakonect!%20I%20am%20ready%20to%20get%20started%20with%20${encodeURIComponent(
                    activeService.title
                  )}%20(${encodeURIComponent(activeService.startingPrice)}).`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-white bg-[#15803d] hover:bg-[#166534] transition-all shadow-md cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Order via WhatsApp</span>
                </a>

                <button
                  onClick={() => onBookService(activeService.title)}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-white bg-[#38208f] hover:bg-[#251368] transition-all shadow-md cursor-pointer"
                >
                  <span>Submit Project Brief</span>
                  <ArrowUpRight className="w-4 h-4 text-[#f2a20a]" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Standard Market Penetration Pricing Packages */}
        <div className="-mx-4 sm:-mx-6 lg:-mx-8">
          <PricingPackages
            config={config}
            onOpenPayment={onOpenPayment}
            onSelectPackage={onBookService}
          />
        </div>

        {/* Process Roadmap */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-md">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#38208f] uppercase tracking-wider">
              HOW WE WORK TOGETHER
            </span>
            <h2 className="text-3xl font-extrabold text-[#171520] mt-1">
              From conversation to smooth deployment.
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              No technical mystery. We guide you transparently through every stage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {[
              {
                step: "01",
                title: "Discovery & Blueprint",
                desc: "We discuss your business objectives, target users, content, and budget over WhatsApp or call.",
              },
              {
                step: "02",
                title: "Interactive Prototype",
                desc: "You test a live visual prototype of your site or software before a single line of backend is locked in.",
              },
              {
                step: "03",
                title: "Engineering & QA",
                desc: "We write clean, SEO-optimized, ultra-fast code, configure DNS/SSL, and test on all devices.",
              },
              {
                step: "04",
                title: "Launch & Support",
                desc: "We go live, transfer complete ownership, train your team, and provide ongoing continuous care.",
              },
            ].map((st, i) => (
              <div key={i} className="p-5 rounded-2xl bg-[#faf9fc] border border-slate-100 space-y-3">
                <span className="text-2xl font-black text-[#f2a20a]">{st.step}</span>
                <h4 className="font-bold text-base text-[#171520]">{st.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
