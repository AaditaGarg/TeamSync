import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Users, FolderKanban, CheckSquare, TrendingUp, Clock } from "lucide-react";
import { Card, Badge, ProgressBar, AvatarStack, Avatar } from "./ui";
import { teams, tasks, activity, weeklyProgress, pilotMetrics, listings } from "../data/mockData";

function StatCard({ icon: Icon, label, value, sub, tone }) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm text-[var(--color-text-muted)]">{label}</div>
          <div className="mt-1.5 font-display text-3xl font-semibold">{value}</div>
        </div>
        <div
          className="flex h-9 w-9 items-center justify-center rounded-lg"
          style={{ background: tone + "1a", color: tone }}
        >
          <Icon size={17} />
        </div>
      </div>
      {sub && <div className="mt-3 text-xs text-[var(--color-text-muted)]">{sub}</div>}
    </Card>
  );
}

export default function OverviewView() {
  const openTasks = tasks.filter((t) => t.status !== "Done").length;
  const doneThisWeek = tasks.filter((t) => t.status === "Done").length;
  const upcoming = [...teams].sort((a, b) => new Date(a.deadline) - new Date(b.deadline)).slice(0, 4);
  const openListings = listings.filter((l) => l.status === "Open").length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Users} label="Active teams" value={teams.length} sub={`${teams.reduce((a, t) => a + t.members.length, 0)} students across 4 colleges`} tone="#16a38a" />
        <StatCard icon={FolderKanban} label="Open listings" value={openListings} sub={`${listings.length} total postings this pilot`} tone="#2c4d8a" />
        <StatCard icon={CheckSquare} label="Open tasks" value={openTasks} sub={`${doneThisWeek} completed so far`} tone="#d99a3c" />
        <StatCard icon={TrendingUp} label="Median time-to-match" value={pilotMetrics.medianTTM} sub={`${pilotMetrics.crossCollegeRate} of matches are cross-college`} tone="#d9694a" />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="p-5 xl:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-base font-semibold">Tasks closed per week</h2>
            <span className="text-xs text-[var(--color-text-muted)]">Last 6 weeks, all teams</span>
          </div>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyProgress} barSize={34}>
                <CartesianGrid vertical={false} stroke="var(--color-line)" />
                <XAxis dataKey="week" tickLine={false} axisLine={false} tick={{ fill: "#5c706c", fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: "#5c706c", fontSize: 12 }} width={28} />
                <Tooltip
                  cursor={{ fill: "var(--color-canvas)" }}
                  contentStyle={{ borderRadius: 10, border: "1px solid var(--color-line)", fontSize: 13 }}
                />
                <Bar dataKey="tasksClosed" name="Tasks closed" fill="var(--color-brand-500)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="font-display text-base font-semibold">Upcoming deadlines</h2>
          <ul className="mt-4 space-y-4">
            {upcoming.map((t) => (
              <li key={t.id} className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--color-amber-100)] text-[#8a5a15]">
                  <Clock size={14} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-medium">{t.name}</span>
                    <span className="shrink-0 text-xs text-[var(--color-text-muted)]">
                      {new Date(t.deadline).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                    </span>
                  </div>
                  <div className="truncate text-xs text-[var(--color-text-muted)]">{t.project}</div>
                  <div className="mt-1.5">
                    <ProgressBar value={t.progress} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="p-5 xl:col-span-2">
          <h2 className="font-display text-base font-semibold">Recent activity</h2>
          <ul className="mt-4 divide-y divide-[var(--color-line)]">
            {activity.map((a) => (
              <li key={a.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                <Avatar person={a.actor} size={30} />
                <div className="min-w-0 flex-1 text-sm">
                  <span className="font-medium">{a.actor.name}</span>{" "}
                  <span className="text-[var(--color-text-muted)]">{a.action}</span>{" "}
                  <span className="font-medium">{a.target}</span>{" "}
                  <span className="text-[var(--color-text-muted)]">{a.meta}</span>
                </div>
                <div className="shrink-0 text-xs text-[var(--color-text-faint)]">{a.time}</div>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-5">
          <h2 className="font-display text-base font-semibold">Team standings</h2>
          <ul className="mt-4 space-y-4">
            {teams.map((t) => (
              <li key={t.id}>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium">{t.name}</span>
                  <Badge>{t.status}</Badge>
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <div className="flex-1">
                    <ProgressBar value={t.progress} />
                  </div>
                  <span className="w-9 text-right text-xs text-[var(--color-text-muted)]">{t.progress}%</span>
                </div>
                <div className="mt-1.5">
                  <AvatarStack people={t.members} />
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
