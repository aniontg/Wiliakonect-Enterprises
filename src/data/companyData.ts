export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  features: string[];
  deliverables: string[];
  startingPrice: string;
  popular?: boolean;
}

export interface PaymentDetails {
  bankName: string;
  accountNumber: string;
  accountName: string;
  paystackLink: string;
  flutterwaveLink: string;
  usdtTrc20Address: string;
  paymentNote: string;
}

export interface StandardPricingPackage {
  id: string;
  name: string;
  category: string;
  badge?: string;
  popular?: boolean;
  marketPriceRange: string;
  penetrationPrice: string;
  startingNaira: number;
  startingUsd: number;
  billingCycle?: "one-time" | "monthly";
  scopePages: string;
  turnaround: string;
  description: string;
  features: string[];
  frontendPerks: string[];
}

export interface CompanyConfig {
  brandName: string;
  brandTagline: string;
  heroEyebrow: string;
  heroTitle: string;
  heroHighlight: string;
  heroSubtitle: string;
  heroCtaText: string;
  phonePrimary: string;
  phoneSecondary: string;
  whatsappNumber: string;
  emailPrimary: string;
  emailSecondary: string;
  location: string;
  workingHours: string;
  trustPoints: string[];
  services: ServiceItem[];
  standardPackages: StandardPricingPackage[];
  aboutHeroTitle: string;
  aboutStory: string;
  founderName: string;
  founderRole: string;
  payments: PaymentDetails;
}

export const defaultCompanyConfig: CompanyConfig = {
  brandName: "Wiliakonect",
  brandTagline: "Technology for what’s next",
  heroEyebrow: "TECHNOLOGY, MADE HUMAN",
  heroTitle: "Good ideas deserve",
  heroHighlight: "great technology.",
  heroSubtitle:
    "We help businesses turn ambitious ideas into useful digital experiences—with the right technology and dependable engineering in your corner.",
  heroCtaText: "Let’s build something",
  phonePrimary: "+234 911 463 8331",
  phoneSecondary: "+234 703 902 2991",
  whatsappNumber: "2349114638331",
  emailPrimary: "wiliakonect.store@gmail.com",
  emailSecondary: "anointedgodswill.tech@gmail.com",
  location: "Port Harcourt, Nigeria · Global Remote Delivery",
  workingHours: "Monday – Saturday: 8:00 AM – 7:00 PM WAT (24/7 Security & Support Desk)",
  trustPoints: [
    "Clear, not complicated",
    "Built around real people",
    "Ready for what’s next",
    "Enterprise-grade security",
  ],
  aboutHeroTitle: "People first. Possibility always.",
  aboutStory:
    "At Wiliakonect, we believe technology should be liberating, never overwhelming. Most business owners don't want confusing jargon or bloated retainers—they want a dependable digital presence, streamlined software tools, and an expert who actually picks up the phone when they call. Founded in Port Harcourt, Nigeria and serving clients worldwide, we build with precision, care, and continuous commitment.",
  founderName: "Anointed-Godswill C C-E",
  founderRole: "Founder & Lead Technologist, Wiliakonect",
  payments: {
    bankName: "Zenith Bank / Access Bank",
    accountNumber: "2089456123",
    accountName: "Wiliakonect / Anointed-Godswill C C-E",
    paystackLink: "https://paystack.com/pay/wiliakonect",
    flutterwaveLink: "https://flutterwave.com/pay/wiliakonect",
    usdtTrc20Address: "TYDzsYBPjx9114638331PortHarcourtNode",
    paymentNote: "After transfer or payment, click 'Notify on WhatsApp' to receive instant milestone receipt and onboarding checklist.",
  },
  services: [
    {
      id: "web-design",
      title: "Websites & Digital Experiences",
      subtitle: "Fast, modern, and built to convert visitors into clients",
      badge: "Most Requested",
      description:
        "High-performance responsive websites, landing pages, business storefronts, and full web applications tailored to your specific brand identity.",
      features: [
        "Mobile-first responsive layout",
        "Lightning-fast load speed & SEO optimization",
        "WhatsApp & contact forms integration",
        "Wiliakonect CMS & AI website builder",
        "Custom domain & SSL configuration",
      ],
      deliverables: [
        "Custom design in Figma & React",
        "Interactive live demo before launch",
        "1 month of complimentary revisions",
        "Analytics and Google Search indexing",
      ],
      startingPrice: "From ₦75,000 / $95",
      popular: true,
    },
    {
      id: "software-systems",
      title: "Software & Business Tools",
      subtitle: "Custom portals, automation, and workflow tools",
      badge: "High ROI",
      description:
        "Custom software solutions that save you dozens of hours weekly. From inventory systems and client portals to automated WhatsApp and email notification pipelines.",
      features: [
        "Tailored database & backend architecture",
        "Role-based access & admin control panels",
        "Payment gateway integrations (Paystack, Flutterwave, Stripe)",
        "Automated reporting & invoice generation",
        "Secure cloud API connectivity",
      ],
      deliverables: [
        "Full source code ownership",
        "Employee training & video walkthroughs",
        "Data backup and restore protocols",
        "Quarterly health checks",
      ],
      startingPrice: "From ₦210,000 / $265",
    },
    {
      id: "it-support",
      title: "Dependable IT Support & Guidance",
      subtitle: "Always-on technical security and maintenance",
      badge: "Peace of Mind",
      description:
        "Never panic when an email bounce occurs, a server slows down, or your domain expires. We act as your on-demand CTO and IT department.",
      features: [
        "24/7 uptime monitoring & rapid recovery",
        "Professional business email setup (@yourdomain.com)",
        "DNS, SSL certificate & domain management",
        "Cybersecurity audit & threat mitigation",
        "Direct WhatsApp line for emergency fixes",
      ],
      deliverables: [
        "Sub-1-hour priority emergency response",
        "Weekly automated cloud backups",
        "Monthly maintenance logs & security updates",
        "Scheduled quarterly check-in meetings",
      ],
      startingPrice: "From ₦25,000 / $30 mo",
    },
  ],
  standardPackages: [
    {
      id: "basic-landing",
      name: "Basic Business / Landing Page",
      category: "Web Design",
      badge: "Market Penetration Offer",
      marketPriceRange: "₦150,000 – ₦400,000",
      penetrationPrice: "₦75,000 – ₦135,000",
      startingNaira: 75000,
      startingUsd: 95,
      billingCycle: "one-time",
      scopePages: "1–5 Pages",
      turnaround: "3–5 Days",
      description:
        "Perfect for small businesses, personal portfolios, product launches, and local services in Port Harcourt and globally who need a credible, high-converting digital front door.",
      features: [
        "1–5 high-impact responsive pages",
        "Pixel-perfect mobile-first design",
        "Contact form & direct WhatsApp chat integration",
        "Basic on-page SEO meta tags & Google indexing setup",
        "Social media integration & SSL security",
      ],
      frontendPerks: [
        "Handcrafted modern frontend code (React / Tailwind)",
        "Zero code bloat — loads in under 1.2s on mobile networks",
        "Clean, interactive animations that impress prospective clients",
      ],
    },
    {
      id: "standard-corporate",
      name: "Standard Corporate Website",
      category: "Corporate & Multi-Page",
      badge: "Most Popular for Businesses",
      popular: true,
      marketPriceRange: "₦450,000+",
      penetrationPrice: "₦210,000 – ₦320,000",
      startingNaira: 210000,
      startingUsd: 265,
      billingCycle: "one-time",
      scopePages: "6–15 Pages",
      turnaround: "7–10 Days",
      description:
        "A full-fledged professional corporate presence for growing companies, law firms, consultancies, healthcare providers, and institutions looking to dominate their market.",
      features: [
        "6–15 custom designed & branded pages",
        "Dynamic blog / news setup with category filtering",
        "Custom UI layout matched to corporate branding",
        "Comprehensive speed optimization & Core Web Vitals audit",
        "Wiliakonect CMS dashboard setup for easy content updates",
      ],
      frontendPerks: [
        "Modular React architecture built for scalability",
        "Wiliakonect CMS visual block management",
        "Lead capture forms with automated email notifications",
      ],
    },
    {
      id: "ecommerce-store",
      name: "E-Commerce Online Store",
      category: "Online Store & Payments",
      badge: "Automated Payment Rails",
      marketPriceRange: "₦600,000+",
      penetrationPrice: "₦320,000 – ₦460,000",
      startingNaira: 320000,
      startingUsd: 400,
      billingCycle: "one-time",
      scopePages: "Full Store Setup",
      turnaround: "10–14 Days",
      description:
        "Sell products online 24/7 with zero headaches. Automated payment gateways (Paystack, Flutterwave), inventory sync, and seamless cart/checkout optimized for high conversion.",
      features: [
        "Product catalog with categories, search & stock badges",
        "Automated payment gateway setup (Paystack & Flutterwave)",
        "Optimized cart & frictionless one-page checkout",
        "Dropshipping or automated inventory sync",
        "Instant WhatsApp & email receipt generation",
      ],
      frontendPerks: [
        "Frictionless mobile checkout flow with high conversion rate",
        "Real-time cart state without page refreshes",
        "Support for local cards, USSD, bank transfer, and crypto rails",
      ],
    },
    {
      id: "custom-web-app",
      name: "Custom Web Application / React MVP",
      category: "Custom Web Application",
      badge: "Frontend Developer Special",
      marketPriceRange: "₦1,500,000+",
      penetrationPrice: "₦650,000 – ₦890,000",
      startingNaira: 650000,
      startingUsd: 820,
      billingCycle: "one-time",
      scopePages: "Interactive Web App",
      turnaround: "14–21 Days",
      description:
        "Bring your software idea, SaaS MVP, or internal business portal to life. Engineered with modern React frontend, clean architecture, custom database, and robust authentication.",
      features: [
        "Interactive frontend web application (React, TypeScript, Tailwind)",
        "Custom database integration & REST/cloud API endpoints",
        "Secure user authentication & role-based permissions",
        "Custom business logic, interactive tables, and data filters",
        "Admin control dashboard & analytics views",
      ],
      frontendPerks: [
        "Engineered by a dedicated frontend developer — clean code you own",
        "Ultra-responsive state management with zero UI lag",
        "Production-ready codebase ready for investor pitching or scaling",
      ],
    },
    {
      id: "monthly-care",
      name: "Monthly Care & Maintenance",
      category: "Ongoing IT Retainer",
      badge: "Continuous Peace of Mind",
      marketPriceRange: "₦30,000 – ₦150,000 / month",
      penetrationPrice: "₦25,000 – ₦55,000 / month",
      startingNaira: 25000,
      startingUsd: 30,
      billingCycle: "monthly",
      scopePages: "Continuous Support",
      turnaround: "Sub-1-hour Emergency Response",
      description:
        "Keep your website, CMS, and web app safe, lightning-fast, and up to date without hiring a full-time in-house engineer.",
      features: [
        "Software, library & plugin updates",
        "Weekly automated cloud security backups",
        "Hosting, domain, DNS & SSL maintenance",
        "Small content updates (text tweaks, banners, new items)",
        "24/7 uptime monitoring & monthly performance report",
      ],
      frontendPerks: [
        "Direct WhatsApp line to Anointed-Godswill (no middleman delay)",
        "Priority queue for bug fixes and UI adjustments",
        "Quarterly frontend code health review and SEO audit",
      ],
    },
  ],
};

const STORAGE_KEY = "wiliakonect_custom_config_v4";

export function loadCompanyConfig(): CompanyConfig {
  if (typeof window === "undefined") return defaultCompanyConfig;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultCompanyConfig;
    const parsed = JSON.parse(raw);
    return {
      ...defaultCompanyConfig,
      ...parsed,
      payments: { ...defaultCompanyConfig.payments, ...(parsed.payments || {}) },
      standardPackages: defaultCompanyConfig.standardPackages,
    };
  } catch (e) {
    console.error("Failed to load company config", e);
    return defaultCompanyConfig;
  }
}

export function saveCompanyConfig(config: CompanyConfig): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (e) {
    console.error("Failed to save company config", e);
  }
}

export function resetCompanyConfig(): CompanyConfig {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error("Failed to reset company config", e);
  }
  return defaultCompanyConfig;
}
