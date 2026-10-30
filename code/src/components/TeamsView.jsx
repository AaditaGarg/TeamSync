import React from "react";
import { Plus, FolderGit2, MessageSquare, Clock, Target } from "lucide-react";
import { Card, Badge, Button, ProgressBar, Avatar, GithubIcon } from "./ui";

export default function TeamsView({ squads, setView, onOpenNewSquad, onSelectSquadForKanban }) {
  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-[#0f1826] border border-teal-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-400" />
            <h2 className="font-head text-lg sm:text-xl font-bold text-white tracking-tight">
              Squad Workspaces
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Dedicated post-matchmaking collaboration environments equipped with Kanban sprints and code repositories.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={onOpenNewSquad}>
          <Plus size={15} />
          <span>Form New Squad</span>
        </Button>
      </div>

      {/* Squad Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {squads.map((squad) => {
          return (
            <Card
              key={squad.id}
              className="p-6 flex flex-col justify-between hover:border-teal-500/40 transition-all space-y-6 bg-gradient-to-b from-[#0f1929] to-[#0b121e]"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono text-teal-400 uppercase tracking-widest font-bold">
                      {squad.hackathon}
                    </span>
                    <h3 className="font-head text-xl font-bold text-white tracking-tight mt-0.5">
                      {squad.name}
                    </h3>
                    <p className="text-xs text-slate-300 mt-1">{squad.project}</p>
                  </div>
                  <Badge variant={squad.status === "Sprint Active" ? "emerald" : "teal"} size="xs">
                    {squad.status}
                  </Badge>
                </div>

                {/* Progress bar */}
                <div>
                  <ProgressBar value={squad.progress} label="Sprint Completion" />
                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 mt-1.5">
                    <span>{squad.tasksDone} of {squad.tasksTotal} tasks done</span>
                    <span className="flex items-center gap-1 text-slate-300">
                      <Clock size={11} className="text-teal-400" />
                      <span>{squad.deadline}</span>
                    </span>
                  </div>
                </div>

                {/* Next Milestone */}
                <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 space-y-1">
                  <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-teal-300 uppercase">
                    <Target size={11} />
                    <span>Next Milestone:</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-snug">{squad.nextMilestone}</p>
                </div>

                {/* Squad Members */}
                <div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                    Squad Teammates ({squad.members.length})
                  </div>
                  <div className="space-y-2">
                    {squad.members.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-white/5 text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <Avatar user={member} size={26} showVerified={true} />
                          <div className="min-w-0">
                            <span className="text-slate-200 font-semibold block truncate">{member.name}</span>
                            <span className="text-[10px] text-teal-400/80 font-mono block truncate">{member.role}</span>
                          </div>
                        </div>
                        <span className="text-[9px] font-mono text-slate-400 truncate max-w-[100px]">
                          {member.college.split(" ")[0]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-4 border-t border-white/[0.08] space-y-2.5">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <a
                    href={squad.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 hover:text-teal-300 transition-colors"
                  >
                    <GithubIcon size={13} className="text-teal-400" />
                    <span>Repo Link</span>
                  </a>
                  <button
                    onClick={() => setView("chat")}
                    className="flex items-center gap-1 hover:text-teal-300 transition-colors"
                  >
                    <MessageSquare size={13} className="text-teal-400" />
                    <span>Team Chat</span>
                  </button>
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  className="w-full"
                  onClick={() => onSelectSquadForKanban(squad.id)}
                >
                  <FolderGit2 size={14} />
                  <span>Open Sprint Kanban</span>
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
