export function Avatar({ person, size = 32 }) {
  const palette = ["#16a38a", "#0d3b3e", "#d99a3c", "#d9694a", "#2fc0a1", "#124f4f"];
  const idx = person.name.charCodeAt(0) % palette.length;
  return (
    <div
      title={person.name}
      className="flex items-center justify-center rounded-full font-semibold text-white shrink-0 ring-2 ring-white"
      style={{ width: size, height: size, background: palette[idx], fontSize: size * 0.36 }}
    >
      {person.initials}
    </div>
  );
}

export function AvatarStack({ people, max = 4 }) {
  const shown = people.slice(0, max);
  const rest = people.length - shown.length;
  return (
    <div className="flex items-center -space-x-2">
      {shown.map((p) => (
        <Avatar key={p.id} person={p} size={28} />
      ))}
      {rest > 0 && (
        <div className="flex items-center justify-center rounded-full bg-[var(--color-line)] text-[11px] font-semibold text-[var(--color-text-muted)] ring-2 ring-white w-7 h-7">
          +{rest}
        </div>
      )}
    </div>
  );
}

const statusTone = {
  "On track": "bg-brand-100 text-ink-800",
  "At risk": "bg-amber-100 text-[#8a5a15]",
  Behind: "bg-coral-100 text-[#9c3d24]",
  Open: "bg-brand-100 text-ink-800",
  Matched: "bg-[#e3ecf9] text-[#2c4d8a]",
  Closed: "bg-[var(--color-line)] text-[var(--color-text-muted)]",
  Done: "bg-brand-100 text-ink-800",
  "In progress": "bg-[#e3ecf9] text-[#2c4d8a]",
  Todo: "bg-[var(--color-line)] text-[var(--color-text-muted)]",
  Blocked: "bg-coral-100 text-[#9c3d24]",
  High: "bg-coral-100 text-[#9c3d24]",
  Medium: "bg-amber-100 text-[#8a5a15]",
  Low: "bg-[var(--color-line)] text-[var(--color-text-muted)]",
};

export function Badge({ children }) {
  const tone = statusTone[children] || "bg-[var(--color-line)] text-[var(--color-text-muted)]";
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${tone}`}>
      {children}
    </span>
  );
}

export function ProgressBar({ value, tone = "var(--color-brand-500)" }) {
  return (
    <div className="h-1.5 w-full rounded-full bg-[var(--color-line)] overflow-hidden">
      <div
        className="h-full rounded-full transition-[width]"
        style={{ width: `${value}%`, background: tone }}
      />
    </div>
  );
}

export function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl bg-[var(--color-surface)] border border-[var(--color-line)] ${className}`}
    >
      {children}
    </div>
  );
}
