import React from "react";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Users,
  FolderGit2,
  Send,
  Check,
  ChevronRight,
} from "lucide-react";
import { Card, Badge, Button, ProgressBar, Avatar, GithubIcon } from "./ui";
import { currentUser, candidates, listings, pilotMetrics, colleges } from "../data/mockData";

export default function HomeView({ setView, onSendHandshake, sentHandshakes, onOpenNewListing }) {
  const topCandidates = candidates.slice(0, 4);
  const featuredListings = listings.slice(0, 3);

  return (
    <div className="space-y-20 pb-16">
      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-6 sm:pt-12 pb-12 overflow-hidden">
        {/* Ambient Glow Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-teal-500/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute -top-10 right-10 w-72 h-72 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-6">
          {/* Announcement Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-mono shadow-lg shadow-teal-950/40">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <span>HackThapar 2026 & SIH Telemetry Active</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">v2.4 Prototype</span>
          </div>

          {/* Main Title */}
          <h1 className="font-head text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Cross-College Teammate Matchmaking,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-teal-400 to-cyan-400">
              Powered by Proof-of-Work.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Stop relying on chaotic chat groups and unverified claims. TeamSync pairs students across engineering colleges using
            verifiable GitHub telemetry, complementary skill synergy, and mutual privacy handshakes.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-3">
            <Button
              variant="primary"
              size="lg"
              onClick={() => setView("matchmaker")}
              className="shadow-xl shadow-teal-500/25"
            >
              <Sparkles size={16} />
              <span>Find Teammates</span>
              <ArrowRight size={16} />
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={() => setView("projects")}
            >
              <FolderGit2 size={16} />
              <span>Browse Hackathons</span>
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => setView("tasks")}
            >
              <span>Squad Kanban</span>
            </Button>
          </div>

          {/* Hero Interactive Telemetry Showcase Card */}
          <div className="pt-8 max-w-3xl mx-auto">
            <Card className="p-6 border-teal-500/30 bg-gradient-to-b from-[#0f1d2e]/90 to-[#0b121e]/90 shadow-2xl shadow-teal-950/60 backdrop-blur-xl text-left">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="text-xs font-mono text-slate-400 ml-2">teamsync-heuristic-core // live</span>
                </div>
                <Badge variant="teal" size="xs">
                  S(u, L) = 98% Synergy
                </Badge>
              </div>

              <div className="py-4 grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                <div className="p-3 rounded-xl bg-slate-900/70 border border-white/5 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase">Current User</span>
                  <div className="font-bold text-white text-sm">{currentUser.name}</div>
                  <div className="text-[11px] text-teal-300">{currentUser.role}</div>
                  <div className="text-[10px] text-slate-400">@thapar.edu Verified</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/70 border border-teal-500/30 space-y-1 relative">
                  <span className="text-[10px] text-teal-300 uppercase font-bold flex items-center gap-1">
                    <Sparkles size={11} />
                    <span>Best Synergistic Match</span>
                  </span>
                  <div className="font-bold text-white text-sm">{candidates[0].name}</div>
                  <div className="text-[11px] text-cyan-300">{candidates[0].role}</div>
                  <div className="text-[10px] text-slate-400">{candidates[0].college.split(" ")[0]}</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/70 border border-white/5 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase">Mutual Handshake</span>
                  <div className="font-bold text-emerald-400 text-sm">Squad Unlocked ✓</div>
                  <div className="text-[11px] text-slate-300">HackThapar 2026</div>
                  <div className="text-[10px] text-slate-400">Private Chat Enabled</div>
                </div>
              </div>

              {/* Progress synergy meter */}
              <div className="pt-2">
                <ProgressBar value={98} label="Complementary Skill Vector & GitHub Commits Overlap" />
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* ================= PARTNER COLLEGES NETWORK ================= */}
      <section className="border-y border-white/[0.08] py-8 bg-[#0b121e]/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-center text-xs font-mono uppercase tracking-widest text-slate-400 mb-6">
            Connecting Verified Builders Across Institutional Campuses
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-slate-300 text-xs sm:text-sm font-head font-bold">
            {colleges.map((col) => (
              <div key={col} className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/60 border border-white/5">
                <ShieldCheck size={14} className="text-teal-400" />
                <span>{col}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 4-STEP HOW IT WORKS ================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-widest">
            Architecture Workflow
          </span>
          <h2 className="font-head text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            How TeamSync Solves Hackathon Formation
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            A 4-stage deterministic workflow ensuring genuine skills, zero spam, and immediate sprint readiness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Step 1 */}
          <Card className="p-6 space-y-4 hover:border-teal-500/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-teal-500/15 text-teal-400 font-head font-bold flex items-center justify-center text-sm border border-teal-500/30">
              01
            </div>
            <h3 className="font-head text-base font-bold text-white">Institutional Identity</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Students authenticate via institution emails (e.g. <span className="font-mono text-teal-300">@thapar.edu</span>). No anonymous profiles or fake credentials.
            </p>
          </Card>

          {/* Step 2 */}
          <Card className="p-6 space-y-4 hover:border-teal-500/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/15 text-cyan-400 font-head font-bold flex items-center justify-center text-sm border border-cyan-500/30">
              02
            </div>
            <h3 className="font-head text-base font-bold text-white">GitHub Proof-of-Work</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Telemetry engine extracts public commit frequency, repository stacks, and primary language tags directly via GitHub API v3.
            </p>
          </Card>

          {/* Step 3 */}
          <Card className="p-6 space-y-4 hover:border-teal-500/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 font-head font-bold flex items-center justify-center text-sm border border-emerald-500/30">
              03
            </div>
            <h3 className="font-head text-base font-bold text-white">Heuristic Matching</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Deterministic weighted algorithm computes synergy <span className="font-mono text-teal-300">S(u, L)</span> across complementary skills, domain alignment, and availability.
            </p>
          </Card>

          {/* Step 4 */}
          <Card className="p-6 space-y-4 hover:border-teal-500/40 transition-all">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 font-head font-bold flex items-center justify-center text-sm border border-amber-500/30">
              04
            </div>
            <h3 className="font-head text-base font-bold text-white">Squad Collaboration</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Mutual handshakes unlock private in-app coordination messaging, task Kanban boards, and shared repository sprint milestones.
            </p>
          </Card>
        </div>
      </section>

      {/* ================= FEATURED CANDIDATES SHOWCASE ================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-widest">
              Live Candidate Directory
            </span>
            <h2 className="font-head text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Featured Teammates Ready To Sprint
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Verified engineers with verified proof-of-work looking for hackathon squads.
            </p>
          </div>

          <Button variant="secondary" size="sm" onClick={() => setView("matchmaker")}>
            <span>View All Candidates</span>
            <ChevronRight size={14} />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {topCandidates.map((cand) => {
            const isSent = sentHandshakes.includes(cand.id);

            return (
              <Card key={cand.id} className="p-5 flex flex-col justify-between hover:border-teal-500/40 transition-all space-y-4">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <Avatar user={cand} size={42} showVerified={true} />
                    <Badge variant="teal" size="xs">
                      {cand.synergyScore}% Match
                    </Badge>
                  </div>

                  <h3 className="font-head text-base font-bold text-white mt-3 truncate">{cand.name}</h3>
                  <p className="text-[11px] text-teal-300 font-mono truncate">{cand.role}</p>
                  <p className="text-[10px] text-slate-400 truncate">{cand.college.split(" ")[0]}</p>

                  <div className="flex flex-wrap gap-1 mt-3">
                    {cand.techStack.slice(0, 3).map((t) => (
                      <span key={t} className="px-1.5 py-0.5 rounded bg-slate-900 border border-white/5 text-[9px] font-mono text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span className="flex items-center gap-1 text-slate-300">
                      <GithubIcon size={12} className="text-teal-400" />
                      <span>{cand.github.reposCount} repos</span>
                    </span>
                    <span className="text-emerald-400 font-bold">{cand.github.commitsLastYear}+ commits</span>
                  </div>
                </div>

                <Button
                  variant={isSent ? "outline" : "primary"}
                  size="sm"
                  className="w-full"
                  onClick={() => onSendHandshake(cand.id, cand.name)}
                  disabled={isSent}
                >
                  {isSent ? (
                    <>
                      <Check size={12} />
                      <span>Connected</span>
                    </>
                  ) : (
                    <>
                      <Send size={12} />
                      <span>Connect</span>
                    </>
                  )}
                </Button>
              </Card>
            );
          })}
        </div>
      </section>

      {/* ================= FEATURED HACKATHONS ================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-widest">
              Open Opportunities
            </span>
            <h2 className="font-head text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Active Hackathon Listings
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Browse requirements posted by student leads or publish your own squad requirement.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Button variant="primary" size="sm" onClick={onOpenNewListing}>
              <span>+ Post Requirement</span>
            </Button>
            <Button variant="secondary" size="sm" onClick={() => setView("projects")}>
              <span>All Listings</span>
              <ChevronRight size={14} />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featuredListings.map((listing) => (
            <Card key={listing.id} className="p-6 flex flex-col justify-between hover:border-teal-500/40 transition-all space-y-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-mono text-teal-400 font-bold uppercase tracking-wider">
                    {listing.hackathon}
                  </span>
                  <Badge variant="emerald" size="xs">
                    {listing.status}
                  </Badge>
                </div>

                <h3 className="font-head text-base font-bold text-white leading-snug line-clamp-2">
                  {listing.title}
                </h3>

                <p className="text-xs text-slate-300 line-clamp-2">
                  {listing.description}
                </p>

                <div>
                  <span className="text-[10px] font-mono text-slate-400 block mb-1">Roles Needed:</span>
                  <div className="flex flex-wrap gap-1">
                    {listing.rolesNeeded.map((r) => (
                      <span key={r} className="px-2 py-0.5 rounded bg-teal-500/10 text-teal-300 border border-teal-500/20 text-[10px]">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                  <Users size={12} className="text-teal-400" />
                  <span>{listing.teamSize}</span>
                </span>
                <Button variant="outline" size="sm" onClick={() => setView("projects")}>
                  <span>Details</span>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* ================= TELEMETRY STATS BANNER ================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-gradient-to-r from-teal-950/70 via-[#0f1d2e] to-[#0c1626] border border-teal-500/30 p-8 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <div className="font-head text-3xl sm:text-4xl font-extrabold text-white">{pilotMetrics.medianTTM}</div>
              <div className="text-xs font-mono text-teal-300">Median Time-to-Match</div>
              <div className="text-[10px] text-slate-400">&le; 24h SLA Satisfied</div>
            </div>

            <div className="space-y-1">
              <div className="font-head text-3xl sm:text-4xl font-extrabold text-cyan-300">{pilotMetrics.crossCollegeRatio}</div>
              <div className="text-xs font-mono text-cyan-300">Cross-College Ratio</div>
              <div className="text-[10px] text-slate-400">Inter-institutional synergy</div>
            </div>

            <div className="space-y-1">
              <div className="font-head text-3xl sm:text-4xl font-extrabold text-emerald-400">{pilotMetrics.verifiedTokens}</div>
              <div className="text-xs font-mono text-emerald-300">Domain Auth Accuracy</div>
              <div className="text-[10px] text-slate-400">@thapar.edu & partner emails</div>
            </div>

            <div className="space-y-1">
              <div className="font-head text-3xl sm:text-4xl font-extrabold text-amber-300">{pilotMetrics.handshakeSuccessRate}</div>
              <div className="text-xs font-mono text-amber-300">Handshake Conversion</div>
              <div className="text-[10px] text-slate-400">Mutual consent unlocks</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BOTTOM CTA BANNER ================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 text-center space-y-6 pt-6">
        <h2 className="font-head text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Ready to build your next hackathon project?
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Connect your GitHub activity, verify institutional credentials, and join an active sprint squad today.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button variant="primary" size="md" onClick={() => setView("matchmaker")}>
            <Sparkles size={15} />
            <span>Launch Matchmaker</span>
          </Button>
          <Button variant="outline" size="md" onClick={() => setView("tasks")}>
            <span>View Sprint Board</span>
          </Button>
        </div>
      </section>
    </div>
  );
}
