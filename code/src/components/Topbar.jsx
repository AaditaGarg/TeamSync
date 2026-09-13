import { Search, Bell } from "lucide-react";

const TITLES = {
  overview: ["Overview", "Your pilot at a glance"],
  teams: ["Teams", "Every active workspace, cross-college"],
  projects: ["Projects", "Open listings and requirements"],
  tasks: ["Tasks", "What's moving across every team"],
  notifications: ["Notifications", "Connections, matches and mentions"],
};

export default function Topbar({ view, query, setQuery, unreadCount, setView }) {
  const [title, subtitle] = TITLES[view];
  return (
    <header className="flex items-center justify-between gap-4 border-b border-[var(--color-line)] bg-[var(--color-surface)]/80 px-6 py-4 backdrop-blur">
      <div>
        <h1 className="font-display text-xl font-semibold leading-tight">{title}</h1>
        <p className="text-sm text-[var(--color-text-muted)]">{subtitle}</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden sm:block">
          <Search
            size={15}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-faint)]"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search teams, projects, people…"
            className="w-64 rounded-lg border border-[var(--color-line)] bg-[var(--color-canvas)] py-2 pl-9 pr-3 text-sm outline-none placeholder:text-[var(--color-text-faint)] focus:border-[var(--color-brand-500)] focus:ring-2 focus:ring-[var(--color-brand-100)]"
          />
        </div>

        <button
          onClick={() => setView("notifications")}
          className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-line)] text-[var(--color-text-muted)] hover:bg-[var(--color-canvas)]"
          aria-label="Notifications"
        >
          <Bell size={16} />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--color-coral-500)] px-1 text-[10px] font-semibold text-white">
              {unreadCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
