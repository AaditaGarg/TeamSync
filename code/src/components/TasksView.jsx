import { useMemo, useState } from "react";
import { Card, Badge, Avatar } from "./ui";
import { tasks, teams } from "../data/mockData";

const STATUS_ORDER = ["Blocked", "Todo", "In progress", "Done"];
const teamName = (id) => teams.find((t) => t.id === id)?.name ?? "—";

export default function TasksView({ query }) {
  const [team, setTeam] = useState("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tasks.filter((t) => {
      const matchesTeam = team === "All" || t.teamId === team;
      const matchesQuery =
        !q ||
        t.title.toLowerCase().includes(q) ||
        t.assignee.name.toLowerCase().includes(q) ||
        teamName(t.teamId).toLowerCase().includes(q);
      return matchesTeam && matchesQuery;
    });
  }, [query, team]);

  const grouped = STATUS_ORDER.map((status) => ({
    status,
    items: filtered.filter((t) => t.status === status),
  }));

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setTeam("All")}
          className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
            team === "All"
              ? "border-[var(--color-ink-900)] bg-[var(--color-ink-900)] text-white"
              : "border-[var(--color-line)] text-[var(--color-text-muted)] hover:bg-[var(--color-canvas)]"
          }`}
        >
          All teams
        </button>
        {teams.map((t) => (
          <button
            key={t.id}
            onClick={() => setTeam(t.id)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
              team === t.id
                ? "border-[var(--color-ink-900)] bg-[var(--color-ink-900)] text-white"
                : "border-[var(--color-line)] text-[var(--color-text-muted)] hover:bg-[var(--color-canvas)]"
            }`}
          >
            {t.name}
          </button>
        ))}
        <span className="ml-auto text-xs text-[var(--color-text-muted)]">
          {filtered.length} of {tasks.length} tasks
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        {grouped.map(({ status, items }) => (
          <div key={status} className="min-w-0">
            <div className="mb-2.5 flex items-center justify-between px-1">
              <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-faint)]">{status}</span>
              <span className="text-xs text-[var(--color-text-faint)]">{items.length}</span>
            </div>
            <div className="space-y-2.5">
              {items.map((t) => (
                <Card key={t.id} className="p-3.5">
                  <p className="text-sm font-medium leading-snug">{t.title}</p>
                  <div className="mt-2.5 flex items-center gap-1.5">
                    <Badge>{t.priority}</Badge>
                    <span className="text-[11px] text-[var(--color-text-faint)]">· {teamName(t.teamId)}</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Avatar person={t.assignee} size={22} />
                      <span className="text-xs text-[var(--color-text-muted)]">{t.assignee.name.split(" ")[0]}</span>
                    </div>
                    <span className="text-xs text-[var(--color-text-faint)]">
                      {new Date(t.due).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                    </span>
                  </div>
                </Card>
              ))}
              {items.length === 0 && (
                <div className="rounded-xl border border-dashed border-[var(--color-line)] px-3 py-6 text-center text-xs text-[var(--color-text-faint)]">
                  Nothing here
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
