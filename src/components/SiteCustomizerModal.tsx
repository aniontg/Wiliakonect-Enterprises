import React, { useState } from "react";
import { X, Check, RotateCcw, Sparkles, Building, Phone, Layers, Info, CheckCircle2, CreditCard } from "lucide-react";
import { CompanyConfig, resetCompanyConfig, saveCompanyConfig } from "../data/companyData";

interface SiteCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: CompanyConfig;
  onUpdateConfig: (newConfig: CompanyConfig) => void;
}

export const SiteCustomizerModal: React.FC<SiteCustomizerModalProps> = ({
  isOpen,
  onClose,
  config,
  onUpdateConfig,
}) => {
  const [activeTab, setActiveTab] = useState<"general" | "contact" | "services" | "about" | "payments">("general");
  const [formData, setFormData] = useState<CompanyConfig>({ ...config });
  const [showSavedToast, setShowSavedToast] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    saveCompanyConfig(formData);
    onUpdateConfig(formData);
    setShowSavedToast(true);
    setTimeout(() => {
      setShowSavedToast(false);
      onClose();
    }, 1200);
  };

  const handleReset = () => {
    if (window.confirm("Reset all site modifications back to default?")) {
      const reset = resetCompanyConfig();
      setFormData(reset);
      onUpdateConfig(reset);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-[#38208f]/20">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#38208f] to-[#251368] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-[#f2a20a] rounded-lg text-[#38208f]">
              <Sparkles className="w-5 h-5 font-bold" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Wiliakonect Site Modifier</h2>
              <p className="text-xs text-white/80">
                Live editor: change text, phone numbers, WhatsApp, emails, services & story
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 gap-2">
          <button
            onClick={() => setActiveTab("general")}
            className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 cursor-pointer transition-colors ${
              activeTab === "general"
                ? "border-[#38208f] text-[#38208f] bg-white rounded-t-lg -mb-px"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Building className="w-4 h-4" />
            <span>Brand & Hero</span>
          </button>
          <button
            onClick={() => setActiveTab("contact")}
            className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 cursor-pointer transition-colors ${
              activeTab === "contact"
                ? "border-[#38208f] text-[#38208f] bg-white rounded-t-lg -mb-px"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Phone className="w-4 h-4" />
            <span>Contacts & Links</span>
          </button>
          <button
            onClick={() => setActiveTab("services")}
            className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 cursor-pointer transition-colors ${
              activeTab === "services"
                ? "border-[#38208f] text-[#38208f] bg-white rounded-t-lg -mb-px"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Services & Pricing</span>
          </button>
          <button
            onClick={() => setActiveTab("about")}
            className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 cursor-pointer transition-colors ${
              activeTab === "about"
                ? "border-[#38208f] text-[#38208f] bg-white rounded-t-lg -mb-px"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Info className="w-4 h-4" />
            <span>About & Story</span>
          </button>
          <button
            onClick={() => setActiveTab("payments")}
            className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 cursor-pointer transition-colors ${
              activeTab === "payments"
                ? "border-[#38208f] text-[#38208f] bg-white rounded-t-lg -mb-px"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <CreditCard className="w-4 h-4 text-emerald-600" />
            <span>Bank & Payments</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {activeTab === "general" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Brand Name
                  </label>
                  <input
                    type="text"
                    value={formData.brandName}
                    onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#38208f]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={formData.brandTagline}
                    onChange={(e) => setFormData({ ...formData, brandTagline: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#38208f]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Hero Eyebrow Banner
                </label>
                <input
                  type="text"
                  value={formData.heroEyebrow}
                  onChange={(e) => setFormData({ ...formData, heroEyebrow: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#38208f]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Hero Main Headline
                  </label>
                  <input
                    type="text"
                    value={formData.heroTitle}
                    onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#38208f]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Hero Headline Highlight (Purple/Amber)
                  </label>
                  <input
                    type="text"
                    value={formData.heroHighlight}
                    onChange={(e) => setFormData({ ...formData, heroHighlight: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#38208f]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Hero Description
                </label>
                <textarea
                  rows={3}
                  value={formData.heroSubtitle}
                  onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#38208f]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Hero Primary Button Text
                </label>
                <input
                  type="text"
                  value={formData.heroCtaText}
                  onChange={(e) => setFormData({ ...formData, heroCtaText: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#38208f]"
                />
              </div>
            </div>
          )}

          {activeTab === "contact" && (
            <div className="space-y-4">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900">
                Updating your WhatsApp and phone numbers here immediately updates all direct contact links, click-to-call, and inquiry buttons across the entire site.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Primary Phone Number
                  </label>
                  <input
                    type="text"
                    value={formData.phonePrimary}
                    onChange={(e) => setFormData({ ...formData, phonePrimary: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#38208f]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Secondary Phone Number
                  </label>
                  <input
                    type="text"
                    value={formData.phoneSecondary}
                    onChange={(e) => setFormData({ ...formData, phoneSecondary: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#38208f]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  WhatsApp Number (with country code, no + or spaces, e.g. 2349114638331)
                </label>
                <input
                  type="text"
                  value={formData.whatsappNumber}
                  onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#38208f]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Primary Email
                  </label>
                  <input
                    type="email"
                    value={formData.emailPrimary}
                    onChange={(e) => setFormData({ ...formData, emailPrimary: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#38208f]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Secondary Email
                  </label>
                  <input
                    type="email"
                    value={formData.emailSecondary}
                    onChange={(e) => setFormData({ ...formData, emailSecondary: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#38208f]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Location & Operating Region
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#38208f]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Working Hours
                </label>
                <input
                  type="text"
                  value={formData.workingHours}
                  onChange={(e) => setFormData({ ...formData, workingHours: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#38208f]"
                />
              </div>
            </div>
          )}

          {activeTab === "services" && (
            <div className="space-y-6">
              <p className="text-xs text-slate-500">
                Edit service titles, starting prices, and core offerings:
              </p>
              {formData.services.map((svc, index) => (
                <div key={svc.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#38208f]">Service #{index + 1}</span>
                    <input
                      type="text"
                      placeholder="Badge (e.g. Most Popular)"
                      value={svc.badge}
                      onChange={(e) => {
                        const newServices = [...formData.services];
                        newServices[index].badge = e.target.value;
                        setFormData({ ...formData, services: newServices });
                      }}
                      className="px-2 py-1 text-xs border border-slate-300 rounded bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                        Title
                      </label>
                      <input
                        type="text"
                        value={svc.title}
                        onChange={(e) => {
                          const newServices = [...formData.services];
                          newServices[index].title = e.target.value;
                          setFormData({ ...formData, services: newServices });
                        }}
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                        Starting Price
                      </label>
                      <input
                        type="text"
                        value={svc.startingPrice}
                        onChange={(e) => {
                          const newServices = [...formData.services];
                          newServices[index].startingPrice = e.target.value;
                          setFormData({ ...formData, services: newServices });
                        }}
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                      Subtitle / Summary
                    </label>
                    <input
                      type="text"
                      value={svc.subtitle}
                      onChange={(e) => {
                        const newServices = [...formData.services];
                        newServices[index].subtitle = e.target.value;
                        setFormData({ ...formData, services: newServices });
                      }}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">
                      Description
                    </label>
                    <textarea
                      rows={2}
                      value={svc.description}
                      onChange={(e) => {
                        const newServices = [...formData.services];
                        newServices[index].description = e.target.value;
                        setFormData({ ...formData, services: newServices });
                      }}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded text-xs bg-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "about" && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  About Page Headline
                </label>
                <input
                  type="text"
                  value={formData.aboutHeroTitle}
                  onChange={(e) => setFormData({ ...formData, aboutHeroTitle: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#38208f]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  The Wiliakonect Story & Mission
                </label>
                <textarea
                  rows={5}
                  value={formData.aboutStory}
                  onChange={(e) => setFormData({ ...formData, aboutStory: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#38208f]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Founder Name
                  </label>
                  <input
                    type="text"
                    value={formData.founderName}
                    onChange={(e) => setFormData({ ...formData, founderName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#38208f]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Founder Title / Role
                  </label>
                  <input
                    type="text"
                    value={formData.founderRole}
                    onChange={(e) => setFormData({ ...formData, founderRole: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#38208f]"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "payments" && (
            <div className="space-y-4">
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900">
                Configure your commercial bank account, Paystack link, and multi-currency rails so clients can pay you directly through the web app.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Zenith Bank / Access Bank / GTBank"
                    value={formData.payments?.bankName || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        payments: { ...formData.payments, bankName: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#38208f]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Account Number
                  </label>
                  <input
                    type="text"
                    placeholder="10-digit NUBAN"
                    value={formData.payments?.accountNumber || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        payments: { ...formData.payments, accountNumber: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#38208f]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Account Name (Beneficiary)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Wiliakonect / Anointed-Godswill C C-E"
                  value={formData.payments?.accountName || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      payments: { ...formData.payments, accountName: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#38208f]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Paystack Payment Page URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://paystack.com/pay/your-page"
                    value={formData.payments?.paystackLink || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        payments: { ...formData.payments, paystackLink: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#38208f]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Flutterwave / Multi-Currency Link
                  </label>
                  <input
                    type="url"
                    placeholder="https://flutterwave.com/pay/your-page"
                    value={formData.payments?.flutterwaveLink || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        payments: { ...formData.payments, flutterwaveLink: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#38208f]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Crypto / USDT (TRC-20) Wallet for Foreign Clients
                </label>
                <input
                  type="text"
                  placeholder="TRC20 Wallet Address"
                  value={formData.payments?.usdtTrc20Address || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      payments: { ...formData.payments, usdtTrc20Address: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#38208f]"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer controls */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-red-600 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-white bg-[#38208f] hover:bg-[#251368] rounded-xl shadow-md transition-all cursor-pointer"
            >
              {showSavedToast ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-[#f2a20a]" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Apply Modifications</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
