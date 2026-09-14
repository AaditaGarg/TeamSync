// Mock data shaped after the CampusSync ER diagram (docs/Activity-and-ER.pdf):
// User(Student) -> Listing -> Connection -> TeamWorkspace -> Task, Notification.
// All data below is fabricated for demo purposes.

export const colleges = [
  "Thapar Institute of Engg. & Tech.",
  "PEC Chandigarh",
  "NIT Jalandhar",
  "IIIT Una",
];

export const students = [
  { id: "u1", name: "Aadita Garg", initials: "AG", college: colleges[0], techStack: ["React", "Node.js", "MongoDB"], role: "Full-stack" },
  { id: "u2", name: "Ridhima Goel", initials: "RG", college: colleges[0], techStack: ["Figma", "React", "Tailwind"], role: "Frontend / UX" },
  { id: "u3", name: "Vedika Gupta", initials: "VG", college: colleges[0], techStack: ["Node.js", "Express", "Postgres"], role: "Backend" },
  { id: "u4", name: "Karan Mehta", initials: "KM", college: colleges[1], techStack: ["Flutter", "Firebase"], role: "Mobile" },
  { id: "u5", name: "Simran Kaur", initials: "SK", college: colleges[2], techStack: ["Python", "TensorFlow"], role: "ML" },
  { id: "u6", name: "Devansh Rao", initials: "DR", college: colleges[1], techStack: ["Node.js", "Docker", "AWS"], role: "DevOps" },
  { id: "u7", name: "Ishaan Bhatt", initials: "IB", college: colleges[3], techStack: ["React Native", "GraphQL"], role: "Mobile" },
  { id: "u8", name: "Priya Nair", initials: "PN", college: colleges[2], techStack: ["UI Design", "Figma"], role: "Product / UX" },
  { id: "u9", name: "Yash Sinha", initials: "YS", college: colleges[3], techStack: ["Solidity", "React"], role: "Blockchain" },
  { id: "u10", name: "Meher Chawla", initials: "MC", college: colleges[0], techStack: ["Python", "FastAPI"], role: "Backend" },
];

const byId = (id) => students.find((s) => s.id === id);

export const teams = [
  {
    id: "t1",
    name: "Nimbus",
    project: "CampusSync — Matching Engine",
    college: "Cross-college",
    memberIds: ["u1", "u2", "u3", "u6"],
    progress: 72,
    tasksDone: 13,
    tasksTotal: 18,
    deadline: "2026-09-21",
    status: "On track",
  },
  {
    id: "t2",
    name: "Ferrous",
    project: "SmartAttend — Face-recognition Attendance",
    college: "PEC + NIT Jalandhar",
    memberIds: ["u4", "u6", "u5"],
    progress: 41,
    tasksDone: 7,
    tasksTotal: 17,
    deadline: "2026-09-18",
    status: "At risk",
  },
  {
    id: "t3",
    name: "Loom",
    project: "PitchDeck AI — Slide Generator",
    college: "IIIT Una + NIT Jalandhar",
    memberIds: ["u7", "u8", "u9"],
    progress: 88,
    tasksDone: 22,
    tasksTotal: 25,
    deadline: "2026-09-16",
    status: "On track",
  },
  {
    id: "t4",
    name: "Anchorpoint",
    project: "ChainVote — Campus Elections on-chain",
    college: "IIIT Una",
    memberIds: ["u9", "u10", "u1"],
    progress: 24,
    tasksDone: 4,
    tasksTotal: 16,
    deadline: "2026-09-27",
    status: "Behind",
  },
  {
    id: "t5",
    name: "Kite Club",
    project: "StudyRoom — Pomodoro co-working rooms",
    college: "Thapar + PEC",
    memberIds: ["u2", "u4", "u10"],
    progress: 60,
    tasksDone: 9,
    tasksTotal: 15,
    deadline: "2026-09-24",
    status: "On track",
  },
].map((t) => ({ ...t, members: t.memberIds.map(byId) }));

// Listings = open "looking for teammates" postings (pre-team-formation)
export const listings = [
  {
    id: "l1",
    title: "Need a Flutter dev for a fintech hackathon build",
    postedBy: byId("u4"),
    rolesNeeded: ["Flutter", "UI Design"],
    status: "Open",
    applicants: 6,
    createdAt: "2026-09-10",
  },
  {
    id: "l2",
    title: "ML teammate to fine-tune a campus recommendation model",
    postedBy: byId("u5"),
    rolesNeeded: ["Python", "ML"],
    status: "Open",
    applicants: 3,
    createdAt: "2026-09-11",
  },
  {
    id: "l3",
    title: "Backend engineer for a 48h fintech sprint",
    postedBy: byId("u9"),
    rolesNeeded: ["Node.js", "Postgres"],
    status: "Matched",
    applicants: 9,
    createdAt: "2026-09-05",
  },
  {
    id: "l4",
    title: "Looking for a designer to polish onboarding flow",
    postedBy: byId("u7"),
    rolesNeeded: ["Figma", "UI Design"],
    status: "Open",
    applicants: 4,
    createdAt: "2026-09-12",
  },
  {
    id: "l5",
    title: "DevOps help — CI/CD pipeline for staging deploys",
    postedBy: byId("u1"),
    rolesNeeded: ["Docker", "AWS"],
    status: "Closed",
    applicants: 11,
    createdAt: "2026-08-30",
  },
];

export const tasks = [
  { id: "k1", teamId: "t1", title: "Design skill-overlap scoring function", assignee: byId("u1"), status: "Done", priority: "High", due: "2026-09-12" },
  { id: "k2", teamId: "t1", title: "Wire matching results into listing page", assignee: byId("u2"), status: "In progress", priority: "High", due: "2026-09-15" },
  { id: "k3", teamId: "t1", title: "Write unit tests for scoring weights", assignee: byId("u3"), status: "In progress", priority: "Medium", due: "2026-09-16" },
  { id: "k4", teamId: "t1", title: "Set up staging deploy on push to main", assignee: byId("u6"), status: "Todo", priority: "Medium", due: "2026-09-18" },
  { id: "k5", teamId: "t2", title: "Integrate face-embedding model", assignee: byId("u5"), status: "Blocked", priority: "High", due: "2026-09-14" },
  { id: "k6", teamId: "t2", title: "Build attendance history screen", assignee: byId("u4"), status: "In progress", priority: "Medium", due: "2026-09-17" },
  { id: "k7", teamId: "t2", title: "Provision camera capture endpoint", assignee: byId("u6"), status: "Todo", priority: "High", due: "2026-09-15" },
  { id: "k8", teamId: "t3", title: "Finalise slide-layout templates", assignee: byId("u8"), status: "Done", priority: "Medium", due: "2026-09-11" },
  { id: "k9", teamId: "t3", title: "Hook up GPT outline generation", assignee: byId("u9"), status: "Done", priority: "High", due: "2026-09-13" },
  { id: "k10", teamId: "t3", title: "Export-to-PPTX polish pass", assignee: byId("u7"), status: "In progress", priority: "Low", due: "2026-09-16" },
  { id: "k11", teamId: "t4", title: "Draft voting smart contract", assignee: byId("u9"), status: "In progress", priority: "High", due: "2026-09-20" },
  { id: "k12", teamId: "t4", title: "Wallet-connect login flow", assignee: byId("u10"), status: "Todo", priority: "Medium", due: "2026-09-22" },
  { id: "k13", teamId: "t4", title: "Write ballot verification tests", assignee: byId("u1"), status: "Todo", priority: "High", due: "2026-09-25" },
  { id: "k14", teamId: "t5", title: "Room-presence websocket channel", assignee: byId("u4"), status: "In progress", priority: "Medium", due: "2026-09-19" },
  { id: "k15", teamId: "t5", title: "Pomodoro timer + break reminders", assignee: byId("u2"), status: "Done", priority: "Low", due: "2026-09-10" },
  { id: "k16", teamId: "t5", title: "Weekly focus-streak leaderboard", assignee: byId("u10"), status: "Todo", priority: "Low", due: "2026-09-23" },
];

export const notifications = [
  { id: "n1", type: "connection", read: false, message: "Karan Mehta accepted your connection request.", time: "12 min ago" },
  { id: "n2", type: "match", read: false, message: "3 new candidate matches for \"ML teammate\" listing.", time: "48 min ago" },
  { id: "n3", type: "task", read: false, message: "Ridhima Goel marked \"Wire matching results\" as in progress.", time: "2 hr ago" },
  { id: "n4", type: "deadline", read: true, message: "Team Ferrous's milestone is due in 2 days.", time: "5 hr ago" },
  { id: "n5", type: "message", read: true, message: "New message from Vedika Gupta in Nimbus workspace.", time: "Yesterday" },
  { id: "n6", type: "system", read: true, message: "Weekly pilot metrics report is ready.", time: "Yesterday" },
  { id: "n7", type: "connection", read: true, message: "Priya Nair sent you a connection request.", time: "2 days ago" },
];

export const activity = [
  { id: "a1", actor: byId("u2"), action: "moved", target: "Wire matching results into listing page", meta: "to In progress", time: "12 min ago" },
  { id: "a2", actor: byId("u1"), action: "completed", target: "Design skill-overlap scoring function", meta: "", time: "1 hr ago" },
  { id: "a3", actor: byId("u5"), action: "flagged", target: "Integrate face-embedding model", meta: "as Blocked", time: "3 hr ago" },
  { id: "a4", actor: byId("u9"), action: "opened", target: "Draft voting smart contract", meta: "", time: "5 hr ago" },
  { id: "a5", actor: byId("u8"), action: "completed", target: "Finalise slide-layout templates", meta: "", time: "Yesterday" },
  { id: "a6", actor: byId("u4"), action: "posted", target: "\"Need a Flutter dev for a fintech hackathon build\"", meta: "listing", time: "3 days ago" },
  { id: "a7", actor: byId("u10"), action: "joined", target: "Kite Club", meta: "workspace", time: "4 days ago" },
];

export const weeklyProgress = [
  { week: "Wk 1", tasksClosed: 4 },
  { week: "Wk 2", tasksClosed: 9 },
  { week: "Wk 3", tasksClosed: 7 },
  { week: "Wk 4", tasksClosed: 14 },
  { week: "Wk 5", tasksClosed: 11 },
  { week: "Wk 6", tasksClosed: 18 },
];

export const pilotMetrics = {
  medianTTM: "6.4 hr",
  crossCollegeRate: "58%",
  conversionRate: "71%",
  verificationRate: "94%",
};
