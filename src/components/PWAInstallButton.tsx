import React, { useState } from "react";
import { Download, Smartphone, X, Check, Share2, PlusSquare } from "lucide-react";
import { usePWAInstall } from "../hooks/usePWAInstall";

interface PWAInstallButtonProps {
  variant?: "navbar" | "banner" | "button";
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ variant = "navbar" }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [installedSuccess, setInstalledSuccess] = useState(false);

  // If already installed and running standalone, do not show prompt
  if (isInstalled) {
    return null;
  }

  const handleInstallClick = async () => {
    const success = await install();
    if (success) {
      setInstalledSuccess(true);
      setTimeout(() => setInstalledSuccess(false), 3000);
    }
  };

  // If Chromium/Android/Desktop install prompt is available
  if (isInstallable) {
    if (variant === "banner") {
      return (
        <div className="bg-gradient-to-r from-[#27146b] to-[#38208f] text-white px-4 py-2.5 flex items-center justify-between text-xs border-b border-purple-900/40">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-[#f2a20a]" />
            <span>Install Wiliakonect as a fast standalone Web App on your phone or desktop.</span>
          </div>
          <button
            onClick={handleInstallClick}
            className="px-3 py-1 bg-[#f2a20a] hover:bg-[#d98f06] text-[#171520] font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Install Web App</span>
          </button>
        </div>
      );
    }

    return (
      <button
        onClick={handleInstallClick}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-full bg-[#38208f]/10 hover:bg-[#38208f]/20 text-[#38208f] transition-all cursor-pointer border border-[#38208f]/20"
        title="Install Wiliakonect Web App"
      >
        <Download className="w-3.5 h-3.5 text-[#f2a20a]" />
        <span>{installedSuccess ? "Installed!" : "Install App"}</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-full bg-[#38208f]/10 hover:bg-[#38208f]/20 text-[#38208f] transition-all cursor-pointer border border-[#38208f]/20"
          title="Install Wiliakonect on iOS"
        >
          <Smartphone className="w-3.5 h-3.5 text-[#f2a20a]" />
          <span>Install App</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
            <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 text-[#171520] relative">
              <button
                onClick={() => setShowIOSGuide(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-12 h-12 rounded-xl bg-[#38208f] flex items-center justify-center text-white mb-4">
                <Smartphone className="w-6 h-6 text-[#f2a20a]" />
              </div>

              <h3 className="font-extrabold text-base text-slate-900 mb-2">
                Install Wiliakonect on iPhone / iPad
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Enjoy full-screen web app experience, faster performance, and offline caching without the App Store:
              </p>

              <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center shrink-0 text-[10px]">
                    1
                  </div>
                  <div>
                    Tap the <strong className="text-slate-900">Share</strong> icon <Share2 className="w-3.5 h-3.5 inline text-blue-600" /> at the bottom of Safari.
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center shrink-0 text-[10px]">
                    2
                  </div>
                  <div>
                    Scroll down and tap <strong className="text-slate-900">Add to Home Screen</strong> <PlusSquare className="w-3.5 h-3.5 inline text-slate-700" />.
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center shrink-0 text-[10px]">
                    3
                  </div>
                  <div>
                    Tap <strong className="text-slate-900">Add</strong> in the top right corner.
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="w-full mt-5 py-2.5 bg-[#38208f] text-white font-bold text-xs rounded-xl hover:bg-[#27146b] transition-all cursor-pointer"
              >
                Got It
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  const [showDesktopGuide, setShowDesktopGuide] = useState(false);

  // Fallback button for desktop browsers if beforeinstallprompt is ambient or already triggered
  return (
    <>
      <button
        onClick={() => setShowDesktopGuide(true)}
        className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-full bg-[#38208f]/5 hover:bg-[#38208f]/10 text-[#38208f] transition-all cursor-pointer border border-[#38208f]/15"
        title="Install Web App"
      >
        <Download className="w-3.5 h-3.5 text-[#f2a20a]" />
        <span>Install App</span>
      </button>

      {showDesktopGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 text-[#171520] relative">
            <button
              onClick={() => setShowDesktopGuide(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-12 h-12 rounded-xl bg-[#38208f] flex items-center justify-center text-white mb-4">
              <Download className="w-6 h-6 text-[#f2a20a]" />
            </div>
            <h3 className="font-extrabold text-base text-slate-900 mb-2">
              Install Wiliakonect Web App
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Click the <strong>Install</strong> icon in your browser URL bar (top right on Chrome/Edge), or choose <strong>Menu &gt; Install Wiliakonect</strong> to launch as a standalone desktop app.
            </p>
            <button
              onClick={() => setShowDesktopGuide(false)}
              className="w-full py-2.5 bg-[#38208f] text-white font-bold text-xs rounded-xl hover:bg-[#27146b] transition-all cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
