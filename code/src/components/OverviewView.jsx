import React from "react";
import {
  Users,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Clock,
  ArrowRight,
  Zap,
  CheckCircle2,
  FolderGit2,
} from "lucide-react";
import { Card, Badge, Button, ProgressBar, AvatarGroup, Avatar } from "./ui";
import { currentUser, candidates, squads, pilotMetrics } from "../data/mockData";

export default function OverviewView({ setView, onSendHandshake, sentHandshakes }) {
  const topRecommendations = candidates.slice(0, 3);
  const activeSquad = squads[0];

  return (
    <div className="space-y-6">
      {/* Hero Welcome Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-teal-950/60 via-[#0f1d2d] to-[#0c1626] border border-teal-500/30 p-6 sm:p-8 overflow-hidden shadow-2xl shadow-teal-950/30">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-300 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <span>HackThapar 2026 Telemetry Active</span>
            </div>
            <h2 className="font-head text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-400">{currentUser.name}</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Your profile is authenticated with <strong className="text-teal-300">{currentUser.email}</strong>. GitHub proof-of-work has verified{" "}
              <strong className="text-white">{currentUser.github.reposCount} public repos</strong> and{" "}
              <strong className="text-white">{currentUser.github.commitsLastYear} commits</strong>.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
            <Button variant="primary" size="md" onClick={() => setView("matchmaker")}>
              <Sparkles size={15} />
              <span>Find Teammates</span>
            </Button>
            <Button variant="outline" size="md" onClick={() => setView("tasks")}>
              <FolderGit2 size={15} />
              <span>Squad Kanban</span>
            </Button>
          </div>
        </div>
      </div>

      {/* 4 Stat Telemetry Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <Card className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Median Time-to-Match</span>
              <div className="mt-2 font-head text-2xl sm:text-3xl font-bold text-white">{pilotMetrics.medianTTM}</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-teal-500/15 text-teal-400 flex items-center justify-center border border-teal-500/30">
              <Clock size={18} />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
            <TrendingUp size={13} className="text-teal-400" />
            <span>Target: &le; 24h milestone achieved</span>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Cross-College Matches</span>
              <div className="mt-2 font-head text-2xl sm:text-3xl font-bold text-teal-300">{pilotMetrics.crossCollegeRatio}</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
              <Users size={18} />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
            <span>Across Thapar, PEC, NIT, & IIIT</span>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Institutional Tokens</span>
              <div className="mt-2 font-head text-2xl sm:text-3xl font-bold text-emerald-400">{pilotMetrics.verifiedTokens}</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <ShieldCheck size={18} />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
            <CheckCircle2 size={13} className="text-emerald-400" />
            <span>Zero spam or unverified signups</span>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Handshake Success</span>
              <div className="mt-2 font-head text-2xl sm:text-3xl font-bold text-amber-300">{pilotMetrics.handshakeSuccessRate}</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Zap size={18} />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
            <span>Mutual privacy connection unlocked</span>
          </div>
        </Card>
      </div>

      {/* Main 2-Column Section: Top Matches + Active Squad */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Top Heuristic Matches */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-head text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <Sparkles size={17} className="text-teal-400" />
                <span>Heuristic Teammate Recommendations</span>
              </h3>
              <p className="text-xs text-slate-400">Calculated via complementary tech stack overlap & verified repos</p>
            </div>
            <button
              onClick={() => setView("matchmaker")}
              className="text-xs font-mono font-semibold text-teal-400 hover:text-teal-300 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="space-y-3">
            {topRecommendations.map((cand) => {
              const isHandshakeSent = sentHandshakes.includes(cand.id);

              return (
                <Card key={cand.id} className="p-5 hover:border-teal-500/40 transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {/* Candidate Info */}
                    <div className="flex items-start gap-3.5">
                      <Avatar user={cand} size={44} showVerified={true} />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-head text-sm font-bold text-white">{cand.name}</h4>
                          <Badge variant="teal" size="xs">
                            {cand.synergyScore}% Match
                          </Badge>
                          <span className="text-[11px] font-mono text-slate-400">{cand.college}</span>
                        </div>
                        <p className="text-xs text-teal-300 font-medium mt-0.5">{cand.role}</p>
                        
                        {/* Tech tags */}
                        <div className="flex flex-wrap gap-1.5 mt-2.5">
                          {cand.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 border border-white/5 text-[10px] font-mono"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action & Synergy Breakdown */}
                    <div className="sm:text-right shrink-0 flex sm:flex-col items-center sm:items-end justify-between gap-2.5">
                      <div className="text-[10px] font-mono text-slate-400">
                        GitHub: <span className="text-slate-200">@{cand.github.username}</span> ({cand.github.reposCount} repos)
                      </div>
                      <Button
                        variant={isHandshakeSent ? "outline" : "primary"}
                        size="sm"
                        onClick={() => onSendHandshake(cand.id, cand.name)}
                        disabled={isHandshakeSent}
                      >
                        {isHandshakeSent ? "Handshake Sent ✓" : "Send Handshake"}
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Sprint Workspace Snapshot */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-head text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <FolderGit2 size={17} className="text-teal-400" />
              <span>Current Sprint Hub</span>
            </h3>
            <Badge variant="emerald" size="xs">
              Day 2 of 48h
            </Badge>
          </div>

          <Card className="p-6 border-teal-500/30 bg-gradient-to-b from-[#0f1d2e] to-[#0a111c] space-y-5">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>{activeSquad.hackathon}</span>
                <span className="text-teal-300">{activeSquad.status}</span>
              </div>
              <h4 className="font-head text-lg font-bold text-white mt-1">{activeSquad.name}</h4>
              <p className="text-xs text-slate-300 mt-1">{activeSquad.project}</p>
            </div>

            {/* Sprint Progress */}
            <div>
              <ProgressBar value={activeSquad.progress} label="Sprint Milestone Completion" />
              <div className="flex justify-between items-center text-[11px] font-mono text-slate-400 mt-2">
                <span>{activeSquad.tasksDone} of {activeSquad.tasksTotal} tasks closed</span>
                <span>Deadline: {activeSquad.deadline}</span>
              </div>
            </div>

            {/* Squad Members */}
            <div className="pt-3 border-t border-white/[0.08]">
              <div className="text-xs text-slate-400 mb-2 font-mono">Sprint Roster</div>
              <div className="flex items-center justify-between">
                <AvatarGroup users={activeSquad.members} max={3} size={32} />
                <Button variant="secondary" size="sm" onClick={() => setView("tasks")}>
                  <span>Open Kanban</span>
                  <ArrowRight size={13} />
                </Button>
              </div>
            </div>

            {/* Next Milestone */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-white/5 text-xs text-slate-300">
              <span className="text-teal-400 font-bold block mb-1">Current Milestone:</span>
              <span>{activeSquad.nextMilestone}</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
