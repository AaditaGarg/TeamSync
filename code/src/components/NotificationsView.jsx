import React from "react";
import { Bell, Handshake, Sparkles, FolderGit2, ShieldCheck, Check, X, CheckCheck } from "lucide-react";
import { Card, Button } from "./ui";

const ICONS = {
  handshake: { icon: Handshake, color: "text-teal-400", bg: "bg-teal-500/15" },
  match: { icon: Sparkles, color: "text-cyan-400", bg: "bg-cyan-500/15" },
  squad: { icon: FolderGit2, color: "text-amber-400", bg: "bg-amber-500/15" },
  system: { icon: ShieldCheck, color: "text-emerald-400", bg: "bg-emerald-500/15" },
};

export default function NotificationsView({
  notifications,
  onMarkAllRead,
  onAcceptHandshake,
  onDeclineHandshake,
  onMarkSingleRead,
}) {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-[#0f1826] border border-teal-500/30 flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-400" />
            <h2 className="font-head text-lg sm:text-xl font-bold text-white tracking-tight">
              Two-Way Handshakes & Activity
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Privacy-preserving connection protocol: Communication channels and squad repositories unlock once mutual handshakes are accepted.
          </p>
        </div>

        {unreadCount > 0 && (
          <Button variant="secondary" size="sm" onClick={onMarkAllRead}>
            <CheckCheck size={14} />
            <span>Mark all read</span>
          </Button>
        )}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((notif) => {
          const style = ICONS[notif.type] || ICONS.system;
          const Icon = style.icon;

          return (
            <Card
              key={notif.id}
              className={`p-5 transition-all ${
                !notif.read ? "border-teal-500/40 bg-[#0f1d2d]/90" : "bg-[#0f1826]/70"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className={`w-10 h-10 rounded-xl ${style.bg} ${style.color} flex items-center justify-center shrink-0 border border-white/5`}>
                    <Icon size={18} />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-head text-sm font-bold text-white">{notif.title}</h4>
                      {!notif.read && (
                        <span className="w-2 h-2 rounded-full bg-teal-400" title="Unread" />
                      )}
                      <span className="text-[10px] font-mono text-slate-400">{notif.time}</span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
                      {notif.message}
                    </p>
                  </div>
                </div>

                {/* Handshake Protocol Actions */}
                {notif.actionRequired ? (
                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => onAcceptHandshake(notif.id, notif.sender)}
                    >
                      <Check size={14} />
                      <span>Accept Handshake</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDeclineHandshake(notif.id)}
                    >
                      <X size={14} />
                      <span>Decline</span>
                    </Button>
                  </div>
                ) : (
                  !notif.read && (
                    <button
                      onClick={() => onMarkSingleRead(notif.id)}
                      className="text-xs font-mono text-teal-400 hover:text-teal-300 self-end sm:self-center"
                    >
                      Mark read
                    </button>
                  )
                )}
              </div>
            </Card>
          );
        })}

        {notifications.length === 0 && (
          <div className="py-16 text-center text-slate-400 border border-dashed border-white/10 rounded-2xl">
            <Bell size={24} className="mx-auto mb-2 text-slate-500" />
            <p className="text-sm">No notifications or handshake requests at this time.</p>
          </div>
        )}
      </div>
    </div>
  );
}
