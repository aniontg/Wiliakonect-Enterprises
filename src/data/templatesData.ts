export interface TemplateSection {
  title: string;
  subtitle: string;
  content: string;
  iconName: string;
}

export interface WebsiteTemplate {
  id: string;
  category: string;
  brand: string;
  tagline: string;
  eyebrow: string;
  headline: string;
  description: string;
  cta: string;
  theme: {
    bg: string;
    cardBg: string;
    text: string;
    primary: string;
    accent: string;
    fontFamily: string;
  };
  sections: TemplateSection[];
  testimonials: { quote: string; author: string; role: string }[];
  contactEmail: string;
  contactPhone: string;
}

export const websiteTemplatesList: WebsiteTemplate[] = [
  {
    id: "local-business",
    category: "Local Business & Services",
    brand: "GOOD NEIGHBOUR",
    tagline: "Dependable neighborhood services with care",
    eyebrow: "A LITTLE CLOSER TO HOME",
    headline: "Good work, done with personal care.",
    description:
      "A thoughtful local team helping its neighbours with dependable craft, personal attention, and a little extra care on every job.",
    cta: "SAY HELLO",
    theme: {
      bg: "#faf8f5",
      cardBg: "#ffffff",
      text: "#1c1917",
      primary: "#292524",
      accent: "#f59e0b",
      fontFamily: "'DM Sans', sans-serif",
    },
    sections: [
      {
        title: "Here to Help",
        subtitle: "Rooted in our community",
        content: "Friendly, dependable service shaped around the people and places in our area. No automated robots, just real people.",
        iconName: "HeartHandshake",
      },
      {
        title: "Made to Feel Easy",
        subtitle: "Transparent pricing & timing",
        content: "From the first inquiry to the completed project, we keep things clear, straightforward, and honest.",
        iconName: "CheckCircle2",
      },
      {
        title: "Around the Corner",
        subtitle: "Fast response time",
        content: "Whether you need routine maintenance or a prompt consultation, our team is always within reach.",
        iconName: "MapPin",
      },
    ],
    testimonials: [
      {
        quote: "They arrived on time, explained everything clearly, and did exceptional work. Highly recommend to anyone in our area!",
        author: "Adeola Balogun",
        role: "Homeowner",
      },
    ],
    contactEmail: "hello@goodneighbour.com",
    contactPhone: "+234 802 345 6789",
  },
  {
    id: "creative-portfolio",
    category: "Creative Portfolio & Agency",
    brand: "STUDIO FORMS",
    tagline: "Design, direction & digital experiences",
    eyebrow: "INDEPENDENT CREATIVE PRACTICE",
    headline: "Distinct ideas with room to breathe.",
    description:
      "A focused creative studio bringing bold concepts to life through sharp brand strategy, expressive typography, and refined digital craft.",
    cta: "VIEW SELECTED WORK",
    theme: {
      bg: "#0c0d12",
      cardBg: "#171923",
      text: "#f8fafc",
      primary: "#8b5cf6",
      accent: "#38bdf8",
      fontFamily: "'Manrope', sans-serif",
    },
    sections: [
      {
        title: "Brand Architecture",
        subtitle: "Visual identities that resonate",
        content: "Logos, type systems, color worlds, and art direction built to stand out in crowded cultural and commercial spaces.",
        iconName: "Sparkles",
      },
      {
        title: "Digital Experiences",
        subtitle: "Websites that feel alive",
        content: "Fluid motion, micro-interactions, and bespoke UI built on modern web stacks with speed and longevity in mind.",
        iconName: "Layers",
      },
      {
        title: "Creative Strategy",
        subtitle: "Form guided by purpose",
        content: "We question assumptions, uncover your authentic brand angle, and turn ambition into tangible digital artifacts.",
        iconName: "Compass",
      },
    ],
    testimonials: [
      {
        quote: "Studio Forms completely transformed our company's market perception. Our client inquiries tripled in the first month.",
        author: "Marcus Chen",
        role: "Creative Director, Vektor",
      },
    ],
    contactEmail: "inquiries@studioforms.design",
    contactPhone: "+1 (415) 890-4412",
  },
  {
    id: "restaurant-cafe",
    category: "Restaurant & Café",
    brand: "THE OLIVE TABLE",
    tagline: "Artisanal bakery & seasonal kitchen",
    eyebrow: "SEASONAL PLATES · WARM HEARTH",
    headline: "Come hungry. Leave delighted.",
    description:
      "A neighborhood dining room for slow mornings, fragrant sourdough, bright seasonal produce, and evenings that are always better shared.",
    cta: "RESERVE A TABLE",
    theme: {
      bg: "#fdfbf7",
      cardBg: "#ffffff",
      text: "#292524",
      primary: "#15803d",
      accent: "#d97706",
      fontFamily: "'DM Sans', serif",
    },
    sections: [
      {
        title: "From the Hearth",
        subtitle: "Farm-to-table culinary focus",
        content: "Wood-fired crusts, fresh morning pastries, and handcrafted pastas created with organic regional ingredients.",
        iconName: "Utensils",
      },
      {
        title: "Gather Around",
        subtitle: "Cozy spaces for all moments",
        content: "From private dinner parties to midday espresso breaks, our dining room and leafy patio welcome your presence.",
        iconName: "Coffee",
      },
      {
        title: "Private Events",
        subtitle: "Celebrations & gatherings",
        content: "Host birthdays, rehearsal dinners, or corporate mixers with tailored tasting menus and sommelier pairings.",
        iconName: "Wine",
      },
    ],
    testimonials: [
      {
        quote: "The truffle rigatoni and crusty sourdough are unrivaled. It feels like eating at the home of your coolest Italian friend.",
        author: "Elena Rostova",
        role: "Food & Wine Critic",
      },
    ],
    contactEmail: "reservations@theolivetable.com",
    contactPhone: "+234 901 882 1190",
  },
  {
    id: "tech-saas",
    category: "Tech & Software",
    brand: "VELOCISYNC",
    tagline: "Intelligent workflow automation for scale",
    eyebrow: "NEXT-GEN CLOUD PLATFORM",
    headline: "Build faster. Automate everything.",
    description:
      "Unify your engineering pipelines, CRM sync, and automated billing in one single lightning-fast dashboard built for high-growth tech teams.",
    cta: "START FREE TRIAL",
    theme: {
      bg: "#09090b",
      cardBg: "#18181b",
      text: "#fafafa",
      primary: "#6366f1",
      accent: "#22c55e",
      fontFamily: "'Manrope', sans-serif",
    },
    sections: [
      {
        title: "Zero-Latency Sync",
        subtitle: "Sub-millisecond data pipelines",
        content: "Bi-directional event streaming across all your databases, APIs, and cloud services with enterprise-grade fault tolerance.",
        iconName: "Zap",
      },
      {
        title: "SOC-2 Certified",
        subtitle: "End-to-end encrypted architecture",
        content: "Bank-level encryption at rest and in transit, automatic compliance reporting, and granular role-based permissions.",
        iconName: "ShieldCheck",
      },
      {
        title: "Developer First",
        subtitle: "Extensible SDKs in 8 languages",
        content: "Integrate in minutes with intuitive REST & GraphQL APIs, comprehensive webhooks, and automatic TypeScript types.",
        iconName: "Code2",
      },
    ],
    testimonials: [
      {
        quote: "VelociSync replaced 4 disparate SaaS tools and shaved 20 hours of manual data sync every week across our dev team.",
        author: "Devon Reed",
        role: "Head of Infrastructure, StreamLine",
      },
    ],
    contactEmail: "sales@velocisync.io",
    contactPhone: "+1 (800) 459-0291",
  },
  {
    id: "beauty-skincare",
    category: "Beauty & Wellness",
    brand: "SOFT FORM STUDIO",
    tagline: "Holistic aesthetics & restorative skin rituals",
    eyebrow: "A MOMENT, JUST FOR YOU",
    headline: "Feel truly radiant in your own skin.",
    description:
      "A serene aesthetic sanctuary offering mindful facial treatments, clean botanical formulations, and restorative self-care rituals.",
    cta: "BOOK AN APPOINTMENT",
    theme: {
      bg: "#faf5f5",
      cardBg: "#ffffff",
      text: "#3f3f46",
      primary: "#be185d",
      accent: "#fb7185",
      fontFamily: "'DM Sans', sans-serif",
    },
    sections: [
      {
        title: "Customized Facials",
        subtitle: "Skin analysis & treatment",
        content: "Every skin condition is unique. We evaluate your moisture barrier and sculpt tailored treatments for instant glow.",
        iconName: "Sparkles",
      },
      {
        title: "Clean Formulations",
        subtitle: "Cruelty-free botanical actives",
        content: "Free of harsh sulfates, synthetic fragrances, and fillers. Only clinically backed nutrients that feed your skin.",
        iconName: "Leaf",
      },
      {
        title: "Mindful Reset",
        subtitle: "Decompress and rejuvenate",
        content: "Step out of the city buzz into warm towels, calming aromatherapy, and lymphatic drainage massage.",
        iconName: "SunMedium",
      },
    ],
    testimonials: [
      {
        quote: "My skin has never looked healthier. The studio atmosphere is heaven on earth after a stressful work week.",
        author: "Zainab Al-Mansoor",
        role: "Loyal Client",
      },
    ],
    contactEmail: "hello@softformstudio.com",
    contactPhone: "+234 813 992 4001",
  },
  {
    id: "consulting-firm",
    category: "Legal & Consulting",
    brand: "APEX PARTNERS",
    tagline: "Strategic advisory for emerging markets",
    eyebrow: "TRUSTED CORPORATE COUNSEL",
    headline: "Clarity in complexity. Results in practice.",
    description:
      "Guiding ambitious enterprises and family offices through commercial expansion, regulatory compliance, mergers, and sustainable growth.",
    cta: "SCHEDULE CONSULTATION",
    theme: {
      bg: "#0f172a",
      cardBg: "#1e293b",
      text: "#f8fafc",
      primary: "#0ea5e9",
      accent: "#f59e0b",
      fontFamily: "'Manrope', sans-serif",
    },
    sections: [
      {
        title: "Cross-Border Transactions",
        subtitle: "International deal structuring",
        content: "Navigating foreign direct investment, currency regulations, and multi-jurisdictional contracts with surgical rigor.",
        iconName: "Globe2",
      },
      {
        title: "Risk & Governance",
        subtitle: "Bulletproof corporate compliance",
        content: "Auditing internal controls, executive liability, tax positioning, and statutory mandates to safeguard your equity.",
        iconName: "Scale",
      },
      {
        title: "Capital Strategy",
        subtitle: "Debt & equity optimization",
        content: "Connecting mid-cap companies with strategic institutional financiers, venture syndicates, and public bond markets.",
        iconName: "TrendingUp",
      },
    ],
    testimonials: [
      {
        quote: "Apex Partners was instrumental in guiding our Series B expansion across 3 African markets. Invaluable partners.",
        author: "Chukwudi Nnamdi",
        role: "Managing Director, Helios Global",
      },
    ],
    contactEmail: "advisory@apexpartners.co",
    contactPhone: "+234 1 290 8820",
  },
];
