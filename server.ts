import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || "3000", 10);

app.use(express.json({ limit: "10mb" }));

// Initialize Gemini on server with telemetry User-Agent as instructed by gemini-api skill
let aiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  aiClient = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// 1. AI Website Generation Endpoint (Gemini 3.8 Flash)
app.post("/api/ai/generate-website", async (req, res) => {
  try {
    const { prompt, industry, location } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required." });
    }

    if (!aiClient) {
      // If no API key configured, return clean structural guidance
      return res.status(200).json({
        fallback: true,
        message: "API key pending in Secrets panel; using intelligent built-in synthesizer.",
      });
    }

    const systemPrompt = `You are the lead technical AI architect for Wiliakonect (founded by Anointed-Godswill C C-E in Port Harcourt, Nigeria). 
Generate a complete, modern WordPress-style website block schema for the user's business description.
Return valid JSON only without markdown code fences or backticks.
The JSON must follow this structure:
{
  "brandName": "String",
  "tagline": "String",
  "blocks": [
    {
      "id": "b-hero",
      "type": "hero",
      "title": "Compelling H1 headline",
      "subtitle": "Eyebrow tag",
      "content": "2-3 sentences value proposition",
      "ctaText": "Call to action button label",
      "ctaLink": "#contact"
    },
    {
      "id": "b-features",
      "type": "features",
      "title": "Key Capabilities",
      "subtitle": "WHAT WE OFFER",
      "items": [
        {"title": "Feature 1", "desc": "Description 1", "icon": "Zap"},
        {"title": "Feature 2", "desc": "Description 2", "icon": "ShieldCheck"},
        {"title": "Feature 3", "desc": "Description 3", "icon": "Globe"}
      ]
    },
    {
      "id": "b-pricing",
      "type": "pricing",
      "title": "Pricing & Packages",
      "subtitle": "TRANSPARENT VALUE",
      "items": [
        {"name": "Starter", "price": "₦85,000 / $120", "features": ["Feature A", "Feature B"]},
        {"name": "Professional", "price": "₦180,000 / $250", "popular": true, "features": ["Feature A", "Feature B", "Feature C"]}
      ]
    },
    {
      "id": "b-contact",
      "type": "contact",
      "title": "Connect with Us",
      "subtitle": "PORT HARCOURT, NIGERIA · GLOBAL DELIVERY",
      "content": "Reach out on WhatsApp or schedule a consultation."
    }
  ]
}`;

    const response = await aiClient.models.generateContent({
      model: "gemini-3.8-flash",
      contents: `Business Description: ${prompt}. Industry: ${industry || "General"}. Location: ${location || "Port Harcourt, Nigeria"}.`,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
      },
    });

    const rawText = response.text || "{}";
    const site = JSON.parse(rawText);

    res.json({ success: true, site });
  } catch (error: any) {
    console.error("AI Generation failed:", error);
    res.status(500).json({ error: error.message || "Failed to generate website with AI." });
  }
});

// 2. Health & Security Check endpoint
app.get("/api/health", (_req, res) => {
  res.json({
    status: "optimal",
    node: "Port Harcourt, Nigeria",
    engine: "Wiliakonect CMS v3.4 Pro",
    founder: "Anointed-Godswill C C-E",
    security: "TLS 1.3 · 256-Bit Armed",
  });
});

// 3. Mount Vite in dev mode or serve static in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer } = await import("vite");
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, "dist")));
    app.get("*", (_req, res) => {
      res.sendFile(path.resolve(__dirname, "dist", "index.html"));
    });
  }

  app.listen(port, "0.0.0.0", () => {
    console.log(`Wiliakonect server running on port ${port} (Port Harcourt Node)`);
  });
}

startServer();
