import React, { useState } from "react";
import { ArrowUpRight, Check, Sparkles, Globe, Cpu, Wrench, MessageSquare, Calculator, CreditCard } from "lucide-react";
import { CompanyConfig, ServiceItem } from "../data/companyData";

interface ServicesSectionProps {
  config: CompanyConfig;
  onSelectService: (serviceId: string) => void;
  onGoToFullServices: () => void;
  onOpenPayment?: (amount: string, title: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  config,
  onSelectService,
  onGoToFullServices,
  onOpenPayment,
}) => {
  // Interactive mini quote estimator
  const [siteType, setSiteType] = useState<"landing" | "business" | "ecommerce" | "custom">("business");
  const [includeMaintenance, setIncludeMaintenance] = useState(true);
  const [includeCustomPortal, setIncludeCustomPortal] = useState(false);

  const calculateEstimate = () => {
    let base = 210000;
    let agencyMarketAvg = "₦450,000+";
    if (siteType === "landing") {
      base = 75000;
      agencyMarketAvg = "₦150,000 – ₦400,000";
    }
    if (siteType === "business") {
      base = 210000;
      agencyMarketAvg = "₦450,000+";
    }
    if (siteType === "ecommerce") {
      base = 320000;
      agencyMarketAvg = "₦600,000+";
    }
    if (siteType === "custom") {
      base = 650000;
      agencyMarketAvg = "₦1,500,000+";
    }

    if (includeCustomPortal) base += 120000;
    if (includeMaintenance) base += 25000;

    return {
      naira: `₦${base.toLocaleString()}`,
      usd: `$${Math.round(base / 800)}`,
      agencyMarketAvg,
    };
  };

  const estimate = calculateEstimate();

  const getIcon = (id: string) => {
    if (id === "web-design") return <Globe className="w-6 h-6 text-[#38208f]" />;
    if (id === "software-systems") return <Cpu className="w-6 h-6 text-[#38208f]" />;
    return <Wrench className="w-6 h-6 text-[#38208f]" />;
  };

  return (
    <section className="py-20 bg-[#faf9fc]" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#38208f] uppercase tracking-wider mb-2">
              <span className="w-4 h-0.5 bg-[#f2a20a]" />
              <span>A PRACTICAL TECH PARTNER</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#171520] tracking-tight">
              Make your next move <br className="hidden sm:inline" />
              <span className="text-[#38208f]">with absolute confidence.</span>
            </h2>
            <p className="text-base sm:text-lg text-[#5e5973] mt-3">
              From your first website to the tools that keep your business running smoothly every single day, we connect good ideas with thoughtful, dependable technology.
            </p>
          </div>

          <button
            onClick={onGoToFullServices}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#38208f] hover:text-[#251368] transition-colors cursor-pointer group"
          >
            <span>View detailed service scopes & deliverables</span>
            <ArrowUpRight className="w-4 h-4 text-[#f2a20a] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* 3 Core Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {config.services.map((svc) => (
            <div
              key={svc.id}
              className={`rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 relative border ${
                svc.popular
                  ? "bg-white border-[#38208f]/30 shadow-xl shadow-[#38208f]/8 ring-2 ring-[#38208f]/10"
                  : "bg-white border-slate-200/80 hover:border-[#38208f]/30 shadow-md hover:shadow-lg"
              }`}
            >
              {svc.badge && (
                <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full text-[11px] font-extrabold bg-[#38208f] text-white shadow-sm flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#f2a20a]" />
                  <span>{svc.badge}</span>
                </div>
              )}

              <div>
                <div className="w-12 h-12 rounded-xl bg-[#f4f0fd] flex items-center justify-center mb-5">
                  {getIcon(svc.id)}
                </div>

                <h3 className="text-xl font-bold text-[#171520] mb-2">{svc.title}</h3>
                <p className="text-xs font-semibold text-[#38208f] mb-3">{svc.subtitle}</p>
                <p className="text-sm text-[#5e5973] mb-6 leading-relaxed">{svc.description}</p>

                <div className="space-y-2.5 mb-8 border-t border-slate-100 pt-5">
                  {svc.features.slice(0, 4).map((f, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <div className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="pt-4 border-t border-slate-100 flex items-baseline justify-between mb-4">
                  <span className="text-xs text-slate-500 font-medium">Investment:</span>
                  <span className="text-sm font-extrabold text-[#38208f]">{svc.startingPrice}</span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => onSelectService(svc.id)}
                    className="flex-1 py-2.5 text-xs font-bold text-center rounded-xl bg-[#38208f] hover:bg-[#28146e] text-white transition-colors cursor-pointer shadow-xs"
                  >
                    Request Scope
                  </button>
                  <a
                    href={`https://wa.me/${config.whatsappNumber}?text=Hello%20Wiliakonect!%20I'm%20interested%20in%20learning%20more%20about%20your%20${encodeURIComponent(
                      svc.title
                    )}.`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 text-[#15803d] bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors cursor-pointer"
                    title="Chat on WhatsApp"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Instant Project Scope Estimator */}
        <div className="bg-gradient-to-br from-[#38208f] via-[#2d1774] to-[#1c0d4e] rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#f2a20a]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#f2a20a] text-xs font-bold uppercase tracking-wider">
                <Calculator className="w-3.5 h-3.5" />
                <span>Instant Project Estimator</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Calculate an upfront estimate in 10 seconds.
              </h3>
              <p className="text-white/80 text-sm leading-relaxed max-w-xl">
                No hidden surprises, ambiguous hourly contracts, or phantom charges. Select your desired project profile below to see estimated investment.
              </p>

              {/* Scope options */}
              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-white/70 mb-2 uppercase tracking-wider">
                    Select Digital Presence Scope
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: "landing", label: "Single Landing Page" },
                      { id: "business", label: "Business Multi-Page" },
                      { id: "ecommerce", label: "E-Commerce Store" },
                      { id: "custom", label: "Custom Web App / Portal" },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setSiteType(opt.id as any)}
                        className={`p-2.5 rounded-xl text-xs font-bold text-left transition-all border cursor-pointer ${
                          siteType === opt.id
                            ? "bg-[#f2a20a] text-[#171520] border-[#f2a20a] shadow-md"
                            : "bg-white/5 text-white/90 border-white/10 hover:bg-white/10"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-1">
                  <label className="flex items-center gap-2.5 text-xs text-white/90 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={includeCustomPortal}
                      onChange={(e) => setIncludeCustomPortal(e.target.checked)}
                      className="w-4 h-4 rounded text-[#f2a20a] accent-[#f2a20a]"
                    />
                    <span>Add Custom Client Portal / Database Backend</span>
                  </label>

                  <label className="flex items-center gap-2.5 text-xs text-white/90 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={includeMaintenance}
                      onChange={(e) => setIncludeMaintenance(e.target.checked)}
                      className="w-4 h-4 rounded text-[#f2a20a] accent-[#f2a20a]"
                    />
                    <span>Include 1st Year Domain, SSL & Managed IT Care</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Right side estimate card */}
            <div className="lg:col-span-5 bg-white text-[#171520] rounded-2xl p-6 sm:p-7 shadow-xl border border-white/20">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                <span>Standard Project Investment</span>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-extrabold">
                  Save ~50% vs Agency
                </span>
              </div>

              <div className="text-[11px] text-slate-400 mb-1">
                Typical agency average: <span className="line-through text-rose-500 font-semibold">{estimate.agencyMarketAvg}</span>
              </div>

              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#38208f]">
                  {estimate.naira}
                </span>
                <span className="text-sm font-bold text-slate-500">
                  (~{estimate.usd})
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-5">
                Frontend developer crafted: responsive React/Tailwind code, SEO tags, domain linkage, and 1-on-1 WhatsApp handover in Port Harcourt.
              </p>

              <div className="space-y-2.5">
                <button
                  onClick={() => onOpenPayment && onOpenPayment(estimate.naira, `Deposit for ${siteType} project`)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-[#171520] bg-[#f2a20a] hover:bg-[#df9304] transition-all shadow-md cursor-pointer"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Pay Deposit ({estimate.naira}) Online / Bank</span>
                </button>

                <a
                  href={`https://wa.me/${config.whatsappNumber}?text=Hello%20Wiliakonect!%20I%20used%20your%20project%20estimator%20for%20a%20${siteType}%20project%20(Estimated:%20${encodeURIComponent(
                    estimate.naira
                  )}).%20Let's%20discuss%20bringing%20it%20to%20life.`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-[#15803d] hover:bg-[#166534] transition-all shadow-xs cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Lock in Quote via WhatsApp</span>
                </a>

                <button
                  onClick={() => onSelectService(siteType === "custom" ? "software-systems" : "web-design")}
                  className="w-full py-2 px-4 rounded-xl text-xs font-semibold text-[#38208f] bg-[#f4f0fd] hover:bg-[#eae3fc] transition-colors cursor-pointer text-center"
                >
                  Book Official Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
