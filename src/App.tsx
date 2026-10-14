import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { TrustStrip } from "./components/TrustStrip";
import { ServicesSection } from "./components/ServicesSection";
import { ServicesPage } from "./pages/ServicesPage";
import { AboutPage } from "./pages/AboutPage";
import { CmsBuilderPage } from "./pages/CmsBuilderPage";
import { DashboardPage } from "./pages/DashboardPage";
import { ContactPage } from "./pages/ContactPage";
import { AssistantWidget } from "./components/AssistantWidget";
import { Footer } from "./components/Footer";
import { SiteCustomizerModal } from "./components/SiteCustomizerModal";
import { AuthModal } from "./components/AuthModal";
import { PaymentModal } from "./components/PaymentModal";
import { PricingPackages } from "./components/PricingPackages";
import { OfflineIndicator } from "./components/OfflineIndicator";
import { loadCompanyConfig, saveCompanyConfig, CompanyConfig } from "./data/companyData";
import { ArrowUpRight, Sparkles, SlidersHorizontal, ShieldCheck, Crown, CreditCard } from "lucide-react";
import { useAuth } from "./context/AuthContext";

export default function App() {
  const [config, setConfig] = useState<CompanyConfig>(loadCompanyConfig());
  const [currentTab, setCurrentTab] = useState<string>("home");
  const [customizerOpen, setCustomizerOpen] = useState<boolean>(false);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState<boolean>(false);
  const [paymentAmount, setPaymentAmount] = useState<string>("₦75,000");
  const [paymentTitle, setPaymentTitle] = useState<string>("Website Project Deposit");
  const [prefilledService, setPrefilledService] = useState<string>("");

  const { isAuthenticated, user, isProUser } = useAuth();

  // Handle URL hash or query params if any
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (["home", "services", "about", "cms", "builder", "dashboard", "contact"].includes(hash)) {
        setCurrentTab(hash === "builder" ? "cms" : hash);
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const handleUpdateConfig = (newConfig: CompanyConfig) => {
    setConfig(newConfig);
    saveCompanyConfig(newConfig);
  };

  const handleNavigate = (tab: string) => {
    const target = tab === "builder" ? "cms" : tab;
    setCurrentTab(target);
    window.location.hash = target;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenPayment = (amount: string, title: string) => {
    setPaymentAmount(amount);
    setPaymentTitle(title);
    setPaymentModalOpen(true);
  };

  const handleSelectService = (serviceId: string) => {
    const found = config.services.find((s) => s.id === serviceId);
    if (found) {
      setPrefilledService(found.title);
    }
    handleNavigate("contact");
  };

  const handleBookService = (serviceTitle: string) => {
    setPrefilledService(serviceTitle);
    handleNavigate("contact");
  };

  // If viewing the Wiliakonect CMS full screen workspace
  if (currentTab === "cms") {
    return (
      <div className="min-h-screen flex flex-col bg-[#1d2327]">
        <CmsBuilderPage
          config={config}
          onGoToSite={() => handleNavigate("home")}
          onOpenAuth={() => setAuthModalOpen(true)}
        />
        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
        />
        <PaymentModal
          isOpen={paymentModalOpen}
          onClose={() => setPaymentModalOpen(false)}
          config={config}
          defaultAmount={paymentAmount}
          defaultTitle={paymentTitle}
        />
        <OfflineIndicator />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9fc] text-[#171520]">
      {/* Top sticky navigation bar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={handleNavigate}
        config={config}
        onOpenCustomizer={() => setCustomizerOpen(true)}
        onOpenAuth={() => setAuthModalOpen(true)}
      />

      {/* Main content body based on active tab */}
      <main className="flex-1">
        {currentTab === "home" && (
          <div>
            <Hero
              config={config}
              onExploreServices={() => {
                const el = document.getElementById("services");
                if (el) el.scrollIntoView({ behavior: "smooth" });
                else handleNavigate("services");
              }}
              onStartProject={() => handleNavigate("contact")}
              onOpenBuilder={() => handleNavigate("cms")}
            />

            <TrustStrip />

            <ServicesSection
              config={config}
              onSelectService={handleSelectService}
              onGoToFullServices={() => handleNavigate("services")}
              onOpenPayment={handleOpenPayment}
            />

            {/* Standard Penetration Packages Section */}
            <PricingPackages
              config={config}
              onOpenPayment={handleOpenPayment}
              onSelectPackage={handleBookService}
            />

            {/* Home Builder Teaser Banner */}
            <section className="py-16 bg-white border-t border-slate-100">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gradient-to-br from-[#faf9fc] via-[#f3f0fa] to-[#ede7f9] rounded-3xl p-8 sm:p-12 border border-[#38208f]/15 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="space-y-3 max-w-xl">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#38208f]/10 text-[#38208f] text-xs font-bold uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5 text-[#f2a20a]" />
                      <span>Wiliakonect CMS & AI Website Builder</span>
                    </div>
                    <h2 className="text-3xl font-extrabold text-[#171520] tracking-tight">
                      Build your website with Wiliakonect CMS & AI.
                    </h2>
                    <p className="text-sm text-[#5e5973] leading-relaxed">
                      Generate a full bespoke site from a text prompt using Gemini AI, edit blocks visually in our Wiliakonect CMS, unlock Pro e-commerce tools, and deploy with 256-bit security from Port Harcourt, Nigeria.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => handleNavigate("cms")}
                      className="px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-[#38208f] hover:bg-[#251368] shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Crown className="w-4 h-4 text-[#f2a20a]" />
                      <span>Launch Wiliakonect CMS</span>
                      <ArrowUpRight className="w-4 h-4 text-[#f2a20a]" />
                    </button>
                    <button
                      onClick={() => handleOpenPayment("₦75,000", "Basic Business / Landing Page Deposit")}
                      className="px-5 py-3.5 rounded-xl text-sm font-bold text-[#171520] bg-[#f2a20a] hover:bg-[#df9304] shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Pay Online / Bank</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {currentTab === "services" && (
          <ServicesPage
            config={config}
            onBookService={handleBookService}
            onOpenPayment={handleOpenPayment}
          />
        )}

        {currentTab === "about" && (
          <AboutPage config={config} onContactClick={() => handleNavigate("contact")} />
        )}

        {currentTab === "dashboard" && (
          <DashboardPage
            config={config}
            onOpenBuilder={() => handleNavigate("cms")}
            onOpenCustomizer={() => setCustomizerOpen(true)}
          />
        )}

        {currentTab === "contact" && (
          <ContactPage config={config} prefilledService={prefilledService} />
        )}
      </main>

      {/* Floating Interactive Assistant Concierge */}
      <AssistantWidget
        config={config}
        onNavigate={handleNavigate}
        onOpenCustomizer={() => setCustomizerOpen(true)}
      />

      {/* Footer */}
      <Footer
        config={config}
        onNavigate={handleNavigate}
        onOpenCustomizer={() => setCustomizerOpen(true)}
      />

      {/* Live Site Customizer Modal */}
      <SiteCustomizerModal
        isOpen={customizerOpen}
        onClose={() => setCustomizerOpen(false)}
        config={config}
        onUpdateConfig={handleUpdateConfig}
      />

      {/* Authentic Security & Sign In Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />

      {/* Payment & Billing Gateway Modal */}
      <PaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        config={config}
        defaultAmount={paymentAmount}
        defaultTitle={paymentTitle}
      />

      {/* Offline Connectivity Indicator */}
      <OfflineIndicator />
    </div>
  );
}
