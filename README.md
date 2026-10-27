# TeamSync (CampusSync)

A software-engineering prototype for cross-college hackathon team formation and project collaboration through a verified, skill-based matchmaking workflow. Students register with institutional email domains, link verifiable GitHub activity, post project requirements, match via a complementary-skill heuristic, and coordinate post-formation tasks in a shared workspace.

## Project overview

Cross-institutional student collaboration is frequently bottlenecked by fragmented chat channels, low trust in self-reported skills, and poor discoverability across colleges. TeamSync demonstrates a practical teammate discovery and team formation loop:

$$\text{Student registration (@thapar.edu)} \rightarrow \text{GitHub telemetry linkage} \rightarrow \text{requirement listing} \rightarrow \text{complementary heuristic match} \rightarrow \text{handshake request} \rightarrow \text{in-app chat} \rightarrow \text{shared workspace (Kanban)}$$

The prototype prioritizes an explainable, deterministic heuristic workflow over black-box recommendation models. Matching is calculated using weighted overlap across complementary skills, domain interest alignment, GitHub verification signals, and active hackathon availability.

## Features

- **Institutional Authentication:** Domain-restricted onboarding requiring valid student email credentials (`@thapar.edu`).
- **Verifiable GitHub Telemetry:** Proof-of-work verification extracting public repositories, primary programming languages, and commit activity via GitHub API.
- **Team & Requirement Listings:** Structured requirement creation specifying hackathon name, open roles, required tech stacks, and team size.
- **Complementary Matching Engine:** Heuristic algorithm scoring skill synergy $S(u, L) \in [0, 1]$ between candidate profiles and open listing requirements.
- **Two-Way Handshake Connection:** Mutual request/accept protocol before communication channels unlock, protecting student privacy.
- **In-App Coordination Chat:** Direct messaging channels for pre-formation coordination without relying on external phone numbers.
- **Hackathon Squad Workspace:** Integrated task management with an interactive Kanban board (Todo, In Progress, Done) and milestone tracking.
- **Pilot Metrics Instrumentation:** Automated logging for median Time-to-First-Match (TTM $\le 24$h), connection conversion, and cross-college match ratios.
- **Modern React 19 Client:** Reactive dashboard views for Overview, Projects, Teams, Tasks, Notifications, and Pilot Analytics.
- **Mock Telemetry Engine:** Pre-seeded realistic dataset (`mockData.js`) allowing complete prototype execution without external backend dependencies.
- **Automated CI/CD Pipeline:** GitHub Actions continuous integration with Oxlint code validation and automated GitHub Pages documentation publishing.

## Architecture

```text
React 19 + TypeScript / JSX frontend (Vite + Tailwind CSS v4)
         ↓  REST API / WebSockets
Node.js + Express backend
├── Institutional domain authentication (@thapar.edu)
├── Profile management & GitHub telemetry parser
├── Requirement listings & team lifecycle
├── Complementary-skill heuristic scoring engine
└── Real-time messaging & workspace Kanban broker
         ↓
MongoDB Atlas Cloud Database (Users, Profiles, Listings, Connections, Tasks)
```

The application is structured as a decoupled web architecture. The client workspace dashboard lives in `code/`, while the engineering specifications, diagrams, and documentation portal reside in `docs/`.

## Technology stack

| Area | Technology |
| :--- | :--- |
| **Frontend** | React 19, Vite 8, Tailwind CSS v4, Lucide React, Recharts |
| **Backend API** | Node.js (v20 LTS), Express.js, RESTful Architecture |
| **Authentication** | JWT (JSON Web Tokens) with `@thapar.edu` domain validation |
| **Database** | MongoDB Atlas with Mongoose ODM schemas |
| **Telemetry & Verification** | GitHub REST API v3 for repository & commit verification |
| **Real-Time Layer** | WebSockets / Socket.io for messaging and handshake notifications |
| **Code Quality & CI** | Oxlint, GitHub Actions CI pipeline, and GitHub Pages documentation |

## Repository layout

```text
code/
├── public/                 # Static assets, SVG icons, and favicons
└── src/
    ├── components/         # Overview, Projects, Teams, Tasks (Kanban), Notifications
    ├── data/               # mockData.js (simulated teams, listings, tasks, metrics)
    ├── App.jsx             # Main shell and modular view switcher
    └── index.css           # Tailwind v4 theme tokens
docs/
├── Diagrams/               # 9 Formal UML Diagrams (Activity, Sequence, Class, DFD, ER, etc.)
├── Gantt-Chart-.pdf        # 12-Week Gantt chart schedule
├── TeamSync_Gantt_Chart (1).xlsx # Gantt chart spreadsheet
├── TeamSync.pptx           # Presentation slide deck
└── index.md                # Comprehensive academic Markdown specification
journals/                   # Weekly reflective student engineering journals
project-proposal/           # LaTeX proposal source and compiled PDF submitted to Prof. Asif
project-report-prototype-stage/ # Mid-semester presentation deck and progress report
site/                       # GitHub Pages project documentation site (index.html)
```

## Run locally

### Requirements

- Node.js 20 or newer
- npm

### 1. Clone the repository

```bash
git clone https://github.com/AaditaGarg/TeamSync.git
cd TeamSync
```

### 2. Install dependencies & start the frontend

```bash
cd code
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

The frontend includes a built-in mock telemetry store (`src/data/mockData.js`). This allows immediate, full interactive testing of the Team Workspace, Project Listings, Kanban Task Board, and Notifications without requiring local MongoDB setup.

## Demo accounts & student profiles

| Profile Role | Student Name | Institutional Email | Assigned Focus |
| :--- | :--- | :--- | :--- |
| **Frontend Lead** | Aadita Garg | `agarg9_be24@thapar.edu` | React 19 Client Dashboard & UI/UX |
| **Backend Systems** | Ridhima Goel | `Rgoel_be24@thapar.edu` | Heuristic Matching Algorithm & REST APIs |
| **Database & QA** | Vedika Gupta | `vgupta9_be24@thapar.edu` | MongoDB Schema, UML Diagrams & Testing |

## Demo flow

1. **Overview Dashboard:** Explore the system overview, active hackathon builds, and real-time pilot metrics.
2. **Project Listings:** Browse open requirement listings (e.g. Fintech 48h Sprint, HealthTech AI) and view required tech stacks.
3. **Complementary Match Simulation:** Trigger the heuristic matching calculation to view candidate synergy scores.
4. **Handshake Notification:** Review pending connection requests and accept teammate invitations.
5. **Team Workspace:** Navigate to the sprint Kanban board to inspect task allocations, assignees, and build deadlines.

## Quality checks

Run automated code quality and build validation:

```bash
cd code

# Run fast Oxlint code quality checks
npm run lint

# Verify production Vite build
npm run build
```

## Documentation

- [Project Proposal (PDF)](project-proposal/CampusSync_Proposal.pdf)
- [Mid-Semester Evaluation Report (DOCX)](project-report-prototype-stage/TeamSync_MidSem_Report.docx)
- [Mid-Semester Defense Presentation (PDF)](project-report-prototype-stage/TeamSync_MidSem_Presentation%20(1).pdf)
- [Presentation Slide Deck (PPTX)](docs/TeamSync.pptx)
- [12-Week Gantt Chart Schedule (PDF)](docs/Gantt-Chart-.pdf) & [Excel Sheet](docs/TeamSync_Gantt_Chart%20(1).xlsx)
- [Formal UML Diagrams Directory](docs/Diagrams/)
- [Weekly Student Reflective Journals](journals/)

## Authors

| Team Member | Roll Number | Institutional Email |
| :--- | :--- | :--- |
| **Aadita Garg** | 1024030461 | agarg9_be24@thapar.edu |
| **Ridhima Goel** | 1024030466 | Rgoel_be24@thapar.edu |
| **Vedika Gupta** | 1024030437 | vgupta9_be24@thapar.edu |

---

TeamSync (CampusSync) · Software Engineering Prototype · Academic Year 2026–27  
Computer Science and Engineering Department (CSED), Thapar Institute of Engineering and Technology, Patiala
