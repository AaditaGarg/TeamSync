# CampusSync — Team Workspace Dashboard

A frontend dashboard for **CampusSync**, the cross-college hackathon team-formation
platform described in `project-proposal/research_proposal.tex` and the ER/activity
diagrams in `docs/`. This implements the "Team Workspace" + pilot-metrics dashboard
deliverables from the proposal's project scope: teams, projects/listings, tasks,
deadlines, activity, and notifications — with realistic mock data (no backend yet).

## Stack

- React 19 + Vite
- Tailwind CSS v4
- Recharts (charts)
- lucide-react (icons)

## Run locally

```bash
cd code
npm install
npm run dev       # http://localhost:5173
```

## Build

```bash
npm run build      # outputs to code/dist
npm run preview    # serve the production build locally
```

## Structure

```
src/
  components/   # Sidebar, Topbar, per-section views, shared UI primitives
  data/         # mockData.js — fabricated teams/users/tasks/listings/notifications
  App.jsx       # app shell + view switching
  index.css     # Tailwind v4 theme tokens (brand palette, fonts)
```

## Notes

All data is mock/fabricated for demo purposes, modelled on the entities in the
project's ER diagram (`User`, `Listing`, `Connection`, `TeamWorkspace`, `Task`,
`Notification`). There is no backend integration yet — wiring this UI to the
Node/Express + MongoDB API described in the proposal is the natural next step.
