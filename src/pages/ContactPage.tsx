import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Clock,
  Send,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { CompanyConfig } from "../data/companyData";

interface ContactPageProps {
  config: CompanyConfig;
  prefilledService?: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({ config, prefilledService }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(prefilledService || "Websites & Digital Experiences");
  const [budget, setBudget] = useState("₦75,000 – ₦135,000 (Basic Business / Landing Page)");
  const [timeline, setTimeline] = useState("Within 2 weeks");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const buildWhatsAppUrl = () => {
    const text = `*New Inquiry for Wiliakonect*\n\n*Name:* ${name || "Client"}\n*Email:* ${
      email || "Not specified"
    }\n*Phone:* ${phone || "Not specified"}\n*Service:* ${service}\n*Budget:* ${budget}\n*Timeline:* ${timeline}\n\n*Project Details:*\n${
      message || "I would like to discuss a project."
    }`;
    return `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  const buildMailtoUrl = () => {
    const subject = `Project Inquiry from ${name || "Website Visitor"} - ${service}`;
    const body = `Hi Anointed-Godswill & Wiliakonect Team,\n\nI would like to inquire about working with Wiliakonect.\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\nBudget Range: ${budget}\nTimeline: ${timeline}\n\nMessage:\n${message}\n\nLooking forward to speaking with you!`;
    return `mailto:${config.emailPrimary}?cc=${config.emailSecondary}&subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-12 bg-[#faf9fc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#38208f]/10 text-[#38208f] text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#f2a20a]" />
            <span>LET’S CONNECT</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#171520] tracking-tight">
            Have an ambitious idea? <br />
            <span className="text-[#38208f]">We’re ready to listen.</span>
          </h1>
          <p className="text-lg text-[#5e5973] leading-relaxed">
            Reach out directly to Anointed-Godswill and the technical team. Whether you have a comprehensive technical specification or just a napkin sketch, we’ll help you chart the clearest way forward.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Contacts */}
          <div className="lg:col-span-5 space-y-6">
            {/* WhatsApp Highlight Box */}
            <div className="bg-[#15803d] text-white p-7 rounded-3xl shadow-xl space-y-4 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full">
                  Fastest Response
                </span>
                <MessageSquare className="w-6 h-6 text-[#f2a20a]" />
              </div>

              <div>
                <h3 className="text-2xl font-bold">Chat Live on WhatsApp</h3>
                <p className="text-sm text-white/90 mt-1">
                  Our engineering team is active on WhatsApp and replies within minutes during business hours.
                </p>
              </div>

              <a
                href={`https://wa.me/${config.whatsappNumber}?text=Hello%20Wiliakonect!%20I'm%20contacting%20you%20regarding%20a%20project.`}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-[#171520] bg-white hover:bg-slate-100 transition-all shadow-md cursor-pointer"
              >
                <span>Open WhatsApp (+234 911 463 8331)</span>
                <ArrowUpRight className="w-4 h-4 text-[#15803d]" />
              </a>
            </div>

            {/* Direct contact cards */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <h3 className="font-bold text-lg text-[#171520] border-b border-slate-100 pb-3">
                Direct Communication Lines
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-purple-50 text-[#38208f] mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500 block">Phone Calls & Inquiries</span>
                    <a
                      href={`tel:${config.phonePrimary.replace(/\s+/g, "")}`}
                      className="text-sm font-bold text-[#171520] hover:text-[#38208f] transition-colors block"
                    >
                      {config.phonePrimary} (Primary)
                    </a>
                    <a
                      href={`tel:${config.phoneSecondary.replace(/\s+/g, "")}`}
                      className="text-xs font-semibold text-slate-600 hover:text-[#38208f] transition-colors block mt-0.5"
                    >
                      {config.phoneSecondary} (Alternate)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500 block">Email Inquiries</span>
                    <a
                      href={`mailto:${config.emailPrimary}`}
                      className="text-sm font-bold text-[#171520] hover:text-[#38208f] transition-colors block"
                    >
                      {config.emailPrimary}
                    </a>
                    <a
                      href={`mailto:${config.emailSecondary}`}
                      className="text-xs font-semibold text-slate-600 hover:text-[#38208f] transition-colors block mt-0.5"
                    >
                      {config.emailSecondary}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-slate-100 text-slate-700 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500 block">Base & Headquarters</span>
                    <p className="text-sm font-bold text-[#171520]">{config.location}</p>
                    <p className="text-xs text-slate-500 mt-0.5">Serving clients worldwide remotely</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500 block">Hours of Operation</span>
                    <p className="text-xs font-bold text-[#171520]">{config.workingHours}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Consultation Booking Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl">
            {submitted ? (
              <div className="py-12 text-center space-y-5 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-extrabold text-[#171520]">Inquiry Prepared!</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Choose how you'd like to transmit your brief directly to our team. We recommend WhatsApp for the quickest response!
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-3 pt-3">
                  <a
                    href={buildWhatsAppUrl()}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-[#15803d] hover:bg-[#166534] shadow-md transition-all cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send via WhatsApp</span>
                  </a>

                  <a
                    href={buildMailtoUrl()}
                    className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-[#38208f] hover:bg-[#251368] shadow-md transition-all cursor-pointer"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Send via Email</span>
                  </a>
                </div>

                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-bold text-slate-400 hover:text-slate-600 underline pt-4"
                >
                  Edit Brief Form
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-xl font-extrabold text-[#171520]">
                    Project Consultation Form
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Fill in a few details and we will formulate an exact quote and technical roadmap.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Adeola Williams"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#38208f]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#38208f]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Phone Number (WhatsApp Preferred)
                    </label>
                    <input
                      type="tel"
                      placeholder="+234 ..."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#38208f]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Service Category
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#38208f] bg-white"
                    >
                      <option value="Websites & Digital Experiences">Websites & Digital Experiences</option>
                      <option value="Software & Business Tools">Software & Business Tools</option>
                      <option value="IT Support & Maintenance">IT Support & Maintenance</option>
                      <option value="Website Builder Deployment">Website Builder Custom Deployment</option>
                      <option value="Other / General Consultation">Other / General Consultation</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Estimated Budget
                    </label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#38208f] bg-white"
                    >
                      <option value="₦75,000 – ₦135,000 (Basic Business / Landing Page)">
                        ₦75,000 – ₦135,000 (Basic Business / Landing Page)
                      </option>
                      <option value="₦210,000 – ₦320,000 (Standard Corporate Website)">
                        ₦210,000 – ₦320,000 (Standard Corporate Website)
                      </option>
                      <option value="₦320,000 – ₦460,000 (E-Commerce Online Store)">
                        ₦320,000 – ₦460,000 (E-Commerce Online Store)
                      </option>
                      <option value="₦650,000 – ₦950,000 (Custom Web App / React MVP)">
                        ₦650,000 – ₦950,000 (Custom Web App / React MVP)
                      </option>
                      <option value="₦25,000 – ₦55,000 / mo (Monthly Care & Maintenance)">
                        ₦25,000 – ₦55,000 / mo (Monthly Care & Maintenance)
                      </option>
                      <option value="Custom Project Scope (Discuss on WhatsApp)">
                        Custom Project Scope (Discuss on WhatsApp)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Target Launch Timeline
                    </label>
                    <select
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#38208f] bg-white"
                    >
                      <option value="Urgent (Under 1 week)">Urgent (Under 1 week)</option>
                      <option value="Within 2 weeks">Within 2 weeks</option>
                      <option value="Within 1 month">Within 1 month</option>
                      <option value="Flexible / Planning stage">Flexible / Planning stage</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Describe your project or goals
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us what you're hoping to build, any websites you admire, or the main problems you want to solve..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#38208f]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-bold text-white bg-[#38208f] hover:bg-[#251368] transition-all shadow-lg shadow-[#38208f]/20 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Generate & Send Consultation Brief</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
