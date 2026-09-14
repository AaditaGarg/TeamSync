import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import OverviewView from "./components/OverviewView";
import TeamsView from "./components/TeamsView";
import ProjectsView from "./components/ProjectsView";
import TasksView from "./components/TasksView";
import NotificationsView from "./components/NotificationsView";
import { students, notifications } from "./data/mockData";

const currentUser = students[0];

export default function App() {
  const [view, setView] = useState("overview");
  const [query, setQuery] = useState("");
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--color-canvas)] text-[var(--color-text)]">
      <Sidebar view={view} setView={setView} unreadCount={unreadCount} currentUser={currentUser} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar view={view} query={query} setQuery={setQuery} unreadCount={unreadCount} setView={setView} />
        <main className="scroll-quiet flex-1 overflow-y-auto px-6 py-6">
          {view === "overview" && <OverviewView />}
          {view === "teams" && <TeamsView query={query} />}
          {view === "projects" && <ProjectsView query={query} />}
          {view === "tasks" && <TasksView query={query} />}
          {view === "notifications" && <NotificationsView />}
        </main>
      </div>
    </div>
  );
}
