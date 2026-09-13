import { useMemo, useState } from "react";
import { Calendar } from "lucide-react";
import { Card, Badge, ProgressBar, AvatarStack } from "./ui";
import { teams } from "../data/mockData";

const FILTERS = ["All", "On track", "At risk", "Behind"];

export default function TeamsView({ query }) {
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return teams.filter((t) => {
      const matchesFilter = filter === "All" || t.status === filter;
      const matchesQuery =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.project.toLowerCase().includes(q) ||
        t.college.toLowerCase().includes(q) ||
        t.members.some((m) => m.name.toLowerCase().includes(q));
      return matchesFilter && matchesQuery;
    });
  }, [query, filter]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
              filter === f
                ? "border-[var(--color-ink-900)] bg-[var(--color-ink-900)] text-white"
                : "border-[var(--color-line)] text-[var(--color-text-muted)] hover:bg-[var(--color-canvas)]"
            }`}
          >
            {f}
          </button>
        ))}
        <span className="ml-auto text-xs text-[var(--color-text-muted)]">
          {filtered.length} of {teams.length} teams
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((t) => (
          <Card key={t.id} className="p-5">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-display text-base font-semibold">{t.name}</h3>
                <p className="mt-0.5 text-sm text-[var(--color-text-muted)]">{t.project}</p>
              </div>
              <Badge>{t.status}</Badge>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-[var(--color-text-muted)]">
              <span>{t.college}</span>
              <span className="flex items-center gap-1">
                <Calendar size={12} />
                {new Date(t.deadline).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
              </span>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <div className="flex-1">
                <ProgressBar value={t.progress} />
              </div>
              <span className="w-9 text-right text-xs font-medium text-[var(--color-text-muted)]">{t.progress}%</span>
            </div>
            <div className="mt-1 text-xs text-[var(--color-text-faint)]">
              {t.tasksDone} of {t.tasksTotal} tasks done
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-[var(--color-line)] pt-4">
              <AvatarStack people={t.members} />
              <span className="text-xs text-[var(--color-text-muted)]">{t.members.length} members</span>
            </div>
          </Card>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full py-16 text-center text-sm text-[var(--color-text-muted)]">
            No teams match "{query}". Try a different name, project, or college.
          </div>
        )}
      </div>
    </div>
  );
}
