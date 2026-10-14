import React, { useState } from "react";
import {
  X,
  CreditCard,
  Building2,
  Copy,
  Check,
  ExternalLink,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  QrCode,
  Globe2,
  CheckCircle2,
  ArrowRight,
  Repeat,
  Calendar,
} from "lucide-react";
import { CompanyConfig } from "../data/companyData";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: CompanyConfig;
  defaultAmount?: string;
  defaultTitle?: string;
  defaultRecurring?: boolean;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  config,
  defaultAmount = "₦75,000",
  defaultTitle = "Basic Business / Landing Page Deposit",
  defaultRecurring = false,
}) => {
  const [copiedAcc, setCopiedAcc] = useState(false);
  const [copiedUsdt, setCopiedUsdt] = useState(false);
  const [billingType, setBillingType] = useState<"onetime" | "recurring">(
    defaultRecurring || defaultTitle.toLowerCase().includes("maintenance") || defaultTitle.toLowerCase().includes("support")
      ? "recurring"
      : "onetime"
  );
  const [interval, setInterval] = useState<"monthly" | "annually">("monthly");
  const [paymentMethod, setPaymentMethod] = useState<"bank" | "paystack" | "flutterwave" | "usdt">("bank");
  const [clientName, setClientName] = useState("");
  const [amount, setAmount] = useState(defaultAmount);
  const [title, setTitle] = useState(defaultTitle);

  if (!isOpen) return null;

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(config.payments.accountNumber);
    setCopiedAcc(true);
    setTimeout(() => setCopiedAcc(false), 2000);
  };

  const handleCopyUsdt = () => {
    navigator.clipboard.writeText(config.payments.usdtTrc20Address);
    setCopiedUsdt(true);
    setTimeout(() => setCopiedUsdt(false), 2000);
  };

  const generateWhatsAppConfirmationUrl = () => {
    const recurringText = billingType === "recurring" ? `(RECURRING ${interval.toUpperCase()})` : "(ONE-TIME PAYMENT)";
    const text = `*Payment Notification for Wiliakonect*\n\n*Client Name:* ${clientName || "Client"}\n*Purpose:* ${title} ${recurringText}\n*Amount:* ${amount}\n*Billing Type:* ${billingType === "recurring" ? `Recurring (${interval})` : "One-Time Settlement"}\n*Payment Method:* ${paymentMethod.toUpperCase()}\n*Founder:* Anointed-Godswill C C-E\n\nI have initiated this payment. Please verify and confirm milestone receipt.`;
    return `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200 text-[#171520]">
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-[#171520] via-[#2c155d] to-[#38208f] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#f2a20a] text-[#171520] flex items-center justify-center font-black">
              ₦
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base tracking-tight">Wiliakonect Payment Gateway</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Instant Verification
                </span>
              </div>
              <p className="text-xs text-white/70">
                Official Billing Portal · Port Harcourt, Nigeria · Global Delivery
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-white/70 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Billing Type Selector (One-Time vs Recurring) */}
        <div className="bg-slate-100 px-6 py-2.5 border-b border-slate-200 flex items-center justify-between text-xs">
          <span className="font-bold text-slate-700">Billing Structure:</span>
          <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-300">
            <button
              onClick={() => setBillingType("onetime")}
              className={`px-3 py-1 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                billingType === "onetime"
                  ? "bg-[#38208f] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              One-Time Payment
            </button>
            <button
              onClick={() => setBillingType("recurring")}
              className={`px-3 py-1 rounded-lg font-bold text-xs transition-all cursor-pointer flex items-center gap-1 ${
                billingType === "recurring"
                  ? "bg-[#38208f] text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Repeat className="w-3 h-3 text-[#f2a20a]" />
              <span>Recurring Subscription</span>
            </button>
          </div>
        </div>

        {/* Amount & Purpose Banner */}
        <div className="px-6 py-4 bg-purple-50/70 border-b border-purple-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#38208f]">
              Transaction Details {billingType === "recurring" && "(Automated Renewal)"}
            </span>
            <div className="text-sm font-bold text-slate-800">{title}</div>
            {billingType === "recurring" && (
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[11px] text-purple-900 font-semibold flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#f2a20a]" /> Billing Cycle:
                </span>
                <button
                  onClick={() => setInterval("monthly")}
                  className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    interval === "monthly" ? "bg-[#38208f] text-white" : "bg-purple-100 text-purple-800"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setInterval("annually")}
                  className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    interval === "annually" ? "bg-[#38208f] text-white" : "bg-purple-100 text-purple-800"
                  }`}
                >
                  Annually (Save 15%)
                </button>
              </div>
            )}
          </div>
          <div className="text-left sm:text-right">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              {billingType === "recurring" ? `Rate per ${interval === "monthly" ? "Month" : "Year"}` : "Total Due"}
            </span>
            <div className="text-2xl font-extrabold text-[#38208f]">
              {amount}
              {billingType === "recurring" && (
                <span className="text-xs font-bold text-slate-500">/{interval === "monthly" ? "mo" : "yr"}</span>
              )}
            </div>
          </div>
        </div>

        {/* Quick Standard Package Chooser */}
        <div className="px-6 py-2 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none text-[11px]">
            <span className="text-slate-500 font-bold shrink-0">Packages:</span>
            {[
              { name: "Landing (₦75k)", title: "Basic Business / Landing Page", amt: "₦75,000", type: "onetime" },
              { name: "Corporate (₦210k)", title: "Standard Corporate Website", amt: "₦210,000", type: "onetime" },
              { name: "E-Commerce (₦320k)", title: "E-Commerce Online Store", amt: "₦320,000", type: "onetime" },
              { name: "React MVP (₦650k)", title: "Custom Web Application / React MVP", amt: "₦650,000", type: "onetime" },
              { name: "Care (₦25k/mo)", title: "Monthly Care & Maintenance", amt: "₦25,000", type: "recurring" },
            ].map((p, i) => (
              <button
                key={i}
                onClick={() => {
                  setAmount(p.amt);
                  setTitle(p.title);
                  setBillingType(p.type as any);
                }}
                className={`px-2.5 py-1 rounded-lg shrink-0 font-bold transition-all border cursor-pointer ${
                  amount === p.amt
                    ? "bg-[#38208f] text-white border-[#38208f] shadow-xs"
                    : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Payment Rail Selectors */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {billingType === "recurring" && (
            <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 flex items-start gap-2.5">
              <Repeat className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong>How Recurring Subscriptions Work:</strong>
                <p className="mt-0.5 text-amber-800">
                  When paying via <strong>Paystack</strong> or <strong>Flutterwave</strong>, your card is securely tokenized and charged automatically on the same date each month or year. You can cancel anytime with 1 click. Direct bank transfers require manual monthly transfer or standing order.
                </p>
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
              Select Preferred Payment Rail
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => setPaymentMethod("bank")}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  paymentMethod === "bank"
                    ? "bg-[#38208f] text-white border-[#38208f] shadow-sm"
                    : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700"
                }`}
              >
                <Building2 className="w-4 h-4 mb-1 text-[#f2a20a]" />
                <div className="font-bold text-xs">Direct Transfer</div>
                <div className="text-[10px] opacity-75">Naira (NGN ₦)</div>
              </button>

              <button
                onClick={() => setPaymentMethod("paystack")}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  paymentMethod === "paystack"
                    ? "bg-[#38208f] text-white border-[#38208f] shadow-sm"
                    : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700"
                }`}
              >
                <CreditCard className="w-4 h-4 mb-1 text-emerald-400" />
                <div className="font-bold text-xs">Paystack</div>
                <div className="text-[10px] opacity-75">
                  {billingType === "recurring" ? "Auto Card Debit" : "Card / Transfer"}
                </div>
              </button>

              <button
                onClick={() => setPaymentMethod("flutterwave")}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  paymentMethod === "flutterwave"
                    ? "bg-[#38208f] text-white border-[#38208f] shadow-sm"
                    : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700"
                }`}
              >
                <Globe2 className="w-4 h-4 mb-1 text-amber-400" />
                <div className="font-bold text-xs">Flutterwave</div>
                <div className="text-[10px] opacity-75">USD, GBP, EUR & Card</div>
              </button>

              <button
                onClick={() => setPaymentMethod("usdt")}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  paymentMethod === "usdt"
                    ? "bg-[#38208f] text-white border-[#38208f] shadow-sm"
                    : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700"
                }`}
              >
                <QrCode className="w-4 h-4 mb-1 text-cyan-400" />
                <div className="font-bold text-xs">Crypto / USDT</div>
                <div className="text-[10px] opacity-75">TRC20 Global</div>
              </button>
            </div>
          </div>

          {/* METHOD 1: Direct Bank Transfer */}
          {paymentMethod === "bank" && (
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <span className="text-xs font-bold text-slate-700">Nigerian Commercial Bank Details</span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Zero Processing Fee
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-500 block text-[11px]">Bank Name:</span>
                  <strong className="text-sm text-slate-900">{config.payments.bankName}</strong>
                </div>

                <div>
                  <span className="text-slate-500 block text-[11px]">Account Number:</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xl font-mono font-black text-[#38208f] tracking-wider">
                      {config.payments.accountNumber}
                    </span>
                    <button
                      onClick={handleCopyAccount}
                      className="px-2.5 py-1 text-xs font-bold rounded-lg bg-white border border-slate-300 hover:bg-slate-100 flex items-center gap-1 cursor-pointer"
                    >
                      {copiedAcc ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-600" />}
                      <span>{copiedAcc ? "Copied!" : "Copy"}</span>
                    </button>
                  </div>
                </div>

                <div>
                  <span className="text-slate-500 block text-[11px]">Beneficiary / Account Name:</span>
                  <strong className="text-sm text-slate-900">{config.payments.accountName}</strong>
                </div>

                <div>
                  <span className="text-slate-500 block text-[11px]">Location & Node:</span>
                  <span className="text-slate-700">Port Harcourt, Rivers State, Nigeria</span>
                </div>
              </div>
            </div>
          )}

          {/* METHOD 2: Paystack Gateway */}
          {paymentMethod === "paystack" && (
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <span className="text-xs font-bold text-slate-700">Paystack Automated Gateway</span>
                <span className="text-[10px] font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded-full">
                  {billingType === "recurring" ? "Recurring Card Auto-Debit" : "Instant Auto-Receipt"}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {billingType === "recurring"
                  ? "Paystack safely tokenizes your card for automated monthly/annual subscription renewals with zero missed server uptime. You can pause or cancel anytime."
                  : "Pay securely using your Debit/Credit Card (Mastercard, Visa, Verve), generate an instant Virtual Transfer Account, or pay via USSD and Apple Pay."}
              </p>
              <div className="pt-2">
                <a
                  href={config.payments.paystackLink}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-xs text-white bg-[#00c3f7] hover:bg-[#00ace3] transition-all shadow-md cursor-pointer text-[#171520]"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>
                    Proceed to Paystack {billingType === "recurring" ? `Subscription (${amount}/${interval === "monthly" ? "mo" : "yr"})` : `Checkout (${amount})`}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {/* METHOD 3: Flutterwave Gateway */}
          {paymentMethod === "flutterwave" && (
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <span className="text-xs font-bold text-slate-700">Flutterwave Multi-Currency Rail</span>
                <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                  {billingType === "recurring" ? "Recurring Plan Supported" : "Global Currencies Accepted"}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Accepts cards from over 150 countries in USD, GBP, EUR, and African currencies with immediate escrow confirmation and automated renewal support.
              </p>
              <div className="pt-2">
                <a
                  href={config.payments.flutterwaveLink}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-xs text-white bg-[#fb9129] hover:bg-[#e27c19] transition-all shadow-md cursor-pointer"
                >
                  <Globe2 className="w-4 h-4" />
                  <span>Pay via Flutterwave Multi-Currency Link</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {/* METHOD 4: Crypto / USDT */}
          {paymentMethod === "usdt" && (
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <span className="text-xs font-bold text-slate-700">USDT Stablecoin (TRC-20 Network)</span>
                <span className="text-[10px] font-bold text-cyan-800 bg-cyan-100 px-2 py-0.5 rounded-full">
                  Global Instant Settlement
                </span>
              </div>
              <div className="space-y-2 text-xs">
                <span className="text-slate-500 block text-[11px]">TRC20 Wallet Address:</span>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={config.payments.usdtTrc20Address}
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg font-mono text-xs bg-white"
                  />
                  <button
                    onClick={handleCopyUsdt}
                    className="px-3 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold cursor-pointer"
                  >
                    {copiedUsdt ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* WhatsApp Payment Confirmation Transmit */}
          <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-3">
            <h4 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-[#15803d]" />
              <span>Instant WhatsApp Receipt Confirmation</span>
            </h4>
            <p className="text-[11px] text-slate-500">
              Enter your name or business name below and click to send payment proof straight to Anointed-Godswill on WhatsApp.
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Your Name / Business Name"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="flex-1 px-3 py-2 border border-slate-300 rounded-xl text-xs"
              />
              <a
                href={generateWhatsAppConfirmationUrl()}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-[#15803d] hover:bg-[#166534] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Notify via WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>256-Bit Encrypted & Escrow Protected</span>
          </div>
          <button
            onClick={onClose}
            className="font-bold text-[#38208f] hover:underline cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
