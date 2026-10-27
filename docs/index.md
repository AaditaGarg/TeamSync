# TeamSync — Cross-College Hackathon Collaboration Platform

*Verified skill-based teammate matching & collaboration workspace · UCS503P Software Engineering*

[Repository](https://github.com/AaditaGarg/TeamSync)

---

## 👤 Academic & Project Profile

| Detail | Specification |
| :--- | :--- |
| **Course** | UCS503P — Software Engineering Practicum |
| **Department** | Computer Science and Engineering Department (CSED) |
| **Institution** | Thapar Institute of Engineering and Technology, Patiala |
| **Faculty Evaluator** | Prof. Asif |
| **Batch / Group** | Group 3C32 (BE 3rd Year) |
| **Academic Session** | 2026 – 2027 |

### Team Members & Contributions

| Team Member | Roll Number | Email | Contribution Area |
| :--- | :--- | :--- | :--- |
| **Aadita Garg** | 1024030461 | agarg9_be24@thapar.edu | Lead Frontend Architecture, React 19 Workspace Dashboard, Presentation Lead |
| **Ridhima Goel** | 1024030466 | Rgoel_be24@thapar.edu | Backend Architecture, Heuristic Matching Engine Formulation, LaTeX Research Proposal |
| **Vedika Gupta** | 1024030437 | vgupta9_be24@thapar.edu | Database Modeling, 9 Formal SE UML Diagrams, Gantt Chart WBS, QA & Testing |

---

## 📌 Executive Overview

Hackathons and multidisciplinary personal software projects require diverse, complementary skill sets that a single college department rarely provides. A student strong in deep learning may urgently need a teammate skilled in frontend UI/UX or smart contract deployment for an upcoming 48-hour hackathon, but no matching student exists within their immediate friend circle.

Current teammate discovery suffers from four primary bottlenecks:
1. **Extreme Fragmentation:** Teammate search happens through scattered, unsearchable WhatsApp chats, batch Discord servers, or informal contacts.
2. **Zero Cross-College Visibility:** Students at Thapar have no structured avenue to connect with complementary builders at DTU, PEC, IITs, etc.
3. **Trust & Verification Deficit:** Generic social networks cannot verify real student standing, resulting in ghosting or inflated skill claims.
4. **Poor Skill Complementarity:** Search tools match identical tags rather than complementary roles (e.g. Pairing Frontend + Backend).

**TeamSync (CampusSync)** solves this by creating a verified, cross-institutional teammate-to-team matching web platform restricted to valid college email domains (`@thapar.edu`), backed by GitHub proof-of-work telemetry, and scored via a transparent heuristic matching algorithm.

---

## ✨ Key Capabilities

* **Strict Institutional Authentication:** Sign-up restricted to verified college email domains (`@thapar.edu`) using cryptographic token validation.
* **GitHub Proof-of-Work Telemetry:** Direct linkage to GitHub API extracts public repositories, commit activity, and top language tags as verified signals.
* **Heuristic Complementary Matching:** Evaluates candidates via a weighted-overlap composite formulation:
  $$S(u, L) = w_1 \cdot C_{\text{skills}}(u, L) + w_2 \cdot O_{\text{domain}}(u, L) + w_3 \cdot G_{\text{github}}(u) + w_4 \cdot A_{\text{avail}}(u)$$
* **Mutual Connection Handshake:** In-app request/acceptance protocol before communication unlocks, protecting student contact privacy.
* **Hackathon Squad Workspace:** Post-match shared workspace featuring an interactive Kanban task board (Todo / In Progress / Done) and milestone coordinator.

---

## 🏗️ System Architecture

TeamSync follows a decoupled 3-tier web architecture:

```
[Presentation Tier]
   React 19 + Tailwind CSS v4 + Vite + Lucide + Recharts
         │ (HTTPS REST APIs / WSS WebSockets)
         ▼
[Logic & Gateway Tier]
   Node.js + Express.js API Gateway
   ├── Domain Auth & JWT Middleware
   ├── Heuristic Matching Algorithm
   └── Real-time Notification Broker
         │
         ├───► [MongoDB Atlas Database] (Users, Profiles, Listings, Tasks)
         ├───► [GitHub REST v3 API] (Repository Telemetry)
         └───► [Campus SMTP Gateway] (Institutional Verification)
```

---

## 🚀 Prototype Status

* **Initial MVP (Completed):** College email domain verification, student profile setup, GitHub proof-of-work parsing, and requirement listing CRUD.
* **Current Phase (Iteration 2):** Complementary matching engine scoring integration and Hackathon Workspace Kanban dashboard.
* **Upcoming (Week 10):** Multi-college pilot UAT (15–25 students) timed with an active collegiate hackathon build.

---

## 📐 Formal Engineering Deliverables

All 9 formal Software Engineering UML & modeling diagrams are compiled as vector PDFs in `docs/Diagrams/`:

1. [**Use Case Diagram**](Diagrams/Use%20Case%20Diagram.pdf) — Primary actors and functional boundaries.
2. [**Activity Diagram**](Diagrams/Activity%20Diagram.pdf) — Step-by-step decision workflows.
3. [**Sequence Diagram**](Diagrams/Sequence%20Diagram.pdf) — Chronological message pathways.
4. [**Class Diagram**](Diagrams/Class%20Diagram.pdf) — OOP domain entity relationships.
5. [**ER Diagram**](Diagrams/ER%20diagram%20(2).pdf) — MongoDB document entity schemas.
6. [**Data Flow Diagram (Level 0, 1, 2)**](Diagrams/Data%20Flow%20Diagram(Level%200,1,2).pdf) — Multi-tier process decomposition.
7. [**Deployment Diagram**](Diagrams/Deployment%20Diagram.pdf) — Hardware and cloud node distribution.
8. [**Swimlane Diagram**](Diagrams/Swinlane%20Diagram.pdf) — Cross-functional actor responsibilities.
9. [**Collaboration Diagram**](Diagrams/Collaboration%20Diagram.pdf) — Object interaction communication model.

---

## 📅 Project Roadmap & Downloads

* [**Project Proposal PDF**](downloads/CampusSync_Proposal.pdf) — LaTeX research proposal submitted to Prof. Asif.
* [**Mid-Semester Report DOCX**](downloads/TeamSync_MidSem_Report.docx) — Formal evaluation report.
* [**Defense Presentation Slides**](downloads/TeamSync_MidSem_Presentation.pdf) — Mid-semester review slide deck.
* [**Gantt Chart & WBS Schedule**](downloads/Gantt_Chart.pdf) & [Excel Sheet](downloads/TeamSync_Gantt_Chart.xlsx) — 12-week sprint schedule.
* **Weekly Student Reflective Journals:**
  * [Aadita Garg Journal](downloads/Aadita_Garg_Journal.pdf)
  * [Ridhima Goel Journal](downloads/Ridhima_Goel_Journal.pdf)
  * [Vedika Gupta Journal](downloads/Vedika_Gupta_Journal.pdf)

