"use client";
import { useState } from "react";
import { TOOLS } from "@/lib/tools-data";
import { Sparkles } from "lucide-react";

type Props = { onMatch: (toolIds: string[]) => void; };

export default function ProblemMatcher({ onMatch }: Props) {
  const [problem, setProblem] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const match = async () => {
    if (!problem.trim()) return;
    setLoading(true);
    setResult("");

    const toolList = TOOLS.map(t => `${t.id}: ${t.name} (${t.niche}) — ${t.desc}`).join("\n");

    const res = await fetch("/api/match", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ problem, toolList }),
    });

    const data = await res.json();
    setResult(data.suggestion);
    const matched = TOOLS.filter(t => data.suggestion.toLowerCase().includes(t.name.toLowerCase()));
    onMatch(matched.map(t => t.id));
    setLoading(false);
  };

  return (
    <div className="bg-purple-50 border border-purple-100 rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles size={18} className="text-purple-600" />
        <h2 className="font-semibold text-gray-900">What are you trying to do?</h2>
      </div>
      <p className="text-sm text-gray-500 mb-4">Describe your task and we'll match you to the right AI tool.</p>
      <div className="flex gap-2">
        <input
          value={problem}
          onChange={e => setProblem(e.target.value)}
          onKeyDown={e => e.key === "Enter" && match()}
          placeholder="e.g. I need to write 10 product descriptions fast..."
          className="flex-1 text-sm border border-purple-200 rounded-lg px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <button onClick={match} disabled={loading}
          className="bg-purple-600 text-white text-sm px-5 py-2.5 rounded-lg hover:bg-purple-700 disabled:opacity-50 transition font-medium">
          {loading ? "Matching..." : "Match me"}
        </button>
      </div>
      {result && (
        <div className="mt-4 text-sm text-gray-700 bg-white border border-purple-100 rounded-xl p-4 leading-relaxed">
          {result}
        </div>
      )}
    </div>
  );
}