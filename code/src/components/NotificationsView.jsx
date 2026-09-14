import { useState } from "react";
import { Handshake, Sparkles, CheckSquare, Clock, MessageSquare, Info } from "lucide-react";
import { Card } from "./ui";
import { notifications as seed } from "../data/mockData";

const ICONS = {
  connection: { icon: Handshake, tone: "#16a38a" },
  match: { icon: Sparkles, tone: "#2c4d8a" },
  task: { icon: CheckSquare, tone: "#16a38a" },
  deadline: { icon: Clock, tone: "#d99a3c" },
  message: { icon: MessageSquare, tone: "#2c4d8a" },
  system: { icon: Info, tone: "#5c706c" },
};

export default function NotificationsView() {
  const [items, setItems] = useState(seed);
  const unread = items.filter((n) => !n.read).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-[var(--color-text-muted)]">{unread} unread</span>
        <button
          onClick={() => setItems((prev) => prev.map((n) => ({ ...n, read: true })))}
          className="text-sm font-medium text-[var(--color-brand-500)] hover:underline"
        >
          Mark all as read
        </button>
      </div>

      <Card className="divide-y divide-[var(--color-line)] overflow-hidden">
        {items.map((n) => {
          const { icon: Icon, tone } = ICONS[n.type] ?? ICONS.system;
          return (
            <button
              key={n.id}
              onClick={() => setItems((prev) => prev.map((x) => (x.id === n.id ? { ...x, read: true } : x)))}
              className={`flex w-full items-start gap-3 px-5 py-4 text-left transition-colors hover:bg-[var(--color-canvas)] ${
                !n.read ? "bg-[var(--color-brand-100)]/40" : ""
              }`}
            >
              <div
                className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                style={{ background: tone + "1a", color: tone }}
              >
                <Icon size={15} />
              </div>
              <div className="min-w-0 flex-1">
                <p className={`text-sm ${!n.read ? "font-medium" : "text-[var(--color-text-muted)]"}`}>{n.message}</p>
                <span className="text-xs text-[var(--color-text-faint)]">{n.time}</span>
              </div>
              {!n.read && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--color-brand-500)]" />}
            </button>
          );
        })}
      </Card>
    </div>
  );
}
