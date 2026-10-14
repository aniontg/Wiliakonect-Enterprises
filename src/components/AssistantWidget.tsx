import React, { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  ExternalLink,
  ArrowUpRight,
  Phone,
} from "lucide-react";
import { CompanyConfig } from "../data/companyData";

interface AssistantWidgetProps {
  config: CompanyConfig;
  onNavigate: (tab: string) => void;
  onOpenCustomizer: () => void;
}

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  action?: {
    label: string;
    actionType: "tab" | "whatsapp" | "customizer";
    target?: string;
  };
}

export const AssistantWidget: React.FC<AssistantWidgetProps> = ({
  config,
  onNavigate,
  onOpenCustomizer,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: `Hello! I'm the Wiliakonect digital assistant. Ask me about our custom web design, business tools, IT support, or try our live website builder!`,
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const quickQuestions = [
    "What services do you offer?",
    "How much does a website cost?",
    "How does the Website Builder work?",
    "How do I modify this website?",
    "Can I speak with Anointed-Godswill directly?",
  ];

  const handleSend = (userText: string) => {
    if (!userText.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: userText,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Generate smart context-aware answer
    setTimeout(() => {
      const q = userText.toLowerCase();
      let reply: Message;

      if (q.includes("service") || q.includes("what do you do") || q.includes("offer")) {
        reply = {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: "Wiliakonect provides 3 core services: 1) High-converting responsive websites, 2) Tailored software systems & portals, and 3) 24/7 IT maintenance & cybersecurity.",
          action: {
            label: "Explore All Services",
            actionType: "tab",
            target: "services",
          },
        };
      } else if (q.includes("cost") || q.includes("price") || q.includes("how much") || q.includes("rate") || q.includes("package")) {
        reply = {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: "As a dedicated frontend developer, Anointed-Godswill offers standard market-penetration pricing:\n• Basic Landing Page (1-5 pages): From ₦75,000 (Market: ₦150k–₦400k)\n• Standard Corporate Website: From ₦210,000 (Market: ₦450k+)\n• E-Commerce Store: From ₦320,000 (Market: ₦600k+)\n• Custom React MVP App: From ₦650,000 (Market: ₦1.5M+)\n• Monthly Care & Maintenance: From ₦25,000/mo (Market: ₦30k–₦150k)\nDirect engineering with zero agency middleman markups!",
          action: {
            label: "View All Standard Packages",
            actionType: "tab",
            target: "services",
          },
        };
      } else if (q.includes("builder") || q.includes("make") || q.includes("template") || q.includes("cms")) {
        reply = {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: "Our Wiliakonect CMS Website Builder includes an AI generator powered by Gemini, block visual editing, and full Pro extensions!",
          action: {
            label: "Launch Wiliakonect CMS",
            actionType: "tab",
            target: "cms",
          },
        };
      } else if (q.includes("modify") || q.includes("edit") || q.includes("change")) {
        reply = {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: "You can modify this entire website anytime! Click 'Modify Site' in the top bar to update phone numbers, WhatsApp, emails, services, pricing, and company story in real time.",
          action: {
            label: "Open Live Site Modifier",
            actionType: "customizer",
          },
        };
      } else if (q.includes("founder") || q.includes("anointed") || q.includes("godswill") || q.includes("talk") || q.includes("whatsapp") || q.includes("contact") || q.includes("call")) {
        reply = {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: `You can reach founder Anointed-Godswill C C-E directly on WhatsApp at +234 911 463 8331 or call ${config.phonePrimary}. He is ready to discuss your project!`,
          action: {
            label: "Message on WhatsApp",
            actionType: "whatsapp",
          },
        };
      } else {
        reply = {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: `Thanks for asking! We're here to help bring your digital vision to life. Would you like to speak directly with Anointed-Godswill or submit a project brief?`,
          action: {
            label: "Contact Team Directly",
            actionType: "tab",
            target: "contact",
          },
        };
      }

      setMessages((prev) => [...prev, reply]);
    }, 400);
  };

  const handleActionClick = (action: NonNullable<Message["action"]>) => {
    if (action.actionType === "tab" && action.target) {
      onNavigate(action.target);
      setIsOpen(false);
    } else if (action.actionType === "customizer") {
      onOpenCustomizer();
      setIsOpen(false);
    } else if (action.actionType === "whatsapp") {
      window.open(
        `https://wa.me/${config.whatsappNumber}?text=Hello%20Wiliakonect!%20I'm%20chatting%20with%20your%20site%20assistant%20and%20wanted%20to%20connect.`,
        "_blank"
      );
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-[#38208f] to-[#251368] text-white rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer border-2 border-white/20 group"
          aria-label="Open assistant"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5 text-[#f2a20a]" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#38208f] animate-ping" />
          </div>
          <span className="text-xs font-bold tracking-wide hidden sm:inline">
            Questions? Chat with Us
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-[92vw] sm:w-[380px] h-[520px] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#38208f] to-[#251368] p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#f2a20a] text-[#171520] flex items-center justify-center font-bold text-xs">
                W
              </div>
              <div>
                <h4 className="text-sm font-bold flex items-center gap-1.5">
                  <span>Wiliakonect Concierge</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#f2a20a]" />
                </h4>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-300 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online · Lagos, Nigeria & Remote</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-white/70 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/70">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`p-3 rounded-2xl text-xs max-w-[85%] leading-relaxed ${
                    m.sender === "user"
                      ? "bg-[#38208f] text-white rounded-br-none shadow-xs"
                      : "bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-xs"
                  }`}
                >
                  {m.text}
                </div>

                {m.action && (
                  <button
                    onClick={() => handleActionClick(m.action!)}
                    className="mt-2 text-xs font-bold px-3 py-1.5 bg-[#f4f0fd] text-[#38208f] hover:bg-[#eae3fc] border border-[#38208f]/20 rounded-xl flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
                  >
                    <span>{m.action.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#f2a20a]" />
                  </button>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="p-2 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto scrollbar-none">
            {quickQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSend(q)}
                className="px-2.5 py-1 text-[11px] font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-full whitespace-nowrap cursor-pointer transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend(input);
              }}
              className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#38208f]"
            />
            <button
              onClick={() => handleSend(input)}
              className="p-2 bg-[#38208f] hover:bg-[#251368] text-white rounded-xl transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4 text-[#f2a20a]" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
