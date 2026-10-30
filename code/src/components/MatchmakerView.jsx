import React, { useState, useMemo } from "react";
import {
  Sliders,
  Filter,
  Check,
  Send,
  Zap,
  Search,
} from "lucide-react";
import { Card, Button, Avatar, GithubIcon } from "./ui";
import { candidates, colleges } from "../data/mockData";

const ROLES = [
  "All",
  "Full-Stack & Cloud Architecture",
  "Backend & Systems Security",
  "AI / Machine Learning Engineer",
  "DevOps & Cloud Engineer",
  "Mobile App Developer",
  "Web3 & Smart Contract Developer",
  "Product Designer & UI Specialist",
];

export default function MatchmakerView({ onSendHandshake, sentHandshakes }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedCollege, setSelectedCollege] = useState("All");
  const [weights, setWeights] = useState({
    skill: 45,
    github: 25,
    domain: 20,
    avail: 10,
  });
  const [showFormula, setShowFormula] = useState(false);

  // Filter candidates based on filters and search query
  const filteredCandidates = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return candidates.filter((cand) => {
      const matchRole = selectedRole === "All" || cand.role === selectedRole;
      const matchCollege = selectedCollege === "All" || cand.college === selectedCollege;
      const matchQuery =
        !q ||
        cand.name.toLowerCase().includes(q) ||
        cand.college.toLowerCase().includes(q) ||
        cand.role.toLowerCase().includes(q) ||
        cand.techStack.some((t) => t.toLowerCase().includes(q));
      return matchRole && matchCollege && matchQuery;
    });
  }, [searchQuery, selectedRole, selectedCollege]);

  return (
    <div className="space-y-6">
      {/* Top Banner & Heuristic Formula Toggle */}
      <div className="p-6 rounded-2xl bg-[#0f1826] border border-teal-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse" />
            <h2 className="font-head text-lg sm:text-xl font-bold text-white tracking-tight">
              Complementary Heuristic Matchmaker
            </h2>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl">
            Calculates deterministic synergy score <span className="font-mono text-teal-300 font-semibold">S(u, L) &isin; [0, 100]%</span> between
            candidate telemetry and open hackathon requirements.
          </p>
        </div>

        <Button
          variant={showFormula ? "secondary" : "outline"}
          size="sm"
          onClick={() => setShowFormula(!showFormula)}
        >
          <Sliders size={14} />
          <span>{showFormula ? "Hide Weights" : "Tweak Weight Formula"}</span>
        </Button>
      </div>

      {/* Expandable Heuristic Weight Simulator */}
      {showFormula && (
        <Card className="p-5 border-teal-500/40 bg-[#0a111c] animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-4">
            <span className="text-xs font-mono font-bold text-teal-300 uppercase tracking-wider flex items-center gap-2">
              <Zap size={14} />
              <span>S(u, L) = w₁·S_skill + w₂·S_github + w₃·S_domain + w₄·S_avail</span>
            </span>
            <span className="text-xs font-mono text-slate-400">Sum: {weights.skill + weights.github + weights.domain + weights.avail}%</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                <span>w₁ Skill Complementarity</span>
                <span className="text-teal-400 font-bold">{weights.skill}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="60"
                value={weights.skill}
                onChange={(e) => setWeights({ ...weights, skill: Number(e.target.value) })}
                className="w-full accent-teal-400 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                <span>w₂ GitHub Telemetry</span>
                <span className="text-teal-400 font-bold">{weights.github}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="40"
                value={weights.github}
                onChange={(e) => setWeights({ ...weights, github: Number(e.target.value) })}
                className="w-full accent-teal-400 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                <span>w₃ Domain Alignment</span>
                <span className="text-teal-400 font-bold">{weights.domain}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="30"
                value={weights.domain}
                onChange={(e) => setWeights({ ...weights, domain: Number(e.target.value) })}
                className="w-full accent-teal-400 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono text-slate-300 mb-1">
                <span>w₄ Availability</span>
                <span className="text-teal-400 font-bold">{weights.avail}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="25"
                value={weights.avail}
                onChange={(e) => setWeights({ ...weights, avail: Number(e.target.value) })}
                className="w-full accent-teal-400 cursor-pointer"
              />
            </div>
          </div>
        </Card>
      )}

      {/* Filter Tabs */}
      <div className="space-y-3">
        {/* Role Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scroll-quiet">
          <span className="text-xs font-mono text-slate-400 shrink-0 mr-1 flex items-center gap-1">
            <Filter size={12} />
            <span>Role:</span>
          </span>
          {ROLES.map((role) => {
            const active = selectedRole === role;
            return (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  active
                    ? "bg-teal-500 text-slate-950 font-bold shadow-md shadow-teal-500/20"
                    : "bg-slate-900/80 text-slate-400 hover:text-white border border-white/5 hover:border-white/10"
                }`}
              >
                {role}
              </button>
            );
          })}
        </div>

        {/* College Filter + Search + Counter */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1 text-xs text-slate-400">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="font-mono">College:</span>
              <select
                value={selectedCollege}
                onChange={(e) => setSelectedCollege(e.target.value)}
                className="bg-[#0b121e] border border-white/10 rounded-lg px-2.5 py-1 text-slate-200 text-xs font-mono focus:outline-none focus:border-teal-500/50"
              >
                <option value="All">All Partner Colleges</option>
                {colleges.map((col) => (
                  <option key={col} value={col}>
                    {col}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search candidates or skills..."
                className="bg-[#0b121e] border border-white/10 rounded-lg pl-7 pr-3 py-1 text-slate-200 text-xs font-mono focus:outline-none focus:border-teal-500/50 w-52 sm:w-60"
              />
            </div>
          </div>

          <span className="font-mono self-end sm:self-auto">{filteredCandidates.length} Candidates Available</span>
        </div>
      </div>

      {/* Candidate Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredCandidates.map((cand) => {
          const isSent = sentHandshakes.includes(cand.id);

          return (
            <Card
              key={cand.id}
              className="p-5 flex flex-col justify-between hover:border-teal-500/50 transition-all group"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Avatar user={cand} size={44} showVerified={true} />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-head text-base font-bold text-white truncate">{cand.name}</h3>
                      </div>
                      <span className="text-[11px] font-mono text-teal-400 block truncate">{cand.role}</span>
                      <span className="text-[10px] text-slate-400 block truncate">{cand.college}</span>
                    </div>
                  </div>

                  {/* Synergy Gauge */}
                  <div className="flex flex-col items-end shrink-0">
                    <div className="px-2.5 py-1 rounded-xl bg-teal-500/15 border border-teal-500/30 text-teal-300 font-head font-extrabold text-sm">
                      {cand.synergyScore}%
                    </div>
                    <span className="text-[9px] font-mono text-slate-400 mt-0.5">Synergy</span>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-xs text-slate-300 line-clamp-2 mt-3 leading-relaxed">
                  {cand.bio}
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 mt-3.5">
                  {cand.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-md bg-slate-900 border border-white/5 text-[10px] font-mono text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* GitHub Telemetry Stats */}
                <div className="mt-4 p-3 rounded-xl bg-slate-950/60 border border-white/5 space-y-1.5 font-mono text-[11px]">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <GithubIcon size={13} className="text-teal-400" />
                      <span>GitHub Proof:</span>
                    </span>
                    <span className="text-teal-300 font-semibold">{cand.github.topLanguage}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400 text-[10px]">
                    <span>{cand.github.reposCount} public repositories</span>
                    <span className="text-emerald-400">{cand.github.commitsLastYear}+ commits / yr</span>
                  </div>
                </div>
              </div>

              {/* Bottom Action: Handshake Protocol */}
              <div className="pt-4 mt-4 border-t border-white/[0.08] flex items-center justify-between gap-3">
                <span className="text-[10px] font-mono text-slate-400">
                  Target: <strong className="text-slate-200">{cand.preferredHackathon}</strong>
                </span>

                <Button
                  variant={isSent ? "outline" : "primary"}
                  size="sm"
                  onClick={() => onSendHandshake(cand.id, cand.name)}
                  disabled={isSent}
                  className={isSent ? "border-teal-500/40 text-teal-300" : ""}
                >
                  {isSent ? (
                    <>
                      <Check size={13} />
                      <span>Handshake Sent</span>
                    </>
                  ) : (
                    <>
                      <Send size={13} />
                      <span>Connect</span>
                    </>
                  )}
                </Button>
              </div>
            </Card>
          );
        })}

        {filteredCandidates.length === 0 && (
          <div className="col-span-full py-16 text-center text-slate-400">
            <p className="text-sm">No candidate matches your current filter criteria.</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedRole("All");
                setSelectedCollege("All");
              }}
              className="mt-3"
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
