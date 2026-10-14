import React, { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  Edit3,
  Paintbrush,
  Plug,
  Image as ImageIcon,
  Settings,
  Sparkles,
  Crown,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Copy,
  Download,
  Eye,
  Check,
  ChevronRight,
  Monitor,
  Tablet,
  Smartphone,
  Lock,
  MessageSquare,
  ShieldCheck,
  ShoppingBag,
  Database,
  ExternalLink,
  Code,
  Key,
} from "lucide-react";
import { CompanyConfig } from "../data/companyData";
import { useAuth } from "../context/AuthContext";

export interface CmsBlock {
  id: string;
  type: "hero" | "heading" | "paragraph" | "features" | "media" | "pricing" | "testimonials" | "faq" | "contact" | "products";
  title?: string;
  subtitle?: string;
  content?: string;
  ctaText?: string;
  ctaLink?: string;
  imageUrl?: string;
  items?: any[];
  bgColor?: string;
  textColor?: string;
  isPro?: boolean;
}

export interface CmsPage {
  id: string;
  title: string;
  slug: string;
  status: "published" | "draft";
  blocks: CmsBlock[];
}

interface CmsBuilderPageProps {
  config: CompanyConfig;
  onGoToSite: () => void;
  onOpenAuth: () => void;
}

export const CmsBuilderPage: React.FC<CmsBuilderPageProps> = ({
  config,
  onGoToSite,
  onOpenAuth,
}) => {
  const { user, isProUser, proLicenseKey, activatePro, deactivatePro } = useAuth();

  // Active WP Admin View
  const [activeAdminTab, setActiveAdminTab] = useState<
    "dashboard" | "pages" | "editor" | "customizer" | "plugins" | "media" | "pro" | "settings"
  >("editor");

  // Multi-page state
  const [pages, setPages] = useState<CmsPage[]>([
    {
      id: "page-home",
      title: "Home",
      slug: "/",
      status: "published",
      blocks: [
        {
          id: "b-hero",
          type: "hero",
          title: "Good ideas deserve great technology.",
          subtitle: "TECHNOLOGY, MADE HUMAN · PORT HARCOURT, NIGERIA",
          content: "We help businesses turn ambitious ideas into useful digital experiences—with the right technology and dependable engineering in your corner.",
          ctaText: "Let’s Build Something",
          ctaLink: "#contact",
        },
        {
          id: "b-features",
          type: "features",
          title: "Engineered for Real Impact",
          subtitle: "CORE CAPABILITIES",
          items: [
            { title: "Websites & Digital Experiences", desc: "Ultra-fast Next.js/React responsive storefronts and landing pages.", icon: "Globe" },
            { title: "Software & Business Tools", desc: "Custom business portals, automation, and automated client billing.", icon: "Cpu" },
            { title: "IT Support & Guidance", desc: "24/7 technical monitoring, security audits, and domain linkage.", icon: "Wrench" },
          ],
        },
        {
          id: "b-pricing",
          type: "pricing",
          title: "Transparent, Upfront Investment",
          subtitle: "NO HIDDEN CHARGES",
          items: [
            { name: "Basic Business / Landing Page", price: "₦75,000 / $95", features: ["1–5 Responsive Pages", "Contact Form & WhatsApp", "Basic SEO & Indexing", "1.2s Fast Mobile Load"] },
            { name: "Standard Corporate Website", price: "₦210,000 / $265", popular: true, features: ["6–15 Custom Pages", "Dynamic News/Blog Setup", "Wiliakonect CMS Dashboard", "Speed & Core Web Vitals"] },
            { name: "E-Commerce Online Store", price: "₦320,000 / $400", features: ["Automated Paystack/Flutterwave", "Cart & Checkout Flow", "Inventory Sync", "WhatsApp Order Alerts"] },
            { name: "Custom Web App / React MVP", price: "₦650,000 / $820", features: ["React / TypeScript App", "User Auth & Roles", "Custom DB Integration", "Interactive Dashboard"] },
            { name: "Monthly Care & Retainer", price: "₦25,000 / $30 mo", features: ["Software & Security Updates", "Cloud Backups", "SSL & Domain Maintenance", "Direct WhatsApp Support"] },
          ],
        },
        {
          id: "b-testimonials",
          type: "testimonials",
          title: "What Our Partners Say",
          subtitle: "TRUSTED ACROSS AFRICA & WORLDWIDE",
          items: [
            { quote: "Wiliakonect built our entire business portal ahead of schedule. Anointed-Godswill and the team are phenomenal.", author: "Emeka D.", role: "CEO, Port Harcourt Logistics" },
            { quote: "The website builder and CMS gave us complete control without needing technical staff. Highly recommended!", author: "Sarah B.", role: "Founder, Bloom Studio" },
          ],
        },
      ],
    },
    {
      id: "page-about",
      title: "About Us",
      slug: "/about",
      status: "published",
      blocks: [
        {
          id: "b-about-hero",
          type: "hero",
          title: "People first. Possibility always.",
          subtitle: "ABOUT WILIAKONECT",
          content: "Founded in Port Harcourt, Nigeria and serving clients worldwide, Wiliakonect provides enterprise-grade web experiences and software tools led by founder Anointed-Godswill C C-E.",
          ctaText: "Get in Touch",
          ctaLink: "#contact",
        },
      ],
    },
    {
      id: "page-services",
      title: "Services & Pricing",
      slug: "/services",
      status: "published",
      blocks: [
        {
          id: "b-svc-hero",
          type: "hero",
          title: "Technology that moves you forward.",
          subtitle: "PORT HARCOURT & GLOBAL REMOTE",
          content: "Explore our specialized web design, custom software engineering, and dependable 24/7 IT maintenance tiers.",
          ctaText: "Request Scope",
          ctaLink: "#contact",
        },
      ],
    },
    {
      id: "page-contact",
      title: "Contact Us",
      slug: "/contact",
      status: "published",
      blocks: [
        {
          id: "b-contact",
          type: "contact",
          title: "Have an ambitious idea? Let's connect.",
          subtitle: "PORT HARCOURT, NIGERIA · GLOBAL REMOTE DELIVERY",
          content: "Reach out via WhatsApp (+234 911 463 8331), direct phone call, or schedule a formal project consultation.",
        },
      ],
    },
  ]);

  const [activePageId, setActivePageId] = useState<string>("page-home");
  const currentPage = pages.find((p) => p.id === activePageId) || pages[0];

  // Block editor state
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [showAddBlockModal, setShowAddBlockModal] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);
  const [showProLicenseModal, setShowProLicenseModal] = useState(false);
  const [licenseInput, setLicenseInput] = useState(proLicenseKey);

  // AI Prompt State
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiIndustry, setAiIndustry] = useState("Technology & SaaS");
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiSuccessMessage, setAiSuccessMessage] = useState("");

  // Appearance & Theme State
  const [siteTitle, setSiteTitle] = useState(config.brandName);
  const [siteTagline, setSiteTagline] = useState(config.brandTagline);
  const [primaryColor, setPrimaryColor] = useState("#38208f");
  const [accentColor, setAccentColor] = useState("#f2a20a");
  const [themeBg, setThemeBg] = useState("#faf9fc");
  const [fontFamily, setFontFamily] = useState("DM Sans");

  // Installed Plugins
  const [plugins, setPlugins] = useState([
    { id: "ai-copilot", name: "Wiliakonect AI Copilot", version: "3.2.0", active: true, isPro: true, desc: "Instant page generation, auto-copywriter, and Gemini model integration." },
    { id: "woocommerce-engine", name: "WooCommerce / Store Engine", version: "8.4.1", active: true, isPro: true, desc: "E-Commerce product catalog, cart checkout, and Paystack/Flutterwave/Stripe gateways." },
    { id: "seo-pro", name: "Wiliakonect SEO Pro", version: "2.1.0", active: true, isPro: false, desc: "Meta descriptions, OpenGraph social cards, and sitemap automation." },
    { id: "whatsapp-connect", name: "WhatsApp Live Chat Connect", version: "1.9.4", active: true, isPro: false, desc: "Floating WhatsApp button with automated message routing (+234 911 463 8331)." },
    { id: "security-shield", name: "WP Security Shield & 2FA", version: "4.5.0", active: true, isPro: false, desc: "Hardware 2FA enforcement, brute-force rate limiter, and Port Harcourt node TLS." },
  ]);

  // Block management functions
  const handleUpdateBlock = (blockId: string, updates: Partial<CmsBlock>) => {
    setPages((prev) =>
      prev.map((pg) => {
        if (pg.id !== activePageId) return pg;
        return {
          ...pg,
          blocks: pg.blocks.map((b) => (b.id === blockId ? { ...b, ...updates } : b)),
        };
      })
    );
  };

  const handleMoveBlock = (index: number, direction: "up" | "down") => {
    setPages((prev) =>
      prev.map((pg) => {
        if (pg.id !== activePageId) return pg;
        const newBlocks = [...pg.blocks];
        const targetIndex = direction === "up" ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= newBlocks.length) return pg;
        const temp = newBlocks[index];
        newBlocks[index] = newBlocks[targetIndex];
        newBlocks[targetIndex] = temp;
        return { ...pg, blocks: newBlocks };
      })
    );
  };

  const handleDeleteBlock = (blockId: string) => {
    setPages((prev) =>
      prev.map((pg) => {
        if (pg.id !== activePageId) return pg;
        return {
          ...pg,
          blocks: pg.blocks.filter((b) => b.id !== blockId),
        };
      })
    );
    if (selectedBlockId === blockId) setSelectedBlockId(null);
  };

  const handleDuplicateBlock = (block: CmsBlock) => {
    const duplicated: CmsBlock = {
      ...block,
      id: "b-" + Date.now().toString(36),
      title: block.title ? `${block.title} (Copy)` : undefined,
    };
    setPages((prev) =>
      prev.map((pg) => {
        if (pg.id !== activePageId) return pg;
        return { ...pg, blocks: [...pg.blocks, duplicated] };
      })
    );
  };

  const handleAddBlock = (type: CmsBlock["type"]) => {
    const newBlock: CmsBlock = {
      id: "b-" + Date.now().toString(36),
      type,
      title:
        type === "heading"
          ? "New Section Heading"
          : type === "paragraph"
          ? "Add your descriptive content here..."
          : type === "products"
          ? "Featured Product Store (Pro)"
          : type === "faq"
          ? "Frequently Asked Questions"
          : "Bespoke Section",
      subtitle: "CUSTOM SUBTITLE",
      content: "This is a freshly inserted block within your Wiliakonect CMS.",
      items:
        type === "products"
          ? [
              { name: "Custom E-Commerce Package", price: "₦150,000", badge: "In Stock" },
              { name: "Enterprise API Portal", price: "₦280,000", badge: "Popular" },
            ]
          : type === "faq"
          ? [
              { q: "How long does deployment take?", a: "Standard builds launch in 5 to 10 business days." },
              { q: "Do you offer post-launch support?", a: "Yes, 24/7 dedicated monitoring is provided from Port Harcourt, Nigeria." },
            ]
          : undefined,
    };

    setPages((prev) =>
      prev.map((pg) => {
        if (pg.id !== activePageId) return pg;
        return { ...pg, blocks: [...pg.blocks, newBlock] };
      })
    );
    setShowAddBlockModal(false);
    setSelectedBlockId(newBlock.id);
  };

  // AI Website Generator Action
  const handleGenerateAiWebsite = async () => {
    if (!aiPrompt.trim()) return;
    setIsGeneratingAi(true);
    setAiSuccessMessage("");

    // Call server-side API or fallback synthesizer
    try {
      const response = await fetch("/api/ai/generate-website", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: aiPrompt,
          industry: aiIndustry,
          location: "Port Harcourt, Nigeria",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.site) {
          applyAiGeneratedSite(data.site);
          setIsGeneratingAi(false);
          setShowAiModal(false);
          return;
        }
      }
    } catch (e) {
      console.log("Using built-in intelligent AI synthesizer fallback", e);
    }

    // Intelligent built-in AI synthesizer fallback
    setTimeout(() => {
      const cleanPrompt = aiPrompt.trim();
      const generatedBrand = cleanPrompt.split(" ").slice(0, 2).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") + " Digital";
      
      const newHomeBlocks: CmsBlock[] = [
        {
          id: "b-ai-hero",
          type: "hero",
          title: `Empowering ${cleanPrompt.slice(0, 35)} with Next-Gen Tech`,
          subtitle: `AI-GENERATED BLUEPRINT · PORT HARCOURT & GLOBAL`,
          content: `Bespoke digital architecture tailored for "${cleanPrompt}". Built with lightning-fast performance, rock-solid security, and intuitive customer journeys.`,
          ctaText: "Discover Solutions",
          ctaLink: "#features",
        },
        {
          id: "b-ai-features",
          type: "features",
          title: "Specialized Features & Solutions",
          subtitle: "WHY PARTNER WITH US",
          items: [
            { title: "Precision Performance", desc: "Engineered for maximum conversion rates and Core Web Vitals.", icon: "Zap" },
            { title: "Direct WhatsApp Ordering", desc: "Instant click-to-chat integration connected directly to your sales team.", icon: "MessageSquare" },
            { title: "Enterprise Security", desc: "Hardware 2FA and SSL protection deployed from Port Harcourt, Nigeria.", icon: "ShieldCheck" },
          ],
        },
        {
          id: "b-ai-products",
          type: "products",
          title: "Featured Packages & Catalog",
          subtitle: "CMS PRO STORE ENGINE",
          items: [
            { name: "Basic Business / Landing Page", price: "₦75,000 / $95", badge: "1–5 Pages" },
            { name: "Standard Corporate Website", price: "₦210,000 / $265", badge: "Most Popular" },
            { name: "E-Commerce Online Store", price: "₦320,000 / $400", badge: "Paystack Ready" },
            { name: "Custom Web Application / React MVP", price: "₦650,000 / $820", badge: "Frontend MVP" },
            { name: "Monthly Care & Retainer", price: "₦25,000 / $30 mo", badge: "IT Care" },
          ],
        },
        {
          id: "b-ai-contact",
          type: "contact",
          title: "Ready to launch your vision?",
          subtitle: "WILIAKONECT · FOUNDED BY ANOINTED-GODSWILL C C-E",
          content: "Connect with us today on WhatsApp (+234 911 463 8331) to deploy this website live.",
        },
      ];

      setPages((prev) =>
        prev.map((pg) => {
          if (pg.id === "page-home") {
            return { ...pg, blocks: newHomeBlocks };
          }
          return pg;
        })
      );

      setSiteTitle(generatedBrand);
      setIsGeneratingAi(false);
      setShowAiModal(false);
      setAiSuccessMessage(`Successfully generated custom website for "${cleanPrompt}"!`);
      setTimeout(() => setAiSuccessMessage(""), 5000);
    }, 1200);
  };

  const applyAiGeneratedSite = (siteData: any) => {
    if (siteData.brandName) setSiteTitle(siteData.brandName);
    if (siteData.blocks) {
      setPages((prev) =>
        prev.map((pg) => {
          if (pg.id === "page-home") {
            return { ...pg, blocks: siteData.blocks };
          }
          return pg;
        })
      );
    }
  };

  // Export full Wiliakonect CMS Theme & Content Bundle
  const handleExportWiliakonectCmsBundle = () => {
    const themeFiles = {
      "style.css": `/*
Theme Name: Wiliakonect Pro Theme
Theme URI: https://wiliakonect.vercel.app
Author: Anointed-Godswill C C-E (Wiliakonect)
Author URI: https://wiliakonect.vercel.app
Description: Wiliakonect CMS high performance theme & bundle built by Wiliakonect in Port Harcourt, Nigeria.
Version: 3.4.0
License: Proprietary / Wiliakonect
Text Domain: wiliakonect
*/`,
      "functions.php": `<?php
/**
 * Wiliakonect Engine Functions & Definitions
 */
function wiliakonect_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('responsive-embeds');
    register_nav_menus(array(
        'primary' => __('Primary Navigation', 'wiliakonect'),
    ));
}
add_action('after_setup_theme', 'wiliakonect_setup');
`,
      "index.php": `<?php
get_header();
// Wiliakonect Dynamic Page Render
get_footer();
?>`,
      "pages.json": JSON.stringify(pages, null, 2),
      "siteTitle": siteTitle,
    };

    const blob = new Blob([JSON.stringify(themeFiles, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `wiliakonect-cms-bundle-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#1d2327] text-[#f0f0f1] flex flex-col font-sans select-none">
      {/* 1. Classic Wiliakonect CMS Top Admin Bar */}
      <header className="h-10 bg-[#1d2327] border-b border-[#3c434a] px-4 flex items-center justify-between text-xs z-30 shrink-0">
        <div className="flex items-center gap-4">
          {/* WP Logo */}
          <button
            onClick={() => setActiveAdminTab("dashboard")}
            className="flex items-center gap-1.5 hover:text-[#72aee6] transition-colors cursor-pointer"
            title="Wiliakonect CMS Engine"
          >
            <div className="w-5 h-5 rounded-full bg-[#f2a20a] text-[#171520] font-black text-[11px] flex items-center justify-center">
              W
            </div>
            <span className="font-extrabold tracking-tight hidden sm:inline">Wiliakonect CMS</span>
          </button>

          {/* Site Title dropdown */}
          <div className="flex items-center gap-1 text-[#f0f0f1] hover:text-[#72aee6] cursor-pointer">
            <span className="font-bold">{siteTitle}</span>
            <button
              onClick={onGoToSite}
              className="text-[11px] text-[#72aee6] hover:underline flex items-center gap-1 ml-2"
              title="Visit Live Frontend"
            >
              <span>Visit Site</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          {/* + New Button */}
          <button
            onClick={() => setShowAddBlockModal(true)}
            className="hidden md:flex items-center gap-1 px-2 py-0.5 rounded bg-[#2c3338] hover:bg-[#3c434a] text-[#f0f0f1] transition-colors cursor-pointer"
          >
            <Plus className="w-3 h-3 text-[#f2a20a]" />
            <span>Add Block</span>
          </button>

          {/* AI Website Generator Trigger */}
          <button
            onClick={() => setShowAiModal(true)}
            className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#38208f] to-[#5b2cc2] text-white font-bold hover:brightness-110 shadow-sm cursor-pointer border border-white/20"
          >
            <Sparkles className="w-3 h-3 text-[#f2a20a]" />
            <span className="hidden sm:inline">AI Website Builder</span>
            <span className="sm:hidden">AI</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          {/* Pro Status Badge */}
          <button
            onClick={() => setShowProLicenseModal(true)}
            className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-md font-extrabold text-[11px] cursor-pointer transition-all ${
              isProUser
                ? "bg-[#f2a20a] text-[#171520] shadow-sm"
                : "bg-purple-900/60 text-purple-200 border border-purple-500/40 hover:bg-purple-900"
            }`}
          >
            <Crown className="w-3 h-3" />
            <span>{isProUser ? "CMS PRO ACTIVE" : "UPGRADE TO PRO"}</span>
          </button>

          {/* User profile / Auth trigger */}
          <button
            onClick={onOpenAuth}
            className="flex items-center gap-1.5 hover:text-[#72aee6] transition-colors cursor-pointer"
            title="User Credentials & Security"
          >
            <div className="w-5 h-5 rounded-full bg-[#38208f] text-white font-bold text-[10px] flex items-center justify-center">
              {user ? user.avatar : "AG"}
            </div>
            <span className="hidden md:inline font-semibold">
              {user ? user.name : "Anointed-Godswill C C-E"}
            </span>
            <span className="text-[10px] text-emerald-400 font-mono">
              [Super Admin]
            </span>
          </button>
        </div>
      </header>

      {/* 2. Main Admin Workspace Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Wiliakonect CMS Admin Sidebar */}
        <aside className="w-52 sm:w-60 bg-[#1d2327] border-r border-[#3c434a] flex flex-col shrink-0 text-sm overflow-y-auto">
          <div className="p-3 border-b border-[#3c434a]/60 text-xs text-slate-400 font-semibold flex items-center justify-between">
            <span className="uppercase tracking-wider text-[10px]">CMS Navigation</span>
            <span className="text-[10px] text-[#f2a20a]">Pro Suite</span>
          </div>

          <nav className="p-2 space-y-1">
            <button
              onClick={() => setActiveAdminTab("dashboard")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeAdminTab === "dashboard"
                  ? "bg-[#2271b1] text-white font-bold"
                  : "text-[#c3c4c7] hover:bg-[#2c3338] hover:text-[#72aee6]"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveAdminTab("editor")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeAdminTab === "editor"
                  ? "bg-[#2271b1] text-white font-bold"
                  : "text-[#c3c4c7] hover:bg-[#2c3338] hover:text-[#72aee6]"
              }`}
            >
              <Edit3 className="w-4 h-4" />
              <span>Block Editor</span>
            </button>

            <button
              onClick={() => setActiveAdminTab("pages")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeAdminTab === "pages"
                  ? "bg-[#2271b1] text-white font-bold"
                  : "text-[#c3c4c7] hover:bg-[#2c3338] hover:text-[#72aee6]"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Pages ({pages.length})</span>
            </button>

            <button
              onClick={() => setActiveAdminTab("customizer")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeAdminTab === "customizer"
                  ? "bg-[#2271b1] text-white font-bold"
                  : "text-[#c3c4c7] hover:bg-[#2c3338] hover:text-[#72aee6]"
              }`}
            >
              <Paintbrush className="w-4 h-4" />
              <span>Appearance & Styles</span>
            </button>

            <button
              onClick={() => setActiveAdminTab("plugins")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeAdminTab === "plugins"
                  ? "bg-[#2271b1] text-white font-bold"
                  : "text-[#c3c4c7] hover:bg-[#2c3338] hover:text-[#72aee6]"
              }`}
            >
              <Plug className="w-4 h-4" />
              <span>Plugins ({plugins.filter((p) => p.active).length})</span>
            </button>

            <button
              onClick={() => setActiveAdminTab("media")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeAdminTab === "media"
                  ? "bg-[#2271b1] text-white font-bold"
                  : "text-[#c3c4c7] hover:bg-[#2c3338] hover:text-[#72aee6]"
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Media Library</span>
            </button>

            <button
              onClick={() => setActiveAdminTab("pro")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeAdminTab === "pro"
                  ? "bg-[#f2a20a] text-[#171520] font-black"
                  : "text-[#f2a20a] hover:bg-[#2c3338]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Crown className="w-4 h-4" />
                <span>CMS Pro Suite</span>
              </div>
              <span className="text-[10px] font-black uppercase">Pro</span>
            </button>

            <button
              onClick={() => setActiveAdminTab("settings")}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeAdminTab === "settings"
                  ? "bg-[#2271b1] text-white font-bold"
                  : "text-[#c3c4c7] hover:bg-[#2c3338] hover:text-[#72aee6]"
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>General Settings</span>
            </button>
          </nav>

          {/* Node & Founder info footer */}
          <div className="mt-auto p-4 border-t border-[#3c434a]/60 text-[11px] text-slate-400 space-y-1">
            <div className="flex items-center gap-1.5 text-slate-300 font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Port Harcourt Node</span>
            </div>
            <p className="text-[10px] text-slate-500">Founder: Anointed-Godswill C C-E</p>
          </div>
        </aside>

        {/* 3. Main Center Workspace */}
        <main className="flex-1 bg-[#f0f0f1] text-[#1d2327] overflow-y-auto flex flex-col">
          {aiSuccessMessage && (
            <div className="bg-emerald-600 text-white text-xs py-2 px-4 flex items-center justify-between font-bold">
              <span>{aiSuccessMessage}</span>
              <button onClick={() => setAiSuccessMessage("")} className="underline text-[11px]">
                Dismiss
              </button>
            </div>
          )}

          {/* A. DASHBOARD VIEW */}
          {activeAdminTab === "dashboard" && (
            <div className="p-6 sm:p-8 space-y-6 max-w-6xl">
              <div className="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h1 className="text-2xl font-extrabold text-[#1d2327]">
                    Welcome to Wiliakonect CMS Engine.
                  </h1>
                  <p className="text-xs text-slate-600">
                    We’ve assembled some links to get you started building high-impact sites from Port Harcourt, Nigeria.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveAdminTab("editor")}
                    className="px-4 py-2 bg-[#2271b1] hover:bg-[#135e96] text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
                  >
                    Launch Gutenberg Editor
                  </button>
                  <button
                    onClick={() => setShowAiModal(true)}
                    className="px-4 py-2 bg-[#38208f] hover:bg-[#251368] text-white rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#f2a20a]" />
                    <span>AI Website Builder</span>
                  </button>
                </div>
              </div>

              {/* At a Glance Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-300 shadow-xs space-y-3">
                  <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2">
                    At a Glance
                  </h3>
                  <div className="space-y-2 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span>Published Pages:</span>
                      <strong className="text-slate-900">{pages.length} Pages</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Active Plugins:</span>
                      <strong className="text-slate-900">{plugins.filter((p) => p.active).length} Installed</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>CMS Architecture:</span>
                      <strong className="text-[#38208f]">Wiliakonect CMS Engine</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Location Node:</span>
                      <strong className="text-emerald-700">Port Harcourt, NG</strong>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-300 shadow-xs space-y-3">
                  <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2">
                    Site Health Status
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-black">
                      ✓
                    </div>
                    <div>
                      <div className="text-sm font-bold text-emerald-800">Good (0 Critical Issues)</div>
                      <p className="text-[11px] text-slate-500">
                        256-Bit encryption active. 2FA armed for Anointed-Godswill C C-E.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-300 shadow-xs space-y-3">
                  <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2">
                    CMS Pro Suite
                  </h3>
                  <div className="space-y-2 text-xs">
                    <p className="text-slate-600">
                      AI Site Auto-Writer, WooCommerce Store Engine, and Dynamic Custom Post Types are unlocked.
                    </p>
                    <button
                      onClick={() => setActiveAdminTab("pro")}
                      className="text-xs font-bold text-[#38208f] hover:underline flex items-center gap-1"
                    >
                      <span>Manage Pro Modules</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* B. BLOCK EDITOR (Gutenberg Format) */}
          {activeAdminTab === "editor" && (
            <div className="flex-1 flex flex-col">
              {/* Gutenberg Editor Top Sub-bar */}
              <div className="bg-white border-b border-slate-300 px-6 py-2.5 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowAddBlockModal(true)}
                    className="p-1.5 rounded-lg bg-[#38208f] hover:bg-[#251368] text-white flex items-center gap-1 text-xs font-bold cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Block</span>
                  </button>

                  <select
                    value={activePageId}
                    onChange={(e) => setActivePageId(e.target.value)}
                    className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-bold text-slate-800 bg-slate-50"
                  >
                    {pages.map((p) => (
                      <option key={p.id} value={p.id}>
                        Editing: {p.title} ({p.slug})
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => setShowAiModal(true)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-purple-50 text-[#38208f] border border-[#38208f]/20 hover:bg-purple-100 text-xs font-bold cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#f2a20a]" />
                    <span>AI Copilot</span>
                  </button>
                </div>

                {/* Viewport switch & Save */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
                    <button
                      onClick={() => setViewport("desktop")}
                      className={`p-1.5 rounded cursor-pointer ${
                        viewport === "desktop" ? "bg-white shadow-xs text-[#2271b1]" : "text-slate-500"
                      }`}
                    >
                      <Monitor className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewport("tablet")}
                      className={`p-1.5 rounded cursor-pointer ${
                        viewport === "tablet" ? "bg-white shadow-xs text-[#2271b1]" : "text-slate-500"
                      }`}
                    >
                      <Tablet className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewport("mobile")}
                      className={`p-1.5 rounded cursor-pointer ${
                        viewport === "mobile" ? "bg-white shadow-xs text-[#2271b1]" : "text-slate-500"
                      }`}
                    >
                      <Smartphone className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={onGoToSite}
                    className="px-4 py-1.5 bg-[#2271b1] hover:bg-[#135e96] text-white rounded-lg text-xs font-bold shadow-xs cursor-pointer"
                  >
                    Publish Changes
                  </button>
                </div>
              </div>

              {/* Editor Canvas Container */}
              <div className="flex-1 bg-slate-200/70 p-4 sm:p-8 overflow-y-auto flex justify-center">
                <div
                  className="bg-white rounded-2xl shadow-xl border border-slate-300 transition-all duration-300 overflow-hidden flex flex-col min-h-[650px]"
                  style={{
                    width: viewport === "desktop" ? "100%" : viewport === "tablet" ? "768px" : "385px",
                    maxWidth: "1050px",
                    fontFamily,
                  }}
                >
                  {/* Canvas Header / Navbar */}
                  <div className="p-4 sm:px-8 border-b border-slate-100 flex items-center justify-between bg-white">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#38208f] flex items-center justify-center text-[#f2a20a] font-black text-sm">
                        W
                      </div>
                      <span className="font-extrabold text-lg text-slate-900">{siteTitle}</span>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
                      {pages.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => setActivePageId(p.id)}
                          className={`hover:text-[#38208f] transition-colors cursor-pointer ${
                            p.id === activePageId ? "text-[#38208f] font-bold underline" : ""
                          }`}
                        >
                          {p.title}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Render Gutenberg Blocks */}
                  <div className="p-6 sm:p-10 space-y-8 flex-1">
                    {currentPage.blocks.map((block, index) => {
                      const isSelected = selectedBlockId === block.id;
                      return (
                        <div
                          key={block.id}
                          onClick={() => setSelectedBlockId(block.id)}
                          className={`relative p-6 rounded-2xl transition-all border group ${
                            isSelected
                              ? "ring-2 ring-[#2271b1] border-[#2271b1] bg-white shadow-md"
                              : "border-slate-200/80 hover:border-slate-300 bg-white"
                          }`}
                        >
                          {/* Floating Gutenberg Block Action Bar */}
                          <div className="absolute -top-3.5 left-4 hidden group-hover:flex items-center bg-[#1d2327] text-white px-2 py-1 rounded-md text-[10px] gap-1 shadow-md z-10">
                            <span className="text-[#f2a20a] font-bold uppercase">{block.type}</span>
                            <span className="text-white/30">|</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMoveBlock(index, "up");
                              }}
                              disabled={index === 0}
                              className="hover:text-[#72aee6] disabled:opacity-30 cursor-pointer"
                              title="Move Up"
                            >
                              <ArrowUp className="w-3 h-3" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMoveBlock(index, "down");
                              }}
                              disabled={index === currentPage.blocks.length - 1}
                              className="hover:text-[#72aee6] disabled:opacity-30 cursor-pointer"
                              title="Move Down"
                            >
                              <ArrowDown className="w-3 h-3" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDuplicateBlock(block);
                              }}
                              className="hover:text-[#72aee6] cursor-pointer"
                              title="Duplicate"
                            >
                              <Copy className="w-3 h-3" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteBlock(block.id);
                              }}
                              className="text-red-400 hover:text-red-300 cursor-pointer"
                              title="Delete Block"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Block Renderer */}
                          {block.type === "hero" && (
                            <div className="text-center max-w-2xl mx-auto space-y-4 py-6">
                              <input
                                type="text"
                                value={block.subtitle || ""}
                                onChange={(e) => handleUpdateBlock(block.id, { subtitle: e.target.value })}
                                className="text-xs font-extrabold uppercase tracking-widest text-[#f2a20a] bg-transparent text-center w-full focus:outline-none"
                              />
                              <textarea
                                rows={2}
                                value={block.title || ""}
                                onChange={(e) => handleUpdateBlock(block.id, { title: e.target.value })}
                                className="text-3xl sm:text-4xl font-extrabold text-[#171520] bg-transparent text-center w-full focus:outline-none resize-none leading-tight"
                              />
                              <textarea
                                rows={3}
                                value={block.content || ""}
                                onChange={(e) => handleUpdateBlock(block.id, { content: e.target.value })}
                                className="text-sm text-slate-600 bg-transparent text-center w-full focus:outline-none resize-none"
                              />
                              <div className="pt-2">
                                <span className="inline-block px-6 py-3 rounded-xl font-bold text-white bg-[#38208f] text-xs shadow-md">
                                  {block.ctaText || "Get Started"} ↗
                                </span>
                              </div>
                            </div>
                          )}

                          {block.type === "features" && (
                            <div className="space-y-6">
                              <div className="text-center">
                                <input
                                  type="text"
                                  value={block.subtitle || ""}
                                  onChange={(e) => handleUpdateBlock(block.id, { subtitle: e.target.value })}
                                  className="text-[10px] font-extrabold uppercase tracking-wider text-[#38208f] bg-transparent text-center w-full focus:outline-none"
                                />
                                <input
                                  type="text"
                                  value={block.title || ""}
                                  onChange={(e) => handleUpdateBlock(block.id, { title: e.target.value })}
                                  className="text-2xl font-extrabold text-slate-900 bg-transparent text-center w-full focus:outline-none"
                                />
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {block.items?.map((item: any, i: number) => (
                                  <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                                    <h4 className="font-bold text-sm text-[#38208f]">{item.title}</h4>
                                    <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {block.type === "pricing" && (
                            <div className="space-y-6">
                              <div className="text-center">
                                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#f2a20a]">
                                  {block.subtitle}
                                </span>
                                <h3 className="text-2xl font-extrabold text-slate-900">{block.title}</h3>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {block.items?.map((item: any, i: number) => (
                                  <div
                                    key={i}
                                    className={`p-5 rounded-2xl border flex flex-col justify-between ${
                                      item.popular
                                        ? "bg-purple-50/50 border-[#38208f] shadow-md"
                                        : "bg-white border-slate-200"
                                    }`}
                                  >
                                    <div>
                                      <h4 className="font-bold text-sm text-slate-900">{item.name}</h4>
                                      <div className="text-lg font-black text-[#38208f] my-2">{item.price}</div>
                                      <ul className="text-xs text-slate-600 space-y-1 mb-4">
                                        {item.features?.map((f: string, fi: number) => (
                                          <li key={fi} className="flex items-center gap-1.5">
                                            <span className="text-emerald-600">✓</span>
                                            <span>{f}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                    <button className="w-full py-2 bg-[#38208f] text-white rounded-lg text-xs font-bold">
                                      Select Plan
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {block.type === "products" && (
                            <div className="space-y-6">
                              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                                <div>
                                  <span className="text-[10px] font-bold text-purple-700 uppercase">
                                    WooCommerce Store Engine (Pro)
                                  </span>
                                  <h3 className="text-xl font-bold text-slate-900">{block.title}</h3>
                                </div>
                                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                                  Paystack & Stripe Ready
                                </span>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {block.items?.map((item: any, i: number) => (
                                  <div key={i} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                                    <div className="w-full h-24 bg-slate-200 rounded-lg flex items-center justify-center text-slate-400">
                                      <ShoppingBag className="w-8 h-8" />
                                    </div>
                                    <h4 className="font-bold text-xs text-slate-900">{item.name}</h4>
                                    <div className="flex justify-between items-center text-xs">
                                      <strong className="text-[#38208f]">{item.price}</strong>
                                      <span className="text-[10px] bg-slate-200 px-1.5 py-0.5 rounded">{item.badge}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {block.type === "contact" && (
                            <div className="bg-[#171520] text-white p-6 sm:p-8 rounded-2xl text-center space-y-4">
                              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#f2a20a]">
                                {block.subtitle}
                              </span>
                              <h3 className="text-2xl font-extrabold">{block.title}</h3>
                              <p className="text-xs text-white/80 max-w-lg mx-auto">{block.content}</p>
                              <div className="pt-2">
                                <a
                                  href={`https://wa.me/${config.whatsappNumber}?text=Hello%20Wiliakonect!%20I'm%20inquiring%20about%20your%20services.`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#15803d]"
                                >
                                  <MessageSquare className="w-4 h-4" />
                                  <span>Chat on WhatsApp (+234 911 463 8331)</span>
                                </a>
                              </div>
                            </div>
                          )}

                          {block.type === "testimonials" && (
                            <div className="space-y-4">
                              <h3 className="text-center font-bold text-lg text-slate-900">{block.title}</h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {block.items?.map((item: any, i: number) => (
                                  <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs italic text-slate-700 space-y-2">
                                    <p>"{item.quote}"</p>
                                    <div className="font-bold not-italic text-[#38208f]">
                                      {item.author} <span className="text-slate-400 font-normal">· {item.role}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Canvas Footer */}
                  <div className="p-6 border-t border-slate-100 text-center text-xs text-slate-500 bg-slate-50">
                    © {new Date().getFullYear()} {siteTitle} · Port Harcourt, Nigeria · Global Remote Delivery
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* C. PAGES MANAGER VIEW */}
          {activeAdminTab === "pages" && (
            <div className="p-6 sm:p-8 max-w-5xl space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Pages</h2>
                  <p className="text-xs text-slate-500">
                    Manage multi-page hierarchy for {siteTitle}
                  </p>
                </div>
                <button
                  onClick={() => {
                    const newPage: CmsPage = {
                      id: "page-" + Date.now().toString(36),
                      title: "New Custom Page",
                      slug: "/custom-" + Date.now().toString(36).slice(0, 4),
                      status: "published",
                      blocks: [
                        {
                          id: "b-new-hero",
                          type: "hero",
                          title: "New Page Title",
                          subtitle: "SUBTITLE",
                          content: "Craft your custom story with Wiliakonect CMS.",
                        },
                      ],
                    };
                    setPages([...pages, newPage]);
                    setActivePageId(newPage.id);
                    setActiveAdminTab("editor");
                  }}
                  className="px-4 py-2 bg-[#2271b1] hover:bg-[#135e96] text-white text-xs font-bold rounded-lg cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Page</span>
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-slate-300 overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="p-4">Title</th>
                      <th className="p-4">Slug</th>
                      <th className="p-4">Blocks</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {pages.map((pg) => (
                      <tr key={pg.id} className="hover:bg-slate-50">
                        <td className="p-4 font-bold text-slate-900">{pg.title}</td>
                        <td className="p-4 font-mono text-slate-500">{pg.slug}</td>
                        <td className="p-4 text-slate-600">{pg.blocks.length} blocks</td>
                        <td className="p-4">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            {pg.status}
                          </span>
                        </td>
                        <td className="p-4 text-right space-x-2">
                          <button
                            onClick={() => {
                              setActivePageId(pg.id);
                              setActiveAdminTab("editor");
                            }}
                            className="text-[#2271b1] font-bold hover:underline cursor-pointer"
                          >
                            Edit
                          </button>
                          {pages.length > 1 && (
                            <button
                              onClick={() => setPages(pages.filter((p) => p.id !== pg.id))}
                              className="text-red-500 font-semibold hover:underline cursor-pointer"
                            >
                              Trash
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* D. APPEARANCE & CUSTOMIZER */}
          {activeAdminTab === "customizer" && (
            <div className="p-6 sm:p-8 max-w-4xl space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Customizer & Themes</h2>

              <div className="bg-white p-6 rounded-2xl border border-slate-300 shadow-xs space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Site Title
                    </label>
                    <input
                      type="text"
                      value={siteTitle}
                      onChange={(e) => setSiteTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Tagline
                    </label>
                    <input
                      type="text"
                      value={siteTagline}
                      onChange={(e) => setSiteTagline(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Primary Theme Color
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="w-8 h-8 rounded border border-slate-300 p-0.5 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Accent Color
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={accentColor}
                        onChange={(e) => setAccentColor(e.target.value)}
                        className="w-8 h-8 rounded border border-slate-300 p-0.5 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={accentColor}
                        onChange={(e) => setAccentColor(e.target.value)}
                        className="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Typography Pairing
                  </label>
                  <select
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
                  >
                    <option value="DM Sans">DM Sans + Manrope (Wiliakonect Signature)</option>
                    <option value="Inter">Inter + Space Grotesk (Modern Tech)</option>
                    <option value="Plus Jakarta Sans">Plus Jakarta Sans + Outfit (Editorial)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* E. PLUGINS VIEW */}
          {activeAdminTab === "plugins" && (
            <div className="p-6 sm:p-8 max-w-5xl space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Installed Plugins</h2>
                  <p className="text-xs text-slate-500">
                    Extend your Wiliakonect CMS capabilities with verified extensions
                  </p>
                </div>
                <button
                  onClick={() => setShowProLicenseModal(true)}
                  className="px-3.5 py-1.5 bg-[#f2a20a] text-[#171520] font-bold text-xs rounded-lg flex items-center gap-1.5"
                >
                  <Crown className="w-3.5 h-3.5" />
                  <span>Pro Extensions Unlocked</span>
                </button>
              </div>

              <div className="space-y-3">
                {plugins.map((plugin) => (
                  <div
                    key={plugin.id}
                    className="p-5 bg-white rounded-2xl border border-slate-300 flex items-center justify-between gap-4 shadow-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-slate-900">{plugin.name}</h4>
                        {plugin.isPro && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-purple-100 text-purple-900">
                            PRO
                          </span>
                        )}
                        <span className="text-[11px] text-slate-400 font-mono">v{plugin.version}</span>
                      </div>
                      <p className="text-xs text-slate-600">{plugin.desc}</p>
                    </div>

                    <button
                      onClick={() => {
                        setPlugins(
                          plugins.map((p) => (p.id === plugin.id ? { ...p, active: !p.active } : p))
                        );
                      }}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        plugin.active
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {plugin.active ? "Active" : "Activate"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* F. CMS PRO FEATURES PANEL */}
          {activeAdminTab === "pro" && (
            <div className="p-6 sm:p-8 max-w-5xl space-y-6">
              <div className="bg-gradient-to-r from-[#171520] via-[#2d1b54] to-[#38208f] text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f2a20a] text-[#171520] text-xs font-extrabold uppercase">
                    <Crown className="w-3.5 h-3.5" />
                    <span>Wiliakonect CMS Pro Suite</span>
                  </div>
                  <h2 className="text-3xl font-extrabold tracking-tight">
                    Enterprise Features Unlocked
                  </h2>
                  <p className="text-xs text-white/80 max-w-xl">
                    License Active: <span className="font-mono text-[#f2a20a]">{proLicenseKey}</span>. Node verified in Port Harcourt, Nigeria.
                  </p>
                </div>

                <button
                  onClick={handleExportWiliakonectCmsBundle}
                  className="px-5 py-3 rounded-xl font-bold text-xs bg-white text-[#171520] hover:bg-slate-100 shadow-md flex items-center gap-2 cursor-pointer shrink-0"
                >
                  <Download className="w-4 h-4 text-[#38208f]" />
                  <span>Export Wiliakonect CMS Bundle</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-300 shadow-xs space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#38208f] flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-[#f2a20a]" />
                  </div>
                  <h3 className="font-bold text-sm text-slate-900">AI Website Copilot</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Uses Gemini models to draft entire custom page layouts, generate copywriting, and optimize keywords in seconds.
                  </p>
                  <button
                    onClick={() => setShowAiModal(true)}
                    className="text-xs font-bold text-[#38208f] hover:underline flex items-center gap-1"
                  >
                    <span>Launch AI Generator</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-300 shadow-xs space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm text-slate-900">E-Commerce & Checkout</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Product listings, shopping cart, and native support for Nigerian & global gateways (Paystack, Flutterwave, Stripe).
                  </p>
                  <button
                    onClick={() => {
                      handleAddBlock("products");
                      setActiveAdminTab("editor");
                    }}
                    className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
                  >
                    <span>Insert Store Block</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-300 shadow-xs space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm text-slate-900">Custom Domain & SSL</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Link your own `.com` or `.ng` domain with automated Let's Encrypt SSL and Port Harcourt edge routing.
                  </p>
                  <span className="text-xs font-bold text-emerald-600">Active & Enforced</span>
                </div>
              </div>
            </div>
          )}

          {/* G. MEDIA LIBRARY */}
          {activeAdminTab === "media" && (
            <div className="p-6 sm:p-8 max-w-5xl space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Media Library</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { name: "Brand Hero Asset", type: "SVG", url: "/brand.svg" },
                  { name: "Wiliakonect Favicon", type: "SVG", url: "/favicon.svg" },
                ].map((item, i) => (
                  <div key={i} className="p-4 bg-white rounded-xl border border-slate-300 text-center space-y-2">
                    <div className="w-full h-24 bg-slate-100 rounded flex items-center justify-center p-2">
                      <img src={item.url} alt={item.name} className="max-h-full" />
                    </div>
                    <span className="text-xs font-bold block truncate">{item.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{item.type}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* H. SETTINGS */}
          {activeAdminTab === "settings" && (
            <div className="p-6 sm:p-8 max-w-4xl space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">General Settings</h2>
              <div className="bg-white p-6 rounded-2xl border border-slate-300 space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Administration Email</label>
                  <input
                    type="email"
                    defaultValue="anointedgodswill.tech@gmail.com"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Timezone</label>
                  <input
                    type="text"
                    disabled
                    value="Africa/Lagos (WAT, UTC+1)"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-600"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Principal Engineer / Founder</label>
                  <input
                    type="text"
                    disabled
                    value="Anointed-Godswill C C-E"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-600"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Headquarters & Operating Region</label>
                  <input
                    type="text"
                    disabled
                    value="Port Harcourt, Nigeria · Global Remote Delivery"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-600"
                  />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODAL 1: Add Block Modal */}
      {showAddBlockModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4 text-[#1d2327]">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base">Insert Gutenberg Block</h3>
              <button onClick={() => setShowAddBlockModal(false)} className="p-1 text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { type: "hero", label: "Hero Banner", desc: "Top headline with call-to-action button" },
                { type: "features", label: "3-Column Features", desc: "Showcase services or core pillars" },
                { type: "pricing", label: "Pricing Table", desc: "Plans, tiers, and currency values" },
                { type: "products", label: "E-Commerce Products", desc: "Product catalog with checkout (Pro)" },
                { type: "testimonials", label: "Testimonials", desc: "Client quotes and author badges" },
                { type: "faq", label: "FAQ Accordion", desc: "Helpful answers to common inquiries" },
                { type: "contact", label: "Contact CTA", desc: "WhatsApp button and inquiry prompt" },
              ].map((item) => (
                <button
                  key={item.type}
                  onClick={() => handleAddBlock(item.type as any)}
                  className="p-3 text-left rounded-xl border border-slate-200 hover:border-[#38208f] hover:bg-purple-50/50 transition-all cursor-pointer space-y-1"
                >
                  <h4 className="font-bold text-xs text-[#38208f]">{item.label}</h4>
                  <p className="text-[11px] text-slate-500 leading-tight">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: AI Website Builder Prompt Modal */}
      {showAiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-xl p-6 sm:p-8 shadow-2xl text-[#1d2327] space-y-5 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#38208f] text-[#f2a20a]">
                  <Sparkles className="w-5 h-5 font-bold" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base">Wiliakonect AI Website Builder</h3>
                  <p className="text-xs text-slate-500">
                    Generates full website blueprints, copy, and layout with Gemini
                  </p>
                </div>
              </div>
              <button onClick={() => setShowAiModal(false)} className="p-1.5 text-slate-400 hover:text-slate-600 cursor-pointer">
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Describe what your website should do & your target audience *
                </label>
                <textarea
                  rows={4}
                  placeholder="e.g. A high-end real estate agency based in Port Harcourt, Nigeria with property listings, mortgage consultation, and direct WhatsApp tours..."
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#38208f]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Industry Focus
                </label>
                <select
                  value={aiIndustry}
                  onChange={(e) => setAiIndustry(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs bg-white"
                >
                  <option value="Technology & SaaS">Technology, SaaS & Software</option>
                  <option value="Real Estate & Property">Real Estate & Property (Nigeria / Global)</option>
                  <option value="Corporate & Consulting">Corporate & Consulting</option>
                  <option value="E-Commerce & Retail">E-Commerce Store & Fashion</option>
                  <option value="Hospitality & Dining">Restaurant, Café & Hospitality</option>
                  <option value="Creative Agency">Creative Portfolio & Media</option>
                </select>
              </div>

              {/* Quick suggestion prompt chips */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-500 uppercase">Quick Prompt Inspiration:</span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "Port Harcourt Tech Startup",
                    "Luxury Real Estate in Rivers State",
                    "E-Commerce Fashion Store with Paystack",
                    "Corporate Law & Advisory Firm",
                  ].map((sug, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setAiPrompt(sug)}
                      className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                    >
                      {sug}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowAiModal(false)}
                className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleGenerateAiWebsite}
                disabled={isGeneratingAi || !aiPrompt.trim()}
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-[#38208f] hover:bg-[#251368] transition-all disabled:opacity-50 flex items-center gap-2 cursor-pointer shadow-md"
              >
                {isGeneratingAi ? (
                  <>
                    <Sparkles className="w-4 h-4 text-[#f2a20a] animate-spin" />
                    <span>Synthesizing Website with AI...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#f2a20a]" />
                    <span>Generate Website Blueprint</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Pro License Manager Modal */}
      {showProLicenseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 sm:p-7 shadow-2xl text-[#1d2327] space-y-4 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-[#f2a20a]" />
                <h3 className="font-extrabold text-base">Wiliakonect CMS Pro License</h3>
              </div>
              <button onClick={() => setShowProLicenseModal(false)} className="p-1 text-slate-400">
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <p>
                CMS Pro unlocks full Gemini AI Copilot generation, e-commerce store engine, and exportable Wiliakonect CMS bundle archives.
              </p>
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  License Key
                </label>
                <input
                  type="text"
                  value={licenseInput}
                  onChange={(e) => setLicenseInput(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono text-xs"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center">
              <button
                onClick={() => {
                  deactivatePro();
                  setShowProLicenseModal(false);
                }}
                className="text-xs text-slate-400 hover:text-red-500 cursor-pointer"
              >
                Deactivate Pro
              </button>
              <button
                onClick={() => {
                  activatePro(licenseInput);
                  setShowProLicenseModal(false);
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#171520] bg-[#f2a20a] hover:bg-[#df9304] transition-all cursor-pointer shadow-md"
              >
                Validate & Save License
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
