import React from "react";
import {
  LayoutGrid,
  Sparkles,
  FolderKanban,
  Users2,
  CheckSquare,
  MessageSquare,
  Bell,
  ShieldCheck,
} from "lucide-react";
import { Avatar, GithubIcon } from "./ui";

const NAV_ITEMS = [
  { key: "overview", label: "Overview", icon: LayoutGrid, hint: "Telemetry & Stats" },
  { key: "matchmaker", label: "Matchmaker", icon: Sparkles, hint: "Heuristic Engine", badge: "Live" },
  { key: "projects", label: "Listings", icon: FolderKanban, hint: "Hackathon Openings" },
  { key: "squads", label: "Squads", icon: Users2, hint: "Active Workspaces" },
  { key: "tasks", label: "Sprint Kanban", icon: CheckSquare, hint: "Task Execution" },
  { key: "chat", label: "Squad Chat", icon: MessageSquare, hint: "Live Coordination" },
  { key: "notifications", label: "Handshakes", icon: Bell, hint: "Connection Protocol" },
];

export default function Sidebar({ view, setView, unreadCount, currentUser, mobileOpen, setMobileOpen }) {
  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-40 w-64 flex flex-col bg-[#0b121e] border-r border-white/[0.08] transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 via-teal-500 to-emerald-600 p-0.5 shadow-lg shadow-teal-500/20">
              <div className="w-full h-full bg-[#0b121e] rounded-[10px] flex items-center justify-center font-head font-extrabold text-white text-base tracking-wider">
                TS
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-head font-bold text-base text-white tracking-tight">TeamSync</span>
                <span className="text-[9px] font-mono font-semibold px-1.5 py-0.2 rounded bg-teal-500/15 text-teal-300 border border-teal-500/30">
                  v2.4
                </span>
              </div>
              <p className="text-[10px] font-mono text-slate-400">Teammate Synergy Hub</p>
            </div>
          </div>
        </div>

        {/* Institution Verified Banner */}
        <div className="mx-4 mt-3 px-3 py-2 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center gap-2">
          <ShieldCheck size={14} className="text-teal-400 shrink-0" />
          <div className="min-w-0 flex-1">
            <div className="text-[11px] font-semibold text-teal-200 truncate">Thapar Institute Verified</div>
            <div className="text-[10px] text-teal-400/80 font-mono truncate">@thapar.edu Domain Auth</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scroll-quiet">
          <div className="px-3 pb-1.5 text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-widest">
            Core Platform
          </div>

          {NAV_ITEMS.map(({ key, label, icon: Icon, badge }) => {
            const active = view === key;
            return (
              <button
                key={key}
                onClick={() => {
                  setView(key);
                  setMobileOpen(false);
                }}
                className={`w-full group relative flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  active
                    ? "bg-gradient-to-r from-teal-500/20 to-teal-500/5 text-white border border-teal-500/40 shadow-sm"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-1 rounded-lg transition-colors ${
                      active
                        ? "text-teal-400 bg-teal-500/20"
                        : "text-slate-400 group-hover:text-slate-200 group-hover:bg-white/5"
                    }`}
                  >
                    <Icon size={16} />
                  </div>
                  <span>{label}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {badge && (
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-teal-400/20 text-teal-300 font-bold border border-teal-400/30">
                      {badge}
                    </span>
                  )}
                  {key === "notifications" && unreadCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-teal-500 text-slate-950 font-bold text-[10px] flex items-center justify-center shadow-sm">
                      {unreadCount}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </nav>

        {/* Current User Profile Widget */}
        <div className="p-3 border-t border-white/[0.08] bg-[#070b12]/60">
          <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-3">
            <Avatar user={currentUser} size={36} showVerified={true} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white truncate">{currentUser.name}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" title="Online" />
              </div>
              <div className="text-[10px] text-slate-400 truncate">{currentUser.role}</div>
              <div className="flex items-center gap-1.5 mt-1 text-[10px] font-mono text-teal-400">
                <GithubIcon size={11} />
                <span className="truncate">@{currentUser.github.username}</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
