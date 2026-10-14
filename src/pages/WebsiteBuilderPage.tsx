import React, { useState } from "react";
import {
  Monitor,
  Tablet,
  Smartphone,
  Download,
  Copy,
  Check,
  Sparkles,
  MessageSquare,
  Save,
  Palette,
  Eye,
  Code,
  Layers,
  ArrowUpRight,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { websiteTemplatesList, WebsiteTemplate } from "../data/templatesData";
import { CompanyConfig } from "../data/companyData";

interface WebsiteBuilderPageProps {
  config: CompanyConfig;
  onSaveToDashboard?: (project: any) => void;
  onGoToDashboard?: () => void;
}

export const WebsiteBuilderPage: React.FC<WebsiteBuilderPageProps> = ({
  config,
  onSaveToDashboard,
  onGoToDashboard,
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<WebsiteTemplate>(websiteTemplatesList[0]);
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [activeTab, setActiveTab] = useState<"design" | "content" | "code">("design");

  // Editable template state
  const [brandName, setBrandName] = useState(selectedTemplate.brand);
  const [tagline, setTagline] = useState(selectedTemplate.tagline);
  const [headline, setHeadline] = useState(selectedTemplate.headline);
  const [description, setDescription] = useState(selectedTemplate.description);
  const [ctaText, setCtaText] = useState(selectedTemplate.cta);
  const [contactEmail, setContactEmail] = useState(selectedTemplate.contactEmail);
  const [contactPhone, setContactPhone] = useState(selectedTemplate.contactPhone);

  // Theme overrides
  const [themePrimary, setThemePrimary] = useState(selectedTemplate.theme.primary);
  const [themeAccent, setThemeAccent] = useState(selectedTemplate.theme.accent);
  const [themeBg, setThemeBg] = useState(selectedTemplate.theme.bg);

  const [copiedCode, setCopiedCode] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // When template selection changes
  const handleSelectTemplate = (template: WebsiteTemplate) => {
    setSelectedTemplate(template);
    setBrandName(template.brand);
    setTagline(template.tagline);
    setHeadline(template.headline);
    setDescription(template.description);
    setCtaText(template.cta);
    setContactEmail(template.contactEmail);
    setContactPhone(template.contactPhone);
    setThemePrimary(template.theme.primary);
    setThemeAccent(template.theme.accent);
    setThemeBg(template.theme.bg);
  };

  // Generate full clean standalone HTML
  const generateStandaloneHtml = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${brandName} — ${tagline}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Manrope:wght@500;700;800&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'DM Sans', -apple-system, sans-serif;
      background: ${themeBg};
      color: ${themeBg === "#09090b" || themeBg === "#0c0d12" || themeBg === "#0f172a" ? "#f8fafc" : "#171520"};
      line-height: 1.6;
    }
    .header {
      padding: 1.5rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(0,0,0,0.08);
      background: rgba(255,255,255,0.7);
      backdrop-filter: blur(10px);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .brand { font-size: 1.35rem; font-weight: 800; color: ${themePrimary}; text-decoration: none; font-family: 'Manrope', sans-serif; }
    .btn {
      background: ${themePrimary};
      color: #fff;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 700;
      font-size: 0.875rem;
      display: inline-block;
      transition: opacity 0.2s;
    }
    .btn:hover { opacity: 0.9; }
    .hero {
      padding: 5rem 2rem;
      text-align: center;
      max-width: 900px;
      margin: 0 auto;
    }
    .eyebrow {
      font-size: 0.75rem;
      letter-spacing: 2px;
      text-transform: uppercase;
      font-weight: 700;
      color: ${themeAccent};
      margin-bottom: 1rem;
    }
    .hero h1 {
      font-family: 'Manrope', sans-serif;
      font-size: clamp(2rem, 5vw, 3.5rem);
      font-weight: 800;
      line-height: 1.15;
      margin-bottom: 1.5rem;
    }
    .hero p {
      font-size: 1.15rem;
      opacity: 0.85;
      margin-bottom: 2rem;
      max-width: 700px;
      margin-left: auto;
      margin-right: auto;
    }
    .features {
      padding: 4rem 2rem;
      max-width: 1100px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
    }
    .card {
      background: ${themeBg === "#09090b" || themeBg === "#0c0d12" || themeBg === "#0f172a" ? "#18181b" : "#ffffff"};
      padding: 2rem;
      border-radius: 16px;
      border: 1px solid rgba(0,0,0,0.06);
      box-shadow: 0 4px 20px rgba(0,0,0,0.04);
    }
    .card h3 { font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem; color: ${themePrimary}; }
    .footer {
      padding: 3rem 2rem;
      text-align: center;
      border-top: 1px solid rgba(0,0,0,0.08);
      font-size: 0.875rem;
      opacity: 0.75;
    }
  </style>
</head>
<body>
  <header class="header">
    <a href="#" class="brand">${brandName}</a>
    <a href="tel:${contactPhone}" class="btn">${ctaText}</a>
  </header>

  <main>
    <section class="hero">
      <div class="eyebrow">${selectedTemplate.eyebrow}</div>
      <h1>${headline}</h1>
      <p>${description}</p>
      <a href="mailto:${contactEmail}" class="btn">${ctaText} ↗</a>
    </section>

    <section class="features">
      ${selectedTemplate.sections
        .map(
          (s) => `
      <div class="card">
        <h3>${s.title}</h3>
        <p style="font-size: 0.8rem; font-weight: 600; color: ${themeAccent}; margin-bottom: 0.75rem;">${s.subtitle}</p>
        <p>${s.content}</p>
      </div>`
        )
        .join("\n")}
    </section>
  </main>

  <footer class="footer">
    <p>© ${new Date().getFullYear()} ${brandName} · Built with Wiliakonect Website Engine</p>
    <p style="margin-top: 0.5rem;">Contact: ${contactEmail} | ${contactPhone}</p>
  </footer>
</body>
</html>`;
  };

  const handleDownload = () => {
    const html = generateStandaloneHtml();
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${brandName.toLowerCase().replace(/\s+/g, "-")}-website.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyCode = () => {
    const html = generateStandaloneHtml();
    navigator.clipboard.writeText(html);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleSaveProject = () => {
    const newProj = {
      id: "proj-" + Date.now(),
      name: brandName,
      template: selectedTemplate.category,
      updatedAt: new Date().toLocaleDateString(),
      status: "In Progress",
      primaryColor: themePrimary,
      headline,
    };

    // Save to localStorage
    try {
      const existing = JSON.parse(localStorage.getItem("wiliakonect_saved_projects") || "[]");
      existing.unshift(newProj);
      localStorage.setItem("wiliakonect_saved_projects", JSON.stringify(existing));
      if (onSaveToDashboard) onSaveToDashboard(newProj);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="py-8 bg-[#faf9fc] min-h-[calc(100vh-80px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#38208f]/10 text-[#38208f] text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#f2a20a]" />
              <span>Wiliakonect Website Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171520]">
              Your business, your website. <span className="text-[#38208f]">Built your way.</span>
            </h1>
            <p className="text-sm text-[#5e5973] mt-1">
              Select a tailored blueprint, personalize it in real time, and export production-ready code or hand it off to Wiliakonect for custom deployment.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleSaveProject}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-[#38208f] bg-[#f4f0fd] hover:bg-[#eae3fc] border border-[#38208f]/20 transition-all cursor-pointer"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Saved to Portal!</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5 text-[#38208f]" />
                  <span>Save to Portal</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-[#38208f] hover:bg-[#251368] transition-all shadow-sm cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#f2a20a]" />
              <span>Export Code (.html)</span>
            </button>

            <a
              href={`https://wa.me/${config.whatsappNumber}?text=Hello%20Wiliakonect!%20I%20designed%20a%20website%20draft%20using%20the%20builder%20for%20"${encodeURIComponent(
                brandName
              )}"%20using%20the%20${encodeURIComponent(
                selectedTemplate.category
              )}%20template.%20I'd%20like%20to%20publish%20it%20with%20custom%20domain%20and%20hosting.`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-[#15803d] hover:bg-[#166534] transition-all shadow-sm cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Deploy on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Template Selector Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            Choose Industry Blueprint
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {websiteTemplatesList.map((tpl) => {
              const isSelected = selectedTemplate.id === tpl.id;
              return (
                <button
                  key={tpl.id}
                  onClick={() => handleSelectTemplate(tpl)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border cursor-pointer ${
                    isSelected
                      ? "bg-[#38208f] text-white border-[#38208f] shadow-sm"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-100"
                  }`}
                >
                  {tpl.category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Builder Workspace: Left sidebar customizer + Right preview frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-4 space-y-4">
            {/* Tab switch */}
            <div className="flex bg-white p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setActiveTab("design")}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeTab === "design"
                    ? "bg-[#38208f] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
                <span>Colors & Style</span>
              </button>
              <button
                onClick={() => setActiveTab("content")}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeTab === "content"
                    ? "bg-[#38208f] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Copy & Text</span>
              </button>
              <button
                onClick={() => setActiveTab("code")}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeTab === "code"
                    ? "bg-[#38208f] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                <span>Source Code</span>
              </button>
            </div>

            {/* Content Pane */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4 max-h-[620px] overflow-y-auto">
              {activeTab === "design" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Primary Brand Color
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={themePrimary}
                        onChange={(e) => setThemePrimary(e.target.value)}
                        className="w-9 h-9 rounded-lg border border-slate-300 p-0.5 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={themePrimary}
                        onChange={(e) => setThemePrimary(e.target.value)}
                        className="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Accent / Highlight Color
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={themeAccent}
                        onChange={(e) => setThemeAccent(e.target.value)}
                        className="w-9 h-9 rounded-lg border border-slate-300 p-0.5 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={themeAccent}
                        onChange={(e) => setThemeAccent(e.target.value)}
                        className="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Background Palette
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: "Warm Milk", bg: "#faf8f5" },
                        { label: "Cool White", bg: "#ffffff" },
                        { label: "Soft Tint", bg: "#faf9fc" },
                        { label: "Blush Rose", bg: "#faf5f5" },
                        { label: "Slate Dark", bg: "#0f172a" },
                        { label: "Onyx Black", bg: "#09090b" },
                      ].map((preset) => (
                        <button
                          key={preset.bg}
                          onClick={() => setThemeBg(preset.bg)}
                          className={`p-2 rounded-lg text-[11px] font-bold border text-center transition-all cursor-pointer ${
                            themeBg === preset.bg
                              ? "ring-2 ring-[#38208f] border-transparent font-black"
                              : "border-slate-200 hover:border-slate-300"
                          }`}
                          style={{
                            background: preset.bg,
                            color: preset.bg.startsWith("#0") ? "#ffffff" : "#171520",
                          }}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-xs font-bold text-slate-600 block mb-2">
                      Pre-set Quick Palettes
                    </span>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => {
                          setThemePrimary("#38208f");
                          setThemeAccent("#f2a20a");
                          setThemeBg("#faf9fc");
                        }}
                        className="px-2.5 py-1 rounded-md text-xs font-bold bg-[#38208f] text-white hover:opacity-90"
                      >
                        Wiliakonect Signature
                      </button>
                      <button
                        onClick={() => {
                          setThemePrimary("#15803d");
                          setThemeAccent("#d97706");
                          setThemeBg("#fdfbf7");
                        }}
                        className="px-2.5 py-1 rounded-md text-xs font-bold bg-[#15803d] text-white hover:opacity-90"
                      >
                        Olive & Forest
                      </button>
                      <button
                        onClick={() => {
                          setThemePrimary("#0284c7");
                          setThemeAccent("#f97316");
                          setThemeBg("#f8fafc");
                        }}
                        className="px-2.5 py-1 rounded-md text-xs font-bold bg-[#0284c7] text-white hover:opacity-90"
                      >
                        Cyan Ocean
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "content" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Business / Brand Name
                    </label>
                    <input
                      type="text"
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Tagline / Sub-heading
                    </label>
                    <input
                      type="text"
                      value={tagline}
                      onChange={(e) => setTagline(e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Hero Headline
                    </label>
                    <textarea
                      rows={2}
                      value={headline}
                      onChange={(e) => setHeadline(e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Description & Value Prop
                    </label>
                    <textarea
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Call to Action
                      </label>
                      <input
                        type="text"
                        value={ctaText}
                        onChange={(e) => setCtaText(e.target.value)}
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Contact Phone
                      </label>
                      <input
                        type="text"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                </div>
              )}

              {activeTab === "code" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-600">Generated Clean HTML5</span>
                    <button
                      onClick={handleCopyCode}
                      className="flex items-center gap-1 text-xs font-bold text-[#38208f] hover:underline"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode ? "Copied!" : "Copy Code"}</span>
                    </button>
                  </div>
                  <pre className="text-[11px] font-mono bg-slate-900 text-slate-200 p-3 rounded-xl overflow-x-auto max-h-96">
                    {generateStandaloneHtml()}
                  </pre>
                </div>
              )}
            </div>
          </div>

          {/* Live Preview Column */}
          <div className="lg:col-span-8 space-y-3">
            {/* Viewport switch toolbar */}
            <div className="flex items-center justify-between bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-xs">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setViewport("desktop")}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    viewport === "desktop" ? "bg-[#38208f] text-white" : "text-slate-500 hover:bg-slate-100"
                  }`}
                  title="Desktop (100%)"
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewport("tablet")}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    viewport === "tablet" ? "bg-[#38208f] text-white" : "text-slate-500 hover:bg-slate-100"
                  }`}
                  title="Tablet (768px)"
                >
                  <Tablet className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewport("mobile")}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    viewport === "mobile" ? "bg-[#38208f] text-white" : "text-slate-500 hover:bg-slate-100"
                  }`}
                  title="Mobile (375px)"
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs font-semibold text-slate-400">
                Live Interactive Canvas ({viewport})
              </div>

              <button
                onClick={handleDownload}
                className="text-xs font-bold text-[#38208f] hover:underline flex items-center gap-1"
              >
                <span>Export Site</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Visual Canvas Container */}
            <div className="flex justify-center bg-slate-200/60 p-4 sm:p-6 rounded-2xl border border-slate-300 min-h-[580px] overflow-hidden">
              <div
                className="transition-all duration-300 rounded-xl overflow-hidden shadow-2xl border border-slate-400/30 flex flex-col"
                style={{
                  width: viewport === "desktop" ? "100%" : viewport === "tablet" ? "768px" : "375px",
                  background: themeBg,
                  color:
                    themeBg === "#09090b" || themeBg === "#0c0d12" || themeBg === "#0f172a"
                      ? "#f8fafc"
                      : "#171520",
                }}
              >
                {/* Simulated browser header bar inside preview */}
                <div className="px-4 py-2 bg-black/10 border-b border-black/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  </div>
                  <div className="px-3 py-0.5 rounded-md bg-black/10 text-[11px] font-mono opacity-70">
                    https://{brandName.toLowerCase().replace(/\s+/g, "")}.wiliakonect.com
                  </div>
                  <div className="w-8" />
                </div>

                {/* Preview Site Navigation */}
                <div className="px-6 py-4 flex items-center justify-between border-b border-black/5 bg-white/40 backdrop-blur-sm">
                  <span className="font-extrabold text-lg tracking-tight" style={{ color: themePrimary }}>
                    {brandName}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium opacity-70 hidden sm:inline">Home</span>
                    <span className="text-xs font-medium opacity-70 hidden sm:inline">About</span>
                    <span
                      className="px-3 py-1.5 rounded-lg text-xs font-bold text-white shadow-xs"
                      style={{ background: themePrimary }}
                    >
                      {ctaText}
                    </span>
                  </div>
                </div>

                {/* Preview Hero Content */}
                <div className="p-8 sm:p-12 text-center max-w-xl mx-auto space-y-4">
                  <span
                    className="text-[11px] font-extrabold uppercase tracking-widest inline-block px-2.5 py-0.5 rounded-full"
                    style={{ color: themeAccent, background: `${themeAccent}1a` }}
                  >
                    {selectedTemplate.eyebrow}
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-extrabold leading-tight">
                    {headline}
                  </h2>
                  <p className="text-xs sm:text-sm opacity-80 leading-relaxed">
                    {description}
                  </p>
                  <div className="pt-2 flex justify-center gap-3">
                    <button
                      className="px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-md"
                      style={{ background: themePrimary }}
                    >
                      {ctaText} ↗
                    </button>
                    <button className="px-4 py-2.5 rounded-xl text-xs font-bold border border-black/15 bg-white/50">
                      Learn More
                    </button>
                  </div>
                </div>

                {/* Preview Features Grid */}
                <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-black/5">
                  {selectedTemplate.sections.map((sec, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl border border-black/5"
                      style={{
                        background:
                          themeBg === "#09090b" || themeBg === "#0c0d12" || themeBg === "#0f172a"
                            ? "#18181b"
                            : "#ffffff",
                      }}
                    >
                      <h4 className="font-bold text-sm mb-1" style={{ color: themePrimary }}>
                        {sec.title}
                      </h4>
                      <div className="text-[10px] font-bold mb-2" style={{ color: themeAccent }}>
                        {sec.subtitle}
                      </div>
                      <p className="text-xs opacity-70 leading-relaxed">{sec.content}</p>
                    </div>
                  ))}
                </div>

                {/* Preview Footer */}
                <div className="mt-auto px-6 py-4 border-t border-black/5 text-center text-xs opacity-60">
                  © {new Date().getFullYear()} {brandName} · Powered by Wiliakonect
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
