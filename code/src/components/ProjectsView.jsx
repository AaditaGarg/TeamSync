import React, { useState, useMemo } from "react";
import { Plus, Users, Send, CheckCircle2, Search } from "lucide-react";
import { Card, Badge, Button, Avatar } from "./ui";

const CATEGORIES = ["All", "Healthcare & AI", "Web3 & Governance", "Smart City", "Fintech", "EdTech & Productivity"];

export default function ProjectsView({
  listings,
  onOpenNewListing,
  onApplyListing,
  appliedListings,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredListings = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return listings.filter((l) => {
      const matchCat = selectedCategory === "All" || l.category === selectedCategory;
      const matchStatus = statusFilter === "All" || l.status === statusFilter;
      const matchQuery =
        !q ||
        l.title.toLowerCase().includes(q) ||
        l.hackathon.toLowerCase().includes(q) ||
        l.rolesNeeded.some((r) => r.toLowerCase().includes(q)) ||
        l.techStack.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchStatus && matchQuery;
    });
  }, [listings, searchQuery, selectedCategory, statusFilter]);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-[#0f1826] border border-teal-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-400" />
            <h2 className="font-head text-lg sm:text-xl font-bold text-white tracking-tight">
              Hackathon Requirement Listings
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Browse verified student teams actively seeking complementary talent for upcoming sprints.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={onOpenNewListing}>
          <Plus size={15} />
          <span>Post Requirement</span>
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full scroll-quiet">
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  active
                    ? "bg-teal-500 text-slate-950 font-bold"
                    : "bg-slate-900 text-slate-400 hover:text-white border border-white/5"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto text-xs font-mono text-slate-400">
          <div className="relative">
            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search hackathons or roles..."
              className="bg-[#0b121e] border border-white/10 rounded-lg pl-7 pr-3 py-1 text-slate-200 text-xs font-mono focus:outline-none focus:border-teal-500/50 w-48 sm:w-56"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <span>Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#0b121e] border border-white/10 rounded-lg px-2.5 py-1 text-slate-200 text-xs font-mono focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Open">Open Only</option>
              <option value="Filled">Filled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredListings.map((listing) => {
          const isApplied = appliedListings.includes(listing.id);
          const isFilled = listing.status === "Filled";

          return (
            <Card
              key={listing.id}
              className="p-6 flex flex-col justify-between hover:border-teal-500/40 transition-all"
            >
              <div className="space-y-4">
                {/* Meta Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono text-teal-400 font-bold uppercase tracking-wider block">
                      {listing.hackathon}
                    </span>
                    <h3 className="font-head text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
                      {listing.title}
                    </h3>
                  </div>

                  <Badge variant={isFilled ? "slate" : "emerald"} size="xs" className="shrink-0">
                    {listing.status}
                  </Badge>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {listing.description}
                </p>

                {/* Open Roles Required */}
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1.5">
                    Roles Needed:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {listing.rolesNeeded.map((role) => (
                      <span
                        key={role}
                        className="px-2.5 py-1 rounded-lg bg-teal-500/10 text-teal-300 border border-teal-500/20 text-xs font-medium"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Required */}
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1.5">
                    Required Tech Stack:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {listing.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md bg-slate-900 border border-white/5 text-[10px] font-mono text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-4 mt-5 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <Avatar user={listing.postedBy} size={30} showVerified={true} />
                  <div className="text-[11px] leading-tight">
                    <span className="text-slate-200 font-bold block">{listing.postedBy?.name}</span>
                    <span className="text-slate-400 font-mono text-[10px]">{listing.postedBy?.college}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3">
                  <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                    <Users size={12} className="text-teal-400" />
                    <span>{listing.teamSize}</span>
                  </div>

                  <Button
                    variant={isApplied ? "outline" : isFilled ? "outline" : "primary"}
                    size="sm"
                    disabled={isApplied || isFilled}
                    onClick={() => onApplyListing(listing.id, listing.title)}
                  >
                    {isApplied ? (
                      <>
                        <CheckCircle2 size={13} className="text-teal-400" />
                        <span>Applied</span>
                      </>
                    ) : isFilled ? (
                      <span>Roster Full</span>
                    ) : (
                      <>
                        <Send size={13} />
                        <span>Apply</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}

        {filteredListings.length === 0 && (
          <div className="col-span-full py-16 text-center text-slate-400">
            <p className="text-sm">No requirement listings match your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
