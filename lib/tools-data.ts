export type Tool = {
  id: string;
  name: string;
  niche: string;
  desc: string;
  features: string[];
  url: string;
  rating: number;
  reviews: number;
  guidedPrompt: string;
};

export const NICHES = ["All", "Writing", "Image", "Code", "Productivity", "Video", "Business"];

export const TOOLS: Tool[] = [
  { id: "chatgpt", name: "ChatGPT", niche: "Writing", desc: "Conversational AI for writing, Q&A, summaries, and research.", features: ["Long-form writing", "Research assistance", "Multi-turn conversation"], url: "https://chat.openai.com", rating: 4.8, reviews: 142, guidedPrompt: "Try this: paste a topic you need to write about and ask ChatGPT to write a 200-word intro with a hook." },
  { id: "jasper", name: "Jasper", niche: "Writing", desc: "Marketing copy and blog content generator built for teams.", features: ["SEO-optimized content", "Brand voice", "50+ templates"], url: "https://jasper.ai", rating: 4.5, reviews: 89, guidedPrompt: "Try this: give Jasper your product name and 3 bullet points, ask it to write a landing page headline + subheadline." },
  { id: "grammarly", name: "Grammarly", niche: "Writing", desc: "Real-time grammar, tone, and clarity suggestions.", features: ["Grammar check", "Tone detector", "Plagiarism check"], url: "https://grammarly.com", rating: 4.6, reviews: 201, guidedPrompt: "Try this: paste a paragraph you've written and ask Grammarly to improve its clarity and tone for a professional audience." },
  { id: "midjourney", name: "Midjourney", niche: "Image", desc: "High-fidelity AI art and image generation via Discord.", features: ["Photorealistic images", "Style control", "Upscaling"], url: "https://midjourney.com", rating: 4.7, reviews: 178, guidedPrompt: "Try this: type '/imagine a minimalist logo for a tech startup, flat design, purple and white, clean lines' in Discord." },
  { id: "dalle", name: "DALL·E 3", niche: "Image", desc: "OpenAI's text-to-image model integrated with ChatGPT.", features: ["Prompt following", "Inpainting", "API access"], url: "https://openai.com/dall-e-3", rating: 4.5, reviews: 134, guidedPrompt: "Try this: describe a scene for a blog thumbnail — 'a person working on a laptop in a cozy coffee shop, warm lighting, illustration style'." },
  { id: "github-copilot", name: "GitHub Copilot", niche: "Code", desc: "AI pair programmer that suggests code as you type.", features: ["Multi-language", "IDE plugins", "Test generation"], url: "https://github.com/features/copilot", rating: 4.7, reviews: 256, guidedPrompt: "Try this: open VS Code with Copilot, type a comment '// function to validate email address' and watch it autocomplete." },
  { id: "cursor", name: "Cursor", niche: "Code", desc: "AI-native code editor with codebase-aware completions.", features: ["Codebase context", "Chat in editor", "Multi-file edits"], url: "https://cursor.sh", rating: 4.6, reviews: 98, guidedPrompt: "Try this: open your project in Cursor, press Cmd+K and type 'add error handling to this function'." },
  { id: "notion-ai", name: "Notion AI", niche: "Productivity", desc: "AI inside Notion for summarizing, drafting, and searching docs.", features: ["Doc summarization", "Action items", "Q&A over workspace"], url: "https://notion.so", rating: 4.5, reviews: 163, guidedPrompt: "Try this: paste your meeting notes into Notion, highlight them, click AI → 'Extract action items'." },
  { id: "otter", name: "Otter.ai", niche: "Productivity", desc: "Real-time meeting transcription and AI summaries.", features: ["Live transcription", "Speaker ID", "Action items"], url: "https://otter.ai", rating: 4.4, reviews: 119, guidedPrompt: "Try this: start a recording in Otter during your next call. After, click 'Summary' to see auto-extracted key points." },
  { id: "runway", name: "Runway", niche: "Video", desc: "AI video generation, editing, and effects platform.", features: ["Text-to-video", "Inpainting", "Motion brush"], url: "https://runwayml.com", rating: 4.5, reviews: 93, guidedPrompt: "Try this: upload an image and use Gen-2 to animate it with a camera motion — 'slow zoom in, cinematic'." },
  { id: "descript", name: "Descript", niche: "Video", desc: "Edit video by editing the transcript.", features: ["Transcript editing", "Overdub voice", "Screen recording"], url: "https://descript.com", rating: 4.6, reviews: 107, guidedPrompt: "Try this: upload a video, let Descript transcribe it, then delete a sentence from the transcript and watch the video update." },
  { id: "hubspot-ai", name: "HubSpot AI", niche: "Business", desc: "CRM-embedded AI for sales, marketing, and support.", features: ["Email personalization", "Deal forecasting", "Content generation"], url: "https://hubspot.com", rating: 4.4, reviews: 114, guidedPrompt: "Try this: use HubSpot's AI email writer — give it your prospect's name, company, and pain point, generate a cold outreach email." },
  { id: "intercom-fin", name: "Intercom Fin", niche: "Business", desc: "AI customer support agent that resolves tickets automatically.", features: ["Instant resolution", "Human handoff", "Multi-language"], url: "https://intercom.com", rating: 4.5, reviews: 138, guidedPrompt: "Try this: set up a test Fin bot, give it your FAQ doc, and simulate 3 common customer questions to see how it responds." },
];