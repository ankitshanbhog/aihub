"use client";
import { useState } from "react";
import { Tool } from "@/lib/tools-data";
import { submitFeedback } from "@/lib/firestore";
import { auth } from "@/lib/firebase";
import { X, Star } from "lucide-react";

type Props = { tool: Tool; onClose: () => void; };

export default function FeedbackModal({ tool, onClose }: Props) {
  const [step, setStep] = useState(1);
  const [rating, setRating] = useState(0);
  const [solved, setSolved] = useState<boolean | null>(null);
  const [useCase, setUseCase] = useState("");
  const [whatWorked, setWhatWorked] = useState("");
  const [whatFailed, setWhatFailed] = useState("");
  const [done, setDone] = useState(false);

  const user = auth.currentUser;

  const submit = async () => {
    if (!user) return alert("Please sign in to leave a review.");
    await submitFeedback({
      toolId: tool.id, toolName: tool.name,
      userId: user.uid, userName: user.displayName || "Anonymous",
      rating, solvedProblem: solved ?? false,
      useCase, whatWorked, whatFailed,
    });
    setDone(true);
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div>
            <p className="text-xs text-purple-600 font-medium">{tool.niche}</p>
            <h3 className="font-semibold text-gray-900">{tool.name}</h3>
          </div>
          <button onClick={onClose}><X size={18} className="text-gray-400" /></button>
        </div>

        {done ? (
          <div className="p-8 text-center">
            <div className="text-4xl mb-3">✓</div>
            <p className="font-semibold text-gray-900">Review submitted!</p>
            <p className="text-sm text-gray-500 mt-1">Your feedback helps the {tool.name} team improve.</p>
            <button onClick={onClose} className="mt-5 bg-purple-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium">Done</button>
          </div>
        ) : (
          <div className="p-5">
            {step === 1 && (
              <div className="space-y-4">
                <p className="text-sm font-medium text-gray-700">Step 1 of 3 — Try it first</p>
                <div className="bg-purple-50 rounded-xl p-4 text-sm text-gray-700 leading-relaxed">
                  {tool.guidedPrompt}
                </div>
                <a href={tool.url} target="_blank" rel="noopener noreferrer"
                  className="block text-center bg-gray-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-gray-700 transition">
                  Open {tool.name} →
                </a>
                <button onClick={() => setStep(2)} className="w-full border border-purple-200 text-purple-700 py-2.5 rounded-lg text-sm font-medium hover:bg-purple-50 transition">
                  I've tried it — give feedback
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <p className="text-sm font-medium text-gray-700">Step 2 of 3 — Rate your experience</p>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Did it solve your problem?</p>
                  <div className="flex gap-3">
                    {[true, false].map(v => (
                      <button key={String(v)} onClick={() => setSolved(v)}
                        className={`flex-1 py-2.5 rounded-lg text-sm font-medium border transition ${solved === v ? "bg-purple-600 text-white border-purple-600" : "border-gray-200 text-gray-600 hover:border-purple-300"}`}>
                        {v ? "Yes it did" : "Not really"}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Overall rating</p>
                  <div className="flex gap-2">
                    {[1,2,3,4,5].map(n => (
                      <button key={n} onClick={() => setRating(n)}>
                        <Star size={24} className={n <= rating ? "text-amber-400 fill-amber-400" : "text-gray-200"} />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">What task were you trying to do?</p>
                  <input value={useCase} onChange={e => setUseCase(e.target.value)}
                    placeholder="e.g. Write product descriptions for my store"
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-400 text-black placeholder-black" />
                </div>
                <button onClick={() => setStep(3)} disabled={!rating || solved === null}
                  className="w-full bg-purple-600 text-white py-2.5 rounded-lg text-sm font-medium disabled:opacity-40 hover:bg-purple-700 transition">
                  Next →
                </button>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <p className="text-sm font-medium text-gray-700">Step 3 of 3 — Detailed feedback</p>
                <div>
                  <p className="text-sm text-gray-600 mb-1">What worked well?</p>
                  <textarea value={whatWorked} onChange={e => setWhatWorked(e.target.value)}
                    placeholder="e.g. Output quality was great, very fast..."
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 h-20 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400 text-black placeholder-black" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">What could be better?</p>
                  <textarea value={whatFailed} onChange={e => setWhatFailed(e.target.value)}
                    placeholder="e.g. Struggled with long-form content..."
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 h-20 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400 text-black placeholder-black" />
                </div>
                <button onClick={submit}
                  className="w-full bg-purple-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-purple-700 transition">
                  Submit review
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}