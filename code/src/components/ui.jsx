import React from "react";
import { X, CheckCircle2, AlertCircle } from "lucide-react";

export function GithubIcon({ size = 16, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function Avatar({ user, size = 34, showVerified = false, className = "" }) {
  if (!user) return null;
  const tone = user.avatarTone || "#0d9488";
  const initials = user.initials || user.name?.split(" ").map(w => w[0]).join("").slice(0, 2) || "TS";

  return (
    <div className={`relative inline-flex shrink-0 ${className}`}>
      <div
        className="flex items-center justify-center rounded-xl font-mono font-bold text-white shadow-md border border-white/10 select-none"
        style={{
          width: size,
          height: size,
          background: `linear-gradient(135deg, ${tone}, #093f3c)`,
          fontSize: Math.max(11, Math.round(size * 0.38)),
        }}
        title={`${user.name} (${user.role || ""})`}
      >
        {initials}
      </div>
      {showVerified && (
        <span
          className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-teal-400 border-2 border-[#070b12] flex items-center justify-center text-[8px] text-slate-950 font-bold"
          title="Institutional & GitHub Verified"
        >
          ✓
        </span>
      )}
    </div>
  );
}

export function AvatarGroup({ users = [], max = 3, size = 30 }) {
  const visible = users.slice(0, max);
  const remaining = users.length - max;

  return (
    <div className="flex items-center -space-x-2.5">
      {visible.map((u, i) => (
        <Avatar key={u.id || i} user={u} size={size} className="ring-2 ring-[#0f1826]" />
      ))}
      {remaining > 0 && (
        <div
          className="flex items-center justify-center rounded-xl bg-slate-850 text-slate-300 font-mono text-xs font-semibold ring-2 ring-[#0f1826] border border-white/10"
          style={{ width: size, height: size }}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
}

const BADGE_VARIANTS = {
  teal: "bg-teal-500/15 text-teal-300 border-teal-500/30",
  emerald: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  cyan: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
  amber: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  rose: "bg-rose-500/15 text-rose-300 border-rose-500/30",
  purple: "bg-purple-500/15 text-purple-300 border-purple-500/30",
  slate: "bg-slate-800/60 text-slate-300 border-slate-700/60",
};

export function Badge({ children, variant = "teal", size = "sm", className = "" }) {
  const baseClasses = "inline-flex items-center gap-1.5 font-medium rounded-lg border tracking-wide";
  const sizeClasses = size === "xs" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs";
  const colorClass = BADGE_VARIANTS[variant] || BADGE_VARIANTS.teal;

  return (
    <span className={`${baseClasses} ${sizeClasses} ${colorClass} ${className}`}>
      {children}
    </span>
  );
}

export function Card({ children, className = "", hover = false, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl bg-[#0f1826]/90 border border-white/[0.08] backdrop-blur-md transition-all duration-200 ${
        hover ? "hover:border-teal-500/40 hover:bg-[#121c2d] hover:shadow-xl hover:shadow-teal-950/20 cursor-pointer" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function ProgressBar({ value = 0, max = 100, label, tone = "teal" }) {
  const percent = Math.min(100, Math.max(0, Math.round((value / max) * 100)));
  const barGradient =
    tone === "amber"
      ? "from-amber-500 to-amber-300"
      : tone === "rose"
      ? "from-rose-500 to-rose-300"
      : "from-teal-500 via-teal-400 to-cyan-400";

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center text-xs text-slate-400 mb-1.5">
          <span>{label}</span>
          <span className="font-mono font-semibold text-slate-200">{percent}%</span>
        </div>
      )}
      <div className="h-2 w-full rounded-full bg-slate-800/80 overflow-hidden p-0.5 border border-white/5">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${barGradient} transition-all duration-500 shadow-sm`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  disabled = false,
  type = "button",
}) {
  const base =
    "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 active:scale-[0.98] select-none gap-2";

  const sizes = {
    sm: "px-3 py-1.5 text-xs font-semibold",
    md: "px-4 py-2 text-xs sm:text-sm font-semibold",
    lg: "px-5 py-2.5 text-sm sm:text-base font-semibold",
  };

  const variants = {
    primary:
      "bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-slate-950 font-bold shadow-lg shadow-teal-500/20 hover:shadow-teal-500/35 border border-teal-300/30",
    secondary:
      "bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 border border-teal-500/30 hover:border-teal-400/50",
    outline:
      "bg-slate-900/60 hover:bg-slate-800 text-slate-200 border border-white/10 hover:border-white/20",
    danger:
      "bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30",
    ghost:
      "text-slate-400 hover:text-slate-200 hover:bg-white/5",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${sizes[size]} ${variants[variant]} ${
        disabled ? "opacity-50 cursor-not-allowed active:scale-100" : ""
      } ${className}`}
    >
      {children}
    </button>
  );
}

export function Modal({ isOpen, onClose, title, subtitle, children, maxWidth = "max-w-xl" }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div
        className={`w-full ${maxWidth} bg-[#0f1826] border border-teal-500/30 rounded-2xl shadow-2xl shadow-teal-950/50 overflow-hidden flex flex-col max-h-[90vh]`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4.5 border-b border-white/10 flex items-center justify-between bg-slate-900/60">
          <div>
            <h3 className="font-head text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-400" />
              {title}
            </h3>
            {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X size={16} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto scroll-quiet">{children}</div>
      </div>
    </div>
  );
}

export function Toast({ toast, onClose }) {
  if (!toast) return null;
  const isError = toast.type === "error";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900/95 border border-teal-500/40 text-slate-100 shadow-2xl shadow-teal-950/40 backdrop-blur-xl animate-bounce-subtle">
      {isError ? (
        <AlertCircle size={18} className="text-rose-400 shrink-0" />
      ) : (
        <CheckCircle2 size={18} className="text-teal-400 shrink-0" />
      )}
      <span className="text-xs sm:text-sm font-medium">{toast.message}</span>
      <button
        onClick={onClose}
        className="ml-2 text-slate-400 hover:text-white p-1 rounded hover:bg-white/10"
      >
        <X size={14} />
      </button>
    </div>
  );
}
