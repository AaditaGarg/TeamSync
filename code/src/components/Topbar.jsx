import React from "react";
import { Search, Bell, Sparkles, Plus, Menu } from "lucide-react";
import { Button } from "./ui";

const VIEW_METADATA = {
  overview: {
    title: "System Overview",
    subtitle: "Real-time hackathon telemetry, metrics & active sprint status",
  },
  matchmaker: {
    title: "Teammate Synergy Engine",
    subtitle: "Heuristic skill-matching S(u, L) across verified institutional candidates",
  },
  projects: {
    title: "Hackathon Requirement Listings",
    subtitle: "Browse open squad roles or publish technical requirements",
  },
  squads: {
    title: "Active Squad Workspaces",
    subtitle: "Post-formation collaborative hubs with milestone tracking",
  },
  tasks: {
    title: "Sprint Kanban Board",
    subtitle: "Coordinate deliverables, PRs, and critical hackathon sprint tasks",
  },
  chat: {
    title: "Squad In-App Messaging",
    subtitle: "Private coordination channel for verified teammates",
  },
  notifications: {
    title: "Two-Way Handshakes & Alerts",
    subtitle: "Mutual connection protocol and institutional event logs",
  },
};

export default function Topbar({
  view,
  query,
  setQuery,
  unreadCount,
  setView,
  onOpenNewListing,
  onOpenNewTask,
  setMobileOpen,
}) {
  const meta = VIEW_METADATA[view] || VIEW_METADATA.overview;

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#0b121e]/90 border-b border-white/[0.08] backdrop-blur-md px-4 sm:px-6 flex items-center justify-between gap-4">
      {/* Left Title & Mobile Hamburger */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5"
          aria-label="Open Navigation Menu"
        >
          <Menu size={20} />
        </button>

        <div className="min-w-0">
          <h1 className="font-head text-base sm:text-lg font-bold text-white tracking-tight truncate flex items-center gap-2">
            <span>{meta.title}</span>
          </h1>
          <p className="text-[11px] text-slate-400 font-normal truncate hidden sm:block">
            {meta.subtitle}
          </p>
        </div>
      </div>

      {/* Right Controls: Search, Quick Actions, Notifications */}
      <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
        {/* Search */}
        <div className="relative hidden md:block w-48 lg:w-64">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search skills, names, tech..."
            className="w-full bg-[#070b12] border border-white/10 rounded-xl py-1.5 pl-9 pr-3 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/30 transition-all font-mono"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>

        {/* Dynamic Context Action Buttons */}
        {view === "tasks" ? (
          <Button variant="primary" size="sm" onClick={onOpenNewTask}>
            <Plus size={14} />
            <span className="hidden sm:inline">Add Task</span>
          </Button>
        ) : (
          <Button variant="secondary" size="sm" onClick={onOpenNewListing}>
            <Plus size={14} />
            <span className="hidden sm:inline">Post Requirement</span>
          </Button>
        )}

        {view !== "matchmaker" && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setView("matchmaker")}
            className="border-teal-500/30 text-teal-300 hidden xl:flex"
          >
            <Sparkles size={13} className="text-teal-400" />
            <span>Find Teammates</span>
          </Button>
        )}

        {/* Notifications Icon Button */}
        <button
          onClick={() => setView("notifications")}
          className="relative p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white hover:border-teal-500/40 transition-colors"
          title="Two-Way Handshake Notifications"
        >
          <Bell size={16} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-teal-500 text-slate-950 font-bold text-[9px] flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
