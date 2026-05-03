"use client";
import { Tool } from "@/lib/tools-data";
import { Star, ExternalLink } from "lucide-react";

type Props = {
  tool: Tool;
  onReview: (tool: Tool) => void;
};

const NICHE_COLORS: Record<string, string> = {
  Writing: "bg-purple-50 text-purple-700",
  Image: "bg-green-50 text-green-700",
  Code: "bg-orange-50 text-orange-700",
  Productivity: "bg-amber-50 text-amber-700",
  Video: "bg-pink-50 text-pink-700",
  Business: "bg-blue-50 text-blue-700",
};

export default function ToolCard({ tool, onReview }: Props) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-purple-200 transition flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${NICHE_COLORS[tool.niche]}`}>
          {tool.niche}
        </span>
        <a href={tool.url} target="_blank" rel="noopener noreferrer"
          className="text-gray-300 hover:text-gray-500 transition">
          <ExternalLink size={15} />
        </a>
      </div>
      <div>
        <h3 className="font-semibold text-gray-900">{tool.name}</h3>
        <p className="text-sm text-gray-500 mt-1 leading-relaxed">{tool.desc}</p>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {tool.features.map(f => (
          <span key={f} className="text-xs bg-gray-50 text-gray-500 px-2 py-0.5 rounded-md">{f}</span>
        ))}
      </div>
      <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50">
        <div className="flex items-center gap-1 text-amber-400">
          <Star size={13} fill="currentColor" />
          <span className="text-sm font-medium text-gray-700">{tool.rating}</span>
          <span className="text-xs text-gray-400">({tool.reviews})</span>
        </div>
        <button onClick={() => onReview(tool)}
          className="text-sm text-purple-600 font-medium hover:text-purple-800 transition">
          Try & Review →
        </button>
      </div>
    </div>
  );
}