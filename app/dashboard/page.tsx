"use client";
import { useEffect, useState } from "react";
import { getAllFeedback, Feedback } from "@/lib/firestore";
import Navbar from "@/components/Navbar";
import { TOOLS } from "@/lib/tools-data";

export default function Dashboard() {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllFeedback().then(f => { setFeedback(f); setLoading(false); });
  }, []);

  const stats = TOOLS.map(tool => {
    const reviews = feedback.filter(f => f.toolId === tool.id);
    const avgRating = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : null;
    const solvedRate = reviews.length ? Math.round((reviews.filter(r => r.solvedProblem).length / reviews.length) * 100) : null;
    return { ...tool, reviewCount: reviews.length, avgRating, solvedRate, reviews };
  }).filter(t => t.reviewCount > 0).sort((a, b) => b.reviewCount - a.reviewCount);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Feedback Dashboard</h1>
          <p className="text-gray-500 mt-1">Real outcome-linked feedback from users across all tools.</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total reviews", value: feedback.length },
            { label: "Tools reviewed", value: stats.length },
            { label: "Problems solved", value: feedback.filter(f => f.solvedProblem).length },
          ].map(s => (
            <div key={s.label} className="bg-white border border-gray-100 rounded-2xl p-5">
              <p className="text-3xl font-bold text-gray-900">{s.value}</p>
              <p className="text-sm text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {loading ? <p className="text-gray-400 text-sm">Loading feedback...</p> : stats.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg font-medium">No feedback yet</p>
            <p className="text-sm mt-1">Go try a tool and leave the first review!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {stats.map(tool => (
              <div key={tool.id} className="bg-white border border-gray-100 rounded-2xl p-5">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">{tool.name}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">{tool.niche} · {tool.reviewCount} review{tool.reviewCount !== 1 ? "s" : ""}</p>
                  </div>
                  <div className="flex gap-4 text-right">
                    <div>
                      <p className="text-xl font-bold text-gray-900">{tool.avgRating?.toFixed(1)}</p>
                      <p className="text-xs text-gray-400">avg rating</p>
                    </div>
                    <div>
                      <p className="text-xl font-bold text-purple-600">{tool.solvedRate}%</p>
                      <p className="text-xs text-gray-400">solved</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  {tool.reviews.map((r, i) => (
                    <div key={i} className="bg-gray-50 rounded-xl p-3 text-sm">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-gray-700">{r.userName}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${r.solvedProblem ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
                          {r.solvedProblem ? "Solved" : "Didn't solve"}
                        </span>
                      </div>
                      {r.useCase && <p className="text-gray-500 text-xs mb-1">Task: {r.useCase}</p>}
                      {r.whatWorked && <p className="text-gray-600">✓ {r.whatWorked}</p>}
                      {r.whatFailed && <p className="text-gray-500">✗ {r.whatFailed}</p>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}