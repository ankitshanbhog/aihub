import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { problem, toolList } = await req.json();

  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ suggestion: "API key missing. Check your .env.local file." });
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        max_tokens: 400,
        messages: [
          {
            role: "system",
            content: `You are an AI tool recommender. You MUST always recommend 2-3 tools from the list provided, no matter how vague the request is. Never ask for more details. Always make your best guess and recommend tools. Be friendly and concise.`
          },
          {
            role: "user",
            content: `A user wants help with: "${problem}"\n\nHere are the available tools:\n${toolList}\n\nPick the 2-3 most relevant tools. For each, write the tool name and one sentence on why it fits. Always recommend something even if vague.`
          }
        ],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Groq error:", err);
      return NextResponse.json({ suggestion: `API error: ${response.status}. Check terminal for details.` });
    }

    const data = await response.json();
    const suggestion = data.choices?.[0]?.message?.content || "No response from AI.";
    return NextResponse.json({ suggestion });

  } catch (err) {
    console.error("Match error:", err);
    return NextResponse.json({ suggestion: "Network error. Check your internet connection." });
  }
}