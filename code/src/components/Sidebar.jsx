import { LayoutGrid, Users, FolderKanban, CheckSquare, Bell, Handshake } from "lucide-react";

const NAV = [
  { key: "overview", label: "Overview", icon: LayoutGrid },
  { key: "teams", label: "Teams", icon: Users },
  { key: "projects", label: "Projects", icon: FolderKanban },
  { key: "tasks", label: "Tasks", icon: CheckSquare },
  { key: "notifications", label: "Notifications", icon: Bell },
];

export default function Sidebar({ view, setView, unreadCount, currentUser }) {
  return (
    <aside className="hidden md:flex w-60 shrink-0 flex-col bg-[var(--color-ink-900)] text-white">
      <div className="flex items-center gap-2.5 px-5 py-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-brand-500)]">
          <Handshake size={17} strokeWidth={2.2} />
        </div>
        <div>
          <div className="font-display font-semibold text-[15px] leading-none">CampusSync</div>
          <div className="text-[11px] text-[var(--color-brand-300)] mt-1">Team workspace</div>
        </div>
      </div>

      <nav className="flex-1 px-3 mt-2 space-y-0.5">
        {NAV.map(({ key, label, icon: Icon }) => {
          const active = view === key;
          return (
            <button
              key={key}
              onClick={() => setView(key)}
              className={`group relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                active
                  ? "bg-white/10 text-white font-medium"
                  : "text-white/65 hover:bg-white/5 hover:text-white/90"
              }`}
            >
              {active && (
                <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-full bg-[var(--color-brand-400)]" />
              )}
              <Icon size={17} strokeWidth={2} />
              {label}
              {key === "notifications" && unreadCount > 0 && (
                <span className="ml-auto rounded-full bg-[var(--color-brand-500)] px-1.5 py-0.5 text-[10px] font-semibold leading-none">
                  {unreadCount}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="px-3 pb-5 pt-3 border-t border-white/10">
        <div className="flex items-center gap-2.5 rounded-lg px-2 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-brand-400)] text-[12px] font-semibold text-[var(--color-ink-950)]">
            {currentUser.initials}
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-medium">{currentUser.name}</div>
            <div className="truncate text-[11px] text-white/50">{currentUser.role}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
