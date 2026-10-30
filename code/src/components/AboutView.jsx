import React from "react";
import { ShieldCheck, Mail } from "lucide-react";
import { Card, Avatar, GithubIcon } from "./ui";

const TEAM = [
  {
    name: "Aadita Garg",
    roll: "1024030461",
    email: "agarg9_be24@thapar.edu",
    role: "Full-Stack & Cloud Architecture",
    avatarTone: "#059669",
    github: "AaditaGarg",
    skills: ["React", "Node.js", "Express", "MongoDB", "Distributed Systems"],
  },
  {
    name: "Ridhima Goel",
    roll: "1024030466",
    email: "Rgoel_be24@thapar.edu",
    role: "Frontend & UI/UX Design System",
    avatarTone: "#0d9488",
    github: "ridhimagoel",
    skills: ["React 19", "Tailwind CSS", "TypeScript", "Vite", "Design Systems"],
  },
  {
    name: "Vedika Gupta",
    roll: "1024030437",
    email: "vgupta9_be24@thapar.edu",
    role: "Backend & Systems Security",
    avatarTone: "#0284c7",
    github: "vedika231",
    skills: ["Node.js", "Express", "PostgreSQL", "JWT Auth", "Docker"],
  },
];

export default function AboutView() {
  return (
    <div className="space-y-12 max-w-5xl mx-auto py-4">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-mono">
          <ShieldCheck size={13} />
          <span>Academic Project Specification &bull; Group 3C32</span>
        </div>
        <h1 className="font-head text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          About TeamSync & The Engineering Team
        </h1>
        <p className="text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Developed as part of the UCS503P Software Engineering course under the guidance of Prof. Asif at Thapar Institute of Engineering and Technology.
        </p>
      </div>

      {/* 3 Authors Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TEAM.map((member) => (
          <Card key={member.roll} className="p-6 text-center flex flex-col items-center justify-between space-y-4 hover:border-teal-500/40 transition-all">
            <div className="space-y-3 w-full">
              <Avatar user={member} size={64} showVerified={true} className="mx-auto" />
              <div>
                <h3 className="font-head text-lg font-bold text-white">{member.name}</h3>
                <span className="text-xs font-mono text-teal-300 block font-semibold">{member.role}</span>
                <span className="text-xs font-mono text-slate-400 block mt-0.5">Roll: {member.roll}</span>
              </div>

              <div className="pt-2 text-xs font-mono text-slate-400 flex items-center justify-center gap-1.5 truncate">
                <Mail size={12} className="text-teal-400 shrink-0" />
                <span className="truncate">{member.email}</span>
              </div>

              <div className="flex flex-wrap justify-center gap-1.5 pt-2">
                {member.skills.map((s) => (
                  <span key={s} className="px-2 py-0.5 rounded bg-slate-900 border border-white/5 text-[10px] font-mono text-slate-300">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <a
              href={`https://github.com/${member.github}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-teal-400 hover:text-teal-300 pt-3 border-t border-white/5 w-full justify-center transition-colors"
            >
              <GithubIcon size={13} />
              <span>@{member.github}</span>
            </a>
          </Card>
        ))}
      </div>

      {/* Supervision & Course Info */}
      <Card className="p-6 sm:p-8 bg-gradient-to-r from-[#0f1d2e] to-[#0b121e] border-teal-500/30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">Course Details</span>
            <div className="font-head text-base font-bold text-white">UCS503P: Software Engineering</div>
            <p className="text-xs text-slate-400">Academic Year 2026–2027 &bull; BE 3rd Year</p>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">Academic Supervision</span>
            <div className="font-head text-base font-bold text-white">Prof. Asif</div>
            <p className="text-xs text-slate-400">Computer Science & Engineering Department (CSED)</p>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">Institutional Campus</span>
            <div className="font-head text-base font-bold text-white">Thapar Institute of Engg. & Tech.</div>
            <p className="text-xs text-slate-400">Patiala, Punjab, India</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
