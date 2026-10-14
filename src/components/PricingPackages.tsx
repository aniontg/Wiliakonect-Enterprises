import React, { useState } from "react";
import {
  Check,
  Sparkles,
  ArrowRight,
  MessageSquare,
  CreditCard,
  Zap,
  Shield,
  Layers,
  Code2,
  Clock,
  TrendingDown,
  CheckCircle2,
} from "lucide-react";
import { CompanyConfig, StandardPricingPackage } from "../data/companyData";

interface PricingPackagesProps {
  config: CompanyConfig;
  onOpenPayment?: (amount: string, title: string) => void;
  onSelectPackage?: (packageName: string) => void;
}

export const PricingPackages: React.FC<PricingPackagesProps> = ({
  config,
  onOpenPayment,
  onSelectPackage,
}) => {
  const [currency, setCurrency] = useState<"NGN" | "USD">("NGN");
  const [filter, setFilter] = useState<"all" | "builds" | "monthly">("all");

  const packages = config.standardPackages || [];

  const filteredPackages = packages.filter((pkg) => {
    if (filter === "builds") return pkg.billingCycle !== "monthly";
    if (filter === "monthly") return pkg.billingCycle === "monthly";
    return true;
  });

  const formatPrice = (pkg: StandardPricingPackage) => {
    if (currency === "USD") {
      const isMonthly = pkg.billingCycle === "monthly";
      return {
        main: `$${pkg.startingUsd}`,
        sub: isMonthly ? "/ month" : "starting",
        rangeNote: `Approx. $${pkg.startingUsd} – $${Math.round(pkg.startingUsd * 1.8)}`,
      };
    }
    const isMonthly = pkg.billingCycle === "monthly";
    return {
      main: `₦${pkg.startingNaira.toLocaleString()}`,
      sub: isMonthly ? "/ month" : "starting",
      rangeNote: pkg.penetrationPrice,
    };
  };

  return (
    <section className="py-20 bg-[#faf9fc]" id="pricing-packages">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#38208f]/10 text-[#38208f] text-xs font-bold uppercase tracking-wider">
            <TrendingDown className="w-3.5 h-3.5 text-[#f2a20a]" />
            <span>Standard Market Penetration Rates</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#171520] tracking-tight">
            High-standard engineering. <br className="hidden sm:inline" />
            <span className="text-[#38208f]">Direct developer pricing.</span>
          </h2>

          <p className="text-base text-[#5e5973] leading-relaxed">
            I am a dedicated frontend developer based in Port Harcourt, Nigeria with global remote delivery.
            By eliminating agency middleman markups and bloated retainers, I deliver standard, high-converting,
            and pixel-perfect websites and apps at competitive penetration prices.
          </p>

          {/* Controls: Currency switch & category filter */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            {/* Filter */}
            <div className="bg-slate-200/80 p-1 rounded-xl flex items-center text-xs font-bold">
              <button
                onClick={() => setFilter("all")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  filter === "all" ? "bg-white text-[#38208f] shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                All Packages ({packages.length})
              </button>
              <button
                onClick={() => setFilter("builds")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  filter === "builds" ? "bg-white text-[#38208f] shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Web & App Builds
              </button>
              <button
                onClick={() => setFilter("monthly")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  filter === "monthly" ? "bg-white text-[#38208f] shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Monthly Care
              </button>
            </div>

            {/* Currency switcher */}
            <div className="bg-slate-200/80 p-1 rounded-xl flex items-center text-xs font-bold">
              <button
                onClick={() => setCurrency("NGN")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  currency === "NGN" ? "bg-[#38208f] text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                ₦ NGN (Naira)
              </button>
              <button
                onClick={() => setCurrency("USD")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  currency === "USD" ? "bg-[#38208f] text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                $ USD (Global)
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 items-stretch">
          {filteredPackages.map((pkg) => {
            const price = formatPrice(pkg);
            const isHighlighted = pkg.popular;

            return (
              <div
                key={pkg.id}
                className={`rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 relative border ${
                  isHighlighted
                    ? "bg-white border-[#38208f] shadow-2xl shadow-[#38208f]/10 ring-2 ring-[#38208f]/20"
                    : "bg-white border-slate-200/90 hover:border-[#38208f]/40 shadow-lg hover:shadow-xl"
                }`}
              >
                {/* Badge */}
                {pkg.badge && (
                  <div
                    className={`absolute -top-3.5 left-7 px-3.5 py-1 rounded-full text-[11px] font-extrabold shadow-sm flex items-center gap-1.5 ${
                      isHighlighted
                        ? "bg-[#38208f] text-white"
                        : "bg-[#f2a20a] text-[#171520]"
                    }`}
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>{pkg.badge}</span>
                  </div>
                )}

                <div>
                  {/* Category & Scope */}
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2 pt-2">
                    <span className="uppercase tracking-wider">{pkg.category}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-[#38208f] font-semibold">
                      {pkg.scopePages}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-extrabold text-[#171520] mb-2">{pkg.name}</h3>

                  {/* Market comparison vs Penetration Price */}
                  <div className="p-4 rounded-2xl bg-[#faf9fc] border border-slate-100 my-4 space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>Typical Agency Price:</span>
                      <span className="line-through font-bold text-rose-500">
                        {pkg.marketPriceRange}
                      </span>
                    </div>

                    <div className="flex items-baseline justify-between border-t border-slate-200/60 pt-2">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-3xl font-black text-[#38208f] tracking-tight">
                          {price.main}
                        </span>
                        <span className="text-xs font-bold text-slate-500">{price.sub}</span>
                      </div>
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        Penetration Value
                      </span>
                    </div>

                    <div className="text-[11px] font-medium text-slate-600">
                      Scope range: <strong className="text-slate-900">{price.rangeNote}</strong>
                    </div>
                  </div>

                  <p className="text-xs text-[#5e5973] leading-relaxed mb-6">
                    {pkg.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2.5 mb-6 border-t border-slate-100 pt-5">
                    <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      What's Included:
                    </div>
                    {pkg.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <div className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Frontend Dev Edge */}
                  <div className="p-3.5 rounded-xl bg-purple-50/70 border border-purple-100/80 mb-6 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#38208f] uppercase tracking-wide">
                      <Code2 className="w-3.5 h-3.5 text-[#f2a20a]" />
                      <span>Frontend Developer Advantage</span>
                    </div>
                    {pkg.frontendPerks.map((perk, i) => (
                      <div key={i} className="flex items-start gap-2 text-[11px] text-[#2b176f]">
                        <CheckCircle2 className="w-3 h-3 text-[#f2a20a] shrink-0 mt-0.5" />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer / Actions */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#38208f]" />
                      <span>Turnaround:</span>
                    </span>
                    <strong className="text-slate-900">{pkg.turnaround}</strong>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        const amountStr = `₦${pkg.startingNaira.toLocaleString()}`;
                        if (onOpenPayment) {
                          onOpenPayment(amountStr, `Initial Deposit for ${pkg.name}`);
                        } else if (onSelectPackage) {
                          onSelectPackage(pkg.name);
                        }
                      }}
                      className={`flex-1 py-3 px-3 text-xs font-bold text-center rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm ${
                        isHighlighted
                          ? "bg-[#38208f] hover:bg-[#251368] text-white"
                          : "bg-[#171520] hover:bg-[#2a2638] text-white"
                      }`}
                    >
                      <CreditCard className="w-3.5 h-3.5 text-[#f2a20a]" />
                      <span>Book Package</span>
                    </button>

                    <a
                      href={`https://wa.me/${config.whatsappNumber}?text=Hello%20Anointed-Godswill!%20I%20am%20interested%20in%20the%20${encodeURIComponent(
                        pkg.name
                      )}%20package%20(${encodeURIComponent(
                        `₦${pkg.startingNaira.toLocaleString()} / $${pkg.startingUsd}`
                      )}).%20Let's%20discuss%20my%20project.`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 text-[#15803d] bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors cursor-pointer shrink-0"
                      title="Direct WhatsApp with Founder"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Why Direct Frontend Developer Pricing Beats Agencies */}
        <div className="bg-gradient-to-br from-[#171520] via-[#241a45] to-[#171520] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#38208f]/30 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#f2a20a] text-xs font-bold uppercase tracking-wider">
                <Code2 className="w-3.5 h-3.5" />
                <span>The Frontend Developer Guarantee</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Why my penetration pricing doesn't compromise on standard.
              </h3>

              <p className="text-white/80 text-sm leading-relaxed">
                Traditional digital agencies charge ₦450,000 to ₦1,500,000+ because they have account executives, office rents, and layers of administration.
                As a dedicated frontend developer operating from Port Harcourt, Nigeria:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  {
                    title: "Zero Agency Overhead",
                    desc: "You deal directly with Anointed-Godswill. No bureaucratic lag or telephone games.",
                  },
                  {
                    title: "Modern React & TypeScript",
                    desc: "Zero bloated third-party themes. Clean, optimized code that loads instantaneously.",
                  },
                  {
                    title: "Built-in Payment Rails",
                    desc: "Instant Paystack, Flutterwave, and direct bank settlement ready for your customers.",
                  },
                  {
                    title: "Wiliakonect CMS Included",
                    desc: "Update your text, images, and products visually without needing a developer every time.",
                  },
                ].map((item, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <h5 className="font-bold text-xs text-[#f2a20a] flex items-center gap-1.5">
                      <Zap className="w-3 h-3" />
                      <span>{item.title}</span>
                    </h5>
                    <p className="text-[11px] text-white/70 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-7 border border-white/15 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#38208f] flex items-center justify-center text-white font-black text-lg">
                  AG
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Anointed-Godswill C C-E</h4>
                  <p className="text-xs text-[#f2a20a]">Founder & Lead Frontend Developer</p>
                  <p className="text-[10px] text-white/60">Port Harcourt, Nigeria · Worldwide Delivery</p>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4 space-y-2 text-xs text-white/90">
                <div className="flex justify-between">
                  <span className="text-white/60">Primary Stack:</span>
                  <strong>React, TypeScript, Tailwind, Vite</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Payment Gateways:</span>
                  <strong>Paystack, Flutterwave, Cards, USDT</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Direct Hotline:</span>
                  <strong className="text-emerald-400">+234 911 463 8331</strong>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={`https://wa.me/${config.whatsappNumber}?text=Hello%20Anointed-Godswill!%20I%20reviewed%20your%20frontend%20developer%20packages%20and%20want%20to%20discuss%20a%20project.`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-[#171520] bg-[#f2a20a] hover:bg-[#df9304] transition-all shadow-md cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Start a 1-on-1 Consultation on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
