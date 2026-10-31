import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomeView from "./components/HomeView";
import MatchmakerView from "./components/MatchmakerView";
import ProjectsView from "./components/ProjectsView";
import TeamsView from "./components/TeamsView";
import TasksView from "./components/TasksView";
import ChatView from "./components/ChatView";
import NotificationsView from "./components/NotificationsView";
import AboutView from "./components/AboutView";
import { Modal, Button, Toast } from "./components/ui";

import {
  currentUser,
  candidates,
  listings as seedListings,
  squads as seedSquads,
  initialTasks as seedTasks,
  chatMessages as seedChat,
  initialNotifications as seedNotifs,
} from "./data/mockData";

export default function App() {
  const [view, setView] = useState("home");

  // Persistent application state
  const [listings, setListings] = useState(seedListings);
  const [appliedListings, setAppliedListings] = useState([]);
  const [squads, setSquads] = useState(seedSquads);
  const [tasks, setTasks] = useState(seedTasks);
  const [selectedSquadId, setSelectedSquadId] = useState("All");
  const [chatMessages, setChatMessages] = useState(seedChat);
  const [notifications, setNotifications] = useState(seedNotifs);
  const [sentHandshakes, setSentHandshakes] = useState([]);
  const [toast, setToast] = useState(null);

  // Modal states
  const [isNewListingOpen, setIsNewListingOpen] = useState(false);
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [isNewSquadOpen, setIsNewSquadOpen] = useState(false);

  // Form states
  const [listingForm, setListingForm] = useState({
    title: "",
    hackathon: "HackThapar 2026",
    category: "Healthcare & AI",
    rolesNeeded: "Frontend & UI, Backend",
    techStack: "React 19, FastAPI, PostgreSQL",
    teamSize: "2 / 4 Members",
    description: "",
  });

  const [taskForm, setTaskForm] = useState({
    title: "",
    squadId: squads[0]?.id || "sq-1",
    assigneeName: "Ridhima Goel",
    priority: "High",
    due: "2026-11-10",
    tags: "Sprint, Feature",
  });

  const [squadForm, setSquadForm] = useState({
    name: "",
    project: "",
    hackathon: "HackThapar 2026",
    nextMilestone: "",
  });

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Handshake Handlers
  const handleSendHandshake = (candidateId, candidateName) => {
    if (sentHandshakes.includes(candidateId)) return;
    setSentHandshakes((prev) => [...prev, candidateId]);
    showToast(`Handshake request transmitted to ${candidateName}!`);
  };

  const handleAcceptHandshake = (notifId, sender) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notifId ? { ...n, read: true, actionRequired: false } : n))
    );
    showToast(`Handshake accepted with ${sender?.name || "Candidate"}! Two-way channel unlocked.`);
  };

  const handleDeclineHandshake = (notifId) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notifId ? { ...n, read: true, actionRequired: false } : n))
    );
    showToast("Handshake request declined.", "info");
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast("All notifications marked as read.");
  };

  const handleMarkSingleRead = (id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  // Application Handlers
  const handleApplyListing = (listingId, listingTitle) => {
    if (appliedListings.includes(listingId)) return;
    setAppliedListings((prev) => [...prev, listingId]);
    showToast(`Application submitted to "${listingTitle}" team!`);
  };

  // Task Move in Kanban
  const handleMoveTask = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
    showToast(`Task moved to ${newStatus}.`);
  };

  // Chat message send
  const handleSendMessage = (text) => {
    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: currentUser,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      text,
    };
    setChatMessages((prev) => [...prev, newMsg]);
  };

  // Create New Listing
  const handleCreateListing = (e) => {
    e.preventDefault();
    if (!listingForm.title.trim()) return;

    const newListing = {
      id: `list-${Date.now()}`,
      title: listingForm.title,
      hackathon: listingForm.hackathon,
      postedBy: currentUser,
      rolesNeeded: listingForm.rolesNeeded.split(",").map((s) => s.trim()).filter(Boolean),
      techStack: listingForm.techStack.split(",").map((s) => s.trim()).filter(Boolean),
      teamSize: listingForm.teamSize || "1 / 4 Members",
      deadline: "2026-11-25",
      status: "Open",
      category: listingForm.category,
      description: listingForm.description || "Looking for committed builders to sprint with us.",
      applicantsCount: 0,
    };

    setListings((prev) => [newListing, ...prev]);
    setIsNewListingOpen(false);
    setListingForm({
      title: "",
      hackathon: "HackThapar 2026",
      category: "Healthcare & AI",
      rolesNeeded: "Frontend & UI, Backend",
      techStack: "React 19, FastAPI, PostgreSQL",
      teamSize: "2 / 4 Members",
      description: "",
    });
    showToast("Requirement listing published successfully!");
  };

  // Create New Task
  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!taskForm.title.trim()) return;

    const assignee =
      candidates.find((c) => c.name.toLowerCase().includes(taskForm.assigneeName.toLowerCase())) ||
      currentUser;

    const newTask = {
      id: `tsk-${Date.now()}`,
      squadId: taskForm.squadId,
      title: taskForm.title,
      assignee,
      status: "Backlog",
      priority: taskForm.priority,
      due: taskForm.due,
      tags: taskForm.tags.split(",").map((s) => s.trim()).filter(Boolean),
    };

    setTasks((prev) => [newTask, ...prev]);
    setIsNewTaskOpen(false);
    setTaskForm({
      title: "",
      squadId: squads[0]?.id || "sq-1",
      assigneeName: "Ridhima Goel",
      priority: "High",
      due: "2026-11-10",
      tags: "Sprint, Feature",
    });
    showToast("New sprint task assigned to Kanban board!");
  };

  // Create New Squad
  const handleCreateSquad = (e) => {
    e.preventDefault();
    if (!squadForm.name.trim() || !squadForm.project.trim()) return;

    const newSquad = {
      id: `sq-${Date.now()}`,
      name: squadForm.name,
      project: squadForm.project,
      hackathon: squadForm.hackathon,
      members: [currentUser, candidates[0]],
      progress: 10,
      tasksTotal: 6,
      tasksDone: 1,
      deadline: "2026-11-30",
      repoUrl: "https://github.com/AaditaGarg/TeamSync",
      status: "Sprint Active",
      nextMilestone: squadForm.nextMilestone || "Initial architecture planning",
    };

    setSquads((prev) => [...prev, newSquad]);
    setIsNewSquadOpen(false);
    setSquadForm({
      name: "",
      project: "",
      hackathon: "HackThapar 2026",
      nextMilestone: "",
    });
    showToast(`Squad "${newSquad.name}" workspace provisioned!`);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen flex flex-col bg-[#070b12] text-slate-100 font-sans selection:bg-teal-500/30 selection:text-teal-200">
      {/* Top Navbar */}
      <Navbar
        view={view}
        setView={setView}
        unreadCount={unreadCount}
        onOpenNewListing={() => setIsNewListingOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {view === "home" && (
          <HomeView
            setView={setView}
            onSendHandshake={handleSendHandshake}
            sentHandshakes={sentHandshakes}
            onOpenNewListing={() => setIsNewListingOpen(true)}
          />
        )}

        {view === "matchmaker" && (
          <MatchmakerView
            onSendHandshake={handleSendHandshake}
            sentHandshakes={sentHandshakes}
          />
        )}

        {view === "projects" && (
          <ProjectsView
            listings={listings}
            onOpenNewListing={() => setIsNewListingOpen(true)}
            onApplyListing={handleApplyListing}
            appliedListings={appliedListings}
          />
        )}

        {view === "squads" && (
          <TeamsView
            squads={squads}
            setView={setView}
            onOpenNewSquad={() => setIsNewSquadOpen(true)}
            onSelectSquadForKanban={(squadId) => {
              setSelectedSquadId(squadId);
              setView("tasks");
            }}
          />
        )}

        {view === "tasks" && (
          <TasksView
            tasks={tasks}
            squads={squads}
            selectedSquadId={selectedSquadId}
            setSelectedSquadId={setSelectedSquadId}
            onOpenNewTask={() => setIsNewTaskOpen(true)}
            onMoveTask={handleMoveTask}
          />
        )}

        {view === "chat" && (
          <ChatView chatMessages={chatMessages} onSendMessage={handleSendMessage} />
        )}

        {view === "notifications" && (
          <NotificationsView
            notifications={notifications}
            onMarkAllRead={handleMarkAllRead}
            onAcceptHandshake={handleAcceptHandshake}
            onDeclineHandshake={handleDeclineHandshake}
            onMarkSingleRead={handleMarkSingleRead}
          />
        )}

        {view === "about" && <AboutView />}
      </main>

      {/* Footer */}
      <Footer setView={setView} />

      {/* Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Post New Requirement Modal */}
      <Modal
        isOpen={isNewListingOpen}
        onClose={() => setIsNewListingOpen(false)}
        title="Post Hackathon Requirement"
        subtitle="Publish technical roles needed for your upcoming build"
      >
        <form onSubmit={handleCreateListing} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">Project Title</label>
            <input
              type="text"
              required
              value={listingForm.title}
              onChange={(e) => setListingForm({ ...listingForm, title: e.target.value })}
              placeholder="e.g. Decentralized Multi-Sig Campus Voting"
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-teal-500/50"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Target Hackathon</label>
              <select
                value={listingForm.hackathon}
                onChange={(e) => setListingForm({ ...listingForm, hackathon: e.target.value })}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-teal-500/50"
              >
                <option value="HackThapar 2026">HackThapar 2026</option>
                <option value="Smart India Hackathon">Smart India Hackathon</option>
                <option value="EthIndia 2026">EthIndia 2026</option>
                <option value="Fintech 48h Sprint">Fintech 48h Sprint</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Category</label>
              <select
                value={listingForm.category}
                onChange={(e) => setListingForm({ ...listingForm, category: e.target.value })}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-teal-500/50"
              >
                <option value="Healthcare & AI">Healthcare & AI</option>
                <option value="Web3 & Governance">Web3 & Governance</option>
                <option value="Smart City">Smart City</option>
                <option value="Fintech">Fintech</option>
                <option value="EdTech & Productivity">EdTech & Productivity</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">
              Roles Needed <span className="text-slate-500">(comma-separated)</span>
            </label>
            <input
              type="text"
              value={listingForm.rolesNeeded}
              onChange={(e) => setListingForm({ ...listingForm, rolesNeeded: e.target.value })}
              placeholder="e.g. ML Specialist, Frontend Engineer"
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-teal-500/50 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">
              Tech Stack <span className="text-slate-500">(comma-separated)</span>
            </label>
            <input
              type="text"
              value={listingForm.techStack}
              onChange={(e) => setListingForm({ ...listingForm, techStack: e.target.value })}
              placeholder="e.g. React, FastAPI, PyTorch"
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-teal-500/50 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">Brief Description</label>
            <textarea
              rows={3}
              value={listingForm.description}
              onChange={(e) => setListingForm({ ...listingForm, description: e.target.value })}
              placeholder="Outline the problem scope and what your squad is building..."
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-teal-500/50"
            />
          </div>

          <div className="pt-3 border-t border-white/10 flex justify-end gap-2.5">
            <Button variant="ghost" size="sm" onClick={() => setIsNewListingOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Publish Listing
            </Button>
          </div>
        </form>
      </Modal>

      {/* Add Sprint Task Modal */}
      <Modal
        isOpen={isNewTaskOpen}
        onClose={() => setIsNewTaskOpen(false)}
        title="Add Sprint Task"
        subtitle="Schedule a deliverable on the Kanban board"
      >
        <form onSubmit={handleCreateTask} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">Task Title</label>
            <input
              type="text"
              required
              value={taskForm.title}
              onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
              placeholder="e.g. Configure Docker Compose for Postgres & Redis"
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-teal-500/50"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Target Squad</label>
              <select
                value={taskForm.squadId}
                onChange={(e) => setTaskForm({ ...taskForm, squadId: e.target.value })}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-teal-500/50"
              >
                {squads.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Priority</label>
              <select
                value={taskForm.priority}
                onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value })}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-teal-500/50"
              >
                <option value="Urgent">Urgent</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Assignee</label>
              <select
                value={taskForm.assigneeName}
                onChange={(e) => setTaskForm({ ...taskForm, assigneeName: e.target.value })}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-teal-500/50"
              >
                <option value="Ridhima Goel">Ridhima Goel (You)</option>
                <option value="Aadita Garg">Aadita Garg</option>
                <option value="Vedika Gupta">Vedika Gupta</option>
                <option value="Simran Kaur">Simran Kaur</option>
                <option value="Devansh Rao">Devansh Rao</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Target Due Date</label>
              <input
                type="date"
                value={taskForm.due}
                onChange={(e) => setTaskForm({ ...taskForm, due: e.target.value })}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-teal-500/50 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">
              Tags <span className="text-slate-500">(comma-separated)</span>
            </label>
            <input
              type="text"
              value={taskForm.tags}
              onChange={(e) => setTaskForm({ ...taskForm, tags: e.target.value })}
              placeholder="e.g. Docker, DevOps, CI/CD"
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-teal-500/50 font-mono"
            />
          </div>

          <div className="pt-3 border-t border-white/10 flex justify-end gap-2.5">
            <Button variant="ghost" size="sm" onClick={() => setIsNewTaskOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Assign Task
            </Button>
          </div>
        </form>
      </Modal>

      {/* Form New Squad Modal */}
      <Modal
        isOpen={isNewSquadOpen}
        onClose={() => setIsNewSquadOpen(false)}
        title="Provision Squad Workspace"
        subtitle="Establish a new collaborative repository and Kanban board"
      >
        <form onSubmit={handleCreateSquad} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">Squad Name</label>
            <input
              type="text"
              required
              value={squadForm.name}
              onChange={(e) => setSquadForm({ ...squadForm, name: e.target.value })}
              placeholder="e.g. Squad Apex"
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-teal-500/50"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">Project Name</label>
            <input
              type="text"
              required
              value={squadForm.project}
              onChange={(e) => setSquadForm({ ...squadForm, project: e.target.value })}
              placeholder="e.g. EcoCharge — Autonomous EV Charging Grid"
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-teal-500/50"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">Hackathon Event</label>
            <select
              value={squadForm.hackathon}
              onChange={(e) => setSquadForm({ ...squadForm, hackathon: e.target.value })}
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-teal-500/50"
            >
              <option value="HackThapar 2026">HackThapar 2026</option>
              <option value="Smart India Hackathon">Smart India Hackathon</option>
              <option value="EthIndia 2026">EthIndia 2026</option>
              <option value="Fintech 48h Sprint">Fintech 48h Sprint</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">Initial Milestone Goal</label>
            <input
              type="text"
              value={squadForm.nextMilestone}
              onChange={(e) => setSquadForm({ ...squadForm, nextMilestone: e.target.value })}
              placeholder="e.g. Finalize prototype schema & telemetry endpoints"
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-teal-500/50"
            />
          </div>

          <div className="pt-3 border-t border-white/10 flex justify-end gap-2.5">
            <Button variant="ghost" size="sm" onClick={() => setIsNewSquadOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Provision Workspace
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
