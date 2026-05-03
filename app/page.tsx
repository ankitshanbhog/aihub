"use client";
import { useState } from "react";
import { TOOLS, NICHES, Tool } from "@/lib/tools-data";
import Navbar from "@/components/Navbar";
import ToolCard from "@/components/ToolCard";
import FeedbackModal from "@/components/FeedbackModal";
import ProblemMatcher from "@/components/ProblemMatcher";

export default function Home() {
  const [activeNiche, setActiveNiche] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [highlightedIds, setHighlightedIds] = useState<string[]>([]);

  const filtered = TOOLS.filter(t => {
    const matchNiche = activeNiche === "All" || t.niche === activeNiche;
    const matchSearch = !search || t.name.toLowerCase().includes(search.toLowerCase()) || t.desc.toLowerCase().includes(search.toLowerCase());
    return matchNiche && matchSearch;
  });

  const sorted = highlightedIds.length
    ? [...filtered].sort((a, b) => highlightedIds.includes(b.id) ? 1 : highlightedIds.includes(a.id) ? -1 : 0)
    : filtered;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-10">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Find the right AI tool<br />
            <span className="text-purple-600">for your exact problem</span>
          </h1>
          <p className="text-gray-500 text-lg">Discover, try, and leave real feedback that helps AI tools improve.</p>
        </div>

        <div className="mb-8">
          <ProblemMatcher onMatch={setHighlightedIds} />
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <div className="flex gap-2 flex-wrap">
            {NICHES.map(n => (
              <button key={n} onClick={() => setActiveNiche(n)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${activeNiche === n ? "bg-purple-600 text-white border-purple-600" : "border-gray-200 text-gray-500 hover:border-purple-300 bg-white"}`}>
                {n}
              </button>
            ))}
          </div>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search tools..."
            className="md:ml-auto border border-gray-200 rounded-lg px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-purple-400 w-full md:w-56" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sorted.map(tool => (
            <div key={tool.id} className={highlightedIds.includes(tool.id) ? "ring-2 ring-purple-400 rounded-2xl" : ""}>
              <ToolCard tool={tool} onReview={setSelectedTool} />
            </div>
          ))}
        </div>
      </main>

      {selectedTool && <FeedbackModal tool={selectedTool} onClose={() => setSelectedTool(null)} />}
    </div>
  );
}