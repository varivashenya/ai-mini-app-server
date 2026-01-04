import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json({ limit: "5mb" }));

const PORT = process.env.PORT || 10000;

// ⛔ СЮДИ ВСТАВИШ СВІЙ OPENAI API KEY
const OPENAI_API_KEY = "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";

app.post("/generate", async (req, res) => {
  try {
    const { platform, style, color, text, count } = req.body;

    const prompt = `
Create a ${style} image for ${platform}.
Main color: ${color}.
Text on image: "${text}".
Clean composition, modern, high quality.
`;

    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-image-1",
        prompt,
        size: "1024x1024",
        n: count || 1
      })
    });

    const data = await response.json();

    if (!data.data || !data.data[0]?.b64_json) {
      console.error("OpenAI response:", data);
      return res.status(500).json({ error: "No image returned" });
    }

    const images = data.data.map(img =>
      `data:image/png;base64,${img.b64_json}`
    );

    res.json({ images });

  } catch (err) {
    console.error("Generation error:", err);
    res.status(500).json({ error: "Generation failed" });
  }
});

app.get("/", (req, res) => {
  res.send("API WORKS");
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
