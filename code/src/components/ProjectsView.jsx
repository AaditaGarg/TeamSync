import { useMemo, useState } from "react";
import { Card, Badge, Avatar } from "./ui";
import { listings } from "../data/mockData";

const FILTERS = ["All", "Open", "Matched", "Closed"];

export default function ProjectsView({ query }) {
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return listings.filter((l) => {
      const matchesFilter = filter === "All" || l.status === filter;
      const matchesQuery =
        !q ||
        l.title.toLowerCase().includes(q) ||
        l.postedBy.name.toLowerCase().includes(q) ||
        l.rolesNeeded.some((r) => r.toLowerCase().includes(q));
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
          {filtered.length} of {listings.length} listings
        </span>
      </div>

      <Card className="overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--color-line)] bg-[var(--color-canvas)] text-left text-xs uppercase tracking-wide text-[var(--color-text-faint)]">
              <th className="px-5 py-3 font-medium">Listing</th>
              <th className="px-5 py-3 font-medium">Posted by</th>
              <th className="px-5 py-3 font-medium">Roles needed</th>
              <th className="px-5 py-3 font-medium">Applicants</th>
              <th className="px-5 py-3 font-medium">Posted</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-line)]">
            {filtered.map((l) => (
              <tr key={l.id} className="hover:bg-[var(--color-canvas)]">
                <td className="max-w-xs px-5 py-3.5 font-medium">{l.title}</td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <Avatar person={l.postedBy} size={24} />
                    <span className="text-[var(--color-text-muted)]">{l.postedBy.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex flex-wrap gap-1.5">
                    {l.rolesNeeded.map((r) => (
                      <span key={r} className="rounded-md bg-[var(--color-canvas)] px-2 py-0.5 text-xs text-[var(--color-text-muted)]">
                        {r}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-5 py-3.5 text-[var(--color-text-muted)]">{l.applicants}</td>
                <td className="px-5 py-3.5 text-[var(--color-text-muted)]">
                  {new Date(l.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                </td>
                <td className="px-5 py-3.5">
                  <Badge>{l.status}</Badge>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-14 text-center text-[var(--color-text-muted)]">
                  No listings match "{query}".
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
