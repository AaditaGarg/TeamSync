import React from "react";
import { ShieldCheck } from "lucide-react";
import { GithubIcon } from "./ui";

export default function Footer({ setView }) {
  return (
    <footer className="border-t border-white/[0.08] bg-[#070b12] text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-white/[0.06]">
          {/* Brand */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center font-head font-extrabold text-white text-xs">
                TS
              </div>
              <span className="font-head text-lg font-bold text-white tracking-tight">TeamSync</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/10 text-teal-300 border border-teal-500/20">
                v2.4
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm">
              Cross-college hackathon team formation, verifiable GitHub proof-of-work, and heuristic skill matchmaking.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap gap-6 text-xs font-mono">
            <button onClick={() => setView("home")} className="hover:text-teal-300 transition-colors">
              Home
            </button>
            <button onClick={() => setView("matchmaker")} className="hover:text-teal-300 transition-colors">
              Find Teammates
            </button>
            <button onClick={() => setView("projects")} className="hover:text-teal-300 transition-colors">
              Hackathons
            </button>
            <button onClick={() => setView("squads")} className="hover:text-teal-300 transition-colors">
              Squads
            </button>
            <button onClick={() => setView("tasks")} className="hover:text-teal-300 transition-colors">
              Sprint Kanban
            </button>
            <button onClick={() => setView("about")} className="hover:text-teal-300 transition-colors">
              About Team
            </button>
            <a
              href="https://github.com/AaditaGarg/TeamSync"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-teal-400 hover:text-teal-300 transition-colors"
            >
              <GithubIcon size={13} />
              <span>GitHub</span>
            </a>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-2 text-slate-400">
            <ShieldCheck size={14} className="text-teal-400" />
            <span>UCS503P Software Engineering Project &bull; Group 3C32 &bull; Prof. Asif</span>
          </div>

          <div>
            Computer Science & Engineering Department &bull; Thapar Institute, Patiala
          </div>
        </div>
      </div>
    </footer>
  );
}
