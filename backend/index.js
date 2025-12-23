const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { OpenAI } = require("openai");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// OpenAI client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Health check
app.get("/", (req, res) => {
  res.send("Gap2Hire AI Backend Running");
});

// Analyze resume
app.post("/analyze", async (req, res) => {
  try {
    const { text } = req.body;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are an AI interview coach. Analyze resumes and return strengths, skill gaps, and suggestions.",
        },
        {
          role: "user",
          content: text,
        },
      ],
    });

    res.json({
      result: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI analysis failed" });
  }
});

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
