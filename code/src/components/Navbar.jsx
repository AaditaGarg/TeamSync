import React, { useState } from "react";
import {
  Sparkles,
  FolderKanban,
  Users,
  CheckSquare,
  MessageSquare,
  Bell,
  Plus,
  Menu,
  X,
  Home,
  Info,
} from "lucide-react";

const NAV_LINKS = [
  { key: "home", label: "Home", icon: Home },
  { key: "matchmaker", label: "Teammates", icon: Sparkles, badge: "Match" },
  { key: "projects", label: "Hackathons", icon: FolderKanban },
  { key: "squads", label: "Squads", icon: Users },
  { key: "tasks", label: "Kanban", icon: CheckSquare },
  { key: "chat", label: "Chat", icon: MessageSquare },
  { key: "about", label: "About", icon: Info },
];

export default function Navbar({
  view,
  setView,
  unreadCount,
  onOpenNewListing,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#070b12]/85 border-b border-white/[0.08] backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* ================= BRAND LOGO ================= */}
        <button
          onClick={() => setView("home")}
          className="flex items-center gap-3 text-left focus:outline-none group shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-400 via-teal-500 to-emerald-600 p-[1.5px] shadow-lg shadow-teal-500/20 group-hover:shadow-teal-500/35 transition-all">
            <div className="w-full h-full bg-[#070b12] rounded-[10px] flex items-center justify-center font-head font-extrabold text-white text-sm tracking-wider">
              TS
            </div>
          </div>
          <div className="leading-tight">
            <div className="flex items-center gap-1.5">
              <span className="font-head font-bold text-base text-white tracking-tight group-hover:text-teal-300 transition-colors">
                TeamSync
              </span>
              <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-teal-500/15 text-teal-300 border border-teal-500/30">
                v2.4
              </span>
            </div>
            <p className="text-[10px] font-mono text-slate-400 hidden sm:block">
              Hackathon Synergy Hub
            </p>
          </div>
        </button>

        {/* ================= CENTER FLOATING PILL DOCK ================= */}
        <nav className="hidden lg:flex items-center bg-[#0b1320]/80 p-1 rounded-full border border-white/[0.08] shadow-inner shadow-white/[0.02] backdrop-blur-md">
          {NAV_LINKS.map(({ key, label, icon: Icon, badge }) => {
            const active = view === key;
            return (
              <button
                key={key}
                onClick={() => setView(key)}
                className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 select-none ${
                  active
                    ? "bg-gradient-to-r from-teal-500/20 via-teal-500/15 to-teal-400/10 text-teal-300 border border-teal-500/40 shadow-[0_0_15px_rgba(20,184,166,0.2)] font-semibold"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]"
                }`}
              >
                <Icon
                  size={13}
                  className={`shrink-0 transition-colors ${
                    active ? "text-teal-300" : "text-slate-400"
                  }`}
                />
                <span>{label}</span>
                {badge && (
                  <span
                    className={`text-[8px] font-mono px-1 py-0.2 rounded-full uppercase tracking-wider font-bold ${
                      active
                        ? "bg-teal-400/20 text-teal-200 border border-teal-400/30"
                        : "bg-slate-800 text-slate-400 border border-white/5"
                    }`}
                  >
                    {badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* ================= RIGHT CONTROLS ================= */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Post Requirement Button */}
          <button
            onClick={onOpenNewListing}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-head font-bold bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-slate-950 shadow-md shadow-teal-500/20 hover:shadow-teal-500/35 border border-teal-300/30 transition-all active:scale-[0.98]"
          >
            <Plus size={13} strokeWidth={2.5} />
            <span className="whitespace-nowrap">Post Requirement</span>
          </button>

          {/* Notifications Bell */}
          <button
            onClick={() => setView("notifications")}
            className="relative w-9 h-9 rounded-full bg-slate-900/80 border border-white/10 text-slate-300 hover:text-white hover:border-teal-500/40 flex items-center justify-center transition-colors"
            title="Handshake Notifications"
          >
            <Bell size={15} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-teal-400 ring-2 ring-[#070b12] animate-pulse" />
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* ================= MOBILE EXPANDED MENU ================= */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0b1320] border-b border-white/10 px-4 py-4 space-y-1.5 animate-fadeIn">
          {NAV_LINKS.map(({ key, label, icon: Icon, badge }) => {
            const active = view === key;
            return (
              <button
                key={key}
                onClick={() => {
                  setView(key);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                  active
                    ? "bg-teal-500/20 text-teal-300 border border-teal-500/30 font-bold"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={15} className={active ? "text-teal-300" : "text-slate-400"} />
                  <span>{label}</span>
                </div>
                {badge && (
                  <span className="text-[8px] font-mono px-1.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300">
                    {badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 border-t border-white/10">
            <button
              onClick={() => {
                onOpenNewListing();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-head font-bold bg-teal-500 text-slate-950 shadow-md shadow-teal-500/25"
            >
              <Plus size={14} />
              <span>Post New Requirement</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
