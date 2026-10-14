import React, { useState, useEffect } from "react";
import {
  FolderPlus,
  ExternalLink,
  Code2,
  Trash2,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  FileText,
  SlidersHorizontal,
  ChevronRight,
} from "lucide-react";
import { CompanyConfig } from "../data/companyData";

interface DashboardPageProps {
  config: CompanyConfig;
  onOpenBuilder: () => void;
  onOpenCustomizer: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  config,
  onOpenBuilder,
  onOpenCustomizer,
}) => {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("wiliakonect_saved_projects") || "[]");
      if (saved.length === 0) {
        // Seed default initial mock projects for a realistic client dashboard
        const initial = [
          {
            id: "proj-1",
            name: "Good Neighbour Local Hub",
            template: "Local Business & Services",
            updatedAt: "Today, 10:15 AM",
            status: "In Development",
            primaryColor: "#292524",
            headline: "Good work, done with personal care.",
          },
          {
            id: "proj-2",
            name: "Apex Global Advisors Portal",
            template: "Legal & Consulting",
            updatedAt: "Yesterday",
            status: "Review & QA",
            primaryColor: "#0ea5e9",
            headline: "Clarity in complexity. Results in practice.",
          },
        ];
        setProjects(initial);
        localStorage.setItem("wiliakonect_saved_projects", JSON.stringify(initial));
      } else {
        setProjects(saved);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleDeleteProject = (id: string) => {
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    localStorage.setItem("wiliakonect_saved_projects", JSON.stringify(updated));
  };

  return (
    <div className="py-10 bg-[#faf9fc] min-h-[calc(100vh-80px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-[#38208f] to-[#251368] text-white p-8 rounded-3xl shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#f2a20a] uppercase tracking-wider">
              CLIENT WORKSPACE & ENGINE
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Welcome to your Wiliakonect Portal.
            </h1>
            <p className="text-sm text-white/80 max-w-xl">
              Track active project blueprints, launch website drafts, manage support requests, and customize your digital footprint.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenBuilder}
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-[#171520] bg-[#f2a20a] hover:bg-[#df9304] transition-all shadow-md cursor-pointer"
            >
              <FolderPlus className="w-4 h-4" />
              <span>New Site Blueprint</span>
            </button>
            <button
              onClick={onOpenCustomizer}
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Modify Settings</span>
            </button>
          </div>
        </div>

        {/* Dashboard Metrics / Quick Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-[#38208f] flex items-center justify-center font-black text-xl">
              {projects.length}
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500">Saved Blueprints</span>
              <h3 className="text-lg font-bold text-[#171520]">Active Drafts</h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500">Service Status</span>
              <h3 className="text-lg font-bold text-[#171520]">All Systems Optimal</h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-500">Dedicated Support</span>
              <h3 className="text-lg font-bold text-[#171520]">Priority 24/7 Desk</h3>
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-bold text-[#171520]">Your Website Projects</h2>
              <p className="text-xs text-slate-500">
                Created using the Wiliakonect Website Engine
              </p>
            </div>
            <button
              onClick={onOpenBuilder}
              className="text-xs font-bold text-[#38208f] hover:underline flex items-center gap-1"
            >
              <span>Open Website Builder</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {projects.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <Code2 className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold text-slate-600">No saved projects yet</p>
              <button
                onClick={onOpenBuilder}
                className="px-4 py-2 text-xs font-bold text-white bg-[#38208f] rounded-xl"
              >
                Create your first project
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-[#38208f]/30 transition-all space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      {proj.template}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#38208f]/10 text-[#38208f]">
                      {proj.status || "Draft"}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-[#171520]">{proj.name}</h3>
                  <p className="text-xs text-slate-500 italic line-clamp-1">"{proj.headline}"</p>

                  <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-400">Updated: {proj.updatedAt}</span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={onOpenBuilder}
                        className="p-1.5 rounded-lg text-[#38208f] hover:bg-[#38208f]/10 transition-colors"
                        title="Edit in builder"
                      >
                        <SlidersHorizontal className="w-4 h-4" />
                      </button>

                      <a
                        href={`https://wa.me/${config.whatsappNumber}?text=Hello%20Wiliakonect!%20I'm%20working%20on%20my%20dashboard%20project%20"${encodeURIComponent(
                          proj.name
                        )}"%20and%20want%20to%20deploy%20it.`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg text-[#15803d] hover:bg-emerald-50 transition-colors"
                        title="Deploy with Wiliakonect"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </a>

                      <button
                        onClick={() => handleDeleteProject(proj.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 transition-colors"
                        title="Delete project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Support Inbox & Direct Assistance */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-bold text-[#171520]">Technical Support & Helpdesk</h2>
              <p className="text-xs text-slate-500">
                Fast turnarounds on bug fixes, domain linkings, SSL renewals, or software questions
              </p>
            </div>
            <a
              href={`https://wa.me/${config.whatsappNumber}?text=Hello%20Wiliakonect%20Support!%20I%20have%20an%20urgent%20technical%20question.`}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-[#15803d] hover:bg-[#166534] flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Live Emergency Chat</span>
            </a>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-4">
            <div className="p-2 bg-[#38208f]/10 text-[#38208f] rounded-lg mt-0.5">
              <FileText className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-sm text-[#171520]">Need custom modifications to your website?</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Click the <strong>"Modify Site"</strong> button in the navigation bar to alter your headline, phone numbers, WhatsApp, and service rates right now. If you require deep code refactoring, Anointed-Godswill C C-E and the engineering team are always on standby!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
