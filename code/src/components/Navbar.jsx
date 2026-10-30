import React, { useState } from "react";
import {
  Sparkles,
  FolderKanban,
  Users2,
  CheckSquare,
  MessageSquare,
  Bell,
  Plus,
  Menu,
  X,
  ShieldCheck,
  Home,
  Info,
} from "lucide-react";
import { Button, Avatar } from "./ui";

const NAV_LINKS = [
  { key: "home", label: "Home", icon: Home },
  { key: "matchmaker", label: "Find Teammates", icon: Sparkles, badge: "AI" },
  { key: "projects", label: "Hackathons", icon: FolderKanban },
  { key: "squads", label: "Squad Workspaces", icon: Users2 },
  { key: "tasks", label: "Sprint Kanban", icon: CheckSquare },
  { key: "chat", label: "Squad Chat", icon: MessageSquare },
  { key: "about", label: "About Team", icon: Info },
];

export default function Navbar({
  view,
  setView,
  unreadCount,
  currentUser,
  onOpenNewListing,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#070b12]/90 border-b border-white/[0.08] backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button
          onClick={() => setView("home")}
          className="flex items-center gap-3 text-left focus:outline-none group shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 via-teal-500 to-emerald-600 p-0.5 shadow-lg shadow-teal-500/20 group-hover:shadow-teal-500/35 transition-all">
            <div className="w-full h-full bg-[#070b12] rounded-[10px] flex items-center justify-center font-head font-extrabold text-white text-base tracking-wider">
              TS
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-head font-bold text-base sm:text-lg text-white tracking-tight group-hover:text-teal-300 transition-colors">
                TeamSync
              </span>
              <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-teal-500/15 text-teal-300 border border-teal-500/30">
                v2.4
              </span>
            </div>
            <p className="text-[10px] font-mono text-slate-400 -mt-0.5 hidden sm:block">
              Hackathon Teammate Synergy Hub
            </p>
          </div>
        </button>

        {/* Center Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-2xl border border-white/[0.06]">
          {NAV_LINKS.map(({ key, label, icon: Icon, badge }) => {
            const active = view === key;
            return (
              <button
                key={key}
                onClick={() => setView(key)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                  active
                    ? "bg-teal-500 text-slate-950 font-bold shadow-md shadow-teal-500/20"
                    : "text-slate-300 hover:text-white hover:bg-white/[0.05]"
                }`}
              >
                <Icon size={14} className={active ? "text-slate-950" : "text-slate-400"} />
                <span>{label}</span>
                {badge && (
                  <span
                    className={`text-[9px] font-mono px-1 rounded ${
                      active ? "bg-slate-950/20 text-slate-950 font-bold" : "bg-teal-500/20 text-teal-300"
                    }`}
                  >
                    {badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Post Requirement Button */}
          <Button
            variant="primary"
            size="sm"
            onClick={onOpenNewListing}
            className="hidden sm:flex shadow-md shadow-teal-500/20"
          >
            <Plus size={14} />
            <span>Post Requirement</span>
          </Button>

          {/* Notifications Bell */}
          <button
            onClick={() => setView("notifications")}
            className="relative p-2 rounded-xl bg-slate-900/80 border border-white/10 text-slate-300 hover:text-white hover:border-teal-500/40 transition-colors"
            title="Handshake Notifications"
          >
            <Bell size={16} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-teal-400 text-slate-950 font-bold text-[9px] flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* User Profile Pill */}
          <div className="hidden md:flex items-center gap-2.5 pl-2 border-l border-white/10">
            <Avatar user={currentUser} size={34} showVerified={true} />
            <div className="text-left leading-tight hidden lg:block">
              <span className="text-xs font-bold text-white block">{currentUser.name}</span>
              <span className="text-[10px] text-teal-300 font-mono flex items-center gap-1">
                <ShieldCheck size={10} />
                <span>@thapar.edu</span>
              </span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0b121e] border-b border-white/10 px-4 py-4 space-y-2 animate-fadeIn">
          {NAV_LINKS.map(({ key, label, icon: Icon }) => {
            const active = view === key;
            return (
              <button
                key={key}
                onClick={() => {
                  setView(key);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold ${
                  active
                    ? "bg-teal-500 text-slate-950 font-bold"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={16} />
                  <span>{label}</span>
                </div>
                {key === "notifications" && unreadCount > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-slate-950 text-white font-bold text-[10px]">
                    {unreadCount}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-2 border-t border-white/10">
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                onOpenNewListing();
                setMobileMenuOpen(false);
              }}
              className="w-full"
            >
              <Plus size={14} />
              <span>Post New Requirement</span>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
