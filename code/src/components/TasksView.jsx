import React, { useMemo } from "react";
import { Plus, Filter, CheckCircle2, Clock, ArrowRight, ArrowLeft } from "lucide-react";
import { Card, Badge, Button, Avatar } from "./ui";

const COLUMNS = [
  { id: "Backlog", label: "Backlog", dotTone: "bg-slate-400" },
  { id: "In Progress", label: "In Progress", dotTone: "bg-teal-400" },
  { id: "Review", label: "Under Review", dotTone: "bg-amber-400" },
  { id: "Done", label: "Completed", dotTone: "bg-emerald-400" },
];

const PRIORITY_TONES = {
  Urgent: "rose",
  High: "amber",
  Medium: "teal",
  Low: "slate",
};

export default function TasksView({
  tasks,
  squads,
  query,
  selectedSquadId,
  setSelectedSquadId,
  onOpenNewTask,
  onMoveTask,
}) {
  const filteredTasks = useMemo(() => {
    const q = (query || "").trim().toLowerCase();
    return tasks.filter((t) => {
      const matchSquad = selectedSquadId === "All" || t.squadId === selectedSquadId;
      const matchQuery =
        !q ||
        t.title.toLowerCase().includes(q) ||
        t.assignee?.name.toLowerCase().includes(q) ||
        t.tags?.some((tag) => tag.toLowerCase().includes(q));
      return matchSquad && matchQuery;
    });
  }, [tasks, selectedSquadId, query]);

  const getSquadName = (squadId) => {
    return squads.find((s) => s.id === squadId)?.name || "Sprint Team";
  };

  const getNextStatus = (currentStatus) => {
    if (currentStatus === "Backlog") return "In Progress";
    if (currentStatus === "In Progress") return "Review";
    if (currentStatus === "Review") return "Done";
    return null;
  };

  const getPrevStatus = (currentStatus) => {
    if (currentStatus === "Done") return "Review";
    if (currentStatus === "Review") return "In Progress";
    if (currentStatus === "In Progress") return "Backlog";
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-[#0f1826] border border-teal-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-400" />
            <h2 className="font-head text-lg sm:text-xl font-bold text-white tracking-tight">
              Sprint Task Kanban Board
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time task allocations and PR status tracking across active hackathon squads.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={onOpenNewTask}>
          <Plus size={15} />
          <span>Add Sprint Task</span>
        </Button>
      </div>

      {/* Squad Filter Tabs */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scroll-quiet">
          <span className="text-xs font-mono text-slate-400 shrink-0 mr-1 flex items-center gap-1">
            <Filter size={12} />
            <span>Squad:</span>
          </span>
          <button
            onClick={() => setSelectedSquadId("All")}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
              selectedSquadId === "All"
                ? "bg-teal-500 text-slate-950 font-bold"
                : "bg-slate-900 text-slate-400 hover:text-white border border-white/5"
            }`}
          >
            All Squads
          </button>
          {squads.map((s) => {
            const active = selectedSquadId === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setSelectedSquadId(s.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  active
                    ? "bg-teal-500 text-slate-950 font-bold"
                    : "bg-slate-900 text-slate-400 hover:text-white border border-white/5"
                }`}
              >
                {s.name}
              </button>
            );
          })}
        </div>

        <span className="text-xs font-mono text-slate-400">{filteredTasks.length} Active Tasks</span>
      </div>

      {/* Kanban 4 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 items-start">
        {COLUMNS.map((col) => {
          const colTasks = filteredTasks.filter((t) => t.status === col.id);

          return (
            <div key={col.id} className="rounded-2xl bg-[#0b121e]/80 border border-white/[0.08] p-4 flex flex-col gap-3 min-h-[480px]">
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${col.dotTone}`} />
                  <span className="font-head text-xs font-bold text-white uppercase tracking-wider">
                    {col.label}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-slate-900 text-teal-300 font-mono text-xs font-bold border border-white/5">
                  {colTasks.length}
                </span>
              </div>

              {/* Task Cards */}
              <div className="space-y-3 flex-1">
                {colTasks.map((task) => {
                  const nextStatus = getNextStatus(task.status);
                  const prevStatus = getPrevStatus(task.status);

                  return (
                    <Card
                      key={task.id}
                      className="p-4 bg-[#0f1826] hover:border-teal-500/40 transition-all space-y-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-[10px] font-mono text-teal-400 font-bold truncate">
                          {getSquadName(task.squadId)}
                        </span>
                        <Badge variant={PRIORITY_TONES[task.priority] || "slate"} size="xs">
                          {task.priority}
                        </Badge>
                      </div>

                      <h4 className="text-xs font-semibold text-white leading-snug">
                        {task.title}
                      </h4>

                      {/* Tags */}
                      {task.tags && task.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {task.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 text-[9px] font-mono border border-white/5"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Assignee & Due Date */}
                      <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <Avatar user={task.assignee} size={22} />
                          <span className="text-[11px] text-slate-300 font-medium truncate max-w-[90px]">
                            {task.assignee?.name.split(" ")[0]}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                          <Clock size={11} />
                          <span>{task.due}</span>
                        </span>
                      </div>

                      {/* Interactive Column Transition Controls */}
                      <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-slate-400">
                        {prevStatus ? (
                          <button
                            onClick={() => onMoveTask(task.id, prevStatus)}
                            className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
                            title={`Move back to ${prevStatus}`}
                          >
                            <ArrowLeft size={11} />
                            <span>Back</span>
                          </button>
                        ) : (
                          <span />
                        )}

                        {nextStatus ? (
                          <button
                            onClick={() => onMoveTask(task.id, nextStatus)}
                            className="flex items-center gap-1 text-teal-300 hover:text-teal-200 font-bold transition-colors ml-auto"
                            title={`Advance to ${nextStatus}`}
                          >
                            <span>Move</span>
                            <ArrowRight size={11} />
                          </button>
                        ) : (
                          <span className="text-emerald-400 font-bold flex items-center gap-1 ml-auto">
                            <CheckCircle2 size={11} />
                            <span>Done</span>
                          </span>
                        )}
                      </div>
                    </Card>
                  );
                })}

                {colTasks.length === 0 && (
                  <div className="py-12 text-center text-xs text-slate-500 border border-dashed border-white/5 rounded-xl">
                    No tasks in {col.label.toLowerCase()}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
